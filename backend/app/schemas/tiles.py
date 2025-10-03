from pydantic import BaseModel


class TileRequest(BaseModel):
  x: int
  y: int
  z: int
  item_id: str | None = None


class TimelineFrame(BaseModel):
  timestamp: str
  asset_url: str

