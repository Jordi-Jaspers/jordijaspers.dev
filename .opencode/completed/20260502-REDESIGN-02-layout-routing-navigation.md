# Layout, Routing & Navigation — Multi-Page with Scroll-Morph Nav

**Completed:** 2026-05-02
**Epic:** REDESIGN
**Source:** .opencode/refined/REDESIGN-02-layout-routing-navigation.md

## Summary

Converted single-page bento grid app to multi-page SvelteKit site with `/`, `/work`, `/about` routes. Added floating pill navigation (bottom mobile, top desktop) with frosted glass + grain texture, crossfade view transitions, and minimal footer with social links.

## Approved Plan

### Requirements Summary

- Multi-page routing with prerendering (/, /work, /about)
- Floating pill nav: bottom on mobile, top on desktop
- JJ/House icon + Work + About links + dark mode toggle
- Active link: terracotta highlight with bg-primary/10 pill
- Crossfade view transitions (300ms) via SvelteKit onNavigate
- Nav persists across transitions (view-transition-name: nav)
- Minimal footer: LinkedIn, GitHub, Spotify, email + © 2026
- Dark mode persists via mode-watcher + localStorage

### Technical Approach

- Frontend only, no backend
- All positioning in Svelte `<style>` block (unlayered CSS beats Tailwind's @layer utilities)
- `transform: translateX(-50%)` for centering (avoids Tailwind v4 `translate` property issues)

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | svelte-frontend-agent | Build layout, routes, Nav, Footer, view transitions |
| 2 | frontend-optimizer-agent | Review, fix $app/stores→$app/state, remove dead exports |
| 3 | orchestrator | Fix nav positioning (Tailwind v4 @layer specificity issue) |

## Implementation

### Routes Created
- `routes/+layout.ts` — `export const prerender = true` (global)
- `routes/+page.svelte` — Home placeholder
- `routes/work/+page.svelte` — Work placeholder
- `routes/about/+page.svelte` — About placeholder

### Components Created
- `Nav.svelte` — Floating pill nav with all positioning in `<style>` block, crossfade theme toggle animation, active link detection via `$app/state`
- `Footer.svelte` — Social icons (LinkedIn, GitHub, Spotify, email mailto) + copyright

### Key Decisions
- **Nav positioning in `<style>` block, not Tailwind utilities** — Svelte scoped styles are unlayered CSS, which has higher cascade priority than Tailwind's `@layer utilities`. Mixing both caused positioning bugs across all browsers.
- **`transform: translateX(-50%)` instead of Tailwind's `-translate-x-1/2`** — Tailwind v4 uses CSS `translate` property which depends on `@property` declarations; `transform` is more reliable cross-browser.
- **Deleted old `nav-bar.svelte`** — Replaced by Nav.svelte, no longer imported anywhere.
- **Deleted `+page.ts`** — Grid layout data no longer needed (grid rebuilt in REDESIGN-03).

### Deviations from Plan

- Original story specified expanded→collapsed scroll morphing. Simplified to single pill (always visible) per user preference during implementation.
- Mobile bottom / desktop top positioning required moving all layout CSS out of Tailwind utilities into Svelte `<style>` block due to cascade layer specificity.

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| svelte-frontend-agent | Build all routes, Nav, Footer, view transitions | Complete |
| frontend-optimizer-agent | Review, fix Svelte 5 patterns | Complete |
| deep-research-agent | Research codebase state, CSS specificity issue | Complete |

## Files Modified

- `client/src/routes/+layout.svelte` — Rewritten: Nav + Footer + onNavigate view transitions
- `client/src/routes/+layout.ts` — New: global prerender
- `client/src/routes/+page.svelte` — Stripped to Home placeholder
- `client/src/routes/+page.ts` — Deleted
- `client/src/routes/work/+page.svelte` — New: Work placeholder
- `client/src/routes/about/+page.svelte` — New: About placeholder
- `client/src/lib/components/navigation/Nav.svelte` — New: floating pill nav
- `client/src/lib/components/navigation/Footer.svelte` — New: social footer
- `client/src/lib/components/navigation/index.ts` — Updated exports (Nav + Footer)
- `client/src/lib/components/navigation/nav-bar.svelte` — Deleted
- `client/src/app.css` — Added view transition keyframes
- `client/src/app.html` — Simplified title

## Tests

- 0 new tests (CSS/layout story, no business logic)
- 11 pre-existing Playwright infrastructure errors (unrelated)
