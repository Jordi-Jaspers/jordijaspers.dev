---
epic: "REDESIGN"
title: "Home Page — Particle Hero with Social Bubbles + Static Bento Navigation"
estimate: L
status: ready
created: 2026-05-01
depends_on: ["REDESIGN-02-layout-routing-navigation"]
labels: [frontend, animation, responsive]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor\
**I want** an engaging home page with an interactive hero and clear navigation tiles\
**So that** I get an immediate sense of Jordi's personality and can navigate to any section quickly\

## 2. Business Context & Value
The home page is the first impression. The particle hero with floating social bubbles creates a memorable, unique experience while the static bento grid provides intuitive navigation to all content areas. Both sections must work seamlessly on desktop and mobile.

## 3. Acceptance Criteria

* [ ] **Scenario 1: Hero section renders with particle canvas**
    * Given I visit the home page
    * When the page loads
    * Then I see a ~85vh hero with a particle/neural-net canvas animation behind "Jordi Jaspers" (Moranga) and "Lead Software Engineer" (Silka) centered text

* [ ] **Scenario 2: Social bubbles float in the hero**
    * Given the hero canvas is rendered
    * When I look at the particle field
    * Then I see 4 larger bubbles (GitHub, LinkedIn, Spotify, Email) drifting gently among abstract particles, each clickable and linking to the correct external URL / mailto

* [ ] **Scenario 3: Desktop mouse interaction**
    * Given I am on desktop
    * When I move my mouse over the canvas
    * Then particles respond to mouse position (repel/attract) and social bubbles have a subtle grow effect on hover

* [ ] **Scenario 4: Mobile hero adaptation**
    * Given I am on a mobile device
    * When the hero renders
    * Then the particle count is reduced, mouse tracking is replaced by gentle drift, and social bubbles are larger and loosely clustered for easy tap targets

* [ ] **Scenario 5: Bento grid below hero with 5 tiles**
    * Given I scroll past the hero
    * When the bento grid is visible
    * Then I see 5 static (non-draggable) tiles: Work (2×2, largest), About (2×1), Spotify (1×1), Tech Stack (1×1), Resume (1×1) in an asymmetric Japandi layout

* [ ] **Scenario 6: Work tile hover preview**
    * Given the bento grid is visible
    * When I hover over the Work tile
    * Then project thumbnails cycle with a crossfade, and clicking navigates to `/work`

* [ ] **Scenario 7: About tile hover preview**
    * Given the bento grid is visible
    * When I hover over the About tile
    * Then a map peek animation plays, and clicking navigates to `/about`

* [ ] **Scenario 8: Spotify tile**
    * Given the bento grid is visible
    * When I view the Spotify tile
    * Then I see album art / now-playing style content, and clicking opens Jordi's Spotify profile externally

* [ ] **Scenario 9: Tech Stack tile as keyword cloud**
    * Given the bento grid is visible
    * When I view the Tech Stack tile
    * Then I see a static keyword cloud of technologies (not scrolling carousels), and clicking navigates to `/about` (tech section)

* [ ] **Scenario 10: Resume tile**
    * Given the bento grid is visible
    * When I click the Resume tile
    * Then `/files/resume.pdf` downloads

* [ ] **Scenario 11: Responsive bento grid**
    * Given I am on mobile (<844px)
    * When the bento grid renders
    * Then tiles reflow to a single-column or 2-column layout with appropriate sizing

* [ ] **Scenario 12: Canvas performance**
    * Given the page is loaded
    * When the canvas animates
    * Then it uses `requestAnimationFrame`, reduces particle count on mobile (via viewport width detection), and does not cause jank or excessive battery drain

## 4. Technical Requirements
* **API Changes**: N/A — no backend
* **Database**: N/A
* **Security**: Mapbox token already exists in env config; no new secrets needed
* **Performance**: Canvas must run at 60fps on desktop, 30fps+ acceptable on mobile. Use `matchMedia` or viewport width to reduce particle count. Lazy-init canvas only when visible (IntersectionObserver optional since hero is above fold).

## 5. Design & UI/UX

