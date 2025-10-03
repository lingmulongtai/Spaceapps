"""Translation utilities honoring DeepL-first, rule-based fallback."""

from typing import Any


class TranslationService:
  def __init__(self, api_key: str | None = None):
    self.api_key = api_key

  async def translate(self, text: str, target_language: str = "en") -> dict[str, Any]:
    if self.api_key:
      return {
        "provider": "deepl",
        "text": text,
        "target_language": target_language,
        "status": "pending-implementation",
      }

    return {
      "provider": "rule_based",
      "text": text,
      "target_language": target_language,
      "status": "fallback",
      "note": "Implement heuristic translation rules here.",
    }

