"""
Chat/AI Endpoint
Handles AI chat interactions
"""
from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatMessage, ChatResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/message", response_model=ChatResponse)
async def send_message(message: ChatMessage):
    """
    Send message to AI chatbot
    """
    try:
        # Placeholder for AI integration
        # In production, integrate with OpenAI/Anthropic
        response_text = f"Gracias por tu mensaje: '{message.content}'. Un agente te contactará pronto."

        return ChatResponse(
            message=response_text,
            type="bot"
        )
    except Exception as e:
        logger.error(f"Error processing chat message: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing message")
