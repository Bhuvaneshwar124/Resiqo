from google import genai
from pydantic import BaseModel
import json
from typing import Type, TypeVar, Any
from app.core.config import get_settings

settings = get_settings()

client = genai.Client(api_key=settings.GEMINI_API_KEY)

T = TypeVar('T', bound=BaseModel)

class AIClient:
    @staticmethod
    def generate_structured_data(prompt: str, response_schema: Type[T], model: str = "gemini-2.5-flash") -> T:
        """
        Sends a prompt to Gemini and enforces a Pydantic schema for the output.
        """
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=genai.types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=response_schema,
                ),
            )
            
            # The response text should be a valid JSON string matching the schema
            data = json.loads(response.text)
            return response_schema.model_validate(data)
        except Exception as e:
            raise RuntimeError(f"AI Generation failed: {str(e)}")

ai_client = AIClient()
