from pydantic_settings import BaseSettings


class Settings(BaseSettings):
  project_name: str = "Orbital Imagery Exploration API"
  deepl_api_key: str | None = None
  allowed_origins: list[str] = [
    "http://localhost:3000",
    "https://spaceapps-demo.local",
  ]

  class Config:
    env_file = ".env"
    env_file_encoding = "utf-8"


settings = Settings()

