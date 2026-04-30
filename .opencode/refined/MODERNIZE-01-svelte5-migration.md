---
epic: "MODERNIZE"
title: "Svelte 5 + Tailwind v4 Full Migration"
estimate: XL
status: ready
created: 2026-04-30
depends_on: ["TOOLING-01-mise-docker-ci"]
labels: [frontend, migration, svelte5, tailwind4]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** developer\
**I want** the portfolio fully migrated to Svelte 5, Tailwind v4, and modern dependencies\
**So that** the codebase uses current best practices and is maintainable long-term\

## 2. Business Context & Value
Core modernization — everything downstream (a11y, SEO, content) builds on this. Svelte 5 runes replace stores/reactive statements. Tailwind v4 simplifies CSS pipeline. New grid library replaces abandoned svelte-grid-extended. Performance fixes (setInterval, memory leak) are resolved naturally during rewrite.

## 3. Acceptance Criteria

### Svelte 5 Migration
* [ ] **All components use $props()** instead of `export let`
    * Given any component file
    * When inspected
    * Then no `export let` declarations exist; all use `let { ... } = $props()`
* [ ] **All local stores replaced with $state runes**
    * Given +page.svelte, map-tile, tech-stack-tile, nav-bar
    * When inspected
    * Then `writable()` is replaced with `$state()`, no svelte/store imports for local state
* [ ] **All reactive statements migrated**
    * Given `$:` reactive blocks
    * When migrated
    * Then they use `$derived` (for computed) or `$effect` (for side effects)
* [ ] **Global stores use class-based pattern**
    * Given activeTab and isDarkMode stores
    * When inspected
    * Then they use `Localstorage.svelte.ts` pattern with private `$state` + getter/setter
* [ ] **ComponentType → Component**
    * Given app.d.ts
    * When inspected
    * Then uses `import('svelte').Component` and proper `declare class` or interface syntax
* [ ] **No setInterval for grid compression**
    * Given the mounted page
    * When idle
    * Then no recurring timer runs; compressGrid called only on resize and tab changes
* [ ] **No memory leaks from subscriptions**
    * Given reactive subscriptions
    * When component unmounts
    * Then all effects are properly cleaned up (no manual subscribe without unsubscribe)

### Tailwind v4
* [ ] **Uses @tailwindcss/vite plugin**
    * Given vite.config.ts
    * When inspected
    * Then imports `@tailwindcss/vite` and includes in plugins array; PostCSS config removed
* [ ] **Uses @import "tailwindcss" syntax**
    * Given app.css
    * When inspected
    * Then single `@import "tailwindcss"` replaces `@tailwind base/components/utilities`
* [ ] **CSS variables use OKLCH where appropriate**
    * Given the color system
    * When inspected
    * Then semantic tokens use OKLCH or HSL consistently (no mixed systems without reason)

### Dependencies & Grid
* [ ] **bits-ui updated to v2.x+**
    * Given package.json
    * When inspected
    * Then bits-ui >= 2.0.0
* [ ] **shadcn-svelte components regenerated**
    * Given button, switch, sonner components
    * When inspected
    * Then they use Svelte 5 syntax ($props, event attributes, no $$restProps)
* [ ] **All companion deps updated**
    * Given lucide-svelte, mode-watcher, svelte-sonner, tailwind-variants, tailwind-merge, enhanced-img
    * When inspected
    * Then all at latest major versions compatible with Svelte 5
* [ ] **svelte-grid-extended replaced with svelte-dnd-action + CSS Grid**
    * Given the bento grid layout
    * When a user drags a tile
    * Then it repositions with auto-reflow, same UX as current
* [ ] **Grid is responsive**
    * Given different viewport sizes
    * When resizing
    * Then columns adjust (4 cols desktop, 2 cols mobile) with items reflowing
* [ ] **Deprecated import assertion fixed**
    * Given vite.config.ts
    * When inspected
    * Then uses `with { type: 'json' }` not `assert`
