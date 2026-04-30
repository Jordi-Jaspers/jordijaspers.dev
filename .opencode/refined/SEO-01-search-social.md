---
epic: "SEO"
title: "Search Engine & Social Media Optimization"
estimate: S
status: ready
created: 2026-04-30
depends_on: ["MODERNIZE-01-svelte5-migration"]
labels: [frontend, seo, meta]
priority: P2
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** portfolio owner\
**I want** proper SEO metadata, social sharing cards, and search engine discoverability\
**So that** the site appears well in Google results and looks professional when shared on social media\

## 2. Business Context & Value
Currently missing OG tags (poor LinkedIn/Discord previews), no Twitter cards, no sitemap, no structured data. A job portfolio must look polished when shared.

## 3. Acceptance Criteria
* [ ] **Open Graph tags present**
    * Given the page HTML
    * When inspected
    * Then og:title, og:description, og:image, og:url, og:type are all set
* [ ] **Twitter Card tags present**
    * Given the page HTML
    * When inspected
    * Then twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image are set
* [ ] **JSON-LD Person + WebSite schema**
    * Given the page source
    * When parsed
    * Then valid JSON-LD with @type Person (name, jobTitle, url, sameAs) and WebSite exists
* [ ] **Sitemap exists and is referenced**
    * Given /sitemap.xml
    * When fetched
    * Then it returns valid XML with the site URL
    * And robots.txt references it via `Sitemap:` directive
* [ ] **Outdated keywords meta tag removed**
    * Given app.html lines 21-25
    * When inspected
    * Then no `<meta name="keywords">` tag exists
* [ ] **Font loading optimized**
    * Given Google Fonts URL
    * When inspected
    * Then includes `&display=swap`
* [ ] **Social preview image exists**
    * Given /static/og-image.png (or .jpg)
    * When referenced by og:image
    * Then it's a 1200x630 image with name + title + branding

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: N/A
* **Performance**: Font swap prevents FOIT

## 5. Design & UI/UX
- OG image: 1200x630, dark background, name + "Software Engineer" + subtle branding
- Must look good as LinkedIn/Discord/Twitter preview

## 6. Implementation Notes

### Files to create:
| File | Purpose |
|------|---------|
| `client/static/sitemap.xml` | Static sitemap |
| `client/static/og-image.png` | Social sharing preview image |

### Files to modify:
| File | Change |
|------|--------|
| `client/src/app.html` | Add OG, Twitter, JSON-LD; remove keywords; fix font display=swap |
| `client/static/robots.txt` | Add Sitemap directive |
