---
epic: "MODERNIZE"
title: "Update All Dependencies & Remove Dead Weight"
estimate: S
status: ready
created: 2026-05-01
depends_on: ["MODERNIZE-01-svelte5-migration"]
labels: [frontend, dependencies, maintenance]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** developer maintaining jordijaspers.dev\
**I want** all dependencies updated to latest stable versions with unused packages removed\
**So that** the project stays secure, performant, and lean

## 2. Business Context & Value
After the Svelte 5 + Tailwind v4 migration, package.json still has minimum viable versions (e.g., svelte ^5.0.0 when ^5.55.5 exists) and 3 unused dependencies. Multiple major version bumps available (Vite 6→8, TypeScript 5→6, lucide-svelte 0.x→1.x). Staying current reduces security risk and ensures access to bug fixes.

## 3. Acceptance Criteria
* [ ] **Remove unused dependencies**
    * Given the current package.json
    * When I check imports across the codebase
    * Then `svelte-dnd-action`, `@fontsource/fira-mono`, and `@neoconfetti/svelte` are removed
* [ ] **All dependencies at latest stable versions**
    * Given `npx npm-check-updates`
    * When I run it against the updated package.json
    * Then no major/minor updates are available
* [ ] **Breaking changes resolved**
    * Given major bumps: Vite 8, @sveltejs/vite-plugin-svelte 7, TypeScript 6, lucide-svelte 1.x, mode-watcher 1.x, tailwind-merge 3, tailwind-variants 3, svelte-adapter-bun 1.x, eslint 10, eslint-config-prettier 10, eslint-plugin-svelte 3, globals 17, prettier-plugin-tailwindcss 0.8
    * When I update each package
    * Then all code changes needed for breaking APIs are applied
* [ ] **Build passes clean**
    * Given the updated dependencies
    * When I run `bun run check && bun run build`
    * Then 0 errors, 0 warnings
* [ ] **Bun lockfile regenerated**
    * Given removed + updated deps
    * When I run `bun install`
    * Then `bun.lock` is regenerated cleanly

## 4. Technical Notes

### Dependencies to REMOVE (3)
| Package | Reason |
|---------|--------|
| `svelte-dnd-action` | Custom drag/drop in +page.svelte doesn't use it |
| `@fontsource/fira-mono` | Fonts loaded via local @font-face + Google CDN |
| `@neoconfetti/svelte` | No confetti effects in codebase |

### Major Version Bumps Requiring Attention
| Package | Current | Target | Risk |
|---------|---------|--------|------|
| `vite` | ^6.0.0 | ^8.x | Config API changes, plugin compat |
| `@sveltejs/vite-plugin-svelte` | ^5.0.0 | ^7.x | Must match Vite version |
| `typescript` | ^5.6.3 | ^6.x | Possible type-checking stricter |
| `lucide-svelte` | ^0.468.0 | ^1.x | Import paths may change |
| `tailwind-merge` | ^2.5.4 | ^3.x | API changes |
| `tailwind-variants` | ^0.2.1 | ^3.x | Major rewrite possible |
| `mode-watcher` | ^0.5.0 | ^1.x | API surface may change |
| `svelte-adapter-bun` | ^0.5.2 | ^1.x | Config changes |
| `eslint` | ^9.13.0 | ^10.x | Config format changes |
| `eslint-config-prettier` | ^9.1.0 | ^10.x | Compat with eslint 10 |
| `eslint-plugin-svelte` | ^2.46.0 | ^3.x | Rule changes |
| `globals` | ^15.11.0 | ^17.x | Export changes |

### Safe Minor/Patch Bumps (no breaking changes expected)
All other deps: @sveltejs/enhanced-img, bits-ui, @sveltejs/kit, svelte, svelte-check, clsx, mapbox-gl, svelte-sonner, prettier, prettier-plugin-svelte, tslib, typescript-eslint, @types/*

## 5. Out of Scope
- Adding new dependencies
- Changing build tooling (staying with Bun + Vite)
- Fixing mapbox integration (separate backlog item)
- Any UI/feature changes

## 6. Implementation Strategy
1. Remove 3 unused deps
2. Apply all updates (bun update --latest or manual package.json edit + bun install)
3. Fix breaking changes in order: vite → svelte plugin → typescript → eslint stack → component libs
4. Verify: `bun run check && bun run build`

## 7. Test Impact Analysis
No existing tests affected — this is a dependency-only change. Verification is build + type-check passing.