* [ ] **localstorage.ts type bug fixed**
    * Given the localStorage utility
    * When checking string type
    * Then checks the actual value, not the Writable wrapper

### Build
* [ ] **App builds without errors**
    * Given `bun run build`
    * When executed
    * Then exits 0 with no TypeScript or Svelte errors
* [ ] **App runs correctly in dev and preview**
    * Given `bun run dev` and `bun run preview`
    * When loaded in browser
    * Then all tiles render, drag works, theme toggle works, map loads

## 4. Technical Requirements
* **API Changes**: N/A — static site
* **Database**: N/A
* **Security**: N/A
* **Performance**: No recurring timers; grid compression on-demand only

## 5. Design & UI/UX
- Bento grid must retain drag-and-drop repositioning with dynamic reflow
- Visual appearance should remain identical (same tiles, colors, spacing)
- Dark/light mode toggle must continue working
- Map tile must still load Mapbox with style switching

## 6. Implementation Notes

### Big bang approach — single branch:
1. Update all deps in package.json first
2. Regenerate shadcn components (`npx shadcn-svelte@latest add button switch sonner`)
3. Migrate Tailwind v3 → v4 (app.css + vite.config.ts + remove postcss)
4. Replace svelte-grid-extended with svelte-dnd-action + custom CSS Grid reflow
5. Migrate components file-by-file (props → stores → reactive → events)
6. Fix type declarations in app.d.ts
7. Build and manually test all interactions

### Files to create:
| File | Purpose |
|------|---------|
| `client/src/lib/stores/localstorage.svelte.ts` | Class-based $state localStorage (replaces localstorage.ts) |
| `client/src/lib/components/grid/bento-grid.svelte` | New CSS Grid + svelte-dnd-action layout |

### Files to modify (MANDATORY):
| File | Change |
|------|--------|
| `client/package.json` | Update all deps, replace svelte-grid-extended with svelte-dnd-action |
| `client/vite.config.ts` | @tailwindcss/vite plugin, fix import assertion |
| `client/src/app.css` | Tailwind v4 syntax, OKLCH colors |
| `client/src/app.d.ts` | ComponentType→Component, declare class syntax |
| `client/src/routes/+page.svelte` | $state runes, remove setInterval, svelte-dnd-action grid |
| `client/src/lib/components/grid/map-tile.svelte` | $props, $state, $derived, $effect |
| `client/src/lib/components/grid/tech-stack-tile.svelte` | $props, $state |
| `client/src/lib/components/navigation/nav-bar.svelte` | $props, $state |
| `client/src/lib/components/general/link-button.svelte` | $props |
| `client/src/lib/components/ui/button/button.svelte` | Regenerated |
| `client/src/lib/components/ui/switch/switch.svelte` | Regenerated |
| `client/src/lib/components/ui/sonner/sonner.svelte` | Regenerated |
| All 23 files in `client/src/lib/components/stack/` | $props (className pattern) |
| `client/src/lib/components/store/localstorage.ts` | Replace with .svelte.ts version |

### Files to delete:
| File | Reason |
|------|--------|
| `client/postcss.config.js` | Not needed with Tailwind v4 Vite plugin |
| `client/src/lib/components/store/localstorage.ts` | Replaced by .svelte.ts |

### Patterns to follow:
- Eventify's class-based store: private `$state` + getter/setter in `.svelte.ts`
- Eventify's Tailwind v4: `@import "tailwindcss"` + `@custom-variant dark`
- svelte-dnd-action: `use:dndzone={{ items }}` + `on:consider` / `on:finalize`

### Pitfalls:
- svelte-dnd-action uses different API than svelte-grid-extended (items array, not coordinates)
- Grid reflow logic must be custom — calculate x/y/w/h from drag position
- bits-ui v2 has breaking API changes — don't manually migrate, regenerate via CLI
- Test Mapbox flyTo in $effect — may need cleanup function to avoid stale closures
