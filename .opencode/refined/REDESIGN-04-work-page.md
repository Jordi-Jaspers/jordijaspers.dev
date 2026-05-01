---
epic: "REDESIGN"
title: "Work Page — Project Showcases, Career Timeline & Enterprise Highlights"
estimate: L
status: ready
created: 2026-05-01
depends_on: ["REDESIGN-02-layout-routing-navigation"]
labels: [frontend, content, design]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor exploring Jordi's professional work\
**I want** a dedicated Work page showcasing projects, career progression, and enterprise experience\
**So that** I can evaluate his technical depth, growth trajectory, and client-level credibility\

## 2. Business Context & Value
The Work page is the portfolio's core value proposition. It transforms scattered grid tiles into a structured narrative: featured open-source projects with real depth, a career timeline showing junior→lead progression in 6 years, and enterprise client social proof. This page converts curious visitors into potential collaborators or recruiters.

## 3. Acceptance Criteria

* [ ] **Scenario 1**: Featured project cards display correctly
    * Given the visitor navigates to `/work`
    * When the page loads
    * Then 3 project cards render (Aniflix, JFrame, Eventify) with: hero image/placeholder, tagline, tech stack badges, "View Project" external link, and optional expandable detail section

* [ ] **Scenario 2**: Project card hover interactions
    * Given the visitor hovers over a project card
    * When the cursor enters the card area
    * Then a subtle scale + shadow lift animation plays (Japandi micro-animation, smooth easing)

* [ ] **Scenario 3**: Expandable project details
    * Given the visitor clicks "Read More" on a project card
    * When the detail section expands
    * Then 2-3 paragraphs of project description, key features, and GitHub link appear with smooth height transition

* [ ] **Scenario 4**: Career timeline renders with progression
    * Given the visitor scrolls past the featured projects
    * When the career timeline section enters the viewport
    * Then a vertical timeline renders with 4 milestones (Junior 2019–2020, Medior 2020–2022, Senior 2022–2024, Lead+AI 2024–Present), each with title and capability summary

* [ ] **Scenario 5**: Present node is visually distinct
    * Given the timeline is visible
    * When the "2024–Present" node renders
    * Then it has a subtle pulse animation indicating it's the current role

* [ ] **Scenario 6**: Client strip displays enterprise names
    * Given the career timeline is visible
    * When the visitor sees the client strip below the timeline
    * Then VodafoneZiggo, APG, and TenneT names display in a row with the line "Enterprise solutions across telecom, pension, and energy — via Ilionx."

* [ ] **Scenario 7**: Responsive layout
    * Given the visitor is on mobile (<844px)
    * When viewing the Work page
    * Then project cards stack vertically, timeline remains vertical, and all content is readable without horizontal scroll

* [ ] **Scenario 8**: JFrame card without screenshot
    * Given JFrame has no screenshot
    * When the JFrame card renders
    * Then a styled placeholder displays (e.g., code-themed gradient or icon-based visual) that looks intentional, not broken

* [ ] **Scenario 9**: Page is prerenderable
    * Given all content is static
    * When the site builds
    * Then `/work` prerenders successfully with `export const prerender = true`

* [ ] **Edge Case**: Empty/broken image fallback
    * Given a project image fails to load
    * When the browser cannot render the image
    * Then a styled fallback placeholder displays instead of a broken image icon

## 4. Technical Requirements
* **API Changes**: N/A — all content is static/hardcoded
* **Database**: N/A — no schema changes
* **Security**: N/A — public static page
* **Performance**: Page must be fully prerenderable. Images optimized via `@sveltejs/enhanced-img`. Total page weight < 500KB (excluding fonts already cached from home).

## 5. Design & UI/UX

### Page Flow (top to bottom):
1. **Header**: "Selected Work" (Moranga) + intro line (Silka): *"Open-source projects and enterprise solutions I've built."*
2. **Featured Projects**: 3 large cards in responsive grid (2-col desktop, 1-col mobile)
3. **Career Timeline**: Vertical timeline with terracotta accent line, 4 milestone cards
4. **Client Strip**: Horizontal row of client names with consultancy tagline
5. **CTA** (optional): "Want to work together?" → mailto:jordijaspers16@gmail.com

### Project Card Design:
- Rounded corners (--radius-lg), surface-grain background
- Hero area: screenshot or styled placeholder (~16:9 ratio)
- Below hero: tagline (Silka, muted-foreground), tech badges (small pills, secondary bg), action links
- Expand trigger: "Read More" text button, chevron rotates on open

