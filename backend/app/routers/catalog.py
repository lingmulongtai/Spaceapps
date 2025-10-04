from fastapi import APIRouter

from ..schemas.search import SearchQuery, SearchResult
from ..services import catalog as catalog_service
from ..services import pipelines

router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.post("/search", response_model=list[SearchResult])
async def federated_catalog_search(query: SearchQuery):
  """Aggregate imagery and dataset entries from external NASA data portals."""

  results = await catalog_service.search_catalogs(query)
  return results


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

