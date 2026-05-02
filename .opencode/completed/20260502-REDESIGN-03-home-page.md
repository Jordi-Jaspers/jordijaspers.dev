# Home Page — Particle Hero + Static Bento Grid

**Completed:** 2026-05-02
**Epic:** REDESIGN
**Source:** .opencode/refined/REDESIGN-03-home-page.md

## Summary

Built the home page with a particle/neural-net canvas hero (~85vh) featuring 4 floating social bubbles (GitHub, LinkedIn, Spotify, Email) and a static CSS Grid bento layout with 5 tiles: Work (2×2), About (2×1), Spotify (1×1), Tech Stack (1×1), Resume (1×1).

## Approved Plan

### Requirements Summary

- Hero ~85vh with particle canvas, centered "Jordi Jaspers" (Moranga) + "Lead Software & Applied AI Engineer" (Silka)
- 4 social bubbles floating among particles, clickable
- Desktop mouse interaction (repel/attract), mobile adaptation (reduced particles, no tracking)
- Static bento grid: Work(2×2), About(2×1), Spotify(1×1), TechStack(1×1), Resume(1×1)
- Responsive grid (<844px → 2-col)
- Canvas: requestAnimationFrame, 60fps desktop, prefers-reduced-motion support

### Technical Approach

- Frontend only (no backend)
- Raw `<canvas>` 2D for particle system
- CSS Grid for bento layout (no library)
- Real Mapbox GL in About tile with tinted colors
- Invisible `<a>` overlays for a11y

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | svelte-frontend-agent | Build all components (ParticleCanvas, WorkTile, AboutTile, restyle tiles, rewrite +page.svelte) |
| 2 | frontend-optimizer-agent | Delete deprecated files, rename to PascalCase, clean exports/types/stores |

## Implementation

### Frontend

- **ParticleCanvas.svelte** — Canvas particle animation with 4 social bubbles (GitHub, LinkedIn, Spotify, Email), mouse repel on desktop, reduced particles on mobile, prefers-reduced-motion static fallback
- **WorkTile.svelte** — 2×2 tile with crossfade cycling aniflix screenshots, gradient overlay, project badge, dot indicators
- **AboutTile.svelte** — Full-bleed Mapbox GL map (no attribution), tinted warm colors, pulsing location pin, gradient overlay with "About" + "Maastricht, NL" label
- **SpotifyTile.svelte** — Now-playing card: pulsing green dot, "NOW PLAYING" header, song info, 5 bouncing bars, Spotify logo
- **TechStackTile.svelte** — Double carousel (2 rows, 7 logos each), pause on hover
- **ResumeTile.svelte** — Title + 2 pill buttons (PDF download + LinkedIn)
- **+page.svelte** — Hero (85svh) + 3-col bento grid (desktop), 2-col (mobile)

### Deviations from Plan

- About tile uses real Mapbox GL instead of CSS-only map (user preference)
- Hero subtitle changed to "Lead Software & Applied AI Engineer" (user choice)
- `.grid-item` border changed from thick accent to thin subtle border for dark mode

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| svelte-frontend-agent | Build all components + page | Complete |
| frontend-optimizer-agent | Delete deprecated files, rename, clean exports | Complete |

## Files Modified

- `client/src/routes/+page.svelte` — Full rewrite: hero + bento grid
- `client/src/lib/components/hero/ParticleCanvas.svelte` — New: particle canvas + social bubbles
- `client/src/lib/components/grid/WorkTile.svelte` — New: work showcase tile
- `client/src/lib/components/grid/AboutTile.svelte` — New: Mapbox map tile
- `client/src/lib/components/grid/SpotifyTile.svelte` — Restyled: now-playing card
- `client/src/lib/components/grid/TechStackTile.svelte` — Restyled: double carousel
- `client/src/lib/components/grid/ResumeTile.svelte` — Restyled: 2 pill buttons
- `client/src/lib/components/grid/index.ts` — Updated exports
- `client/src/lib/components/general/index.ts` — Removed LightSwitch export
- `client/src/app.css` — Updated .grid-item border styling
- `client/src/app.d.ts` — Removed Coordinates/GridObject interfaces
- `client/src/lib/stores/localstorage.svelte.ts` — Removed activeTab store

## Files Deleted

- `client/src/lib/components/grid/github-tile.svelte`
- `client/src/lib/components/grid/linkedin-tile.svelte`
- `client/src/lib/components/grid/introduction-tile.svelte`
- `client/src/lib/components/grid/map-tile.svelte`
- `client/src/lib/components/grid/aniflix-tile.svelte`
- `client/src/lib/components/general/light-switch.svelte`

## Tests

- No tests (greenfield visual feature, screenshot tests disabled)