**Hero (~85vh):**
- Full-width canvas with particle/neural-net animation (dots + connecting lines)
- 4 social bubbles (GitHub, LinkedIn, Spotify, Email) float among particles — larger than regular dots, with icon inside
- Centered overlay text: "Jordi Jaspers" (Moranga, large) + "Lead Software Engineer" (Silka, muted)
- Top edge of bento grid peeks above fold to invite scrolling
- Background: `--background` color, particles in `--muted-foreground`, connecting lines faint

**Social Bubbles:**
- ~48px diameter desktop, ~56px mobile
- Frosted glass or subtle fill matching design system
- Icon centered, terracotta border or glow on hover
- Gentle sinusoidal drift animation
- Desktop: mouse repel/attract on nearby particles
- Mobile: no mouse tracking, larger tap targets, loose cluster layout

**Bento Grid:**
- Static tiles (no drag-and-drop), clean Japandi spacing
- Asymmetric: Work (2×2) dominates, About (2×1), three 1×1 tiles
- Tiles use `--card` background, `--radius-lg` corners, subtle shadow
- Hover: subtle scale (1.02) + content preview animations
- Gap: 16px (matches design system spacing)

**Dark Mode:**
- Particles lighter on dark background
- Tile colors follow design system tokens
- Social bubble icons invert appropriately

## 6. Implementation Notes

**Files to create:**
| File | Purpose |
|------|---------|
| `client/src/lib/components/hero/ParticleCanvas.svelte` | Canvas component with particle system + social bubbles |
| `client/src/lib/components/grid/WorkTile.svelte` | New — thumbnail cycling, links to /work |
| `client/src/lib/components/grid/AboutTile.svelte` | New — map peek, links to /about |

**Files to refactor:**
| File | Change |
|------|--------|
| `client/src/lib/components/grid/SpotifyTile.svelte` | Restyle, link to Spotify profile |
| `client/src/lib/components/grid/TechStackTile.svelte` | Replace scrolling carousels with keyword cloud |
| `client/src/lib/components/grid/ResumeTile.svelte` | Restyle for new design |

**Files to remove/deprecate:**
- `client/src/lib/components/grid/GithubTile.svelte` (moved to hero bubble)
- `client/src/lib/components/grid/LinkedInTile.svelte` (moved to hero bubble)
- `client/src/lib/components/grid/IntroductionTile.svelte` (replaced by hero text)
- `client/src/lib/components/general/light-switch.svelte` (moved to nav in REDESIGN-02)
- `client/src/lib/components/navigation/nav-bar.svelte` (replaced by Nav.svelte in REDESIGN-02)
- Remove `svelte-grid-extended` dependency (no more drag grid)

**Patterns:**
- Use `<canvas>` with 2D context for particle system, not a library
- Particle class: position, velocity, radius, type (dot | social)
- Connection lines: draw between particles within threshold distance
- Mouse interaction: track pointer position, apply force to nearby particles
- Mobile detection: `window.matchMedia('(max-width: 843px)')` or check viewport width
- Social bubble click: use invisible `<a>` overlays positioned over canvas bubble coordinates (for accessibility)
- Bento grid: CSS Grid (not svelte-grid-extended), static layout with `grid-template-areas`

**Accessibility:**
- Social links in hero must be keyboard-navigable — use real `<a>` elements positioned over bubble locations
- `aria-label` on each social link
- Canvas should have `role="img"` with `aria-label` describing the animation
- Respect `prefers-reduced-motion`: disable particle animation, show static social icons instead

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/routes/+page.svelte` | Full rewrite — hero section + static bento grid | ~307 → ~150 |
| `client/src/routes/+page.ts` | Rewrite — 5-tile static layout data | ~46 → ~20 |
| `client/src/lib/components/grid/SpotifyTile.svelte` | Restyle for new design, link to Spotify profile | ~60 |
| `client/src/lib/components/grid/TechStackTile.svelte` | Replace scrolling carousels with keyword cloud | ~80 |
| `client/src/lib/components/grid/ResumeTile.svelte` | Restyle for new design | ~40 |
| `client/package.json` | Remove `svelte-grid-extended` dependency | 1 |
