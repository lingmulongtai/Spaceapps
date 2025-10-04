"""Processing pipeline scaffolding for imagery ingest and analysis."""

from __future__ import annotations

import json
from collections.abc import Iterable
from dataclasses import dataclass, field
from typing import Any


@dataclass(slots=True)
class PipelineMetadata:
  identifier: str
  title: str
  description: str
  tags: tuple[str, ...] = field(default_factory=tuple)
  provider: str | None = None
  homepage: str | None = None

  @classmethod
  def from_mapping(cls, data: dict[str, Any]) -> "PipelineMetadata":
    return cls(
      identifier=data["identifier"],
      title=data.get("title", data["identifier"].replace("-", " ").title()),
      description=data.get("description", ""),
      tags=tuple(data.get("tags", ())),
      provider=data.get("provider"),
      homepage=data.get("homepage"),
    )

  def model_dump(self) -> dict[str, Any]:
    payload = {
      "identifier": self.identifier,
      "title": self.title,
      "description": self.description,
      "tags": list(self.tags),
    }
    if self.provider:
      payload["provider"] = self.provider
    if self.homepage:
      payload["homepage"] = self.homepage
    return payload


def _load_static_pipelines() -> list[PipelineMetadata]:
  raw_data = (
    """
    [
      {
        "identifier": "stac-mosaic-assembler",
        "title": "STAC Mosaic Assembler",
        "description": "Build STAC mosaics from mission catalog scenes to drive custom tilers.",
        "tags": ["stac", "mosaic", "catalog"],
        "provider": "SpaceApps Demo",
        "homepage": "https://spaceapps.nasa.gov/"
      },
      {
        "identifier": "cog-tiler",
        "title": "COG Tile Renderer",
        "description": "Stream Cloud-Optimized GeoTIFFs as XYZ tiles with dynamic reprojection.",
        "tags": ["cog", "tiling", "gis"]
      },
      {
        "identifier": "clip-embedding-generator",
        "title": "CLIP Embedding Generator",
        "description": "Generate multimodal embeddings to power semantic search and AI descriptions.",
        "tags": ["ai", "embeddings", "clip"],
        "homepage": "https://github.com/openai/CLIP"
      },
      {
        "identifier": "change-detection-batch",
        "title": "Change Detection Batch",
        "description": "Batch detect surface changes across temporal imagery pairs for alerts.",
        "tags": ["change-detection", "analytics", "batch"],
        "provider": "SpaceApps Demo"
      }
    ]
    """
  )
  definitions = json.loads(raw_data)
  return [PipelineMetadata.from_mapping(item) for item in definitions]


def list_available_pipelines() -> list[dict[str, Any]]:
  """Return catalog-aware pipeline metadata as dictionaries."""

  return [pipeline.model_dump() for pipeline in _load_static_pipelines()]


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

