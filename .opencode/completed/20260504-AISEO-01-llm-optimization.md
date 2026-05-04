# LLM & AI Search Optimization

**Completed:** 2026-05-04
**Epic:** AISEO
**Source:** `.opencode/refined/AISEO-01-llm-optimization.md` (deleted on completion)

## Summary

Made jordijaspers.dev discoverable and accurately describable by AI crawlers and LLM-based search engines (ChatGPT, Perplexity, Google AI, Claude). Added llms.txt + llms-full.txt structured plaintext, expanded Person JSON-LD with rich entity signals (knowsAbout, hasCredential, alumniOf, worksFor, hasOccupation, address), added FAQPage schema, semantic sr-only article block for text-only crawlers, and explicit AI bot allow rules in robots.txt.

## Approved Plan

### Requirements Summary

1. Serve `/llms.txt` (concise) + `/llms-full.txt` (expanded) with structured bio, expertise, projects, contact.
2. Expand existing Person JSON-LD with `knowsAbout`, `hasCredential`, `alumniOf`, `worksFor`, `hasOccupation`, `address`, `email`.
3. Add FAQPage JSON-LD (3–5 Q&As).
4. Add semantic `<article>` content readable by text-only crawlers (sr-only).
5. Update `robots.txt` to allow named AI bots; reference `llms.txt`.
6. Cross-source consistency (name, title, employer match across all artifacts).

### Technical Approach

- **Static files only** — no backend, no Svelte components, no routing changes.
- **Greenfield contract test** — single Vitest file (`client/src/lib/seo/llm-seo.spec.ts`) reads static files + parses JSON-LD from app.html, asserts contract for each acceptance criterion.
- **Additive JSON-LD expansion** — preserved SEO-01's Person + WebSite nodes; expanded Person; added FAQPage as third `@graph` node.
- **Semantic article in app.html template** — `<article class="sr-only" aria-hidden="true">` placed in `<body>` so text-only crawlers see real content even before SvelteKit hydrates the prerendered page (Tailwind 4 built-in `sr-only` utility).
- **Skipped optimizer phases** — no code logic to refactor (static content + JSON only). No frontend phase (no components added). No UI polish (`screenshot_tests_enabled: false`).

### Execution Order

| Phase | Agent | Task |
|-------|-------|------|
| 1 | typescript-testing-agent | Wrote 65 contract tests (all initially red) |
| 2 | svelte-frontend-agent | Created llms.txt, llms-full.txt; expanded JSON-LD in app.html; added semantic sr-only article; updated robots.txt — all 65 tests green |

## Implementation

### Static Content

- **`client/static/llms.txt`** (~30 lines, llms.txt convention with H1/H2 markdown headers): name, role, employer, location, projects section with one-line descriptions + URLs, contact section, canonical URL, reference to `/llms-full.txt`.
- **`client/static/llms-full.txt`** (~200 lines): expanded bio, full project descriptions (JFrame, Eventify, Aniflix, AI Relay, KirchroaGPT, Multi-Agent Dev Platform), career timeline (Junior 2018→Medior 2021→Lead 2024), categorized expertise (Languages, Frameworks, Databases, DevOps, AI/ML), FAQ section, education (UHasselt/KULeuven MSc + Hanyang exchange), certifications, notable clients (VodafoneZiggo, APG, TenneT), stats (7+ years, 30+ projects, 15+ engineers led), 3rd Degree Black Belt Hapkido.

### robots.txt

Preserved existing `User-agent: *` / `Disallow:` block + `Sitemap:` directive. Added explicit `User-agent` + `Allow: /` blocks for 7 AI bots (canonical capitalization): `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `Google-Extended`, `anthropic-ai`, `ClaudeBot`, `CCBot`. Added `# LLM discovery: /llms.txt and /llms-full.txt` comment.

### app.html JSON-LD (`@graph`, 3 nodes)

