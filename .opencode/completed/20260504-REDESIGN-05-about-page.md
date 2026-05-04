# About Page — Scroll-Driven Map Journey

**Completed:** 2026-05-04
**Epic:** REDESIGN
**Source:** `.opencode/refined/REDESIGN-05-about-page.md`

## Summary

Replaced the `/about` stub with an immersive scroll-driven Mapbox journey through 4 waypoints (Hasselt → Seoul → Maastricht → Mars), a 3-row infinite tech-stack carousel with 39 logos, and a personal section. Mobile gets a static vertical timeline (no Mapbox) below 844px.

## Approved Plan

### Requirements Summary

- Sticky full-bleed Mapbox canvas driven by scroll, 4 waypoints with terracotta active pins
- Mars uses globe projection (no rocket marker — final design pivot)
- Bottom-right narrative card overlay with chapter copy, fades between waypoints
- Mobile (<844px): vertical timeline, NO Mapbox load
- 3-row infinite carousel (→ ← →) with 39 tech logos, hover pause, prefers-reduced-motion
- Personal section: Hapkido + Spotify link
- Greenfield, frontend-only, prerendered

### Technical Approach

- **Frontend:** SvelteKit 2 + Svelte 5 runes + Tailwind v4 + Mapbox GL JS 3
- **Logic modules** (testable in isolation): `types.ts`, `waypoints.ts`, `scroll-observer.ts`, `responsive.ts`
- **Components:** `MapJourney`, `MobileTimeline`, `TechStackScroll`, `PersonalSection`, plus 27 new SVG logos
- **Tests:** Vitest + jsdom (newly configured); 33 unit tests on pure logic

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | typescript-testing-agent | 33 unit tests for waypoints/scroll-observer/responsive + Vitest setup |
| 2 | svelte-frontend-agent | Implement modules, 5 components, 27 SVG logos, /about route |
| 3 | (3 design pivots via same agent) | Round 1: full-width sticky map + popups; Round 2: drop rocket + map covers bottom; Round 3: drop hero + add narrative cards |

## Implementation

### Frontend

**Routes**
- `client/src/routes/about/+page.svelte` — desktop: bare `<MapJourney/>`, mobile: `<MobileTimeline/>` in constrained section, then TechStackScroll + PersonalSection
- `client/src/routes/about/+page.ts` — `prerender = true`

**Logic modules** (`client/src/lib/components/about/`)
- `types.ts` — `Waypoint` interface
- `waypoints.ts` — 4 waypoints (Hasselt [5.3325, 50.9307], Seoul [127.0447, 37.5563], Maastricht [5.6910, 50.8514], Mars [0,0])
- `scroll-observer.ts` — `getActiveWaypointIndex()` (highest-ratio intersecting entry, threshold 0.5), `getMapAnimationOptions()` (fly vs jump based on prefers-reduced-motion)
- `responsive.ts` — `isMobileViewport()` (<844px), `shouldLoadMapbox()` (skip on mobile only)
- `narratives.ts` — 4 chapter narrative entries

**Components**
- `MapJourney.svelte` (~441 lines) — sticky 100dvh Mapbox canvas, 4×100vh scroll-spacers in 400vh wrapper, IntersectionObserver-driven flyTo/jumpTo, custom HTML waypoint pins (terracotta active state with pulse), single-active Mapbox popups, Mars globe projection switch, bottom-right narrative card overlay with fade transitions and prefers-reduced-motion support, dark/light Mapbox style sync via `isDarkMode` store
- `MobileTimeline.svelte` — static vertical timeline (no Mapbox bundle on mobile)
- `TechStackScroll.svelte` — 3-row infinite carousel (component-scoped CSS, 30s scroll, hover-pause, prefers-reduced-motion)
- `PersonalSection.svelte` — Hapkido + Spotify link

**Stack logos** — 27 new SVG components added (java, python, go, quarkus, maven, pytorch, huggingface, tensorflow, langchain, openai, typescript, javascript, react, angular, vue, html, css, nodejs, mariadb, redis, timescaledb, mongodb, elasticsearch, github-actions, cloudflare, grafana, git). Total exports now 55.

**Vitest setup** — first test infrastructure in this project. Added `vitest`, `@vitest/coverage-v8`, `@testing-library/svelte`, `@testing-library/jest-dom`, `jsdom` to devDependencies. New `vitest.config.ts` (jsdom env, `$lib` alias, `$app/environment` stub).

### Tests

33 unit tests (3 files) covering waypoints contract, IntersectionObserver logic, viewport breakpoint logic. All passing.

### Deviations from Plan

- **Rocket dropped** — original story had a Mars rocket marker with float animation; user pivoted in-flight to remove it entirely (Mars now uses standard waypoint pin + globe projection only)
- **Hero section dropped** — original story had a `<h1>About</h1>` + intro paragraph above the map; replaced with bottom-right narrative card overlay that changes per chapter
- **Map covers full viewport** — `.map-sticky` is `100dvh` (was originally planned as 80vh); spacers bumped to `100vh` for 1:1 viewport-per-waypoint pacing
- **5 tech logos use simplified placeholders** (quarkus, langchain, timescaledb, mariadb, maven) — flagged for future swap
- **Map init bug fixed mid-flight** — async dynamic CSS import (`await import('mapbox-gl/dist/mapbox-gl.css')`) silently failed in Vite; replaced with top-level static import

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| deep-research-agent (×3 parallel) | Architecture, Mapbox patterns, TechStackTile reference | Complete |
| typescript-testing-agent | Vitest setup + 33 unit tests | Complete |
| svelte-frontend-agent (4 rounds, single session) | Implementation + 3 design pivots | Complete |

## Files Modified

**Modified**
- `client/package.json` — added vitest deps, test scripts
- `client/bun.lock` — lockfile update
- `client/src/lib/components/stack/index.ts` — 27 new logo exports (55 total)
- `client/src/routes/about/+page.svelte` — replaced stub

**Added (routes/components)**
- `client/src/routes/about/+page.ts`
- `client/src/lib/components/about/` (10 files: 5 logic modules + 4 components + 1 narratives)
- `client/src/lib/components/about/__tests__/` (3 test files, 33 tests)

**Added (tooling)**
- `client/vitest.config.ts`
- `client/src/__mocks__/app-environment.ts`

**Added (logos, 27 SVGs)** in `client/src/lib/components/stack/`

## Tests

33 unit tests written, 33 passing. svelte-check: 0 errors. Build: succeeds.
