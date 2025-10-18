"""
Chat Schemas
Pydantic models for chat functionality
"""
from pydantic import BaseModel, Field
from typing import Literal


class ChatMessage(BaseModel):
    """Incoming chat message"""
    content: str = Field(..., min_length=1, max_length=2000)
    type: Literal["user", "bot"] = "user"


class ChatResponse(BaseModel):
    """Chat response"""
    message: str
    type: Literal["user", "bot"]
