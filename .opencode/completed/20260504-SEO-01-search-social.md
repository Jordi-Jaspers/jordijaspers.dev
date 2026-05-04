---
epic: "SEO"
title: "Search Engine & Social Media Optimization"
estimate: S
status: completed
created: 2026-04-30
completed: 2026-05-04
depends_on: ["MODERNIZE-01-svelte5-migration"]
labels: [frontend, seo, meta]
priority: P2
---

## 1. User Story
**As a** portfolio owner\
**I want** proper SEO metadata, social sharing cards, and search engine discoverability\
**So that** the site appears well in Google results and looks professional when shared on social media

## 2. Business Context & Value
Currently missing OG tags (poor LinkedIn/Discord previews), no Twitter cards, no sitemap, no structured data. A job portfolio must look polished when shared.

## 3. Acceptance Criteria — Status

| AC | Status | Notes |
|----|--------|-------|
| Open Graph tags present (og:title, og:description, og:image, og:url, og:type) | ✅ | Plus og:image:width/height/alt, og:locale, og:site_name |
| Twitter Card tags present (summary_large_image, title, description, image) | ✅ | Plus twitter:image:alt |
| JSON-LD Person + WebSite schema | ✅ | Single `@graph` with linked Person ↔ WebSite via @id |
| Sitemap exists and referenced via robots.txt | ✅ | `client/static/sitemap.xml` + `Sitemap:` directive in robots.txt |
| Outdated `<meta name="keywords">` removed | ✅ | Block removed from app.html |
| Font loading optimized (display=swap) | ✅ | Added `font-display: swap` to local @font-face (Moranga + Silka) — story said Google Fonts, project uses local fonts |
| Social preview image exists at `/og-image.png` | ⏳ | Tags reference `/og-image.png`; binary asset to be provided by user (TODO comment in app.html) |

## 4. Implementation

### Files modified
| File | Change |
|------|--------|
| `client/src/app.html` | Removed `<meta name="keywords">`; added Open Graph block (9 tags), Twitter Card block (5 tags), and JSON-LD `@graph` (Person + WebSite) |
| `client/src/app.css` | Added `font-display: swap` to both `@font-face` declarations |
| `client/static/robots.txt` | Appended `Sitemap: https://jordijaspers.dev/sitemap.xml` |

### Files created
| File | Purpose |
|------|---------|
| `client/static/sitemap.xml` | Minimal valid sitemap, single root URL, monthly changefreq, priority 1.0 |

### Verification
- `bun run check`: 0 errors, 0 warnings
- `bun run build`: ✓ built in 4.59s

### Deviation from story
Story acceptance criterion mentioned Google Fonts `&display=swap`. Project uses **local @font-face** rules, not Google Fonts. Adapted: applied `font-display: swap` to local declarations (same SEO/perf intent — prevents FOIT).

## 5. Follow-ups
- [ ] Design + drop in `client/static/og-image.png` (1200×630, name + "Software Engineer" + branding)
- [ ] Verify socials with LinkedIn Post Inspector + Twitter Card Validator + Google Rich Results Test once deployed
- [ ] Consider per-route OG overrides if/when more pages are added (currently single set covers `/`, `/career`, `/projects`, `/about`)
