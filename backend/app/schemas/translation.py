from pydantic import BaseModel


class TranslationRequest(BaseModel):
  text: str
  target_language: str = "en"


class TranslationResponse(BaseModel):
  provider: str
  text: str
  target_language: str
  status: str
  note: str | None = None
  detected_source_language: str | None = None

