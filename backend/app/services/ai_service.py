"""
AI Service
Claude AI integration for lead scoring and analysis
"""
from typing import Optional
import anthropic
import json
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class AIService:
    """Service for AI-powered features using Claude API"""

    def __init__(self):
        if not settings.ANTHROPIC_API_KEY:
            logger.warning("ANTHROPIC_API_KEY not set. AI features will be disabled.")
            self.client = None
        else:
            self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    async def score_lead(self, name: str, email: str, company: Optional[str], message: str) -> dict:
        """
        Analyze a contact submission and provide lead scoring

        Args:
            name: Contact name
            email: Contact email
            company: Company name (optional)
            message: Contact message

        Returns:
            Dict with score, priority, insights, and suggested_response
        """
        if not self.client:
            # Return default scoring if API key not configured
            return {
                "score": 50,
                "priority": "medium",
                "insights": {
                    "urgency": "unknown",
                    "budget": "unknown",
                    "industry": "unknown"
                },
                "suggested_response": "Thank you for your interest. We'll get back to you soon!",
                "ai_enabled": False
            }

        try:
            # Create prompt for Claude
            prompt = f"""You are an expert sales assistant analyzing incoming business leads.
Analyze this contact submission and provide a detailed lead score.

Contact Information:
- Name: {name}
- Email: {email}
- Company: {company if company else 'Not provided'}
- Message: {message}

Please provide:
1. Lead score (0-100, where 100 is highest priority)
2. Priority level (low, medium, high, urgent)
3. Insights including:
   - Urgency level (low, medium, high)
   - Estimated budget level (low, medium, high, enterprise)
   - Industry/sector
   - Key pain points mentioned
4. Suggested personalized response (2-3 sentences)

Return ONLY a JSON object with this exact structure:
{{
  "score": number,
  "priority": "low" | "medium" | "high" | "urgent",
  "insights": {{
    "urgency": "low" | "medium" | "high",
    "budget": "low" | "medium" | "high" | "enterprise",
    "industry": "string",
    "pain_points": ["string"]
  }},
  "suggested_response": "string"
}}"""

            # Call Claude API
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            # Parse response
            response_text = message.content[0].text

            # Extract JSON from response (Claude might wrap it in markdown)
            if "```json" in response_text:
                json_str = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                json_str = response_text.split("```")[1].split("```")[0].strip()
            else:
                json_str = response_text.strip()

            result = json.loads(json_str)
            result["ai_enabled"] = True

            logger.info(f"Lead scored: {name} - Score: {result['score']}, Priority: {result['priority']}")

            return result

        except Exception as e:
            logger.error(f"Error scoring lead with AI: {str(e)}")
            # Return default scoring on error
            return {
                "score": 50,
                "priority": "medium",
                "insights": {
                    "urgency": "medium",
                    "budget": "unknown",
                    "industry": "unknown",
                    "pain_points": []
                },
                "suggested_response": "Thank you for reaching out! We appreciate your interest and will review your message carefully.",
                "ai_enabled": False,
                "error": str(e)
            }
