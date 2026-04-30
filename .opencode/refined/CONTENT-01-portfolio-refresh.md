---
epic: "CONTENT"
title: "Portfolio Content Refresh & Asset Cleanup"
estimate: S
status: ready
created: 2026-04-30
depends_on: ["A11Y-01-wcag-compliance", "SEO-01-search-social"]
labels: [frontend, content]
priority: P3
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** portfolio owner\
**I want** updated content, a downloadable resume, and clean assets\
**So that** visitors see current experience and can download my CV\

## 2. Business Context & Value
Portfolio content is the product. Outdated bio/projects undermine credibility. Dead assets waste bytes. Resume download is expected by recruiters.

## 3. Acceptance Criteria
* [ ] **Bio and experience updated**
    * Given the portfolio page
    * When a visitor reads the bio tile
    * Then it reflects current role, expertise, and experience
* [ ] **Resume downloadable**
    * Given a visitor clicks a resume/CV link
    * When the request completes
    * Then a PDF downloads with proper Content-Disposition header
* [ ] **Dead assets removed**
    * Given the static directory
    * When inspected
    * Then empty `logo.webp` (0 bytes) is deleted
* [ ] **Large images optimized**
    * Given `aniflix_web.webp`
    * When measured
    * Then file size is ≤80KB without visible quality loss

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: N/A
* **Performance**: Image optimization reduces page weight

## 5. Design & UI/UX
- Resume link: prominent placement (bio tile or nav)
- Content tone: professional but personable

## 6. Implementation Notes

### Files to create:
| File | Purpose |
|------|---------|
| `client/static/resume.pdf` | Downloadable CV |

### Files to modify:
| File | Change |
|------|--------|
| `client/src/routes/+page.ts` | Update bio text, project descriptions |
| `client/src/lib/images/aniflix_web.webp` | Optimize to ≤80KB |

### Files to delete:
| File | Reason |
|------|--------|
| `client/static/images/logo.webp` | Empty file (0 bytes) |
