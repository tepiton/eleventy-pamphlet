---
phase: 5
phase_name: Maintenance
updated: 2026-10-04
last_commit: fc222b6
---

## Current Focus

npm 12 install-hygiene pass complete (Phase 5); drafts preprocessor
added 2026-10-04 (Entry 2) aligning pamphlet with the shared content
contract. Template is in maintenance mode; utilitarian theme (Phase 4)
remains pamphlet-only.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- pamphlet serves from orobia.lol, port 8086
- `content/` is portable: copy to chapbook unchanged (folio retired
  2026-10-04)
- `draft: true` excluded from production builds (DEC-010); serve mode
  appends "(draft)" to the title
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
sitemap, utilitarian-theme port to chapbook).
