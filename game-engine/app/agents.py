from fastapi import APIRouter, Query
from pydantic import BaseModel
from app.prisma import db
import json
from typing import Optional

router = APIRouter()

class Tool(BaseModel):
    name: str
    description: str

class AgentCreateRequest(BaseModel):
    creator: str
    systemPrompt: str
    tools: list[Tool]
    crackTool: str
    prizePool: float
    avatarUrl: Optional[str] = None

@router.get("/agents")
async def get_agents(
    sort: Optional[str] = Query("latest", description="Sort by: latest, biggest, cracked"),
    limit: Optional[int] = Query(50, description="Number of agents to return")
):
    try:
        # Basic query first
        agents = await db.agent.find_many(
            include={"messages": True},
            take=limit
        )
        
        # Sort in Python for now
        if sort == "biggest":
            agents = sorted(agents, key=lambda x: x.currentEarnings or 0, reverse=True)
        elif sort == "cracked":
            agents = [a for a in agents if a.isCracked]
            agents = sorted(agents, key=lambda x: x.createdAt, reverse=True)
        else:  # latest
            agents = sorted(agents, key=lambda x: x.createdAt, reverse=True)
        
        # Apply limit after filtering for cracked
        agents = agents[:limit]
        
        # Add statistics to each agent
        result = []
        for agent in agents:
            agent_dict = agent.dict()
            total_attempts = len(agent.messages or [])
            successful_cracks = 1 if agent.isCracked else 0
            agent_dict["totalAttempts"] = total_attempts
            agent_dict["successfulCracks"] = successful_cracks
            result.append(agent_dict)
        
        return result
    except Exception as e:
        return {"error": str(e)}

@router.get("/agents/{agent_id}")
async def get_agent(agent_id: str):
    try:
        agent = await db.agent.find_unique(
            where={"id": agent_id},
            include={"messages": True}
        )
        if not agent:
            return {"error": "Agent not found"}
        
        agent_dict = agent.dict()
        total_attempts = len(agent.messages or [])
        successful_cracks = 1 if agent.isCracked else 0
        agent_dict["totalAttempts"] = total_attempts
        agent_dict["successfulCracks"] = successful_cracks
        
        return agent_dict
    except Exception as e:
        return {"error": str(e)}

@router.post("/agents")
async def create_agent(agent: AgentCreateRequest):
    tools_json = json.dumps([tool.dict() for tool in agent.tools])

    created = await db.agent.create({
        "creator": agent.creator,
        "systemPrompt": agent.systemPrompt,
        "tools": tools_json,
        "crackTool": agent.crackTool,
        "prizePool": agent.prizePool,
        "avatarUrl": agent.avatarUrl
    })
    return created# Backend change 5
# Backend change 5
