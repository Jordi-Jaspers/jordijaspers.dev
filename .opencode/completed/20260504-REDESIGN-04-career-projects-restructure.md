# Career + Projects Restructure

**Completed:** 2026-05-04
**Epic:** REDESIGN
**Source:** `.opencode/refined/REDESIGN-04-work-page.md` (deleted) + ad-hoc scope expansion

## Summary

Split the original `/work` page into two dedicated routes (`/career` + `/projects`), redesigned the home bento grid with animated CareerTile and image-carousel ProjectsTile, and extracted reusable `ImageCarousel` + `Pill` components. Wired real screenshots for Eventify and JFrame logo.

## Final Architecture

| Route | Status |
|-------|--------|
| `/` | Bento grid: CareerTile (animated counters) + ProjectsTile (3-image carousel) + Spotify + TechStack + About |
| `/projects` | 3 ProjectCards: Aniflix (cover), JFrame (contain on dark navy), Eventify (2-image carousel) |
| `/career` | Header → WORKED WITH ribbon → Stats (4) → Timeline (3 milestones) → NotableWork (3 NDA cards) → Certifications (8 badges) → CTA (3 buttons) |
| `/work` | 308 redirect → `/career` |
| `/about` | Untouched (REDESIGN-05 pending) |

**Nav:** Home · Projects · Career · About

## Implementation

### Pages
- **`/career`** — Restructured former `/work` page. Header subline bakes industries: "Seven years of building enterprise systems, leading teams, and shipping AI — across telecom, pensions, and energy." `WORKED WITH` ribbon (VodafoneZiggo · APG · TenneT) directly under header. Stats: 7+ Years, 2+ Years AI/ML, 30+ Projects, 20+ Enterprise Solutions. Timeline: 3 milestones with `employer + clients` line (`Ilionx · VodafoneZiggo, APG, TenneT` on current role). NotableWork: AI Relay (NDA), KirchroaGPT (NDA), Multi-Agent Dev Platform. 8 cert badges. CTA: mailto, resume PDF, LinkedIn.
- **`/projects`** — 3 ProjectCards + footer link to `/career`. Aniflix (Archived), JFrame (Active), Eventify (Active, liveUrl).
- **`/work`** — `+page.server.ts` returns 308 redirect to `/career`, `prerender = false`.
- **`/`** — Bento updated. Mobile row 1 bumped to 400px so Projects tile shows carousel properly.

### Components

**Created:**
- `client/src/lib/components/general/ImageCarousel.svelte` — Reusable image carousel. Props: `images`, `interval`, `imageFit`, `containBg`, `dotsPlacement` (`inside`|`below`|`none`), optional `children` snippet overlay. Respects `prefers-reduced-motion`. Skips rotation when `images.length <= 1`.
- `client/src/lib/components/general/Pill.svelte` — Secondary pill (`bg-secondary text-secondary-foreground rounded-full`).
- `client/src/lib/components/grid/CareerTile.svelte` — Animated counters (0→7+, 0→30+) via IntersectionObserver + requestAnimationFrame. PDF download as in-flow text link bottom-right.
- `client/src/lib/components/grid/ProjectsTile.svelte` — 3-image carousel (`aniflix_web`, `eventify_1`, `eventify_2`).
- `client/src/lib/components/career/NotableWork.svelte` — 3-col cards with NDA/Internal badges, no external links.
- `client/src/lib/components/career/Certifications.svelte` — 8 cert badges (TOGAF, ArchiMate ×2, SvelteKit, Oracle SQL, Oracle DB, Micronaut/Spring, ML Basics).
- `client/src/lib/components/career/ClientRibbon.svelte` — Hairline ribbon, eyebrow `WORKED WITH`, names with `·` separators.
- `client/src/lib/components/career/StatsGrid.svelte` — 4-col / 2x2 grid with surface-grain.

**Renamed:**
- `lib/components/work/` → `lib/components/career/`
- `lib/data/work.ts` → split into `lib/data/career.ts` + `lib/data/projects.ts` (old deleted)
- `routes/work/` → `routes/career/`

**Deleted:**
- `lib/components/grid/ResumeTile.svelte` (replaced by CareerTile)
- `lib/components/grid/WorkTile.svelte` (replaced by ProjectsTile)
- `lib/data/work.ts`

**Modified:**
- `lib/components/career/ProjectCard.svelte` — Uses ImageCarousel; supports `image: string | string[]`, `imageFit: 'cover' | 'contain'`; status badge z-20.
- `lib/components/career/Timeline.svelte` — Uses Pill; renders combined `employer · clients` line; pulse animation on `isPresent`.
- `lib/components/navigation/Nav.svelte` — Added Projects (FolderOpen) + Career (Briefcase) + About (User).
- `routes/+page.svelte` — Bento class names updated; mobile grid row 1 → 400px.

### Images Wired
- `lib/images/eventify_1.webp` (1800×1115, 55KB) + `eventify_2.webp` (40KB) — converted from desktop screenshots via Pillow
- `lib/images/jframe.webp` (800×800, 10KB) — JFrameOSS logo

## Optimizer Pass

Frontend-optimizer extracted `ImageCarousel` + `Pill`. Net LOC: -81 in consumers / +118 in extracted = +37. Eliminated 2 carousel implementations and 3 pill duplications. Bonus: `prefers-reduced-motion` now respected in carousel (was missing in originals).

## Files Modified

Routes: `+page.svelte`, `career/+page.{svelte,ts}`, `projects/+page.{svelte,ts}`, `work/+page.server.ts`
Components: 8 created, 4 renamed/restructured, 5 modified, 2 deleted
Data: `career.ts`, `projects.ts` created, `work.ts` deleted
Images: 3 added (eventify ×2, jframe)

## Tests

N/A — project has no test infrastructure (`screenshot_tests_enabled = false`, no vitest/playwright).

## Verification

| Check | Result |
|-------|--------|
| `bun run check` | ✅ 0 errors, 0 warnings |
| `bun run prettier` | ✅ All formatted |
| `bun run lint` | ✅ 11 errors (all pre-existing baseline) |
| `bun run build` | ✅ All routes prerender (`/`, `/projects`, `/career`, `/about`, `/work` redirect) |

## Deviations

- `Folder` → `FolderOpen` lucide icon (more visually distinct in nav)
- `Github` → `GitBranch`, `Code2` → `Code` (lucide-svelte v1.0.1 doesn't export those)
- Data split between `+page.ts` and `lib/data/` (SvelteKit constraint: `+page.ts` only exports `load()`)
- Hapkido black belt deferred to About page Personal section (not on Career)

## Related Story Updates

- `REDESIGN-05-about-page.md`: Removed Certifications scenario (Scenario 7), lowered estimate XL → L, removed CertBadge component.
