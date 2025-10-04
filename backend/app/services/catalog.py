"""Federated catalog aggregation across NASA and partner sources."""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Iterable, Iterator
from typing import Any
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

from ..schemas.search import SearchQuery, SearchResult

LOGGER = logging.getLogger(__name__)

USER_AGENT = "SpaceApps-Orbital-Toolkit/0.1 (+https://spaceapps.nasa.gov/)"
DEFAULT_TIMEOUT = 30.0
EARTHDATA_COLLECTION_ENDPOINT = "https://cmr.earthdata.nasa.gov/search/collections.json"
PDS_MRO_URL = "https://pds-imaging.jpl.nasa.gov/volumes/mro.html"
TESS_DATA_PRODUCTS_URL = "https://heasarc.gsfc.nasa.gov/docs/tess/data-products.html"
IMLDI_DATA_URL = (
  "https://data.im-ldi.com/mds"
  "?MDS_SEARCH=%7B%22datasets%22%3A%5B%22luna_lroc_fi%22%2C%22luna_lroc_pds_nac_edrcdr%22%2C"
  "%22luna_lroc_pds_wac_edrcdr%22%2C%22luna_lroc_pds_rdr%22%5D%2C%22query%22%3A%7B%7D%2C%22map%22%3A%7B%7D%7D"
)
TREK_BODIES = ("moon", "mars", "ceres")
LRO_DATA_PRODUCTS_URL = "https://science.nasa.gov/mission/lro/data-products/"
CWFIS_HOME_URL = "https://cwfis.cfs.nrcan.gc.ca/home"
GEOCA_HOME_URL = "https://geo.ca/home/"
CSA_DATASET_API = "https://donnees-data.asc-csa.gc.ca/api/3/action/package_show"
CSA_DATASET_IDS = [
  "ef42819f-35bb-49c0-a368-1e61fa876ee6",
  "02969436-8c0b-4e6e-ad40-781cdb43cf24",
  "6c3f7e9c-7b43-4a6b-a924-a1bef1a9cf74",
]
CSA_DATASET_PORTAL = "https://donnees-data.asc-csa.gc.ca/dataset"
INDE_VIEWER_URL = "https://visualizador.inde.gov.br/"
INPE_CATALOG_URL = "https://www.dgi.inpe.br/catalogo/explore"


async def search_catalogs(query: SearchQuery) -> list[SearchResult]:
  """Aggregate mission datasets from external data providers."""

  async with httpx.AsyncClient(
    timeout=DEFAULT_TIMEOUT,
    headers={"User-Agent": USER_AGENT},
  ) as client:
    tasks = (
      fetch_pds_mro(client, query),
      fetch_tess_data_products(client, query),
      fetch_imldi_lroc(client, query),
      fetch_trek_layers(client, query),
      fetch_earthdata_collections(client, query),
      fetch_lro_data_products(client, query),
      fetch_cwfis_resources(client, query),
      fetch_geoca_highlights(client, query),
      fetch_csa_datasets(client, query),
      fetch_inde_resources(client, query),
      fetch_inpe_catalog(client, query),
    )

    results = await asyncio.gather(*tasks, return_exceptions=True)

  aggregated: dict[str, SearchResult] = {}
  for block in results:
    if isinstance(block, Exception):
      LOGGER.warning("Catalog source failed", exc_info=block)
      continue
    for item in block:
      aggregated[item.id] = item

  items = list(aggregated.values())
  text_query = (query.query or "").strip()
  if text_query:
    lowered = text_query.lower()
    items = [
      item
      for item in items
      if lowered in item.title.lower()
      or (item.description and lowered in item.description.lower())
      or (item.metadata and any(_value_matches(lowered, value) for value in item.metadata.values()))
    ]

  items.sort(key=lambda entry: (entry.source or "", entry.title))
  return items[:100]


def _value_matches(text: str, value: Any) -> bool:
  if isinstance(value, str):
    return text in value.lower()
  if isinstance(value, Iterable):
    return any(_value_matches(text, child) for child in value)
  return False