### Career Timeline Design:
- Vertical line in terracotta (--color-primary or accent)
- Milestone nodes: small circles on the line, filled terracotta
- Cards alternate left/right on desktop, all-left on mobile
- Present node: terracotta with subtle pulse animation (var(--ease-smooth), 2s infinite)

### Project Content:

**Aniflix:**
- Tagline: "Ad-free anime streaming with modern UI and quality-of-life features"
- Stack: Spring Boot, SvelteKit, TailwindCSS, MariaDB, Redis, Docker, Cloudflare
- Links: Live (https://aniflix.stream/), GitHub (https://github.com/Jordi-Jaspers/Aniflix)
- Image: existing `aniflix_mobile.webp` or `aniflix_web.webp`
- Detail: Full-stack streaming platform with auth, search, library management, watch history, recommendations, custom video player. Built with Spring Boot backend and SvelteKit frontend. Archived.

**JFrame:**
- Tagline: "Enterprise-grade utilities for Spring Boot and Quarkus applications"
- Stack: Java 21, Spring Boot 4.1, Quarkus 3.20, Gradle, OpenTelemetry
- Links: GitHub (https://github.com/JFrameOSS/JFrame)
- Image: Styled placeholder (no screenshot — it's a framework)
- Detail: Modular Java framework providing structured exception handling, ECS logging, paginated search, OpenTelemetry tracing, fluent validation, and SQL query logging. Multi-module: jframe-core, jframe-spring, jframe-quarkus. Apache 2.0.

**Eventify:**
- Tagline: "Intelligent service monitoring and event management platform"
- Stack: Spring Boot, SvelteKit, TailwindCSS, TimescaleDB, RabbitMQ, Bun
- Links: GitHub (https://github.com/Jordi-Jaspers/Eventify)
- Image: Placeholder (no production screenshot yet)
- Detail: Full-stack monitoring tool for service health tracking, intelligent event creation, organization management, and real-time visualization. Built with TimescaleDB for time-series data and RabbitMQ for async processing.

### Career Timeline Content:

| Period | Title | Capabilities |
|--------|-------|-------------|
| 2019–2020 | Junior Software Engineer | Java/Spring Boot, REST APIs, CI/CD, first enterprise client exposure |
| 2020–2022 | Medior Software Engineer | Microservices architecture, Kubernetes, distributed systems, database design |
| 2022–2024 | Senior Software Engineer | System design, technical leadership, cross-team delivery, mentoring |
| 2024–Present | Lead Engineer & AI Specialist | Team leadership, stakeholder management, LLM training, RAG pipelines, multi-agent orchestration, enterprise AI strategy |

### Client Strip:
VodafoneZiggo · APG · TenneT\
*"Enterprise solutions across telecom, pension, and energy — via Ilionx."*

## 6. Implementation Notes

### New files:
| File | Purpose |
|------|---------|
| `client/src/routes/work/+page.svelte` | Work page component |
| `client/src/routes/work/+page.ts` | Prerender config + project data |
| `client/src/lib/components/work/ProjectCard.svelte` | Reusable project card with expand |
| `client/src/lib/components/work/Timeline.svelte` | Career timeline component |
| `client/src/lib/components/work/ClientStrip.svelte` | Enterprise client names row |

### Existing files to reference:
| File | Why |
|------|-----|
| `client/src/lib/images/aniflix_mobile.webp` | Aniflix screenshot (27KB) |
| `client/src/lib/images/aniflix_web.webp` | Aniflix desktop screenshot (123KB) |
| `client/src/lib/components/grid/aniflix-tile.svelte` | Reference for Aniflix link/image pattern |

### Patterns:
- Use `@sveltejs/enhanced-img` for project screenshots (`?enhanced` imports)
- Tech badges: use `secondary` bg color with `secondary-foreground` text, small rounded pills
- Expand/collapse: Svelte 5 `$state` for open/closed, CSS `grid-template-rows: 0fr → 1fr` transition
- Timeline: CSS Grid or flexbox with `::before` pseudo-element for the vertical line
- All content hardcoded in `+page.ts` as typed data array — no CMS needed
- Prerender: `export const prerender = true` in `+page.ts`

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/src/routes/work/+page.svelte` | NEW — Work page layout | ~200 |
| `client/src/routes/work/+page.ts` | NEW — prerender + project data | ~80 |
| `client/src/lib/components/work/ProjectCard.svelte` | NEW — expandable project card | ~120 |
| `client/src/lib/components/work/Timeline.svelte` | NEW — vertical career timeline | ~100 |
| `client/src/lib/components/work/ClientStrip.svelte` | NEW — client names row | ~30 |
