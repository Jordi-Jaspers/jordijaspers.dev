---
epic: "REDESIGN"
title: "About Page — Scroll-Driven Map Journey, Tech Stack & Personal"
estimate: L
status: ready
created: 2026-05-01
depends_on: ["REDESIGN-02-layout-routing-navigation"]
labels: [frontend, content, design, mapbox, animation]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor (recruiter, potential client, or peer)\
**I want** an About page that tells Jordi's career journey through an interactive map, showcases his full tech breadth, and highlights certifications and personal interests\
**So that** I understand his background, versatility, and positioning as a polyglot engineer and AI expert\

## 2. Business Context & Value
The About page is the "depth" page — it converts curiosity from the Home page into understanding. The scroll-driven map journey is the signature interaction that makes this portfolio memorable. The tech stack section positions Jordi as a versatile full-stack + AI engineer (not "just a Java dev"), which is critical for SEO and recruiter discovery. The Mars waypoint reinforces AI-forward positioning with a memorable, shareable moment.

## 3. Acceptance Criteria

* [ ] **Scenario 1: Map journey renders on desktop**
    * Given a visitor on desktop (≥844px) loads `/about`
    * When the page renders
    * Then a Mapbox map occupies ~60% width (sticky positioned) on the left, and milestone cards scroll on the right (~40%)
    * And the map is centered on the first waypoint (Hasselt, Belgium)

* [ ] **Scenario 2: Scroll drives map panning through 4 waypoints**
    * Given the visitor scrolls down the About page
    * When each milestone card enters the viewport
    * Then the map smoothly flies to the corresponding coordinates:
      1. **Hasselt, Belgium** (50.9307, 5.3325) — "MSc Electronic & Software Engineering — UHasselt / KULeuven"
      2. **Seoul, South Korea** (37.5563, 127.0447) — "Exchange semester — Hanyang University"
      3. **Maastricht, Netherlands** (50.8514, 5.6910) — "Lead Software Engineer — Ilionx (present)"
      4. **Mars / Space** (zoom out to ~1, globe view) — "Next: Building the future with AI — LLMs, multi-agent systems, and whatever comes after" with a custom rocket/pin HTML marker
    * And each transition uses `map.flyTo()` with ~2s duration and smooth easing

* [ ] **Scenario 3: Active waypoint indication**
    * Given the visitor is scrolling through waypoints
    * When a milestone card is the active scroll target
    * Then that card has a terracotta left border accent and slightly elevated appearance
    * And the corresponding map marker/pin is highlighted

* [ ] **Scenario 4: Mobile fallback — no sticky map**
    * Given a visitor on mobile (<844px) loads `/about`
    * When the page renders
    * Then the map is NOT sticky — instead a small static map snapshot or compact inline map appears above each milestone card
    * Or alternatively: a vertical timeline with location pins (no Mapbox) for performance
    * And all milestone content is fully readable without map interaction

* [ ] **Scenario 5: Reduced motion fallback**
    * Given a visitor has `prefers-reduced-motion: reduce` enabled
    * When they load `/about`
    * Then map transitions use `map.jumpTo()` instead of `flyTo()` (instant, no animation)
    * And the scroll-driven behavior still updates waypoints but without smooth panning

* [ ] **Scenario 6: Tech stack infinite scroll**
    * Given the visitor scrolls past the map journey section
    * When the Tech Stack section enters the viewport
    * Then 3 rows of tech logos scroll infinitely (alternating directions: →, ←, →)
    * And logos are grouped loosely by domain across rows but visually blend together
    * And the section conveys breadth and versatility (40+ logos)
    * And `prefers-reduced-motion` pauses the scroll animation

* [ ] **Scenario 7: Personal section**
    * Given the visitor reaches the Personal section
    * When it renders
    * Then it shows "Hapkido — 3rd Degree Black Belt" with a martial arts reference
    * And a Spotify profile link to `https://open.spotify.com/user/jordi_jaspers`

* [ ] **Scenario 8: Deep link to tech stack**
    * Given a visitor clicks the Tech Stack bento tile on the Home page
    * When they navigate to `/about#tech`
    * Then the page scrolls to the Tech Stack section
    * And the view transition completes smoothly

* [ ] **Scenario 9: Mapbox token security**
    * Given the Mapbox map initializes
    * When the token is used
    * Then it is a dedicated token (not the default public token) with URL restrictions for `jordijaspers.dev`, `www.jordijaspers.dev`, `localhost:5173`, `localhost:4173`
    * And the token only has public scopes (no secret scopes)

> **Note:** Certifications now live on the `/career` page (delivered in REDESIGN-04). Removed from About scope.

## 4. Technical Requirements

* **API Changes**: N/A — no backend
* **Database**: N/A — no schema changes
* **Security**: Mapbox access token must be URL-restricted (see AC 10). Token stored in `$lib/config/env` — same pattern as current MapTile. No secret scopes needed.
* **Performance**:
  - Mapbox GL JS loaded only on `/about` (not globally) — dynamic import or component-level import
  - Tech stack logos: reuse existing SVG components + add new ones. SVGs are inline (no network requests)
  - Map waypoint transitions: throttle scroll observer to ~100ms intervals
  - Mobile: consider skipping Mapbox entirely (saves ~200KB) and using static timeline instead
  - Target: page interactive < 2s on 4G

## 5. Design & UI/UX

