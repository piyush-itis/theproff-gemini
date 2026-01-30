# app/models.py
from pydantic import BaseModel
from typing import List, Optional

class Tool(BaseModel):
    name: str
    description: str

class AgentInput(BaseModel):
    creator: str
    systemPrompt: str
    tools: List[Tool]
    crackTool: str
    prizePool: float

class ChatInput(BaseModel):
    sender: str
    content: str
# Backend change 2
# Backend change 2
