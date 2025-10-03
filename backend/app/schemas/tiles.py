from typing import Optional

from pydantic import BaseModel, Field


class TileRequest(BaseModel):
  bbox: Optional[list[float]] = Field(
    default=None,
    description="Bounding box [min_lat, min_lon, max_lat, max_lon] in degrees.",
  )
  width: Optional[int] = Field(default=640, ge=16, le=2048)
  height: Optional[int] = Field(default=320, ge=16, le=2048)
  layer: Optional[str] = Field(default=None, description="NASA GIBS layer identifier")
  time: Optional[str] = Field(default=None, description="ISO8601 date/time string for imagery")
  item_id: Optional[str] = Field(default=None, description="Placeholder for future integrations")


class TimelineFrame(BaseModel):
  timestamp: str
  asset_url: str

