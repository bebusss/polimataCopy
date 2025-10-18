"""
Contact Schemas
Pydantic models for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


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
    created_at: datetime

    class Config:
        from_attributes = True
