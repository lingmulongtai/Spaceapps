from fastapi import APIRouter

from ..schemas.tiles import TileRequest, TimelineFrame

router = APIRouter(prefix="/tiles", tags=["tiles"])


@router.post("/preview")
async def placeholder_tile_preview(req: TileRequest):
  """Return placeholder tile metadata; real implementation will stream imagery."""

  return {
    "tile": req.model_dump(),
    "status": "placeholder",
    "next_steps": "Wire into titiler/COG pipeline or custom renderer.",
  }


@router.get("/timeline", response_model=list[TimelineFrame])
async def placeholder_tile_timeline(item_id: str):
  """Stub for timeline tile availability (video/time series)."""

  return [
    TimelineFrame(
      timestamp="2024-01-01T00:00:00Z",
      asset_url=f"https://example.com/tiles/{item_id}/0.png",
    ),
    TimelineFrame(
      timestamp="2024-01-01T00:05:00Z",
      asset_url=f"https://example.com/tiles/{item_id}/1.png",
    ),
  ]

