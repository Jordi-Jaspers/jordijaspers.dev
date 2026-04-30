# Project: jordijaspers.dev

**Initialized:** 2026-04-30

## Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| `screenshot_tests_enabled` | `true` | Enable UI validation loop |

## Tech Stack

| Type | Technology | Version |
|------|------------|---------|
| Language | TypeScript | ~5.x |
| Framework | SvelteKit | ^2.7.2 |
| UI Library | Svelte | ^4.2.19 |
| CSS | Tailwind CSS | ^3.x |
| UI Primitives | shadcn-svelte (bits-ui) | ^0.21.16 |
| Icons | lucide-svelte | ^0.390.0 |
| Runtime | Bun | latest |
| Maps | mapbox-gl | ^3.7.0 |
| Grid | svelte-grid-extended | ^1.2.1 |
| Dark Mode | mode-watcher | ^0.3.1 |

## Architecture

### System Overview

Personal portfolio website — single-page SvelteKit app with draggable bento-grid layout. Prerendered static site served via Bun in Docker.

### Project Structure

```
jordijaspers.dev/
├── client/                    # SvelteKit application (all code here)
│   ├── src/
│   │   ├── routes/            # Single page (+page.svelte, +layout.svelte)
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── general/   # Reusable: light-switch, link-button, logos
│   │   │   │   ├── grid/      # Bento grid tiles (intro, map, spotify, etc.)
│   │   │   │   ├── navigation/# Nav bar with tab filtering
│   │   │   │   ├── stack/     # SVG tech stack logos (~25)
│   │   │   │   ├── store/     # LocalStorage store (activeTab)
│   │   │   │   └── ui/        # shadcn-svelte primitives
│   │   │   ├── images/        # Profile pics, project screenshots
│   │   │   └── utils.ts       # shadcn cn() utility
│   │   ├── app.css            # Tailwind + CSS custom properties (HSL, light/dark)
│   │   └── app.d.ts           # TypeScript declarations (GridObject, Coordinates)
│   ├── static/                # Fonts (Moranga, Silka), favicon, resume PDF
│   ├── svelte.config.js       # Bun adapter
│   ├── tailwind.config.ts     # Custom colors, fonts, animations
│   ├── Dockerfile             # Multi-stage Bun build
│   └── package.json           # v2.0.8
├── .github/workflows/
│   ├── pipeline.yml           # CI on master/develop
│   └── release.yml            # Release workflow
```

### Where to Put New Code

| I need to create... | Folder |
|---------------------|--------|
| New grid tile | `client/src/lib/components/grid/` |
| New tech logo SVG | `client/src/lib/components/stack/` |
| Reusable component | `client/src/lib/components/general/` |
| UI primitive | `client/src/lib/components/ui/` |
| New page/route | `client/src/routes/[route]/` |
| Static asset | `client/static/` |
| Global styles | `client/src/app.css` |

### Key Patterns

| Pattern | Usage |
|---------|-------|
| Bento grid | `svelte-grid-extended` with draggable tiles, 4-col/2-col responsive |
| Tab filtering | `activeTab` store filters grid items by category |
| Dark mode | `mode-watcher` + HSL CSS custom properties |
| UI primitives | shadcn-svelte (bits-ui) |
| Prerendering | Static site (`prerender = true`) |
| Layout data | Desktop/mobile coordinate arrays in `+page.ts` |

### Quick Reference

- **Dev:** `bun run dev` (from `client/`)
- **Build:** `bun install && bun run build` (from `client/`)
- **Lint:** `bun run lint` (from `client/`)
- **Check:** `bun run check` (from `client/`)

## Notes

- All code lives in `client/` — root only has CI/CD and repo config
- Svelte 4 (not 5) — uses `export let`, stores, `$:` reactivity (not runes)
- Bun adapter for SSR/serving, but `prerender = true` makes it effectively static
- Custom fonts: Moranga (headings), Silka (body), Montserrat (regular text)
- Grid breakpoint at 844px viewport width
