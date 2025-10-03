import base64
from datetime import datetime
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException

from ..schemas.tiles import TileRequest, TimelineFrame

router = APIRouter(prefix="/tiles", tags=["tiles"])


NASA_GIBS_WMS = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
DEFAULT_LAYER = "MODIS_Terra_CorrectedReflectance_TrueColor"
DEFAULT_TIME = "2024-10-01"


@router.post("/preview")
async def gibs_tile_preview(req: TileRequest):
  """Fetch a simple NASA GIBS WMS preview tile encoded as base64 PNG."""

  bbox = req.bbox or [-90, -180, 90, 180]
  width = req.width or 640
  height = req.height or 320
  layer = req.layer or DEFAULT_LAYER
  time_param = req.time or DEFAULT_TIME

  wms_params: dict[str, Any] = {
    "service": "WMS",
    "version": "1.3.0",
    "request": "GetMap",
    "layers": layer,
    "styles": "",
    "format": "image/png",
    "transparent": "true",
    "width": width,
    "height": height,
    "crs": "EPSG:4326",
    "bbox": ",".join(str(coord) for coord in bbox),
    "time": time_param,
  }

  async with httpx.AsyncClient(timeout=30.0) as client:
    response = await client.get(NASA_GIBS_WMS, params=wms_params)

  if response.status_code != 200:
    raise HTTPException(
      status_code=response.status_code,
      detail={
        "message": "Failed to fetch imagery from NASA GIBS",
        "params": wms_params,
      },
    )

  image_bytes = response.content
  encoded_image = base64.b64encode(image_bytes).decode("ascii")

  return {
    "image": f"data:image/png;base64,{encoded_image}",
    "layer": layer,
    "time": time_param,
    "bbox": bbox,
    "source": "NASA_GIBS",
    "fetched_at": datetime.utcnow().isoformat() + "Z",
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

