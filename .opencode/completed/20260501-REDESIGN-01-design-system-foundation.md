# Design System Foundation — Japandi + Terracotta Theme

**Completed:** 2026-05-01
**Epic:** REDESIGN
**Source:** .opencode/refined/REDESIGN-01-design-system-foundation.md

## Summary

Replaced the entire color system with oklch Japandi palette (warm sand/terracotta light, warm charcoal dark), consolidated typography to two local fonts (Moranga headings + Silka body), added CSS-only grain texture, animation tokens, and soft radius. Removed Google Fonts dependency.

## Approved Plan

### Requirements Summary

- oklch color tokens for Japandi palette (light + warm dark mode)
- Two fonts only: Moranga (headings) + Silka (body), drop Montserrat
- CSS-only grain texture via SVG feTurbulence
- Radius ~0.75rem, easing/duration animation tokens
- Build + check must pass

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | svelte-frontend-agent | Rewrite tokens, update HTML, migrate font refs in 6 components |
| 2 | frontend-optimizer-agent | Review for consistency |

## Implementation

### CSS Tokens (`app.css`)
- All `:root` and `.dark` color values → oklch (hues: 75 sand, 38 terracotta, 60 warm brown)
- `--radius`: 1rem → 0.75rem
- `@theme inline`: added `--ease-smooth`, `--ease-bounce`, `--duration-fast/normal/slow`
- Font tokens: `--font-heading: "Moranga"`, `--font-body: "Silka"`, removed `--font-montserrat`
- `@font-face`: renamed "Silka Regular" → "Silka"
- Added `.surface-grain` utility (feTurbulence, overlay/soft-light blend)
- Removed `.regular-text` class
- `.grid-item`: hardcoded dark bg → `dark:bg-background`

### HTML (`app.html`)
- Removed 3 Google Fonts lines
- Body class: `bg-[#f7f2f2] dark:bg-[#090c10]` → `bg-background`

### Components
- 6 files: `font-montserrat` → `font-body`
- nav-bar: `regular-text` → `font-body`
- spotify-tile: `font-silka` → `font-body`

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| svelte-frontend-agent | Full token rewrite + component updates | Complete |
| frontend-optimizer-agent | Consistency review | All clean, 0 issues |

## Files Modified

- `client/src/app.css` — full token rewrite
- `client/src/app.html` — remove Google Fonts, body bg token
- `client/src/lib/components/grid/introduction-tile.svelte` — font-body
- `client/src/lib/components/grid/tech-stack-tile.svelte` — font-body (×4)
- `client/src/lib/components/grid/resume-tile.svelte` — font-body (×2)
- `client/src/lib/components/grid/spotify-tile.svelte` — font-body (×2)
- `client/src/lib/components/general/link-button.svelte` — font-body
- `client/src/lib/components/navigation/nav-bar.svelte` — font-body (×5)

## Tests

- N/A — pure CSS token changes, no logic
- Build: ✅ pass
- Type check: ✅ 0 errors, 0 warnings
