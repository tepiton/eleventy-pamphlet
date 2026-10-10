---
phase: 5
phase_name: Maintenance
updated: 2026-10-09
last_commit: bf6a17c
---

## Current Focus

Phase 5 maintenance: npm 12 hygiene, drafts preprocessor (Entry 2),
xhosi.com changes (Entry 3, DEC-011; 2e141b8 kept on main), and on
2026-10-09 the folio references purged from living docs (Entry 4),
completing the 2026-10-04 folio retirement. Utilitarian theme
(Phase 4) remains pamphlet-only.

## Active Tasks

- [ ] None — drop `audit=false` from `.npmrc` when eleventy 4 ships
      (DEC-009).

## Blockers

None.

## Context

- pamphlet serves from orobia.lol, port 8086
- `content/` is portable: copy to chapbook unchanged; folio retired
  2026-10-04 and purged from README/CLAUDE.md 2026-10-09 (Entry 4)
- `draft: true` excluded from production builds (DEC-010); serve mode
  appends "(draft)" to the title
- `metadata.stylesheet` selects `/css/<value>.css`; unset/default loads
  `style.css` + Typekit; `"utilitarian"` skips Typekit (Phase 4)
- npm 12: `allowScripts` pins `fsevents@2.3.3` only — no sharp in this
  tree
- Remaining audit findings are braces→chokidar, dev-server-only and
  unfixable on eleventy 3; hidden from install output only (DEC-009)
- `metadata.sortBy = "date"` opts into a newest-first feed by last git
  commit (needs `fetch-depth: 0` in CI); default sort unchanged
  (DEC-011). `stylesheet` also accepts `"spine"` / `"log"`
- markdown-it `breaks: true`; headings get GitHub-style ids
- Chapter sort: `order` fallback 999; OG image conditional on
  `metadata.image`

## Next Session

Nothing queued. Phase 6 ideas in `docs/IMPLEMENTATION.md` (RSS,
sitemap, utilitarian-theme port to chapbook).
