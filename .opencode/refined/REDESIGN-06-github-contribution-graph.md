---
epic: "REDESIGN"
title: "GitHub Contribution Graph — Live Client-Side Fetch on Work Page"
estimate: M
status: ready
created: 2026-05-01
depends_on: ["REDESIGN-04-work-page"]
labels: [frontend, api, github]
priority: P2
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor viewing the Work page\
**I want** to see Jordi's live GitHub contribution graph\
**So that** I can see consistent coding activity as proof of engineering commitment\

## 2. Business Context & Value
A live contribution graph is visual "proof of work" — recruiters and peers immediately see daily coding activity. It reinforces the Work page's narrative (projects + timeline + activity). Client-side fetch keeps the site statically prerenderable while showing live data.

## 3. Acceptance Criteria

* [ ] **Scenario 1: Contribution graph renders with live data**
    * Given a visitor loads `/work`
    * When the page hydrates in the browser
    * Then a GitHub-style contribution heatmap renders showing the last 52 weeks of contribution data for `Jordi-Jaspers`
    * And each cell is colored by intensity (0 = muted background, 1-3 = light terracotta, 4-9 = medium terracotta, 10+ = full terracotta)
    * And the graph uses the Japandi color palette (not GitHub green)

* [ ] **Scenario 2: Skeleton placeholder before data loads**
    * Given the page is prerendered (static HTML)
    * When the visitor sees the page before JS hydration
    * Then a skeleton placeholder with the correct grid dimensions (52×7) is visible
    * And it uses a subtle pulse animation on the muted background color

* [ ] **Scenario 3: Fetch failure graceful degradation**
    * Given the GitHub API is unreachable or rate-limited
    * When the client-side fetch fails
    * Then the skeleton remains visible (no error flash)
    * And a small muted text appears: "Contribution data unavailable"
    * And no console errors are thrown to the user

* [ ] **Scenario 4: Dark mode support**
    * Given the visitor toggles dark mode
    * When the contribution graph is visible
    * Then the intensity colors adapt to the dark palette (terracotta shades on dark surface)
    * And the skeleton placeholder also adapts

* [ ] **Scenario 5: Mobile responsive**
    * Given a visitor on mobile (<844px)
    * When the contribution graph renders
    * Then it horizontally scrolls or shows a condensed view (last 26 weeks)
    * And touch scrolling works smoothly

* [ ] **Scenario 6: Reduced motion**
    * Given `prefers-reduced-motion: reduce` is enabled
    * When the skeleton is visible
    * Then the pulse animation is disabled (static skeleton)

* [ ] **Scenario 7: Placement on Work page**
    * Given the Work page layout (header → projects → timeline → client strip → CTA)
    * When the contribution graph renders
    * Then it appears between the Career Timeline and Client Strip sections
    * And it has a heading: "Activity" (Moranga) + optional subline with total contributions count

## 4. Technical Requirements

* **API Changes**: Client-side fetch to GitHub GraphQL API (`https://api.github.com/graphql`) for contribution data. Requires a GitHub personal access token with `read:user` scope.
* **Database**: N/A — no schema changes
* **Security**:
  - GitHub PAT must NOT be embedded in client code — it has write capabilities
  - **Option A (recommended):** Use the public GitHub profile page scraping approach (no token needed) — fetch `https://github.com/users/Jordi-Jaspers/contributions` which returns an SVG/HTML fragment
  - **Option B:** Serverless function / edge function as proxy (adds complexity)
  - **Option C:** GitHub GraphQL with a read-only fine-grained PAT (token exposed in client — acceptable if scoped to only public read)
  - Decision: **Use Option A** — scrape the public contributions page. No token needed, no security risk, simplest approach.
* **Performance**:
  - Fetch on `onMount` only (not during SSR/prerender)
  - Cache response in `sessionStorage` (avoid re-fetch on navigation back)
  - Parse HTML response to extract contribution data (day counts + dates)
  - Target: graph visible within 1s of page load on broadband

## 5. Design & UI/UX

### Contribution Heatmap
- **Layout:** Full-width within the Work page content area. 52 columns (weeks) × 7 rows (days). Each cell ~12px with 2px gap.
- **Colors (Japandi terracotta scale):**
  - Light mode: `--muted` (0), terracotta-100 (low), terracotta-300 (medium), terracotta-500 (high), terracotta-700 (max)
  - Dark mode: `--muted` (0), terracotta-900 (low), terracotta-700 (medium), terracotta-500 (high), terracotta-300 (max)
- **Labels:** Month labels above (Jan, Feb, ...), day labels left (Mon, Wed, Fri). Muted foreground color, small text.
- **Tooltip:** On hover, show "N contributions on MMM DD, YYYY" in a small popover.
- **Skeleton:** Same grid dimensions, cells use `bg-muted animate-pulse`.
- **Heading:** "Activity" (Moranga) aligned with other section headings. Optional: "N contributions in the last year" subline.

### Mobile
- Horizontally scrollable container with `overflow-x: auto` and `-webkit-overflow-scrolling: touch`
- Or condensed to last 26 weeks to fit viewport

## 6. Implementation Notes

### Data fetching approach (Option A — public scraping):
```
fetch(`https://github.com/users/Jordi-Jaspers/contributions`)
  → returns HTML with <td> elements containing data-date and data-level attributes
  → parse with DOMParser or regex
  → extract: { date: string, count: number, level: 0-4 }[]
  → map level to terracotta color scale
```

### Alternative: GitHub GraphQL (if scraping breaks):
```graphql
query {
  user(login: "Jordi-Jaspers") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
```
This requires a PAT — only use as fallback if public endpoint changes.

### New components:
| Component | Path | Purpose |
|-----------|------|---------|
| `ContributionGraph.svelte` | `client/src/lib/components/work/` | Heatmap grid + fetch logic |
| `ContributionCell.svelte` | `client/src/lib/components/work/` | Individual day cell with tooltip |

### Integration point:
- Add `<ContributionGraph />` to `client/src/routes/work/+page.svelte` between Timeline and ClientStrip sections

### Caching:
```typescript
const CACHE_KEY = 'github-contributions';
const cached = sessionStorage.getItem(CACHE_KEY);
if (cached) { data = JSON.parse(cached); return; }
// ... fetch and store
sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
```

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/lib/components/work/ContributionGraph.svelte` | **New** — Heatmap with fetch, skeleton, error handling | ~150 |
| `client/src/lib/components/work/ContributionCell.svelte` | **New** — Day cell with tooltip | ~40 |
| `client/src/routes/work/+page.svelte` | Add ContributionGraph between Timeline and ClientStrip | ~5 |
| `client/src/app.css` | Add terracotta color scale tokens if not covered by REDESIGN-01 | ~10 |
