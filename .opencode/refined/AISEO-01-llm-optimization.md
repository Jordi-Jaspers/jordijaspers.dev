---
epic: "AISEO"
title: "LLM & AI Search Optimization"
estimate: M
status: ready
created: 2026-04-30
depends_on: ["SEO-01-search-social"]
labels: [frontend, seo, ai]
priority: P3
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** portfolio owner\
**I want** the site optimized for AI crawlers and LLM-based search engines\
**So that** AI assistants (ChatGPT, Perplexity, Google AI) accurately describe me when asked\

## 2. Business Context & Value
AI search is growing. When someone asks "Who is Jordi Jaspers?" to ChatGPT or Perplexity, the answer should be accurate and comprehensive. llms.txt, rich schema, and semantic HTML feed these systems.

## 3. Acceptance Criteria
* [ ] **llms.txt and llms-full.txt served**
    * Given /llms.txt
    * When fetched
    * Then returns structured plaintext with name, title, expertise, projects, contact
    * And /llms-full.txt returns expanded version with detailed descriptions
* [ ] **Rich Person JSON-LD schema**
    * Given the JSON-LD (building on SEO-01's basic schema)
    * When parsed
    * Then includes knowsAbout, hasCredential, alumniOf, worksFor, skills, hasOccupation
* [ ] **Semantic HTML content exists for crawlers**
    * Given the page source
    * When parsed by a text-only crawler
    * Then readable `<article>` sections describe expertise, projects, experience (not just icons)
* [ ] **robots.txt allows AI crawlers**
    * Given robots.txt
    * When inspected
    * Then explicitly allows GPTBot, ChatGPT-User, PerplexityBot, Google-Extended, Anthropic
    * And references llms.txt
* [ ] **FAQ schema markup present**
    * Given page JSON-LD
    * When parsed
    * Then FAQPage schema with 3-5 questions about Jordi Jaspers exists
* [ ] **Consistent entity signals**
    * Given all meta tags, JSON-LD, OG, and content
    * When cross-referenced
    * Then name, title, and key facts are consistent across all sources

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: N/A — all public content
* **Performance**: Static files, no runtime cost

## 5. Design & UI/UX
- Semantic `<article>` sections: visually hidden (sr-only) or styled as subtle content blocks
- Must not clutter the visual bento-grid design

## 6. Implementation Notes

### Files to create:
| File | Purpose |
|------|---------|
| `client/static/llms.txt` | Structured plaintext for LLMs |
| `client/static/llms-full.txt` | Expanded version |

### Files to modify:
| File | Change |
|------|--------|
| `client/src/app.html` | Expand JSON-LD (Person + FAQ), add semantic articles |
| `client/static/robots.txt` | Add AI crawler allow rules + llms.txt reference |