- **Person** (expanded from SEO-01): kept `@id`, `name`, `jobTitle`, `url`, `image`, `sameAs`. Added `email` (mailto:), `birthPlace` (Hasselt, Belgium), `address` (Maastricht/NL PostalAddress), `knowsAbout` (13 expertise strings), `hasCredential` (5 EducationalOccupationalCredential entries — TOGAF, ArchiMate Foundation/Practitioner, SvelteKit Certified, Oracle SQL), `alumniOf` (UHasselt + KULeuven + Hanyang EducationalOrganization objects), `worksFor` (Ilionx Organization), `hasOccupation` (Occupation with Maastricht occupationLocation + skills), `description`.
- **WebSite** (preserved as-is from SEO-01).
- **FAQPage** (new): `mainEntity` array of 4 Question/acceptedAnswer objects — Who is Jordi? / What does he do? / Where based? / What technologies?

### app.html Semantic Article

Inserted `<article class="sr-only" aria-hidden="true">` immediately after `<body data-sveltekit-preload-data="hover">`, before `%sveltekit.body%`. Contains 5 `<section>` blocks (About, Expertise, Notable Projects, Experience, Contact) with the canonical bio facts. Hidden visually (Tailwind `sr-only`) and from screen readers (`aria-hidden="true"` — the bento grid already conveys this content visually); purely for text-only crawlers parsing the prerendered HTML before JS runs.

### Deviations from Plan

None. Followed plan exactly. Optimizer phases intentionally skipped (no logic to refactor — pure static content/template). One post-implementation cleanup: ran `prettier --write` on the new spec file (auto-format only, no semantic changes).

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| deep-research-agent (×2 parallel) | Research existing SEO setup + extract portfolio facts | Complete — sourced canonical data |
| typescript-testing-agent | 65 contract tests at `src/lib/seo/llm-seo.spec.ts` | Complete — TDD red |
| svelte-frontend-agent | llms.txt, llms-full.txt, robots.txt, app.html JSON-LD + sr-only article | Complete — TDD green, build passes |

## Files Modified

- `client/static/robots.txt` — added 7 AI bot Allow blocks + `/llms.txt` reference comment
- `client/src/app.html` — expanded JSON-LD `@graph` (Person enriched, FAQPage added), inserted sr-only `<article>` semantic block in body

## Files Created

- `client/static/llms.txt` — concise LLM discovery file
- `client/static/llms-full.txt` — expanded bio + projects + FAQ + experience
- `client/src/lib/seo/llm-seo.spec.ts` — 65-test contract suite

## Tests

- 65 tests written, 65 passing (`bun run test src/lib/seo/llm-seo.spec.ts`)
- Coverage: llms.txt structure (10), llms-full.txt structure (8), robots.txt AI bot allow rules (16), JSON-LD validity + Person/WebSite/FAQPage shape (~25), semantic article block (4), cross-source consistency (3)

## Verification

- `bun run test` — all SEO tests pass
- `bun run check` — clean (zero TS/Svelte errors)
- `bun run build` — prerender succeeds (validates HTML well-formedness in app.html)
- `bun run lint` — prettier clean; 11 pre-existing ESLint errors in unrelated files (Footer, Nav, ProjectCard, link-button, +error, career/+page, localstorage.svelte.ts) — **zero new errors introduced by this story**

## Follow-ups

- [ ] After deploy, validate with Google Rich Results Test (Person + FAQPage)
- [ ] After deploy, verify llms.txt is publicly fetchable: `curl https://jordijaspers.dev/llms.txt`
- [ ] Monitor AI assistant queries ("Who is Jordi Jaspers?") on ChatGPT / Perplexity / Claude over coming weeks for accuracy
- [ ] Consider future: per-route OG overrides + per-route structured data (e.g., `BreadcrumbList`, `CollectionPage` for /projects)
- [ ] Pre-existing lint debt (11 errors) is out-of-scope for this story but warrants a separate cleanup ticket
