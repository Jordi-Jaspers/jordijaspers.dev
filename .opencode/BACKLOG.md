# Backlog

Raw ideas and future work. Items here need refinement before development.

---

## Epic: MODERNIZE — Svelte 5 & Tooling Upgrade

### Items

- [ ] **Svelte 5 Migration**: Upgrade from Svelte 4 to Svelte 5. Migrate all components from `export let` → `$props()`, `$:` → `$derived`/`$effect`, stores → `$state` runes. Update `ComponentType` → `Component` in app.d.ts. ~45 components affected.
- [ ] **Tailwind v4 Upgrade**: Migrate from Tailwind CSS 3 → v4. Switch to `@tailwindcss/vite` plugin, `@import "tailwindcss"` syntax, OKLCH colors. Adopt eventify's CSS variable structure.
- [ ] **shadcn-svelte Regeneration**: Update bits-ui 0.21.16 → v2.x, regenerate button/switch/sonner components for Svelte 5 compatibility. Update lucide-svelte, mode-watcher, svelte-sonner.
- [ ] **Dependency Audit & Update**: Update all outdated deps (tailwind-variants, tailwind-merge, @sveltejs/enhanced-img). Verify svelte-grid-extended Svelte 5 compatibility. Fix deprecated `assert { type: 'json' }` → `with { type: 'json' }` in vite.config.ts.

---

## Epic: TOOLING — Developer Experience

### Items

- [ ] **mise.toml Configuration**: Add mise.toml for tool version management (Bun, Node). Parse in CI for single source of truth (adopt eventify pattern).
- [ ] **Docker Improvements**: Add non-root user, health checks, optimize layer caching. Adopt eventify's multi-stage build patterns.
- [ ] **GitHub Actions Improvements**: Read versions from mise.toml, add Docker layer caching (`type=gha`), improve pipeline structure. Add automated changelog generation.

---

## Epic: PERFORMANCE — Critical Fixes

### Items

- [ ] **Kill setInterval(100ms)**: Remove `setInterval(compressGrid, 100)` in +page.svelte:67. Call compressGrid only on resize and tab filter changes. Critical CPU/battery drain.
- [ ] **Fix Memory Leak**: Add unsubscribe for `activeTab.subscribe()` in +page.svelte:81 (missing onDestroy cleanup).
- [ ] **Fix localstorage.ts Type Bug**: Line 35 checks `typeof this.value` (Writable<T>) instead of the actual value — always evaluates to 'object'.

---

## Epic: ACCESSIBILITY — WCAG Compliance

### Items

- [ ] **SVG Logo aria-labels**: Add `aria-label` to 23 SVG logo components in `src/lib/components/stack/`. Currently `role="img"` with no accessible name.
- [ ] **Grid Drag Handle a11y**: Add `aria-label="Drag to reposition tile"` to grip icon in +page.svelte:169.
- [ ] **Semantic Heading Hierarchy**: Add proper h1/h2/h3 structure to grid tiles (currently all `<p>` tags).
- [ ] **Focus Indicators**: Audit and fix keyboard focus visibility across all interactive elements.

---

## Epic: SEO — Search & Social

### Items

- [ ] **Open Graph & Twitter Cards**: Add og:title, og:description, og:image, og:url + Twitter card meta tags in app.html.
- [ ] **Structured Data (JSON-LD)**: Add Person + WebSite schema for rich Google snippets.
- [ ] **Sitemap**: Add sitemap.xml, reference in robots.txt.
- [ ] **Remove Keywords Meta Tag**: Outdated practice (lines 21-25 in app.html), Google ignores it.
- [ ] **Font Loading**: Add `&display=swap` to Google Fonts URL.

---

## Epic: AI SEO — LLM & AI Search Optimization

### Items

- [ ] **llms.txt**: Add `/llms.txt` and `/llms-full.txt` — structured plaintext files that LLMs (ChatGPT, Perplexity, Google AI Overviews) can crawl. Include name, title, expertise, projects, skills, contact. Follow the llms.txt proposal spec.
- [ ] **Rich JSON-LD Person Schema**: Expand structured data beyond basic Person — add `knowsAbout` (AI/ML, distributed systems, cloud), `hasCredential`, `alumniOf`, `worksFor`, `skills`, `hasOccupation` with detailed descriptions. This is what AI models parse for entity understanding.
- [ ] **Semantic HTML Content**: Add crawlable plaintext content (not just visual tiles). AI models need readable paragraphs about expertise, not just icons and hover effects. Add hidden-but-accessible `<article>` sections with detailed descriptions of skills, projects, and experience.
- [ ] **robots.txt for AI Crawlers**: Explicitly allow AI crawlers (GPTBot, ChatGPT-User, PerplexityBot, Google-Extended, Anthropic). Reference llms.txt.
- [ ] **Open Graph + Meta Descriptions for AI**: Craft meta description specifically for AI extraction — include "software engineer", "AI expert", key technologies, location. This is what LLMs use for entity summarization.
- [ ] **FAQ Schema Markup**: Add FAQPage JSON-LD with questions like "Who is Jordi Jaspers?", "What does Jordi Jaspers specialize in?", "What projects has Jordi Jaspers built?" — AI models heavily weight FAQ schema for featured snippets and AI answers.
- [ ] **Canonical Authority Signals**: Ensure consistent name/title across all meta tags, JSON-LD, Open Graph, and content. Link to GitHub, LinkedIn, and any publications. AI models build entity graphs from cross-referencing these signals.

---

## Epic: CONTENT — Portfolio Updates

### Items

- [ ] **Content Refresh**: Update bio, projects, tech stack, experience to reflect current state. This is a job portfolio — make it compelling.
- [ ] **Resume Serving**: Add proper resume/CV serving — either static PDF in `/static/resume.pdf` with download endpoint, or dynamic generation.
- [ ] **Remove Dead Assets**: Delete empty `logo.webp` (0 bytes), optimize `aniflix_web.webp` (123KB → ~60KB).

---

## Epic: CODE QUALITY — Type Safety & Structure

### Items

- [ ] **Refactor app.d.ts**: Remove constructor implementations from .d.ts, use proper `declare class` or interfaces. Move types to dedicated file under `$lib/types/`.
- [ ] **Class-based Stores**: Adopt eventify's class-based `$state` store pattern (e.g., `Localstorage.svelte.ts` with private `$state` + getter/setter).
- [ ] **Environment Config**: Add type-safe env helpers and centralized constants (adopt eventify's `config/` pattern).
