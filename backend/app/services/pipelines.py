"""Processing pipeline scaffolding for imagery ingest and analysis."""

from collections.abc import Iterable


def list_available_pipelines() -> list[str]:
  """Return placeholder pipeline identifiers."""

  return [
    "stac-mosaic-assembler",
    "cog-tiler",
    "clip-embedding-generator",
    "change-detection-batch",
  ]


def register_pipeline(_definition: dict) -> dict:
  """Stub for registering custom analytics workflows."""

  return {
    "status": "queued",
    "message": "Pipeline registration placeholder",
  }


def execute_pipeline(_pipeline_id: str, _items: Iterable[str]) -> dict:
  """Stub for triggering pipeline runs."""

  return {
    "status": "scheduled",
    "message": "Execution stub; connect to Dask/Spark/Airflow later.",
  }

