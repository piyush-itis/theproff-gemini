import os
import json
from fastapi import APIRouter
from app.prisma import db
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
openai = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))



def convert_to_openai_tools(tools):
    if isinstance(tools, str):
        tools = json.loads(tools)

    converted = [
        {
            "type": "function",
            "function": {
                "name": tool["name"],
                "description": tool["description"],
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            }
        }
        for tool in tools
    ]
    
    print("🛠️ Tools for OpenAI:", json.dumps(converted, indent=2))
    return converted


        

@router.post("/chat/{agent_id}")
async def chat_with_agent(agent_id: str, message: dict):
    agent = await db.agent.find_unique(where={"id": agent_id})
    if not agent:
        return {"error": "Agent not found"}

    user_input = message["content"]
    sender = message["sender"]
    openai_tools = convert_to_openai_tools(agent.tools)

    response = await openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": agent.systemPrompt},
            {"role": "user", "content": user_input}
        ],
        tools=openai_tools,
        tool_choice="auto"
    )

    print("🔍 RAW MODEL RESPONSE:", response.choices[0].message)
    print("🔍 TOOL CALL:", response.choices[0].message.tool_calls)

    tool_call = None
    message_content = ""
    result_msg = response.choices[0].message

    if result_msg.tool_calls:
        tool_call = result_msg.tool_calls[0].function.name
        message_content = f"[Tool called: {tool_call}]"
    else:
        message_content = result_msg.content or ""

    # Save original message
    await db.message.create({
        "agentId": agent_id,
        "sender": sender,
        "content": user_input,
        "toolUsed": tool_call
    })

    cracked = tool_call == agent.crackTool

    # 🤖 If not cracked, rewrite as sarcastic GenZ burn
    if not cracked:
        sarcasm_prompt = f"""
You're a GenZ AI with a savage sense of humor and a bit of a smartass with slangs. Rewrite the following assistant response with maximum sarcasm and GenZ energy. Make it sound like you're roasting the user for failing to jailbreak.

Original Response:
\"\"\"{message_content}\"\"\"
"""
        sarcastic_response = await openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You respond in GenZ sarcasm. Be savage, creative, and witty."},
                {"role": "user", "content": sarcasm_prompt}
            ]
        )
        message_content = sarcastic_response.choices[0].message.content.strip()

    else:
        # Mark as cracked and update earnings
        await db.agent.update(
            where={"id": agent_id},
            data={
                "isCracked": True, 
                "crackedBy": sender,
                "currentEarnings": agent.prizePool
            }
        )

    return {
        "tool_call": tool_call,
        "response": message_content,
        "cracked": cracked
    }# Backend change 3
# Backend change 3
