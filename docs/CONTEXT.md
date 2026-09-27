---
phase: 4
phase_name: Utilitarian Theme
updated: 2026-09-27
last_commit: ee9b5e5
---

## Current Focus

Added a selectable second stylesheet theme (utilitarian: plain Helvetica, wide page, styled tables) alongside the default literary theme. Switch lives in `content/_data/metadata.js`.

## Active Tasks

- [ ] No active tasks — theme switch is complete and committed

## Blockers

None.

## Context

- pamphlet serves from orobia.lol, port 8086
- `content/` is portable: copy to chapbook or folio unchanged
- `metadata.stylesheet` selects `/css/<value>.css`; unset/default loads `style.css` + Typekit; `"utilitarian"` skips Typekit
- CI/infra fixes for GitHub Pages custom domains landed between Phase 3 and 4 (commits `3a1eaa3`..`c6bafa0`), not tracked as their own phase
- Utilitarian theme not yet ported to folio/chapbook

## Next Session

No active work queued. If adopting the utilitarian theme family-wide, port `css/utilitarian.css` and the `base.njk` switch to folio and chapbook. Otherwise check `docs/IMPLEMENTATION.md` Phase 5 ideas (RSS/Atom feed, sitemap).
