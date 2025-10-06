# Orbital Imagery Exploration Toolkit

SpaceApps concept project showcasing an end-to-end scaffold for exploring massive imagery sets with AI-powered search, temporal playback, and multilingual capabilities.

## Repository Structure


## Orbital Imagery Exploration Frontend

Next.js + Tailwind UI scaffold for NASA SpaceApps concept: navigating massive imagery archives with AI-assisted search and timeline playback. Pure placeholders waiting for real data endpoints.

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the prototype layout. Main entry point lives at `src/app/page.tsx` with supporting components in `src/components`.

### Integration Hooks

- `SearchPanel` expects future APIs for coordinate/feature/AI queries.
- `MapViewport` is ready for WebGL viewers (deck.gl, Cesium, OpenLayers).
- `TimelinePlayer` will sync to backend `/tiles/timeline` endpoint.
- `ResourcePanel` highlights where catalogs, models, and pipelines mount.

### Next Steps

1. Swap UI placeholders with live data from backend FastAPI services.
2. Add state management (Zustand/Redux) once data flow is defined.
3. Integrate translation UI that calls `/api/translate` (DeepL-first).

Refer to the root README for system architecture notes.
