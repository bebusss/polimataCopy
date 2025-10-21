"""
User Schemas
Pydantic models for user input/output validation
"""
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# Shared properties
class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    full_name: Optional[str] = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    """Schema for user registration"""
    password: str = Field(..., min_length=8, max_length=100)


# Properties to receive via API on update
class UserUpdate(UserBase):
    """Schema for updating user"""
    password: Optional[str] = Field(None, min_length=8, max_length=100)


# Properties to return via API
class UserResponse(UserBase):
    """Schema for user response (no password)"""
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Token schemas
class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Data encoded in JWT token"""
    user_id: Optional[int] = None
