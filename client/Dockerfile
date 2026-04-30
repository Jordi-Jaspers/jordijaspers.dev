# syntax=docker/dockerfile:1
# =============================================================================
# JORDIJASPERS.DEV - SVELTEKIT WITH BUN
# Multi-stage build: install → build → lean runtime
#
# Key decisions:
#   - Alpine base: small image, no native glibc deps needed
#   - BuildKit cache mounts on bun install for fast rebuilds
#   - Selective COPY in build stage to avoid cache busting
#   - svelte-adapter-bun produces self-contained build (no node_modules at runtime)
# =============================================================================

FROM oven/bun:1.2.17-alpine AS base
WORKDIR /app

LABEL description="The portfolio website of Jordi Jaspers."
LABEL maintainer="Jordi Jaspers"

# ---------------------------------------------------------------------------
# Stage 1: Install dependencies
# ---------------------------------------------------------------------------
FROM base AS install

COPY package.json bun.lockb ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# ---------------------------------------------------------------------------
# Stage 2: Build the SvelteKit application
# ---------------------------------------------------------------------------
FROM base AS build

COPY --from=install /app/node_modules node_modules
COPY package.json bun.lockb svelte.config.js tsconfig.json postcss.config.js tailwind.config.ts vite.config.ts ./
COPY src/ src/
COPY static/ static/

ENV NODE_ENV=production
RUN bun run build

# ---------------------------------------------------------------------------
# Stage 3: Minimal production image
# ---------------------------------------------------------------------------
FROM base AS runtime

# Create non-root user (UID/GID 1001)
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup appuser

WORKDIR /app

ENV VITE_ENV='production' \
    VITE_PORT=3000

# Copy only the self-contained build output (svelte-adapter-bun bundles everything)
COPY --from=build --chown=appuser:appgroup /app/build .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
    CMD bun -e "await fetch('http://localhost:3000').then(r => { if (!r.ok) process.exit(1) })" || exit 1

USER appuser

CMD ["bun", "./index.js"]
