# Orbital Imagery Exploration Toolkit

SpaceApps concept project showcasing an end-to-end scaffold for exploring massive imagery sets with AI-powered search, temporal playback, and multilingual capabilities.

## Repository Structure

- `frontend/`: Next.js + Tailwind app with placeholder UI modules (`SearchPanel`, `MapViewport`, `TimelinePlayer`, `ResourcePanel`).
- `backend/`: FastAPI service exposing catalog, tiles, translation, and health endpoints.
- `venv/`: Python virtual environment for backend development.

## Getting Started

### Requirements

- Node.js 18+
- Python 3.11+

### Install & Run

```bash
python -m venv venv
./venv/Scripts/activate  # Windows PowerShell
pip install -r backend/requirements.txt

cd frontend
npm install

# Run backend
../venv/Scripts/uvicorn app.main:app --reload --app-dir ../backend

# In a new terminal for frontend
npm run dev
```

Frontend served at `http://localhost:3000`, backend at `http://localhost:8000`.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL for frontend API proxy calls | `http://localhost:8000` |
| `DEEPL_API_KEY` | Backend translation provider key (optional) | unset |

Create `backend/.env` for backend-specific settings and `frontend/.env.local` for frontend overrides.

## Development Notes

- Frontend queries use React Query and Zustand for state management anchors.
- Next.js API routes proxy to backend to keep CORS/simple config.
- Backend services and schemas document where STAC/COG/vector DB integrations will connect.
- Translation service prioritizes DeepL per user preference, with rule-based fallback stubbed.

## Next Steps

1. Replace mock responses with actual data sources (STAC catalogs, titiler, vector DB).
2. Implement authentication/authorization if required for protected datasets.
3. Add backend tests under `backend/tests` and CI workflows.
4. Integrate `/api/translate` with real DeepL or alternative providers.

Contributions and extensions welcome—reach out before modifying scaffolding conventions.

## External Catalog Integrations

- NASA PDS Imaging Node Mars Reconnaissance Orbiter volumes: linkage seeded from https://pds-imaging.jpl.nasa.gov/volumes/mro.html.
- NASA HEASARC TESS data products: listings scraped from https://heasarc.gsfc.nasa.gov/docs/tess/data-products.html.
- International Moon Database interface for LROC datasets: JSON harvested via https://data.im-ldi.com/mds?MDS_SEARCH=%7B%22datasets%22%3A%5B%22luna_lroc_fi%22,%22luna_lroc_pds_nac_edrcdr%22,%22luna_lroc_pds_wac_edrcdr%22,%22luna_lroc_pds_rdr%22%5D,%22query%22:%7B%7D,%22map%22:%7B%7D%7D.
- NASA Trek Web Services layers for Moon, Mars, and Ceres: REST calls to https://trek.nasa.gov/.
- NASA Earthdata CMR collection search API: metadata pulled from https://search.earthdata.nasa.gov/ via https://cmr.earthdata.nasa.gov/search/collections.json.
- NASA Lunar Reconnaissance Orbiter mission page: curated product links from https://science.nasa.gov/mission/lro/data-products/.
- Canadian Wildland Fire Information System highlights: scraped from https://cwfis.cfs.nrcan.gc.ca/home.
- GEO.ca spotlight and initiatives: aggregated via https://geo.ca/home/.
- Canadian Space Agency datasets: fetched from https://donnees-data.asc-csa.gc.ca/dataset and targeted package IDs.
- Brazilian INDE Visualizador landing resources: parsed from https://visualizador.inde.gov.br/.
- INPE DGI catalog explore page: links harvested from https://www.dgi.inpe.br/catalogo/explore.

These sources feed the `/catalog/search` endpoint for federated mission discovery.
