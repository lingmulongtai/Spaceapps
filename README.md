<<<<<<< HEAD
# Spaceapps
=======
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

>>>>>>> 2d4a380 (proto)
