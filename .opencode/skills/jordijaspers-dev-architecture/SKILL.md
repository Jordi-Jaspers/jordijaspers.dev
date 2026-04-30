---
name: jordijaspers-dev-architecture
description: jordijaspers.dev architecture, folder structure, and system overview. Use when understanding where code belongs or navigating the codebase.
metadata:
  skill-type: architecture
  language: TypeScript
  framework: SvelteKit 2, Svelte 4, Tailwind CSS
  project-type: frontend-only
---

# jordijaspers.dev Architecture

## System Overview

Personal portfolio website for Jordi Jaspers. Single-page SvelteKit app with a draggable bento-grid layout. Prerendered static site served via Bun runtime in Docker.

## Project Structure

```
jordijaspers.dev/
├── client/                    # SvelteKit application (all code lives here)
│   ├── src/
│   │   ├── routes/            # Single page: +page.svelte, +layout.svelte
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── general/   # Reusable: light-switch, link-button, social logos
│   │   │   │   ├── grid/      # Bento grid tiles (introduction, map, spotify, etc.)
│   │   │   │   ├── navigation/# Nav bar with tab filtering
│   │   │   │   ├── stack/     # SVG tech stack logo components (~25 logos)
│   │   │   │   ├── store/     # LocalStorage store (activeTab)
│   │   │   │   └── ui/        # shadcn-svelte primitives (button, switch, sonner)
│   │   │   ├── images/        # Profile pics, project screenshots
│   │   │   └── utils.ts       # shadcn cn() utility
│   │   ├── app.css            # Tailwind + CSS custom properties (light/dark)
│   │   ├── app.html           # HTML shell
│   │   └── app.d.ts           # TypeScript declarations (GridObject, Coordinates)
│   ├── static/                # Fonts (Moranga, Silka), favicon, resume PDF
│   ├── svelte.config.js       # Bun adapter (svelte-adapter-bun)
│   ├── tailwind.config.ts     # Custom colors (HSL vars), fonts, animations
│   ├── components.json        # shadcn-svelte config
│   ├── Dockerfile             # Multi-stage Bun build
│   └── package.json           # v2.0.8
├── .github/workflows/
│   ├── pipeline.yml           # CI: bun install + build on master/develop
│   └── release.yml            # Release workflow
└── README.md
```

## Key Patterns

| Pattern | Usage |
|---------|-------|
| Bento grid | `svelte-grid-extended` with draggable/compressible tiles |
| Responsive layout | 4-col desktop / 2-col mobile, breakpoint at 844px |
| Tab filtering | `activeTab` store filters grid items by category |
| Dark mode | `mode-watcher` + CSS custom properties (HSL) |
| UI primitives | shadcn-svelte (bits-ui based) |
| Prerendering | `export const prerender = true` — static site |
| Grid data | Layout defined in `+page.ts` with desktop/mobile coordinate arrays |

## Where to Put New Code

| I need to create... | Folder |
|---------------------|--------|
| New grid tile | `client/src/lib/components/grid/` |
| New tech logo SVG | `client/src/lib/components/stack/` |
| Reusable component | `client/src/lib/components/general/` |
| UI primitive | `client/src/lib/components/ui/` (use shadcn CLI) |
| New page/route | `client/src/routes/[route]/` |
| Static asset | `client/static/` |
| Global styles | `client/src/app.css` |

## External Services

- **Mapbox GL** — Interactive map tile
- **Spotify** — Embedded/linked content in spotify tile

## Quick Reference

- **Dev:** `bun run dev` (from `client/`)
- **Build:** `bun install && bun run build` (from `client/`)
- **Lint:** `bun run lint` (from `client/`)
- **Check:** `bun run check` (from `client/`)
- **Docker:** `docker build -t jordijaspers.dev client/`
