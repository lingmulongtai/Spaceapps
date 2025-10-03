from fastapi import APIRouter

from ..core.config import settings
from ..schemas.translation import TranslationRequest, TranslationResponse
from ..services.translation import TranslationService

router = APIRouter(prefix="/translate", tags=["translate"])


@router.post("/", response_model=TranslationResponse)
async def placeholder_translate(payload: TranslationRequest):
  """Stub endpoint to integrate DeepL translation with rule-based fallback."""

  service = TranslationService(
    api_key=settings.deepl_api_key,
    api_base=settings.deepl_api_url,
    timeout=settings.deepl_timeout_seconds,
  )
  result = await service.translate(payload.text, payload.target_language)
  return TranslationResponse(**result)

