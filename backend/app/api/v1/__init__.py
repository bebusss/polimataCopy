"""
API V1 Router
Aggregates all API endpoints
"""
from fastapi import APIRouter
from app.api.v1.endpoints import contacts, chat, auth, analytics

api_router = APIRouter()

# Include sub-routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
