---
epic: "REDESIGN"
title: "GitHub Contribution Graph — Homepage Bento Tile"
estimate: M
status: ready
created: 2026-05-01
depends_on: []
labels: [frontend, api, github, bento]
priority: P2
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor landing on the homepage\
**I want** to see Jordi's live GitHub activity in the bento grid\
**So that** I get instant visual proof of consistent coding activity without leaving the homepage\

## 2. Business Context & Value
A live GitHub activity tile turns the bento grid into "proof of work at a glance" — recruiters and peers see daily coding activity within seconds of landing. Sitting next to the Spotify, Tech Stack, About and Career tiles, it strengthens the homepage's "this person ships" narrative. Client-side fetch keeps the site statically prerenderable while showing fresh data.

## 3. Acceptance Criteria

* [ ] **Scenario 1: Activity tile renders with live data**
    * Given a visitor loads `/`
    * When the bento grid hydrates in the browser
    * Then a compact GitHub-style heatmap renders inside a 1×1 bento tile showing roughly the last 12 weeks of contribution data for `Jordi-Jaspers`
    * And each cell is colored by intensity using the Japandi terracotta scale (0 = muted background, 1-3 = light terracotta, 4-9 = medium terracotta, 10+ = full terracotta)
    * And the tile heading reads "Activity" (Moranga) with an optional muted subline like "Last 12 weeks"

* [ ] **Scenario 2: Skeleton placeholder before data loads**
    * Given the page is prerendered (static HTML)
    * When the visitor sees the tile before JS hydration / before fetch completes
    * Then a skeleton placeholder with the correct compact grid dimensions (~12 weeks × 7 days) is visible
    * And it uses a subtle pulse animation on the muted background color
    * And the tile occupies the same physical space as the loaded state (no layout shift)

* [ ] **Scenario 3: Fetch failure graceful degradation**
    * Given the GitHub data source is unreachable, rate-limited, or returns malformed data
    * When the client-side fetch fails
    * Then the skeleton fades out and a small muted message appears in the tile: "Activity unavailable"
    * And no console errors are thrown to the user
    * And the tile remains a clickable link to `https://github.com/Jordi-Jaspers`

* [ ] **Scenario 4: Dark mode support**
    * Given the visitor toggles dark mode
    * When the tile is visible
    * Then the intensity colors adapt to the dark Japandi palette (terracotta shades on dark surface)
    * And the skeleton placeholder also adapts
    * And the tile chrome matches surrounding bento tiles in both modes

* [ ] **Scenario 5: Mobile bento layout**
    * Given a visitor on mobile (<844px) where the bento switches to 2-col / 4-row layout
    * When the activity tile renders
    * Then the heatmap stays legible inside the mobile tile cell (160px tall)
    * And cells scale down or the visible weeks reduce to fit (no horizontal scroll inside the tile)

* [ ] **Scenario 6: Reduced motion**
    * Given `prefers-reduced-motion: reduce` is enabled
    * When the skeleton is visible
    * Then the pulse animation is disabled (static skeleton)
    * And no other tile animations are introduced by this feature

* [ ] **Scenario 7: Bento grid placement**
    * Given the current homepage bento (3-col desktop × 2 rows; 5 tiles: Projects 2×2 col 1, Spotify col 2 row 1, TechStack col 3 row 1, About cols 2-3 row 2, Career col 3 row 2)
    * When the activity tile is added
    * Then the grid is reorganized so the activity tile occupies a single 1×1 cell without breaking visual balance
    * And the chosen layout is documented in the implementation notes (e.g. extend grid to row 3, or replace one of the smaller existing tiles — to be confirmed during implementation)
    * And the mobile @media block is updated accordingly

* [ ] **Scenario 8: Tile is a link to GitHub profile**
    * Given the activity tile renders (loaded, skeleton, or error state)
    * When the visitor clicks the tile
    * Then they are navigated in a new tab to `https://github.com/Jordi-Jaspers`
    * And the entire tile surface is clickable, with hover styling consistent with other bento tiles (`.grid-item` shadow elevation)

## 4. Technical Requirements

* **API Changes**: Client-side fetch for GitHub contribution data. Two viable sources:
  - **Option A (recommended):** Public scraping of `https://github.com/users/Jordi-Jaspers/contributions` — returns HTML fragment with `<td data-date data-level>` cells. No token needed.
  - **Option B:** GitHub GraphQL `contributionsCollection.contributionCalendar` — requires a PAT. Use only as fallback if Option A endpoint changes.
  - **Option C:** Third-party proxy (e.g. `github-contributions-api.jogruber.de`) — simple JSON, no token. Acceptable backup.
  - Decision: **Option A first, Option C as runtime fallback** if the scrape returns no cells.
* **Database**: N/A — no schema changes
* **Security**:
  - GitHub PAT must NOT be embedded in client code
  - Public scrape (Option A) and public proxy (Option C) require no secrets
  - Static, prerendered site — no server-side code added
* **Performance**:
  - Fetch on `onMount` only (not during SSR/prerender)
  - Cache parsed data in `sessionStorage` (avoid re-fetch on navigation back)
  - Compact tile: only the most recent ~12 weeks needed → smaller payload to parse
  - Target: tile populated within 1s of homepage hydration on broadband
  - Must not block the rest of the bento grid from rendering

