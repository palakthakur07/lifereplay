# Services

**Status:** empty by design (Phase 1 has no backend or APIs).

This is where API clients, data-fetching functions, and third-party service
wrappers will live once the backend exists — for example `services/spaces.ts`
or `services/ai.ts`. Keep this layer free of React; it should export plain
functions that feature hooks call, so it stays testable and swappable.
