"""
Contact Form Endpoint
Handles contact form submissions
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
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
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get contact by ID (Protected - requires authentication)
    """
    contact_service = ContactService(db)
    contact = await contact_service.get_contact(contact_id)

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    return contact

@router.get("/", response_model=list[ContactResponse])
async def list_contacts(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all contacts (Protected - requires authentication)"""
    contact_service = ContactService(db)
    contacts = await contact_service.list_contacts(skip=skip, limit=limit)
    return contacts


@router.put("/{contact_id}", response_model=ContactResponse)
async def update_contact(
    contact_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update contact status (Protected - requires authentication)"""
    if status not in ['new', 'contacted', 'closed']:
        raise HTTPException(status_code=400, detail="Invalid status")

    contact_service = ContactService(db)
    contact = await contact_service.update_contact_status(contact_id, status)

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    return contact


@router.delete("/{contact_id}")
async def delete_contact(
    contact_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete contact (Protected - requires authentication)"""
    contact_service = ContactService(db)
    success = await contact_service.delete_contact(contact_id)

    if not success:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {"message": "Contact deleted successfully"}
