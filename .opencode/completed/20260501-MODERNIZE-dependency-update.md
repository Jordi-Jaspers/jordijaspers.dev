# Update All Dependencies & Remove Dead Weight

**Completed:** 2026-05-01
**Epic:** MODERNIZE
**Source:** .opencode/refined/MODERNIZE-02-dependency-update.md

## Summary

Updated all 31 dependencies to latest stable versions (12 major bumps) and removed 3 unused packages. Only 2 breaking changes required source fixes.

## Approved Plan

### Requirements Summary

- Remove 3 unused deps: svelte-dnd-action, @fontsource/fira-mono, @neoconfetti/svelte
- Update all deps to latest stable
- Fix breaking changes from major version bumps
- Build passes clean with 0 errors, 0 warnings

### Technical Approach

- Frontend-only: dependency updates + breaking change fixes
- Fix order: vite -> svelte plugin -> typescript -> eslint stack -> component libs
- Verify: `bun run check && bun run build`

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | svelte-frontend-agent | Remove unused deps, update all, fix breaking changes, verify build |

## Implementation

### Dependencies Removed (3)
| Package | Reason |
|---------|--------|
| svelte-dnd-action | Custom drag/drop doesn't use it |
| @fontsource/fira-mono | Fonts via local @font-face + Google CDN |
| @neoconfetti/svelte | No confetti in codebase |

### Major Version Bumps (12)
| Package | Old | New |
|---------|-----|-----|
| vite | ^6.0.0 | ^8.0.10 |
| @sveltejs/vite-plugin-svelte | ^5.0.0 | ^7.0.0 |
| typescript | ^5.6.3 | ^6.0.3 |
| eslint | ^9.13.0 | ^10.2.1 |
| eslint-plugin-svelte | ^2.46.0 | ^3.17.1 |
| eslint-config-prettier | ^9.1.0 | ^10.1.8 |
| globals | ^15.11.0 | ^17.5.0 |
| @eslint/js | ^9.13.0 | ^10.0.1 |
| lucide-svelte | ^0.468.0 | ^1.0.1 |
| mode-watcher | ^0.5.0 | ^1.1.0 |
| tailwind-merge | ^2.5.4 | ^3.5.0 |
| tailwind-variants | ^0.2.1 | ^3.2.2 |

### Breaking Change Fixes
- **mode-watcher v1:** `$mode` -> `mode.current` in sonner.svelte (reactive state object, not store)
- **TypeScript 6:** Added `"ignoreDeprecations": "6.0"` to tsconfig.json (baseUrl deprecation)

### Deviations from Plan
- Also updated tool versions (mise.toml: Bun 1.2.17→1.3.13, Node 22→24) and fixed Dockerfile (stale lockfile name `bun.lockb`→`bun.lock`, removed deleted config files from COPY, updated base image)

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| svelte-frontend-agent | Full dependency update + breaking changes | Complete |

## Files Modified

- `client/package.json` — updated all deps, removed 3 unused
- `client/bun.lock` — regenerated
- `client/src/lib/components/ui/sonner/sonner.svelte` — mode-watcher v1 API fix
- `client/tsconfig.json` — TypeScript 6 compat flag
- `mise.toml` — Bun 1.2.17→1.3.13, Node 22.16.0→24.15.0
- `client/Dockerfile` — base image 1.3.13, lockfile name fix, removed stale config COPY

## Tests

- No tests applicable — verification via `bun run check && bun run build` (0 errors, 0 warnings)
