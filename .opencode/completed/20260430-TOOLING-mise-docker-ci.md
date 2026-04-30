# Developer Tooling Modernization (mise, Docker, CI)

**Completed:** 2026-04-30
**Epic:** TOOLING
**Source:** .opencode/refined/TOOLING-01-mise-docker-ci.md

## Summary

Modernized developer tooling: pinned versions via mise.toml, hardened Docker image (multi-stage, BuildKit cache mounts, non-root, healthcheck, Alpine), and unified CI workflow with GHCR, semver tags, type checks, and auto-generated release notes.

## Implementation

### Infrastructure

- `mise.toml`: Bun 1.2.17, Node 22.16.0
- `client/Dockerfile`: 4-stage build (base→install→build→runtime), BuildKit cache mounts, selective COPY, non-root user (UID 1001), bun -e healthcheck
- `.github/workflows/ci.yml`: Unified workflow replacing pipeline.yml + release.yml
  - Build job: parse Bun from mise.toml, type checks (`bun run check`), build
  - Docker job (develop): GHCR push with `latest-dev` + `dev-<sha>` tags
  - Release job (tags): GHCR push with semver tags, auto-changelog, GitHub Release

### Deviations from Plan

- Consolidated pipeline.yml + release.yml into single ci.yml (ad-hoc improvement)
- Switched from Docker Hub to GHCR (no extra secrets needed)
- Added multi-stage Dockerfile with BuildKit cache mounts (ad-hoc improvement)

## Agents Used

| Agent | Task | Result |
|-------|------|--------|
| github-actions-agent | mise.toml + CI workflows + unified CI | Complete |
| svelte-frontend-agent | Dockerfile optimization | Complete |

## Files Modified

- `mise.toml` - new: pin tool versions
- `client/Dockerfile` - multi-stage, BuildKit cache, selective COPY, non-root, bun healthcheck
- `.github/workflows/ci.yml` - new: unified CI (build + docker + release)
- `.github/workflows/pipeline.yml` - deleted
- `.github/workflows/release.yml` - deleted

## Tests

- No unit tests (infrastructure only)
- Verified via successful `bun install && bun run build`
