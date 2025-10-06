# Spaceapps-concept

Orbital Imagery Exploration Toolkit designed for NASA Space Apps concept work. The project scaffolds an end-to-end workflow for discovering, previewing, and translating massive remote-sensing datasets while remaining ready for deeper integrations.

## Why This Project Exists

- Showcase a modern stack pairing a FastAPI backend with a Next.js frontend for planetary data discovery.
- Provide an extensible baseline for catalog federation, temporal playback, and multilingual experiences.
- Demonstrate how DeepL-powered translation can enrich scientific tooling with inclusive language support.

---

## Feature Highlights

- Unified catalog search that aggregates planned NASA and partner datasets.
- Interactive map viewport with timeline playback hooks for NASA GIBS layers.
- Translation widget backed by a DeepL-first backend service with rule-based fallback.
- Modular services layer primed for STAC, COG, vector database, and analytics pipeline integrations.
- Developer-friendly scaffolding with typed schemas, React Query, and Zustand state management.

---

## Repository Layout

- `frontend/` – Next.js 14 app with Tailwind CSS, API route proxies, and modular UI components.
- `backend/` – FastAPI application exposing catalog, tiles, translate, and health endpoints.
- `backup/venv_backup/` – Frozen copy of a Python virtual environment for reference only (not used in active development).
- `Spaceapps photo.code-workspace` – VS Code workspace definition for optional editor setup.

> The live virtual environment directory (`venv/`) is intentionally git-ignored. Create a fresh environment for your platform using the instructions below.

---

## Architecture Overview

- **Frontend**: Next.js (App Router) with React Query for data fetching, Zustand for client state, and custom hooks for imagery previews and translation flows.
- **Backend**: FastAPI service with routers for `/catalog`, `/tiles`, `/translate`, and `/health`. Each endpoint delegates to typed services located under `backend/app/services/`.
- **Data Flow**: Frontend components call local Next.js API routes that proxy to the FastAPI backend. This keeps CORS configuration straightforward and centralizes external API credentials on the server.
- **Translation**: `TranslationService` prioritizes the DeepL REST API (via `/api/translate` serverless endpoint expectation) with graceful fallback rules when the API key is missing.

---

## Prerequisites

- Node.js 18.x or newer
- npm 9.x (bundled with Node 18) or another compatible package manager
- Python 3.11.x
- PowerShell 7 (recommended on Windows) or a Unix-like shell
- Git installed and authenticated with GitHub access to `Spaceapps-concept`

Optional tooling:

- `direnv` or similar to manage environment variables
- `make` (if you plan to add command shortcuts)

---

## Quick Start (Windows-friendly)

```powershell
# Clone the repository
git clone https://github.com/lingmulongtai/Spaceapps-concept.git
cd Spaceapps-concept

# Backend setup
python -m venv venv
./venv/Scripts/Activate.ps1
pip install --upgrade pip
pip install -r backend/requirements.txt

# Frontend setup
cd frontend
npm install

# Run backend (from project root)
cd ..
./venv/Scripts/uvicorn app.main:app --reload --app-dir backend

# In a new terminal: run the frontend dev server
cd frontend
npm run dev
```

- Backend API: `http://localhost:8000`
- Frontend app: `http://localhost:3000`

For macOS/Linux, replace activation scripts with `source venv/bin/activate` and adjust paths accordingly.

---

## Environment Configuration

Create the following files before running the stack:

- `backend/.env`
- `frontend/.env.local`

Recommended variables:

| Variable | Scope | Description | Example |
| --- | --- | --- | --- |
| `DEEPL_API_KEY` | backend | DeepL Auth Key for production translation | `deepl-auth-key` |
| `DEEPL_API_URL` | backend | Override base URL (useful for mock servers) | `https://api-free.deepl.com` |
| `DEEPL_TIMEOUT_SECONDS` | backend | Request timeout for translation calls | `15` |
| `NEXT_PUBLIC_BACKEND_URL` | frontend | Base URL for API proxy calls | `http://localhost:8000` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | frontend | Optional if you wire Mapbox basemaps | `<token>` |

> The backend automatically reads DeepL settings from `backend/.env` via Pydantic Settings. The frontend uses `NEXT_PUBLIC_*` variables to hydrate runtime config.

---

## Development Workflow

- **Backend**
  - Run `uvicorn app.main:app --reload --app-dir backend` from the project root with the virtual environment active.
  - Implement services inside `backend/app/services/` and expose them via routers under `backend/app/routers/`.
  - Add tests beneath `backend/tests/` using `pytest` (template forthcoming).

