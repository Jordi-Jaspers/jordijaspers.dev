---
epic: "REDESIGN"
title: "Design System Foundation — Japandi + Terracotta Theme"
estimate: M
status: ready
created: 2026-05-01
depends_on: []
labels: [frontend, design-system, css]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor\
**I want** a warm, refined visual identity with consistent colors, typography, and textures\
**So that** the portfolio feels intentional, cohesive, and distinctly Japandi across all pages and modes\

## 2. Business Context & Value
Foundation story — every subsequent story (layout, pages, components) depends on these tokens being defined. Establishes the Japandi + Terracotta visual direction: warm beige/sand base, charcoal text, terracotta accent, paper-like grain textures, soft rounded corners, and smooth micro-animations. Without this, each story would make ad-hoc styling decisions.

## 3. Acceptance Criteria
* [ ] **Scenario 1: Japandi color tokens replace current theme**
    * Given the app loads in light mode
    * When inspecting `:root` CSS custom properties
    * Then all semantic tokens (background, foreground, card, primary, secondary, muted, accent, border, input, ring, destructive, chart-1–5) use oklch Japandi palette values (warm beige base, charcoal foreground, terracotta primary)
* [ ] **Scenario 2: Warm dark mode**
    * Given the user toggles dark mode
    * When the `.dark` class applies
    * Then background is warm charcoal (not cold blue-black), terracotta accent stays vibrant, muted tones shift warmer
* [ ] **Scenario 3: Typography — two fonts only**
    * Given any page renders
    * When inspecting font usage
    * Then only Moranga (headings via `--font-heading`) and Silka (body via `--font-body`) are used; Montserrat Google Fonts import is removed from `app.html`
* [ ] **Scenario 4: Grain texture utility**
    * Given a surface element has the `.surface-grain` class
    * When rendered in both light and dark mode
    * Then a subtle paper-like noise overlay is visible via CSS-only SVG `feTurbulence` filter, using `mix-blend-mode` for dark mode compatibility
* [ ] **Scenario 5: Radius tokens**
    * Given any card or interactive element
    * When `--radius` is applied
    * Then base radius is ~0.75rem with derived sm/md/lg/xl values for soft Japandi corners
* [ ] **Scenario 6: Animation tokens**
    * Given the `@theme inline` block
    * When inspecting custom properties
    * Then `--ease-smooth`, `--ease-bounce`, `--duration-fast` (150ms), `--duration-normal` (300ms), `--duration-slow` (500ms) are defined and available as Tailwind utilities
* [ ] **Scenario 7: Build passes**
    * Given all token changes are applied
    * When running `bun run build` and `bun run check`
    * Then both pass with zero errors

## 4. Technical Requirements
* **API Changes**: N/A — pure CSS/frontend
* **Database**: N/A
* **Security**: N/A
* **Performance**: Removing Google Fonts CDN call improves LCP. Grain texture must use CSS-only (no image assets). Font files already local (~128KB total).

## 5. Design & UI/UX

### Color Palette (oklch — define exact values during implementation)
| Token | Light | Dark | Notes |
|-------|-------|------|-------|
| background | Warm beige/sand | Warm charcoal | Paper-like feel |
| foreground | Deep charcoal | Off-white cream | High contrast |
| primary | Terracotta | Terracotta (vibrant) | Main accent |
| secondary | Muted sand | Dark warm gray | Subtle surfaces |
| muted | Light warm gray | Medium warm gray | Disabled/secondary text |
| accent | Soft terracotta tint | Warm dark accent | Hover states |
| card | Slightly off-white | Slightly lighter charcoal | Elevated surfaces |
| border | Warm light gray | Warm dark gray | Subtle dividers |

### Typography
| Usage | Font | Weight | Notes |
|-------|------|--------|-------|
| Display/headings | Moranga | normal | `--font-heading` |
| Body/UI/code | Silka | medium | `--font-body`, also `--font-sans` default |

### Grain Texture
- CSS-only via inline SVG `<feTurbulence>` in `background-image`
- Low opacity (~0.03–0.05 light, ~0.02–0.04 dark)
- Applied via `.surface-grain` utility class
- Uses `mix-blend-mode: overlay` (light) / `soft-light` (dark)

### Inspiration
- readyformars.org — minimal, warm, tech badges, timeline feel

## 6. Implementation Notes

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/app.css` | Replace all color tokens (`:root`, `.dark`), update `@theme inline` with oklch colors + easing/duration tokens + font mappings, add `.surface-grain` utility, remove `.regular-text` Montserrat references | ~full rewrite of token section |
| `client/src/app.html` | Remove Google Fonts `<link>` tags (3 lines: preconnect x2 + stylesheet) | Lines 5-7 |
| `client/src/app.css` | Update `@font-face` declarations — rename "Silka Regular" to "Silka" for cleanliness | Font section |

### Patterns to follow:
- Use `oklch()` for all color values (shadcn-svelte v4 convention)
- Keep `@theme inline` block as single source of Tailwind integration
- Easing tokens: `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)`, `--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)`
- Duration tokens go in `@theme inline` as `--duration-*`
- Preserve existing animation keyframes (infinite-x-scroll etc.) — they'll be used by tech stack tile

### Pitfalls:
- shadcn-svelte components reference token names directly (e.g., `bg-primary`). Token names must stay the same, only values change.
- `mode-watcher` uses `.dark` class — keep that convention
- Body background in `app.html` (`bg-[#f7f2f2] dark:bg-[#090c10]`) should switch to `bg-background` to use tokens
