"""
Contact Schemas
Pydantic models for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, Dict, Any


class ContactBase(BaseModel):
    """Base contact schema"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactCreate(ContactBase):
    """Schema for creating contact"""
    pass


class ContactResponse(ContactBase):
    """Schema for contact response"""
    id: int
    status: str = 'new'
    ai_score: Optional[int] = None
    ai_priority: Optional[str] = None
    ai_insights: Optional[Dict[str, Any]] = None
    ai_suggested_response: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
