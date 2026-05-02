# Suggested Story Order — REDESIGN Epic

## Phase 1: Foundation
1. **REDESIGN-01-design-system-foundation.md** (no dependencies)

## Phase 2: Structure
2. **REDESIGN-02-layout-routing-navigation.md** (depends on 01)

## Phase 3: Pages (parallel)
3. **REDESIGN-03-home-page.md** (depends on 02)
4. **REDESIGN-04-work-page.md** (depends on 02)
5. **REDESIGN-05-about-page.md** (depends on 02)

## Phase 4: Enhancement
6. **REDESIGN-06-github-contribution-graph.md** (depends on 04)

## Notes
- Phase 3 stories can be built in parallel — they share no dependencies beyond 02.
- REDESIGN-05 is XL — start it first in Phase 3 if sequential.
- Remember to update Mapbox token in `$lib/config/env` during REDESIGN-05 implementation.
