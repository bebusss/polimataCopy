"""
Contact Service
Business logic for contact operations
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from typing import Optional


class ContactService:
    """Service layer for contact operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_contact(self, contact_data: ContactCreate) -> Contact:
        """
        Create new contact entry

        Args:
            contact_data: Validated contact data

        Returns:
            Created contact object
        """
        contact = Contact(**contact_data.model_dump())
        self.db.add(contact)
        await self.db.commit()
        await self.db.refresh(contact)
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
