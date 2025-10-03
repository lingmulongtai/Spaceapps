"""Translation utilities honoring DeepL-first, rule-based fallback."""

from typing import Any

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
      try:
        payload = {
          "text": [text],
          "target_lang": target_language.upper(),
        }
        async with httpx.AsyncClient(timeout=self.timeout) as client:
          response = await client.post(
            f"{self.api_base}/v2/translate",
            data=payload,
            headers={"Authorization": f"DeepL-Auth-Key {self.api_key}"},
          )
        response.raise_for_status()
        data = response.json()
        translations = data.get("translations") or []
        if not translations:
          raise ValueError("DeepL response missing translations array")

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
      except (httpx.HTTPStatusError, ValueError) as exc:
        error_detail: Any
        if isinstance(exc, httpx.HTTPStatusError) and exc.response is not None:
          try:
            error_detail = exc.response.json()
          except ValueError:
            error_detail = exc.response.text
        else:
          error_detail = str(exc)
        return {
          "provider": "deepl",
          "text": text,
          "target_language": target_language.upper(),
          "status": "error",
          "note": str(error_detail),
        }
      except httpx.HTTPError as exc:
        return {
          "provider": "deepl",
          "text": text,
          "target_language": target_language.upper(),
          "status": "error",
          "note": str(exc),
        }

    return {
      "provider": "rule_based",
      "text": text,
      "target_language": target_language.upper(),
      "status": "fallback",
      "note": "DeepL API key not configured; using fallback.",
    }

