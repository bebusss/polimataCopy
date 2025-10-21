"""
Contact Service
Business logic for contact operations
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.services.ai_service import AIService
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class ContactService:
    """Service layer for contact operations"""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_service = AIService()

    async def create_contact(self, contact_data: ContactCreate) -> Contact:
        """
        Create new contact entry with AI lead scoring

        Args:
            contact_data: Validated contact data

        Returns:
            Created contact object with AI scoring
        """
        # Create contact instance
        contact = Contact(**contact_data.model_dump())

        # Add to database first
        self.db.add(contact)
        await self.db.commit()
        await self.db.refresh(contact)

        # Score the lead with AI (async, non-blocking)
        try:
            ai_score = await self.ai_service.score_lead(
                name=contact.name,
                email=contact.email,
                company=contact.company,
                message=contact.message
            )

            # Update contact with AI insights
            contact.ai_score = ai_score.get('score')
            contact.ai_priority = ai_score.get('priority')
            contact.ai_insights = ai_score.get('insights')
            contact.ai_suggested_response = ai_score.get('suggested_response')

            await self.db.commit()
            await self.db.refresh(contact)

            logger.info(f"Contact {contact.id} scored: {ai_score.get('score')} ({ai_score.get('priority')})")

        except Exception as e:
            logger.error(f"Error scoring lead {contact.id}: {str(e)}")
            # Continue without AI scoring if it fails

        return contact

    async def get_contact(self, contact_id: int) -> Optional[Contact]:
        """
        Get contact by ID

        Args:
            contact_id: Contact ID

        Returns:
            Contact object or None
        """
        result = await self.db.execute(
            select(Contact).where(Contact.id == contact_id)
        )
        return result.scalar_one_or_none()

    async def get_contacts_by_email(self, email: str) -> list[Contact]:
        """
        Get all contacts by email

        Args:
            email: Email address

        Returns:
            List of contacts
        """
        result = await self.db.execute(
            select(Contact).where(Contact.email == email)
        )
        return result.scalars().all()

    async def list_contacts(self, skip: int = 0, limit: int = 100) -> list[Contact]:
        """List all contacts with pagination"""
        result = await self.db.execute(
            select(Contact).order_by(Contact.created_at.desc()).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def update_contact_status(self, contact_id: int, status: str) -> Optional[Contact]:
        """Update contact status"""
        contact = await self.get_contact(contact_id)
        if contact:
            contact.status = status
            await self.db.commit()
            await self.db.refresh(contact)
        return contact

    async def delete_contact(self, contact_id: int) -> bool:
        """Delete contact"""
        contact = await self.get_contact(contact_id)
        if contact:
            await self.db.delete(contact)
            await self.db.commit()
            return True
        return False
