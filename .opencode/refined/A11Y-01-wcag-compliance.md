---
epic: "A11Y"
title: "WCAG Accessibility Compliance"
estimate: M
status: ready
created: 2026-04-30
depends_on: ["MODERNIZE-01-svelte5-migration"]
labels: [frontend, accessibility, wcag]
priority: P2
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** visitor using assistive technology\
**I want** the portfolio to be fully navigable and understandable\
**So that** I can access all content regardless of ability\

## 2. Business Context & Value
WCAG 2.1 AA compliance. Screen readers currently announce 23 images with no context. Grid drag handles are invisible to keyboard users. No heading hierarchy means no landmark navigation.

## 3. Acceptance Criteria
* [ ] **All 23 SVG logos have aria-labels**
    * Given a screen reader on the tech stack section
    * When it encounters a logo
    * Then it announces the technology name (e.g., "Docker logo")
* [ ] **Grid drag handles are accessible**
    * Given a keyboard user on a grid tile
    * When they focus the drag handle
    * Then it announces "Drag to reposition tile" and supports keyboard interaction
* [ ] **Semantic heading hierarchy exists**
    * Given the page structure
    * When inspected
    * Then there is one h1 (name/title), h2 for tile sections, h3 for tile titles
* [ ] **Focus indicators are visible on all interactive elements**
    * Given keyboard navigation
    * When tabbing through buttons, links, switches, tiles
    * Then each shows a visible focus ring (WCAG 2.4.7)
* [ ] **External links indicate behavior**
    * Given links that open in new tabs
    * When inspected
    * Then they have `aria-label` including "opens in new tab" or a visual indicator

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: N/A
* **Performance**: N/A

## 5. Design & UI/UX
- Focus rings: 2px offset, uses primary color, visible in both light/dark mode
- External link indicator: small icon or sr-only text suffix

## 6. Implementation Notes

### Files to modify:
| File | Change |
|------|--------|
| All 23 files in `client/src/lib/components/stack/` | Add `aria-label` to SVG elements |
| `client/src/routes/+page.svelte` | Add heading hierarchy, accessible drag handles |
| `client/src/app.css` | Add focus-visible ring styles |
| `client/src/lib/components/general/link-button.svelte` | Add external link indicator |

### Patterns:
- SVG: `<svg role="img" aria-label="Docker logo">`
- Focus: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
- Headings: h1 for name → h2 per section → h3 per tile title
