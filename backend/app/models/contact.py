"""
Contact Model
Database model for contact form submissions
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from app.core.database import Base


class Contact(Base):
    """Contact form submission model"""

    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    company = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(20), default='new', nullable=False)

    # AI Lead Scoring fields
    ai_score = Column(Integer, nullable=True)  # 0-100
    ai_priority = Column(String(20), nullable=True)  # low, medium, high, urgent
    ai_insights = Column(JSON, nullable=True)  # JSON with urgency, budget, industry, etc.
    ai_suggested_response = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Contact(id={self.id}, email={self.email})>"
