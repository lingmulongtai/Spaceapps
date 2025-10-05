
"""Tile metadata utilities for NASA GIBS layers (available dates, etc.)."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import ClassVar
import asyncio
import logging
import re

import httpx
from fastapi import HTTPException


LOGGER = logging.getLogger(__name__)


ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


@dataclass
class _CacheEntry:
  dates: list[str]
  expires_at: datetime


class TileMetadataService:
  """Fetches and caches metadata about tile layers from remote services."""

  WMTS_CAPABILITIES_URL: ClassVar[str] = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi"

  def __init__(self, *, timeout: float = 20.0, cache_ttl_seconds: int = 3600):
    self.timeout = timeout
    self.cache_ttl = timedelta(seconds=cache_ttl_seconds)
    self._cache: dict[str, _CacheEntry] = {}
    self._lock = asyncio.Lock()

  async def get_available_dates(self, layer: str, *, limit: int | None = None) -> list[str]:
    """Return a list of ISO8601 dates (descending) available for the given layer."""

    if not layer:
      raise HTTPException(status_code=400, detail="Layer parameter is required")

    now = datetime.now(timezone.utc)

    async with self._lock:
      entry = self._cache.get(layer)
      if entry and entry.expires_at > now:
        dates = entry.dates
      else:
        dates = await self._fetch_layer_dates(layer)
        self._cache[layer] = _CacheEntry(dates=dates, expires_at=now + self.cache_ttl)

    if limit is not None and limit > 0:
      return dates[:limit]
    return dates

  async def _fetch_layer_dates(self, layer: str) -> list[str]:
    """Fetch WMTS GetCapabilities and parse available dates for the layer."""

    params = {
      "SERVICE": "WMTS",
      "REQUEST": "GetCapabilities",
    }

    try:
      async with httpx.AsyncClient(timeout=self.timeout) as client:
        response = await client.get(self.WMTS_CAPABILITIES_URL, params=params)
    except httpx.RequestError as exc:
      raise HTTPException(status_code=502, detail=f"Failed to contact NASA GIBS WMTS: {exc}") from exc

    if response.status_code != 200:
      raise HTTPException(status_code=502, detail=f"WMTS capabilities request failed with status {response.status_code}")

    return self._parse_dates_from_capabilities(response.text, layer)

  def _parse_dates_from_capabilities(self, xml_payload: str, layer: str) -> list[str]:
    import xml.etree.ElementTree as ET

    try:
      root = ET.fromstring(xml_payload)
    except ET.ParseError as exc:
      raise HTTPException(status_code=502, detail="Failed to parse WMTS capabilities XML") from exc

    ns = {
      "wmts": "http://www.opengis.net/wmts/1.0",
      "ows": "http://www.opengis.net/ows/1.1",
    }

    layer_xpath = ".//wmts:Layer"
    for layer_node in root.findall(layer_xpath, ns):
      identifier = layer_node.findtext("ows:Identifier", default="", namespaces=ns)
      if identifier != layer:
        continue

      dimension_nodes = layer_node.findall("wmts:Dimension", ns)
      dimension_values: list[str] = []
      for dimension in dimension_nodes:
        name_attr = dimension.get("name")
        identifier = dimension.findtext("ows:Identifier", default="", namespaces=ns)
        if (name_attr or identifier) and (name_attr or identifier) != "Time":
          continue
        for value_node in dimension.findall("wmts:Value", ns):
          text = (value_node.text or "").strip()
          if text:
            dimension_values.append(text)
        default_attr = dimension.get("default")
        if default_attr:
          dimension_values.append(default_attr.strip())

      if not dimension_values:
        raise HTTPException(status_code=502, detail=f"Layer '{layer}' does not declare temporal dimensions")

      dates = self._expand_dimension_values(dimension_values)
      if not dates:
        raise HTTPException(status_code=502, detail=f"No time steps found for layer '{layer}'")

      return dates

    raise HTTPException(status_code=404, detail=f"Layer '{layer}' not found in WMTS capabilities")

  def _expand_dimension_values(self, values: list[str]) -> list[str]:
    collected: set[str] = set()

    for value in values:
      if "/" in value:
        collected.update(self._expand_range(value))
      elif "," in value:
        parts = [part.strip() for part in value.split(",") if part.strip()]
        collected.update(self._coerce_iso_dates(parts))
      else:
        collected.update(self._coerce_iso_dates([value]))

    # Return dates sorted descending (most recent first)
    return sorted(collected, reverse=True)

  def _expand_range(self, range_spec: str) -> list[str]:
    start_str, end_str, step = [segment.strip() for segment in range_spec.split("/")]

    if not ISO_DATE_RE.match(start_str) or not ISO_DATE_RE.match(end_str):
      LOGGER.warning("Skipping unsupported time range: %s", range_spec)
      return []

    try:
      start_date = datetime.fromisoformat(start_str)
      end_date = datetime.fromisoformat(end_str)
    except ValueError:
      LOGGER.warning("Could not parse time range boundaries: %s", range_spec)
      return []

    if start_date > end_date:
      start_date, end_date = end_date, start_date

    if step.upper() == "P1D":
      delta = timedelta(days=1)
    elif step.upper() == "P1M":
      # Monthly cadence - approximate by stepping month boundaries
      return self._expand_monthly_range(start_date, end_date)
    else:
      LOGGER.warning("Unsupported WMTS time step '%s' in range %s", step, range_spec)
      return []

    current = end_date
    dates: list[str] = []
    while current >= start_date:
      dates.append(current.date().isoformat())
      current -= delta

    return dates

  def _expand_monthly_range(self, start: datetime, end: datetime) -> list[str]:
    dates: list[str] = []
    current = datetime(end.year, end.month, 1)
    start = datetime(start.year, start.month, 1)

    while current >= start:
      dates.append(current.date().isoformat())
      # Move to previous month
      year = current.year
      month = current.month - 1
      if month == 0:
        month = 12
        year -= 1
      current = datetime(year, month, 1)

    return dates

  def _coerce_iso_dates(self, values: list[str]) -> list[str]:
    results: list[str] = []
    for value in values:
      if not value:
        continue
      if ISO_DATE_RE.match(value):
        results.append(value)
        continue
      try:
        parsed = datetime.fromisoformat(value)
      except ValueError:
        LOGGER.debug("Skipping non-ISO date value: %s", value)
        continue
      results.append(parsed.date().isoformat())
    return results


tile_metadata_service = TileMetadataService()


