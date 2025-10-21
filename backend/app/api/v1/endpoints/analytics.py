"""
Analytics Endpoints
Provides statistics and metrics about contacts
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.contact import Contact
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/summary")
async def get_analytics_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get analytics summary

    Returns overall statistics about contacts including:
    - Total contacts by status
    - Conversion rate
    - Recent activity
    """
    # Total contacts
    total_result = await db.execute(
        select(func.count(Contact.id))
    )
    total_contacts = total_result.scalar()

    # Contacts by status
    new_result = await db.execute(
        select(func.count(Contact.id)).where(Contact.status == 'new')
    )
    new_contacts = new_result.scalar()

    contacted_result = await db.execute(
        select(func.count(Contact.id)).where(Contact.status == 'contacted')
    )
    contacted_contacts = contacted_result.scalar()

    closed_result = await db.execute(
        select(func.count(Contact.id)).where(Contact.status == 'closed')
    )
    closed_contacts = closed_result.scalar()

    # Contacts today
    today = datetime.utcnow().date()
    today_result = await db.execute(
        select(func.count(Contact.id)).where(
            func.date(Contact.created_at) == today
        )
    )
    today_contacts = today_result.scalar()

    # Contacts this week
    week_ago = datetime.utcnow() - timedelta(days=7)
    week_result = await db.execute(
        select(func.count(Contact.id)).where(
            Contact.created_at >= week_ago
        )
    )
    week_contacts = week_result.scalar()

    # Conversion rate (contacted + closed / total)
    conversion_rate = 0
    if total_contacts > 0:
        conversion_rate = ((contacted_contacts + closed_contacts) / total_contacts) * 100

    return {
        "total_contacts": total_contacts,
        "by_status": {
            "new": new_contacts,
            "contacted": contacted_contacts,
            "closed": closed_contacts
        },
        "today": today_contacts,
        "this_week": week_contacts,
        "conversion_rate": round(conversion_rate, 2)
    }


@router.get("/timeline")
async def get_contacts_timeline(
    days: int = 30,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get contacts timeline for the last N days

    Returns count of contacts grouped by day
    """
    # Calculate date range
    start_date = datetime.utcnow() - timedelta(days=days)

    # Query contacts grouped by date
    result = await db.execute(
        select(
            func.date(Contact.created_at).label('date'),
            func.count(Contact.id).label('count')
        )
        .where(Contact.created_at >= start_date)
        .group_by(func.date(Contact.created_at))
        .order_by(func.date(Contact.created_at))
    )

    timeline_data = []
    for row in result:
        timeline_data.append({
            "date": str(row.date),
            "count": row.count
        })

    return {
        "days": days,
        "data": timeline_data
    }


@router.get("/top-companies")
async def get_top_companies(
    limit: int = 10,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get top companies by contact count

    Returns companies that have submitted the most contacts
    """
    result = await db.execute(
        select(
            Contact.company,
            func.count(Contact.id).label('count')
        )
        .where(Contact.company.isnot(None))
        .where(Contact.company != '')
        .group_by(Contact.company)
        .order_by(func.count(Contact.id).desc())
        .limit(limit)
    )

    companies = []
    for row in result:
        companies.append({
            "company": row.company,
            "count": row.count
        })

    return {
        "top_companies": companies
    }
