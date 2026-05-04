---
name: jordijaspers-dev-architecture
description: jordijaspers.dev architecture, folder structure, and system overview. Use when understanding where code belongs or navigating the codebase.
metadata:
  skill-type: architecture
  language: TypeScript
  framework: SvelteKit 2, Svelte 5 (runes), Tailwind CSS v4
  project-type: frontend-only
---

# jordijaspers.dev Architecture

## System Overview

Personal portfolio for Jordi Jaspers. Multi-page SvelteKit app with bento-grid home, dedicated career/projects/about pages. Prerendered static site served via Bun runtime in Docker.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Bento grid home (CareerTile + ProjectsTile + Spotify + TechStack + About) |
| `/projects` | 3 ProjectCards (Aniflix, JFrame, Eventify) |
| `/career` | Header → WORKED WITH ribbon → Stats → Timeline → NotableWork → Certifications → CTA |
| `/about` | Map journey, tech stack scroll, personal (REDESIGN-05 — pending) |
| `/work` | 308 redirect → `/career` (legacy) |

**Nav order:** Home · Projects · Career · About

## Project Structure

```
jordijaspers.dev/
├── client/                              # SvelteKit application
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +layout.svelte           # Nav + Footer + view transitions
│   │   │   ├── +layout.ts               # Global prerender = true
│   │   │   ├── +page.svelte             # Bento grid home
│   │   │   ├── projects/                # /projects
│   │   │   ├── career/                  # /career
│   │   │   ├── about/                   # /about
│   │   │   └── work/+page.server.ts     # 308 → /career
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── general/             # ImageCarousel, Pill, link-button, social logos
│   │   │   │   ├── grid/                # Bento tiles: CareerTile, ProjectsTile, AboutTile, SpotifyTile, TechStackTile
│   │   │   │   ├── career/              # ProjectCard, Timeline, ClientRibbon, StatsGrid, NotableWork, Certifications
│   │   │   │   ├── navigation/          # Nav, Footer
│   │   │   │   ├── stack/               # SVG tech stack logo components
│   │   │   │   ├── store/               # LocalStorage stores
│   │   │   │   └── ui/                  # shadcn-svelte primitives (button, switch, sonner)
│   │   │   ├── data/                    # career.ts, projects.ts (typed static data + load() sources)
│   │   │   ├── images/                  # Project screenshots, logos
│   │   │   └── utils.ts                 # shadcn cn() utility
│   │   ├── app.css                      # Tailwind v4 @theme inline + custom props (light/dark) + surface-grain
│   │   ├── app.html                     # HTML shell
│   │   └── app.d.ts                     # TypeScript declarations
│   ├── static/                          # Fonts (Moranga, Silka), favicon, files/resume.pdf
│   ├── svelte.config.js                 # Bun adapter
│   ├── vite.config.ts                   # Tailwind v4 plugin + enhanced-img
│   └── package.json
├── .opencode/                           # Project orchestration (metadata, refined stories, completed audits)
└── .github/workflows/
```

## Key Patterns

| Pattern | Usage |
|---------|-------|
| Bento grid | Static CSS Grid (no drag) — desktop 4-col, mobile 2-col stacked |
| Routing | Multi-page; root `+layout.ts` sets global prerender |
| View transitions | `onNavigate` + `document.startViewTransition` in root layout |
| Dark mode | `mode-watcher` + CSS custom properties (oklch) |
| State | Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) — NO `export let` or `$:` |
| Reusable carousel | `ImageCarousel` (general/) — auto-rotate, dots, prefers-reduced-motion respected |
| Reusable pill | `Pill` (general/) — secondary tag style |
| Data flow | Static data in `lib/data/*.ts` → imported by `+page.ts` `load()` → typed `PageData` |
| External links | `target="_blank" rel="noopener noreferrer"` + `aria-label` |
| Internal links | `resolve('/path')` from `$app/paths` |

## Where to Put New Code

| I need to create... | Folder |
|---------------------|--------|
| New bento tile | `client/src/lib/components/grid/` |
| New career page section | `client/src/lib/components/career/` |
| New about page section | `client/src/lib/components/about/` (create when needed) |
| New tech logo SVG | `client/src/lib/components/stack/` |
| Reusable component | `client/src/lib/components/general/` |
| UI primitive | `client/src/lib/components/ui/` (use shadcn CLI) |
| New page/route | `client/src/routes/[route]/` |
| Static page data | `client/src/lib/data/` |
| Static asset | `client/static/` |
| Global styles/tokens | `client/src/app.css` |

## Design Tokens (in `app.css`)

- `--color-primary` — terracotta accent (`oklch(58% 0.16 38)` light / `oklch(62% 0.18 38)` dark)
- `--color-secondary`, `--color-card`, `--color-muted-foreground`, `--color-border`
- `--font-heading` Moranga, `--font-body` Silka
- `--radius-sm/md/lg`, `--ease-smooth`, `--duration-normal`
- `.surface-grain` utility for SVG turbulence overlay

## External Services

- **Mapbox GL** — Will power `/about` map journey (REDESIGN-05)
- **Spotify** — Linked profile from SpotifyTile

## Quick Reference

- **Dev:** `bun run dev` (from `client/`)
- **Build:** `bun install && bun run build` (from `client/`)
- **Lint:** `bun run lint`
- **Check:** `bun run check`
- **Format:** `bun run prettier`
- **Docker:** `docker build -t jordijaspers.dev client/`
