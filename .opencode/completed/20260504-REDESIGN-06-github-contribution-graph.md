# GitHub Contribution Graph — Homepage Bento Tile

**Completed:** 2026-05-04
**Epic:** REDESIGN
**Source:** `.opencode/refined/REDESIGN-06-github-contribution-graph.md` (deleted)

## Summary

Added live GitHub contribution heatmap as a full-width bento tile on the homepage. Client-side fetch from jogruber API with sessionStorage caching, ResizeObserver-driven dynamic week count, square cells, and full a11y/reduced-motion support.

## Approved Plan

### Requirements Summary
- Compact GitHub-style heatmap inside bento tile
- Client-side fetch (no server, no PAT)
- Skeleton placeholder with no layout shift
- Graceful error fallback ("Activity unavailable")
- Dark mode support via existing OKLCH tokens
- Reduced-motion support
- Tile is link to `https://github.com/Jordi-Jaspers`

### Technical Approach
- Frontend-only, greenfield component
- New: `GithubActivityTile.svelte` + spec
- Modified: grid index, +page.svelte (bento layout), vitest.config.ts, new `__mocks__/app-paths.ts`

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | typescript-testing-agent | Create test suite (33 tests) |
| 2 | svelte-frontend-agent | Implement component |
| 3 | frontend-optimizer-agent | Refactor for maintainability |

## Implementation

### Frontend
- **Data source:** `https://github-contributions-api.jogruber.de/v4/Jordi-Jaspers?y=last` (jogruber proxy)
- **Layout (desktop):** Full-width row 3 of 3-col bento; rows now `200px × 3`
- **Layout (mobile, <844px):** Full-width row 5; AboutTile (Mapbox) reflowed to col 2 spanning rows 2-3, Spotify under TechStack in col 1
- **Cells:** Always perfect 11×11px squares with 3px gaps. ResizeObserver computes `weeks = floor((width + 3) / 14)`, capped at 52
- **Right-anchored:** `margin-left: auto` on grid; older weeks fall off left as tile narrows (matches GitHub native UX)
- **Skeleton:** Mirrors dynamic week count for zero layout shift
- **Cache:** sessionStorage key `github-activity-v1`, full response payload
- **States:** `loading | loaded | error` via Svelte 5 `$state`
- **a11y:** `prefers-reduced-motion` disables `animate-pulse`; root `<a>` always present (target=_blank, rel=noopener noreferrer)
- **Refactors:** Extracted pure helpers (`computeWeeks`, `isValidData`, `readCache`, `writeCache`, `fetchActivity`, `applyData`); flat IIFE lifecycle; `DAYS_PER_WEEK` constant

### Deviations from Plan
- **Option A (HTML scrape) abandoned** — github.com does not send `Access-Control-Allow-Origin`, blocks browser fetch. Switched to Option C (jogruber API) as sole source, no fallback.
- **No terracotta-100/300/500/700/900 tokens** — REDESIGN-01 never shipped these. Used existing OKLCH tokens (`--muted`, `--primary`) for cell levels.
- **Cell count** evolved from 84 (12 weeks) → 364 (52 weeks fixed) → dynamic via ResizeObserver
- **First Vitest setup in project** — added `setupFiles: ['@testing-library/svelte/vitest']` and browser conditions to `vitest.config.ts`; created `__mocks__/app-paths.ts` for `$app/paths`

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| deep-research-agent | Bento layout + tile patterns research | Complete |
| deep-research-agent | CORS verification + jogruber API schema | Complete (CORS finding flipped Option A→C) |
| typescript-testing-agent | 33-test contract for component | Complete |
| svelte-frontend-agent | Implement + iterate UX (multiple cell-sizing approaches) | Complete |
| frontend-optimizer-agent | Refactor helpers, simplify lifecycle | Complete |

## Files Modified

- `client/src/lib/components/grid/GithubActivityTile.svelte` — NEW component
- `client/src/lib/components/grid/GithubActivityTile.spec.ts` — NEW, 33 tests
- `client/src/lib/components/grid/index.ts` — added export
- `client/src/routes/+page.svelte` — added tile + bento grid layout (desktop 3-row, mobile 5-row reflow)
- `client/vitest.config.ts` — added testing-library setup + browser conditions
- `client/src/__mocks__/app-paths.ts` — NEW mock for `$app/paths`

## Tests

- 66/66 tests pass (33 new + 33 existing)
- 0 type errors (`bun run check`)
- Build succeeds (`bun run build`)
