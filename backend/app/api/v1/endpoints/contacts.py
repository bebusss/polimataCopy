"""
Contact Form Endpoint
Handles contact form submissions
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import ContactService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=ContactResponse, status_code=201)
async def create_contact(
    contact: ContactCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new contact submission
    """
    try:
        contact_service = ContactService(db)
        result = await contact_service.create_contact(contact)
        return result
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get contact by ID
    """
    contact_service = ContactService(db)
    contact = await contact_service.get_contact(contact_id)

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    return contact