- **Frontend**
  - Use `npm run dev` for hot-reloading Next.js.
  - API calls should go through the internal `/api/*` routes to piggyback on the Next.js server and avoid CORS issues.
  - Shared state lives in `frontend/src/store/`; custom hooks for API access are in `frontend/src/hooks/`.

- **Code Quality**
  - `npm run lint` (frontend) ensures ESLint compliance.
  - `npm run type-check` (if added) validates TypeScript typings.
  - Backend formatting follows `black` and `ruff` (add to `requirements-dev.txt` as needed).

- **Translation Testing**
  - Without `DEEPL_API_KEY`, the backend returns stubbed translations for deterministic local testing.
  - With the key set, ensure outbound requests succeed by calling `POST /translate/` directly or using the frontend Translation widget.

---

## API Surface Snapshot

- `POST /catalog/search` – Aggregate imagery and dataset entries based on forthcoming STAC/mission integrations.
- `GET /catalog/pipelines` – List registered analytics pipelines (placeholder).
- `POST /catalog/ingest` – Stub for dataset registration payloads.
- `POST /tiles/preview` – Fetch NASA GIBS imagery tiles and return base64-encoded PNG previews.
- `GET /tiles/timeline` – Return timestamped assets for temporal playback per GIBS layer.
- `POST /translate/` – Translate text to a target language using DeepL when configured.
- `GET /health` – Lightweight readiness probe.

Internal Next.js API routes mirror these backend endpoints to simplify client usage.

---

## Data Sources & Planned Integrations

The catalog service is pre-wired to ingest or federate the following providers as the project matures:

- NASA PDS Imaging Node (MRO volumes) – <https://pds-imaging.jpl.nasa.gov/volumes/mro.html>
- NASA HEASARC TESS data products – <https://heasarc.gsfc.nasa.gov/docs/tess/data-products.html>
- International Moon Database (LROC datasets) – <https://data.im-ldi.com>
- NASA Trek Web Services (Moon, Mars, Ceres) – <https://trek.nasa.gov>
- NASA Earthdata CMR – <https://cmr.earthdata.nasa.gov>
- NASA Lunar Reconnaissance Orbiter mission products – <https://science.nasa.gov/mission/lro/data-products>
- Canadian Wildland Fire Information System – <https://cwfis.cfs.nrcan.gc.ca/home>
- GEO.ca initiatives – <https://geo.ca/home>
- Canadian Space Agency open datasets – <https://donnees-data.asc-csa.gc.ca/dataset>
- Brazilian INDE Visualizador – <https://visualizador.inde.gov.br>
- INPE DGI catalog – <https://www.dgi.inpe.br/catalogo/explore>

Each source ultimately feeds the `/catalog/search` endpoint once ingestion jobs and parsers are implemented.

---

## Roadmap

1. **Data Federation** – Replace mock catalog responses with live STAC/COG queries and vector database indexing.
2. **Analytics Pipelines** – Formalize `/catalog/pipelines` with user-submitted or curated analysis modules.
3. **Temporal Playback** – Integrate frame scrubbing UI tied to NASA GIBS timeline responses.
4. **User Accounts** – Evaluate authentication/authorization for protected datasets and collaborative workspaces.
5. **Localization** – Expand translation coverage across UI copy, metadata, and dataset summaries via DeepL.
6. **CI/CD** – Add automated testing, linting, and deployment workflows (GitHub Actions templates forthcoming).

---

## Contributing

We welcome pull requests and issue reports as the concept evolves.

1. Fork the repository and create a feature branch.
2. Follow the setup instructions above.
3. Add or update tests whenever you introduce new behavior.
4. Submit a pull request detailing the motivation, behavior changes, and testing performed.

Please open a GitHub issue to discuss significant architectural changes before implementation.

---

## Licensing & Attribution

This concept repository is currently unlicensed. Until a license is added, reuse requires express permission from the maintainers.

NASA data products referenced herein remain governed by their respective distribution policies. DeepL is a registered trademark of DeepL SE.

---

## Acknowledgements

- NASA Space Apps Challenge for inspiring the concept brief.
- Open-source contributors whose libraries power this stack (FastAPI, httpx, Next.js, React Query, Zustand, Tailwind CSS).
- DeepL for enabling inclusive, multilingual scientific communication.
