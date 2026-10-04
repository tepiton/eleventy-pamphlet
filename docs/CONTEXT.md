---
phase: 5
phase_name: Maintenance
updated: 2026-10-03
last_commit: 0df4ebe
---

## Current Focus

npm 12 install-hygiene pass complete (Phase 5): fresh installs are
silent. Template is in maintenance mode; utilitarian theme (Phase 4)
remains pamphlet-only.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- pamphlet serves from orobia.lol, port 8086
- `content/` is portable: copy to chapbook or folio unchanged
- `metadata.stylesheet` selects `/css/<value>.css`; unset/default loads
  `style.css` + Typekit; `"utilitarian"` skips Typekit (Phase 4)
- npm 12: `allowScripts` pins `fsevents@2.3.3` only — no sharp in this
  tree
- Remaining audit findings are braces→chokidar, dev-server-only and
  unfixable on eleventy 3; hidden from install output only (DEC-009)
- Chapter sort: `order` fallback 999; OG image conditional on
  `metadata.image`

## Next Session

Nothing queued. Phase 6 ideas in `docs/IMPLEMENTATION.md` (RSS,
sitemap, utilitarian-theme port to folio/chapbook).
