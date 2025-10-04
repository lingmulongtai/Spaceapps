"""Translation utilities honoring DeepL-first, rule-based fallback."""

from typing import Any

from fastapi import HTTPException

import httpx


class TranslationService:
  def __init__(
    self,
    api_key: str | None = None,
    api_base: str | None = None,
    timeout: float = 15.0,
  ):
    self.api_key = api_key
    self.api_base = api_base or "https://api-free.deepl.com"
    self.timeout = timeout

  async def translate(self, text: str, target_language: str = "EN") -> dict[str, Any]:
    if self.api_key:
      payload = {
        "text": [text],
        "target_lang": target_language.upper(),
      }
      try:
        async with httpx.AsyncClient(timeout=self.timeout) as client:
          response = await client.post(
            f"{self.api_base}/v2/translate",
            data=payload,
            headers={"Authorization": f"DeepL-Auth-Key {self.api_key}"},
          )
      except httpx.RequestError as exc:  # Network error
        raise HTTPException(status_code=502, detail=f"DeepL request failed: {exc}") from exc

      if response.headers.get("content-type", "").startswith("text/html"):
        raise HTTPException(status_code=502, detail="DeepL returned HTML response (possible auth error)")

      if response.status_code == 403:
        raise HTTPException(status_code=502, detail="DeepL authentication failed; check API key")

      if response.status_code >= 500:
        raise HTTPException(status_code=502, detail="DeepL service unavailable")

      data = response.json()
      translations = data.get("translations") or []
      if not translations:
        raise HTTPException(status_code=502, detail="DeepL response missing translations array")

      translation_entry = translations[0]
      translated_text = translation_entry.get("text", text)
      detected_source_language = translation_entry.get("detected_source_language")

      return {
        "provider": "deepl",
        "text": translated_text,
        "target_language": target_language.upper(),
        "status": "success",
        "detected_source_language": detected_source_language,
      }

    return {
      "provider": "rule_based",
      "text": text,
      "target_language": target_language.upper(),
      "status": "fallback",
      "note": "DeepL API key not configured; using fallback.",
    }

