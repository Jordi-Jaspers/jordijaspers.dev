---
epic: "SEO"
title: "Post-Deploy SEO Validation Checklist"
estimate: S
status: ready
created: 2026-05-04
depends_on: ["SEO-01-search-social"]
labels: [seo, ops, validation, manual]
priority: P3
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** portfolio owner\
**I want** to verify SEO + social metadata renders correctly on real third-party crawlers after deploying SEO-01\
**So that** LinkedIn/Discord/Twitter previews look polished and Google indexes the site with rich results

## 2. Business Context & Value
SEO-01 added all the meta tags, JSON-LD, and sitemap — but local Lighthouse can't verify how LinkedIn, Twitter, Discord, Slack, or Google's crawlers actually render the page. This story is the post-deploy verification pass: prove the work landed correctly on production and submit the site to Google for indexing. Also delivers the missing `og-image.png` asset that SEO-01 left as a TODO.

## 3. Acceptance Criteria

* [ ] **og-image.png exists in production**
    * Given a freshly deployed site
    * When `https://jordijaspers.dev/og-image.png` is fetched
    * Then it returns a 1200×630 PNG (or JPG) showing name + "Software Engineer" + branding
    * And the file is < 300 KB
* [ ] **Google Rich Results Test passes**
    * Given the deployed home page URL
    * When tested at https://search.google.com/test/rich-results
    * Then `Person` and `WebSite` items are detected with **0 errors**
    * Screenshot of result attached to PR / completion doc
* [ ] **Schema.org Validator passes**
    * Given the deployed home page URL
    * When validated at https://validator.schema.org/
    * Then 0 errors, 0 warnings on the JSON-LD `@graph`
* [ ] **LinkedIn Post Inspector renders correctly**
    * Given the deployed home page URL
    * When inspected at https://www.linkedin.com/post-inspector/
    * Then preview shows og:title, og:description, og:image with no broken-image placeholder
    * Screenshot attached
* [ ] **Meta/Facebook Sharing Debugger refreshed**
    * Given the deployed home page URL
    * When scraped at https://developers.facebook.com/tools/debug/
    * Then OG cache is purged (Scrape Again clicked) and preview shows correct og:image
    * Confirms cache cleared for first-time shares
* [ ] **Discord/Slack unfurl tested**
    * Given the deployed URL is pasted into Discord and Slack
    * When the message is sent
    * Then both clients show og:title, og:description, og:image (large image card)
* [ ] **Sitemap submitted to Google Search Console**
    * Given Google Search Console site verification is in place
    * When `https://jordijaspers.dev/sitemap.xml` is submitted via Sitemaps section
    * Then status shows "Success" and discovered URLs ≥ 1
* [ ] **Site indexable status confirmed**
    * Given Google Search Console > URL Inspection
    * When `https://jordijaspers.dev/` is inspected
    * Then status shows "URL is on Google" OR an indexing request has been submitted

## 4. Technical Requirements
* **API Changes**: N/A — no code changes
* **Database**: N/A
* **Security**: N/A — read-only validation against deployed site
* **Performance**: og-image.png should be optimized (< 300 KB) to keep social preview load fast

## 5. Design & UI/UX
**og-image.png design brief:**
- Dimensions: 1200×630 (Open Graph + Twitter summary_large_image standard)
- Background: dark (matches site theme — Japandi + Terracotta palette from app.css)
- Content:
  - "Jordi Jaspers" (Moranga font, large)
  - "Software Engineer" (Silka, smaller)
  - Optional: subtle terracotta accent, profile picture or geometric branding
- Format: PNG preferred (transparency support); JPG acceptable if smaller
- Safe zone: keep critical text in center 1080×500 (LinkedIn crops edges on mobile)

Inspiration: https://www.opengraph.xyz/ for live testing

## 6. Implementation Notes

### File to create:
| File | Purpose |
|------|---------|
| `client/static/og-image.png` | 1200×630 social preview image |

### Code references already in place (from SEO-01):
- `client/src/app.html` lines 22, 34, 48 reference `https://jordijaspers.dev/og-image.png`
- TODO comment at `app.html:19` to remove once asset is dropped in

### After dropping og-image.png:
1. Remove the TODO comment at `client/src/app.html:19`
2. Run `bun run build` to verify image is included in `client/build/client/og-image.png`
3. Deploy via existing CI (push to master triggers `.github/workflows/pipeline.yml`)
4. Wait for deploy to complete, then run validators below

### Validator workflow (run in this order):
1. Hit `https://jordijaspers.dev/og-image.png` directly in browser — confirm image loads
2. Google Rich Results Test → fix any JSON-LD errors → re-deploy if needed
3. Schema.org Validator → strict check (catches things Google ignores)
4. Meta Sharing Debugger → click "Scrape Again" twice (first call caches, second confirms)
5. LinkedIn Post Inspector → if image missing, wait 5 min and retry (LinkedIn has its own cache)
6. Paste URL in Discord + Slack DMs to self → screenshot
7. Google Search Console → submit sitemap → request indexing on home URL

### Pitfalls:
- **OG cache:** Facebook + LinkedIn cache OG data aggressively. Use their debuggers' "refresh"/"scrape again" to invalidate. First share after deploy may show stale data — always pre-warm via debugger.
- **Image absolute URL required:** og:image must be a full URL (`https://jordijaspers.dev/og-image.png`), not relative — already correct in app.html.
- **Search Console verification:** Requires DNS TXT record or HTML file upload. If not yet verified, this becomes a sub-task (~5 min).
- **No screenshot tests configured** (`screenshot_tests_enabled: false`) — validation evidence is manual screenshots attached to the completed/ doc.

## 7. Test Impact Analysis
N/A — no code changes, no automated tests. This story is validation + asset delivery only.

### Files to modify (MANDATORY):
| File | Change | Lines |
|------|--------|-------|
| `client/static/og-image.png` | Create — 1200×630 PNG asset | — |
| `client/src/app.html` | Remove TODO comment after asset is in place | 19 |
