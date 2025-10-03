from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


ROOT_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
  model_config = SettingsConfigDict(
    env_file=ROOT_DIR / ".env",
    env_file_encoding="utf-8",
  )

  project_name: str = "Orbital Imagery Exploration API"
  deepl_api_key: str | None = None
  deepl_api_url: str = "https://api-free.deepl.com"
  deepl_timeout_seconds: float = 15.0
  allowed_origins: list[str] = [
    "http://localhost:3000",
    "https://spaceapps-demo.local",
  ]


settings = Settings()