## 5. Design & UI/UX

### Activity tile (compact heatmap)
- **Container:** Standard bento `.grid-item` with `p-4 sm:p-6`, rounded-3xl, shadow elevation on hover, matching existing tiles (Spotify, TechStack, Career).
- **Layout inside tile:**
  - Top row: heading "Activity" (Moranga, same scale as other tile titles) + small muted subline (e.g. "Last 12 weeks" or "{N} contributions")
  - Body: compact heatmap, ~12 columns (weeks) × 7 rows (days), cells ~10–12px with 2px gap, fitting within a 200px-tall desktop tile / 160px mobile tile
  - Optional bottom-right: subtle GitHub mark icon (existing `general/github-logo.svelte`) as visual anchor
- **Colors (Japandi terracotta scale, reuse tokens introduced by REDESIGN-01 if present):**
  - Light mode: `--muted` (0), terracotta-100 (low), terracotta-300 (medium), terracotta-500 (high), terracotta-700 (max)
  - Dark mode: `--muted` (0), terracotta-900 (low), terracotta-700 (medium), terracotta-500 (high), terracotta-300 (max)
- **Tooltip:** On hover of a cell, show "N contributions on MMM DD, YYYY" in a small popover. Optional — can be deferred if it bloats the compact tile.
- **Skeleton:** Same compact grid dimensions, cells use `bg-muted animate-pulse` (disabled under reduced motion).
- **Error state:** Replace heatmap area with centered muted text "Activity unavailable" — heading and tile chrome remain.

### Mobile
- The tile lives inside the existing 2-col mobile bento. Heatmap must fit the 160px-tall cell.
- Reduce visible weeks (e.g. 8–10) or scale cells down rather than introducing horizontal scroll inside the tile.

## 6. Implementation Notes

### Data fetching approach (Option A — public scraping):
```
fetch(`https://github.com/users/Jordi-Jaspers/contributions`)
  → returns HTML with <td> elements containing data-date and data-level attributes
  → parse with DOMParser
  → extract: { date: string, count: number, level: 0-4 }[]
  → keep only the last ~12 weeks
  → map level → terracotta color
```

### Fallback (Option C — public JSON proxy):
```
fetch(`https://github-contributions-api.jogruber.de/v4/Jordi-Jaspers?y=last`)
  → JSON with { total, contributions: [{ date, count, level }] }
  → slice last 12 weeks
```
Trigger Option C only if Option A returns 0 cells or fails.

### New components
| Component | Path | Purpose |
|-----------|------|---------|
| `GithubActivityTile.svelte` | `client/src/lib/components/grid/` | Compact heatmap + fetch logic + skeleton + error state, wrapped as a bento tile linking to `https://github.com/Jordi-Jaspers` |
| `ContributionCell.svelte` (optional) | `client/src/lib/components/grid/` | Single day cell with optional tooltip — only extract if it keeps `GithubActivityTile.svelte` readable |

### Integration into homepage bento
- Export `GithubActivityTile` from `client/src/lib/components/grid/index.ts`
- Import into `client/src/routes/+page.svelte`
- Wrap as `<div class="grid-item bento-activity p-4 sm:p-6"><GithubActivityTile /></div>`
- Add `.bento-activity { grid-column: ...; grid-row: ...; }` to the `<style>` block (and the mobile `@media (max-width: 843px)` block)
- Choose ONE of these layout options during implementation (decide based on visual balance and confirm with user before commit):
  1. **Extend grid to 3 rows** — append activity tile in a new row
  2. **Replace SpotifyTile** with activity tile (Spotify is currently static placeholder data)
  3. **Shrink ProjectsTile to 1×2** to free up a 1×1 cell at col 1 row 2

### Caching
```typescript
const CACHE_KEY = 'github-activity-v1';
const cached = sessionStorage.getItem(CACHE_KEY);
if (cached) { data = JSON.parse(cached); return; }
// ... fetch (Option A → fallback Option C) and store
sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
```

### Patterns to follow
- Use Svelte 5 runes (`$state`, `$effect`, `onMount`) — see existing `AboutTile.svelte` (`$effect` Mapbox cleanup) and `CareerTile.svelte` (`onMount` + IntersectionObserver) as references
- Match the look and link behavior of existing tiles (`TechStackTile.svelte` is a good reference for "tile that is a link")
- Reuse `general/github-logo.svelte` for any GitHub mark inside the tile

### Files to modify (MANDATORY)
| File | Change | Lines (est) |
|------|--------|-------------|
| `client/src/lib/components/grid/GithubActivityTile.svelte` | **New** — Compact heatmap tile with fetch (Option A → C fallback), `sessionStorage` cache, skeleton, error state, link wrapper to GitHub profile | ~180 |
| `client/src/lib/components/grid/ContributionCell.svelte` | **New (optional)** — Single day cell + optional tooltip | ~40 |
| `client/src/lib/components/grid/index.ts` | Export `GithubActivityTile` | ~1 |
| `client/src/routes/+page.svelte` | Import + render activity tile in bento, add `.bento-activity` grid positioning (desktop + mobile @media) | ~15 |
| `client/src/app.css` | Add terracotta intensity tokens if not already provided by REDESIGN-01 | ~10 |
