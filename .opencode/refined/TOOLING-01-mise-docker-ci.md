---
epic: "TOOLING"
title: "Developer Tooling Modernization (mise, Docker, CI)"
estimate: M
status: ready
created: 2026-04-30
depends_on: []
labels: [devops, ci, docker]
priority: P1
claimed_by:
claimed_by_date:
---

## 1. User Story
**As a** developer\
**I want** modern tooling with pinned versions, optimized Docker builds, and improved CI\
**So that** builds are reproducible, faster, and the foundation is solid before the Svelte 5 migration\

## 2. Business Context & Value
Sets up infrastructure before the big migration. mise.toml becomes single source of truth for tool versions (no drift between dev/CI). Docker improvements reduce image size and improve security. CI improvements speed up feedback loop.

## 3. Acceptance Criteria
* [ ] **mise.toml exists** with Bun and Node versions pinned
    * Given the project root
    * When a developer runs `mise install`
    * Then correct Bun and Node versions are installed
* [ ] **CI reads versions from mise.toml**
    * Given the GitHub Actions pipeline
    * When it runs setup steps
    * Then Bun version is parsed from mise.toml (not hardcoded)
* [ ] **Docker uses non-root user**
    * Given the production container
    * When it runs
    * Then the process runs as a non-root user (UID 1001)
* [ ] **Docker has health check**
    * Given the running container
    * When Docker checks health
    * Then a HEALTHCHECK directive validates the app is responding
* [ ] **Docker layer caching optimized**
    * Given the Dockerfile
    * When building
    * Then package.json + lockfile are copied before source (cache deps layer)
* [ ] **CI uses GitHub Actions Docker cache**
    * Given the build-push-action
    * When building Docker image
    * Then `cache-from: type=gha` and `cache-to: type=gha,mode=max` are configured
* [ ] **Pipeline builds successfully**
    * Given all changes
    * When CI runs on push
    * Then build passes end-to-end

## 4. Technical Requirements
* **API Changes**: N/A
* **Database**: N/A
* **Security**: Non-root Docker user, no secrets in image layers
* **Performance**: Docker cache should make rebuilds <30s for code-only changes

## 5. Design & UI/UX
N/A — infrastructure only

## 6. Implementation Notes

### Files to create:
| File | Purpose |
|------|---------|
| `mise.toml` | Pin Bun + Node versions |

### Files to modify:
| File | Change |
|------|--------|
| `client/Dockerfile` | Add non-root user, HEALTHCHECK, optimize layer order |
| `.github/workflows/pipeline.yml` | Parse mise.toml for versions, add Docker cache flags |

### Patterns to follow:
- Eventify's mise.toml: `[tools]\nbun = "1.3.11"\nnode = "22.22.2"`
- Eventify's Dockerfile: `RUN addgroup -g 1001 app && adduser -u 1001 -G app -D app`
- CI version parsing: `grep '^bun' mise.toml | sed 's/.*"\([0-9.]*\)".*/\1/'`

### Pitfalls:
- Ensure `svelte-adapter-bun` still works with the non-root user (needs write access to temp dirs)
- Health check endpoint: use `wget --spider http://localhost:3000` (no curl in alpine)
