from fastapi import FastAPI

from .routers import catalog, tiles, translate


def create_app() -> FastAPI:
  app = FastAPI(
    title="Orbital Imagery Exploration API",
    description=(
      "Placeholder backend for SpaceApps concept. Provides scaffolding for "
      "imagery search, tiling, and DeepL-enabled translation endpoints."
    ),
    version="0.1.0",
  )

  app.include_router(catalog.router)
  app.include_router(tiles.router)
  app.include_router(translate.router)

  @app.get("/health", tags=["system"])
  async def health_check():
    return {"status": "ok", "message": "Backend skeleton ready for data integrations."}

  return app


app = create_app()

