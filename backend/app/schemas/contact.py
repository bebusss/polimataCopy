"""
Contact Schemas
Pydantic models for contact validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
from datetime import datetime


class ContactBase(BaseModel):
    """Base contact schema"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=1)


class ContactCreate(ContactBase):
    """Schema for creating a contact"""
    pass


class ContactUpdate(BaseModel):
    """Schema for updating a contact"""
    status: str = Field(..., pattern="^(new|contacted|qualified|closed)$")


class ContactResponse(ContactBase):
    """Schema for contact response"""
    id: int
    status: str
    ai_score: Optional[int] = None
    ai_priority: Optional[str] = None
    ai_insights: Optional[Dict[str, Any]] = None
    ai_suggested_response: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
