from fastapi import APIRouter

from ..schemas.search import SearchQuery, SearchResult
from ..services import pipelines

router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.post("/search", response_model=list[SearchResult])
async def placeholder_catalog_search(query: SearchQuery):
  """Stub endpoint for catalog search by coordinates, names, or AI embedding."""

  fake_results = [
    SearchResult(
      id="placeholder-1",
      title="Sample Aurora Capture",
      preview_url="https://example.com/tiles/aurora.jpg",
      description="Connect to STAC to replace this mock item.",
    ),
    SearchResult(
      id="placeholder-2",
      title="Volcanic Plume Mosaic",
      preview_url="https://example.com/tiles/volcano.jpg",
      description="Hook pipeline outputs here.",
    ),
  ]

  return fake_results


@router.get("/pipelines")
async def list_pipelines():
  return {
    "pipelines": pipelines.list_available_pipelines(),
    "notes": "Register custom analytics pipelines via /catalog/ingest soon.",
  }


@router.post("/ingest")
async def placeholder_catalog_ingest(payload: dict):
  """Stub endpoint for registering external datasets and manifests."""

  return {
    "message": "Catalog ingest placeholder",
    "received_keys": list(payload.keys()),
    "expected_payload": [
      "stac_collections",
      "cog_manifests",
      "vector_index_metadata",
    ],
  }