### Map Journey Section (~50vh per waypoint = ~200vh total scroll height)
- **Desktop:** Two-column layout. Left: sticky Mapbox map (~60% width, full viewport height). Right: scrollable milestone cards (~40% width) with generous vertical spacing.
- **Map style:** `mapbox://styles/mapbox/light-v11` (light) / `mapbox://styles/mapbox/dark-v11` (dark) — same as current MapTile.
- **Milestone cards:** Japandi-styled cards with surface-grain texture. Active card has terracotta left border (4px). Content: location pin icon, place name (Moranga heading), date range, 1-2 sentence description (Silka body).
- **Mars waypoint:** Map zooms out to globe view (zoom ~1). Custom HTML marker: rocket emoji or SVG + terracotta glow. Card text is aspirational/forward-looking.
- **Scroll detection:** IntersectionObserver on milestone cards, threshold ~0.5.

### Tech Stack Section (`#tech` anchor)
- **Layout:** Full-width, 3 rows of infinite-scrolling logos (alternating directions).
- **Row composition (~40+ logos across 3 rows):**
  - Row 1 (→): Java, Spring Boot, Kotlin, Python, PyTorch, HuggingFace, TensorFlow, LangChain, OpenAI, Go, Quarkus, Gradle, Maven
  - Row 2 (←): Svelte, TypeScript, JavaScript, React, Angular, Vue, Next.js, HTML, CSS, Tailwind, Bun, Node.js
  - Row 3 (→): Docker, Kubernetes, Terraform, PostgreSQL, MariaDB, Redis, TimescaleDB, MongoDB, Elasticsearch, GitHub Actions, Cloudflare, Traefik, Grafana, Linux, Git
- **Logo size:** ~48px, grayscale by default, color on hover. Subtle opacity variation.
- **Speed:** ~40s per full cycle (matches current TechStackTile animation).
- **Heading:** "Tech Stack" (Moranga) + subline: "Polyglot by nature, AI-accelerated by choice."

### Personal Section
- **Layout:** Simple centered block. Hapkido mention + Spotify link (with Spotify icon).
- **Tone:** Brief, human, approachable.

## 6. Implementation Notes

### Existing code to reuse/adapt:
- `client/src/lib/components/grid/map-tile.svelte` — Mapbox init pattern, dark mode style switching, `$lib/config/env` token. Adapt `flyTo()` logic for scroll-driven waypoints.
- `client/src/lib/components/grid/tech-stack-tile.svelte` — Infinite scroll animation pattern. Scale up from 2 rows to 3 rows.
- `client/src/lib/components/stack/*.svelte` — 28 existing SVG logo components.

### New SVG logos to create (~15 new):
| Logo | File | Notes |
|------|------|-------|
| Python | `python-logo.svelte` | New |
| PyTorch | `pytorch-logo.svelte` | New |
| HuggingFace | `huggingface-logo.svelte` | New |
| TensorFlow | `tensorflow-logo.svelte` | New |
| LangChain | `langchain-logo.svelte` | New |
| OpenAI | `openai-logo.svelte` | New |
| Go | `go-logo.svelte` | New |
| React | `react-logo.svelte` | New |
| Angular | `angular-logo.svelte` | New |
| Vue | `vue-logo.svelte` | New |
| Redis | `redis-logo.svelte` | New |
| TimescaleDB | `timescaledb-logo.svelte` | New |
| MongoDB | `mongodb-logo.svelte` | New |
| Elasticsearch | `elasticsearch-logo.svelte` | New |
| Grafana | `grafana-logo.svelte` | New |
| Terraform | `terraform-logo.svelte` | New |
| GitHub Actions | `github-actions-logo.svelte` | New |
| Git | `git-logo.svelte` | New |
| Node.js | `nodejs-logo.svelte` | New |
| MariaDB | `mariadb-logo.svelte` | New |

### New components to create:
| Component | Path | Purpose |
|-----------|------|---------|
| `MapJourney.svelte` | `client/src/lib/components/about/` | Sticky map + scrollable milestones |
| `MilestoneCard.svelte` | `client/src/lib/components/about/` | Individual waypoint card |
| `TechStackScroll.svelte` | `client/src/lib/components/about/` | 3-row infinite logo scroll |

### New route:
| File | Purpose |
|------|---------|
| `client/src/routes/about/+page.svelte` | About page |
| `client/src/routes/about/+page.ts` | Prerender config + waypoint data |

### Scroll-driven map pattern:
```
IntersectionObserver on .milestone-card elements
  → threshold: 0.5
  → on intersect: map.flyTo({ center, zoom, duration: 2000 })
  → reduced motion: map.jumpTo({ center, zoom })
```

### Key decisions:
- Map is `interactive: false` (no user pan/zoom — scroll controls it)
- Mars waypoint: zoom level ~1 (globe), custom `mapboxgl.Marker` with HTML element
- Mobile: skip Mapbox, render vertical timeline with static location pins
- `prefers-reduced-motion`: check via `window.matchMedia` or Svelte media query

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/routes/about/+page.svelte` | **New** — About page with map journey, tech stack, personal | ~250-350 |
| `client/src/routes/about/+page.ts` | **New** — `export const prerender = true` + waypoint data | ~30 |
| `client/src/lib/components/about/MapJourney.svelte` | **New** — Sticky map + scroll observer + milestone cards | ~150-200 |
| `client/src/lib/components/about/MilestoneCard.svelte` | **New** — Waypoint card component | ~40 |
| `client/src/lib/components/about/TechStackScroll.svelte` | **New** — 3-row infinite scroll with 40+ logos | ~100 |
| `client/src/lib/components/stack/index.ts` | Update — export new logo components | ~20 new lines |
| `client/src/lib/components/stack/*.svelte` | **New** — ~20 new SVG logo components | ~20-40 each |
| `client/src/app.css` | Add infinite-scroll row 3 animation if needed | ~5 |