async def fetch_pds_mro(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(PDS_MRO_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  for anchor in soup.select("a[href]"):
    href = anchor.get("href")
    if not href:
      continue
    if not href.startswith("/volumes/mro/") and "release" not in href:
      continue
    title = anchor.get_text(strip=True) or "MRO Volume"
    url = urljoin(PDS_MRO_URL, href)
    description = anchor.parent.get_text(" ", strip=True) if anchor.parent else None
    result_id = f"pds-mro::{href}"
    results.append(
      SearchResult(
        id=result_id,
        title=title,
        description=description,
        preview_url=None,
        source="NASA PDS Imaging Node",
        link=url,
        metadata={"release_section": description},
      )
    )

  return results


async def fetch_tess_data_products(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(TESS_DATA_PRODUCTS_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  for section in soup.select("div#content article, div.article, div#main") or [soup]:
    for anchor in section.select("a[href]"):
      text = anchor.get_text(strip=True)
      href = anchor.get("href")
      if not text or not href:
        continue
      if text.lower().startswith("download") or text.lower().startswith("contact"):
        continue
      url = urljoin(TESS_DATA_PRODUCTS_URL, href)
      description = anchor.find_parent("li")
      description_text = description.get_text(" ", strip=True) if description else text
      result_id = f"tess-data::{href}"
      results.append(
        SearchResult(
          id=result_id,
          title=text,
          description=description_text,
          preview_url=None,
          source="NASA HEASARC TESS",
          link=url,
          metadata={"section": section.find("h2").get_text(strip=True) if section.find("h2") else "TESS"},
        )
      )
  return results


async def fetch_imldi_lroc(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(IMLDI_DATA_URL)
  response.raise_for_status()
  data = response.json()

  results: list[SearchResult] = []
  for index, record in enumerate(_iterate_candidate_dicts(data)):
    title = record.get("title") or record.get("name")
    if not title:
      continue
    dataset_id = record.get("id") or record.get("identifier") or record.get("dataset_id")
    if not dataset_id:
      dataset_id = f"imldi-{index}"
    description = record.get("description") or record.get("summary")
    link = record.get("link") or record.get("href")
    if not link:
      link = record.get("url")
    results.append(
      SearchResult(
        id=f"imldi::{dataset_id}",
        title=title,
        description=description,
        preview_url=None,
        source="IM-LDI Lunar Data",
        link=link,
        metadata={
          key: value
          for key, value in record.items()
          if key not in {"title", "name", "description", "summary", "id", "identifier", "dataset_id", "link", "href", "url"}
        },
      )
    )

  return results


async def fetch_trek_layers(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  results: list[SearchResult] = []
  for body in TREK_BODIES:
    url = f"https://trek.nasa.gov/{body}/TrekWS/rest/layers"
    try:
      response = await client.get(url)
      response.raise_for_status()
    except httpx.HTTPError as exc:  # pragma: no cover - network failures handled gracefully
      LOGGER.debug("Skipping Trek body %s due to %s", body, exc)
      continue

    data = response.json()
    layers = data.get("Layers") or data.get("layers") or []
    for layer in layers:
      if not isinstance(layer, dict):
        continue
      title = layer.get("Name") or layer.get("Title") or layer.get("name")
      if not title:
        continue
      identifier = layer.get("Id") or layer.get("LayerId") or layer.get("id") or title.lower().replace(" ", "-")
      description = layer.get("Description") or layer.get("description")
      link = layer.get("Url") or layer.get("ServiceUrl") or layer.get("url")
      results.append(
        SearchResult(
          id=f"trek::{body}::{identifier}",
          title=f"{body.title()} Trek: {title}",
          description=description,
          preview_url=None,
          source="NASA Trek",
          link=link or url,
          metadata={
            "body": body,
            "format": layer.get("Format") or layer.get("format"),
            "service_type": layer.get("Type") or layer.get("type"),
          },
        )
      )

  return results


async def fetch_earthdata_collections(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  params: dict[str, Any] = {"page_size": 25}
  if query.query:
    params["keyword"] = query.query
  if query.bounds:
    params["bounding_box"] = ",".join(
      str(value)
      for value in (
        query.bounds.min_lon,
        query.bounds.min_lat,
        query.bounds.max_lon,
        query.bounds.max_lat,
      )
    )
  if query.start_time and query.end_time:
    params["temporal"] = f"{query.start_time},{query.end_time}"

  response = await client.get(EARTHDATA_COLLECTION_ENDPOINT, params=params)
  response.raise_for_status()
  data = response.json()

  feed = data.get("feed", {}) if isinstance(data, dict) else {}
  entries = feed.get("entry", []) if isinstance(feed, dict) else []

  results: list[SearchResult] = []
  for entry in entries:
    if not isinstance(entry, dict):
      continue
    concept_id = entry.get("id") or entry.get("collection_concept_id")
    title = entry.get("title")
    if not concept_id or not title:
      continue
    summary = entry.get("summary") or entry.get("description")
    links = entry.get("links") or []
    landing = next((link.get("href") for link in links if isinstance(link, dict) and link.get("rel") == "https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html#link_types__landing"), None)  # noqa: B950,E501
    if landing is None:
      landing = next((link.get("href") for link in links if isinstance(link, dict) and link.get("href")), None)
    results.append(
      SearchResult(
        id=f"earthdata::{concept_id}",
        title=title,
        description=summary,
        preview_url=None,
        source="NASA Earthdata CMR",
        link=landing,
        metadata={
          "short_name": entry.get("short_name"),
          "version_id": entry.get("version_id"),
          "organizations": entry.get("organizations"),
        },
      )
    )

  return results


async def fetch_lro_data_products(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(LRO_DATA_PRODUCTS_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  for section in soup.select("article, section") or [soup]:
    heading = section.find(["h2", "h3"])
    section_title = heading.get_text(strip=True) if heading else "LRO Data"
    for anchor in section.select("a[href]"):
      text = anchor.get_text(strip=True)
      href = anchor.get("href")
      if not text or not href:
        continue
      if text.lower().startswith("download") or text.lower().startswith("pdf"):
        continue
      url = urljoin(LRO_DATA_PRODUCTS_URL, href)
      description_el = anchor.find_parent("p") or anchor.find_parent("li")
      description = description_el.get_text(" ", strip=True) if description_el else text
      result_id = f"lro-data::{href}"
      results.append(
        SearchResult(
          id=result_id,
          title=text,
          description=description,
          preview_url=None,
          source="NASA LRO Mission",
          link=url,
          metadata={"section": section_title},
        )
      )

  return results


async def fetch_cwfis_resources(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(CWFIS_HOME_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  sections = soup.select("#cwfis, #block-menu-block-3, .section") or [soup]
  results: list[SearchResult] = []

  for section in sections:
    for anchor in section.select("a[href]"):
      href = anchor.get("href")
      title = anchor.get_text(strip=True)
      if not href or not title:
        continue
      if href.startswith("#"):
        continue
      url = urljoin(CWFIS_HOME_URL, href)
      description_node = anchor.find_parent("p") or anchor.find_parent("li")
      description = description_node.get_text(" ", strip=True) if description_node else None
      results.append(
        SearchResult(
          id=f"cwfis::{href}",
          title=title,
          description=description,
          source="Canadian Wildland Fire Information System",
          link=url,
          metadata={"category": "CWFIS"},
        )
      )

  return results


async def fetch_geoca_highlights(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(GEOCA_HOME_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  spotlight_section = soup.select_one("#spotlight, .spotlight") or soup
  for block in spotlight_section.select("a[href]"):
    href = block.get("href")
    title = block.get_text(strip=True)
    if not href or not title:
      continue
    url = urljoin(GEOCA_HOME_URL, href)
    description_node = block.find_parent("p") or block.find_parent("div")
    description = description_node.get_text(" ", strip=True) if description_node else None
    results.append(
      SearchResult(
        id=f"geoca::{href}",
        title=title,
        description=description,
        source="GEO.ca",
        link=url,
        metadata={"category": "Geospatial Canada"},
      )
    )

  return results


async def fetch_csa_datasets(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  results: list[SearchResult] = []
  for dataset_id in CSA_DATASET_IDS:
    params = {"id": dataset_id}
    response = await client.get(CSA_DATASET_API, params=params)
    if response.status_code != 200:
      LOGGER.debug("CSA dataset %s failed with %s", dataset_id, response.status_code)
      continue
    data = response.json().get("result", {})
    title = data.get("title")
    if not title:
      continue
    description = data.get("notes")
    tags = [tag.get("display_name") for tag in data.get("tags", []) if isinstance(tag, dict)]
    link = f"{CSA_DATASET_PORTAL}/{dataset_id}"
    results.append(
      SearchResult(
        id=f"csa::{dataset_id}",
        title=title,
        description=description,
        source="Canadian Space Agency",
        link=link,
        metadata={
          "tags": tags,
          "organization": data.get("organization", {}).get("title"),
        },
      )
    )

  return results


async def fetch_inde_resources(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(INDE_VIEWER_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  for anchor in soup.select("a[href]"):
    href = anchor.get("href")
    title = anchor.get_text(strip=True)
    if not href or not title:
      continue
    if href.startswith("#") or href.startswith("javascript"):
      continue
    url = urljoin(INDE_VIEWER_URL, href)
    description_node = anchor.find_parent("p")
    description = description_node.get_text(" ", strip=True) if description_node else None
    results.append(
      SearchResult(
        id=f"inde::{href}",
        title=title,
        description=description,
        source="INDE Visualizador",
        link=url,
        metadata={"category": "Brazilian Spatial Data Infrastructure"},
      )
    )

  return results


async def fetch_inpe_catalog(client: httpx.AsyncClient, query: SearchQuery) -> list[SearchResult]:
  response = await client.get(INPE_CATALOG_URL)
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "html.parser")

  results: list[SearchResult] = []
  for link in soup.select("a[href]"):
    href = link.get("href")
    title = link.get_text(strip=True)
    if not href or not title:
      continue
    if href.startswith("#") or href.lower().startswith("javascript"):
      continue
    url = urljoin(INPE_CATALOG_URL, href)
    description_node = link.find_parent("p")
    description = description_node.get_text(" ", strip=True) if description_node else None
    results.append(
      SearchResult(
        id=f"inpe::{href}",
        title=title,
        description=description,
        source="INPE DGI Catalog",
        link=url,
        metadata={"category": "INPE"},
      )
    )

  return results


def _iterate_candidate_dicts(payload: Any) -> Iterator[dict[str, Any]]:
  stack = [payload]
  while stack:
    current = stack.pop()
    if isinstance(current, dict):
      if any(key in current for key in ("title", "name")):
        yield current
      stack.extend(current.values())
    elif isinstance(current, list):
      stack.extend(current)


