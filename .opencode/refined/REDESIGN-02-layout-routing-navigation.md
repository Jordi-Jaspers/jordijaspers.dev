---
epic: "REDESIGN"
title: "Layout, Routing & Navigation — Multi-Page with Scroll-Morph Nav"
estimate: L
status: ready
created: 2026-05-01
depends_on: ["REDESIGN-01-design-system-foundation"]
labels: [frontend, layout, navigation, view-transitions]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor\
**I want** a multi-page site with smooth navigation and a distinctive morphing nav bar\
**So that** I can explore different sections fluidly while experiencing a memorable, polished interaction\

## 2. Business Context & Value
Converts the single-page bento grid into a multi-page architecture (Home, Work, About). Introduces the scroll-aware morphing nav — the site's signature interaction. Establishes the shared layout shell (nav + footer) and view transitions that all page stories build upon.

## 3. Acceptance Criteria
* [ ] **Scenario 1: Multi-page routing**
    * Given the app is loaded
    * When navigating to `/`, `/work`, or `/about`
    * Then each route renders its own page component with prerendering enabled
* [ ] **Scenario 2: Scroll-morph nav — desktop expanded state**
    * Given the user is at the top of any page
    * When the nav bar is visible
    * Then it shows full-width bar with "JORDI JASPERS" left, "Work · About" right, dark mode toggle far-right
* [ ] **Scenario 3: Scroll-morph nav — desktop collapsed state**
    * Given the user scrolls down >100px
    * When the nav morphs
    * Then it smoothly transitions to a centered floating pill with "JJ · Work · About 🌙", frosted glass/grain background, subtle shadow
* [ ] **Scenario 4: Scroll-morph nav — mobile bottom bar**
    * Given the user is on mobile
    * When viewing the bottom nav pill
    * Then it shows icons (Home, Work, About) that expand to labels when tapped/at rest, contracts to icons on scroll
* [ ] **Scenario 5: Active page indicator**
    * Given the user is on a specific page
    * When viewing the nav
    * Then the active item has a terracotta underline/indicator that slides with view transitions
* [ ] **Scenario 6: View transitions — crossfade**
    * Given the user clicks a nav link
    * When the page changes
    * Then content crossfades (~300ms) using the View Transitions API, and the nav pill persists across transitions via `view-transition-name`
* [ ] **Scenario 7: Footer — minimal**
    * Given any page is rendered
    * When scrolling to the bottom
    * Then a minimal footer shows social icons (LinkedIn, GitHub, Spotify, email mailto) + "© 2026 Jordi Jaspers"
* [ ] **Scenario 8: Dark mode persists**
    * Given the user toggles dark mode on any page
    * When navigating to another page
    * Then dark mode state persists (mode-watcher already handles this)
* [ ] **Scenario 9: Build passes**
    * Given all routing and layout changes
    * When running `bun run build` and `bun run check`
    * Then both pass with zero errors and all routes are prerendered

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: N/A
* **Performance**: Nav morph uses CSS transitions only (no JS animation libraries). View transitions use native browser API with SvelteKit's `onNavigate` hook. Frosted glass via `backdrop-filter: blur()`. All routes prerendered.

## 5. Design & UI/UX

### Nav — Desktop Expanded (scroll position < 100px)
```
┌─────────────────────────────────────────────────────┐
│  J O R D I   J A S P E R S        Work  About   🌙 │
└─────────────────────────────────────────────────────┘
```
- Full-width, transparent background
- Name in Moranga (spaced tracking), nav links in Silka
- Terracotta sliding underline on active item

### Nav — Desktop Collapsed (scroll position ≥ 100px)
```
         ╭───────────────────────╮
         │  JJ · Work · About 🌙│
         ╰───────────────────────╯
```
- Centered floating pill
- Frosted glass + `.surface-grain` texture from REDESIGN-01
- Subtle shadow, soft rounded corners (design system radius)
- "JJ" monogram in Moranga, links in Silka
- Smooth CSS transition between states (~`var(--duration-normal)`)

### Nav — Mobile Bottom Bar
```
     ╭──────────────────╮
     │  🏠   💼   👤    │  (scrolling — icons only)
     ╰──────────────────╯

     ╭──────────────────╮
     │ Home Work  About │  (at rest — labels visible)
     ╰──────────────────╯
```
- Floating pill at bottom, same frosted glass treatment
- Icons: use Lucide icons (already in deps)
- Active item: terracotta fill/underline

### Footer
```
┌─────────────────────────────────────────────────────┐
│      [Li]  [GH]  [🎵]  [✉]   ·  © 2026 Jordi      │
└─────────────────────────────────────────────────────┘
```
- Social icons as subtle icon buttons
- Generous top margin (Japandi whitespace)
- Uses design system tokens throughout

### View Transitions
- Crossfade: `::view-transition-old(root)` and `::view-transition-new(root)` with opacity animation
- Nav pill: `view-transition-name: nav` — persists/morphs across page changes
- Duration: `var(--duration-normal)` (300ms)

## 6. Implementation Notes

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/routes/+layout.svelte` | Add nav component, footer component, view transition `onNavigate` hook, slot for page content | Full rewrite (~14→~40 lines) |
| `client/src/routes/+layout.ts` | Add `export const prerender = true` if not already global | New or modify |
| `client/src/routes/+page.svelte` | Strip down to Home page placeholder (actual home content is a later story) | Simplify significantly |
| `client/src/routes/work/+page.svelte` | Create Work page placeholder | New file |
| `client/src/routes/about/+page.svelte` | Create About page placeholder | New file |
| `client/src/lib/components/navigation/` | New: `Nav.svelte` (scroll-morph nav), `Footer.svelte` (minimal footer) | New files, replace existing nav-bar |
| `client/src/app.css` | Add view transition CSS (`::view-transition-old/new`), frosted glass utility, nav transition styles | Append ~30 lines |
| `client/src/app.html` | Update `<title>` to be generic (pages set own titles via `<svelte:head>`) | Minor edit |

### Patterns to follow:
- SvelteKit view transitions via `onNavigate` in layout:
  ```ts
  import { onNavigate } from '$app/navigation';
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  ```
- Scroll detection: `$effect` with `window.scrollY` or `IntersectionObserver` — prefer CSS `scroll-driven-animations` if browser support is acceptable, otherwise JS scroll listener with `requestAnimationFrame`
- Use design system tokens from REDESIGN-01: `--ease-smooth`, `--duration-normal`, `--radius-lg`, colors
- Mobile detection: CSS media queries (`max-width: 844px` — existing breakpoint), not JS

### Pitfalls:
- View Transitions API not supported in Firefox yet — must gracefully degrade (just instant navigation, no transition)
- `backdrop-filter: blur()` can be expensive on low-end mobile — keep blur radius small (8-12px)
- Scroll morph must not cause layout shift — use `position: fixed` for nav
- Existing `svelte-grid-extended` and tab filtering in `+page.svelte` will be removed (bento grid is rebuilt in Home page story)
