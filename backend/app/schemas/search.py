from pydantic import BaseModel


class GeoBounds(BaseModel):
  min_lat: float
  min_lon: float
  max_lat: float
  max_lon: float


class SearchQuery(BaseModel):
  mode: str = "coordinates"
  query: str | None = None
  bounds: GeoBounds | None = None
  start_time: str | None = None
  end_time: str | None = None


class SearchResult(BaseModel):
  id: str
  title: str
  preview_url: str | None = None
  description: str | None = None

