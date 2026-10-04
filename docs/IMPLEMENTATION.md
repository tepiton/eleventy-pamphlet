# Implementation — eleventy-pamphlet

## Phase Overview

| # | Name | Status | Date Range |
|---|------|--------|------------|
| 0 | Foundation | ✅ Complete | 2026-02-23 |
| 1 | Cleanup & Portability | ✅ Complete | 2026-02-25–28 |
| 2 | Alignment | ✅ Complete | 2026-03-01–03 |
| 3 | Schema Parity | ✅ Complete | 2026-03-30 |
| 4 | Utilitarian Theme | ✅ Complete | 2026-09-27 |
| 5 | Maintenance | ✅ Complete | 2026-10-03 |

---

## Completed Phases

### Phase 0: Foundation (2026-02-23)

- Converted `eleventy-base-blog` into minimal literary starter
- Added GitHub Actions workflow for Eleventy deployment
- Set title to Pamphlet, URL to orobia.lol, port 8086
- Two-layout structure: `base.njk` and `chapter.njk` (no home.njk)

See: chronicles/phase-0-foundation.md

### Phase 1: Cleanup & Portability (2026-02-25–28)

- Rewrote README to match repo name and document actual structure
- Added `details/summary` CSS styling for collapsible content
- Parameterized fonts with CSS vars, baked in Typekit kit IDs
- Made `content/` portable across template family
- Aligned font-size clamp to 1rem–1.25rem range

See: chronicles/phase-1-cleanup.md

### Phase 2: Alignment (2026-03-01–03)

- Moved CSS from `content/css/` to root `css/` (skin, not content)
- Moved layouts from `content/includes/` to `_includes/layouts/`
- Created `content/content.11tydata.js` for default layout assignment
- Detected chapters by collection (glob), not `isChapter` flag
- Created separate `chapter.njk` layout aligned with chapbook/folio
- Standardized chapter sort: `order` fallback 999, secondary sort by filename
- Added dark mode with three-way toggle (light/dark/system)
- Updated `about.md` with colophon and GitHub source link

See: chronicles/phase-2-alignment.md

### Phase 3: Schema Parity (2026-03-30)

- Bumped Eleventy from `^3.0.0` to `^3.1.2`
- Dropped `twitter` from metadata, added `subtitle: ""`; reset `image` to `""`
- Removed Twitter meta tags from `base.njk`
- Made `og:image` conditional
- Aligned metadata schema and OG meta with folio and chapbook

See: chronicles/phase-3-parity.md

CI/infra fixes also landed post-Phase-3 (untracked as a phase): GitHub Pages
custom-domain path-prefix logic in `pages.yml`, Node.js version bump, and
`package.json` repo-name correction. See commits `3a1eaa3`..`c6bafa0`.

### Phase 4: Utilitarian Theme (2026-09-27)

- Added `css/utilitarian.css` — plain Helvetica alternative stylesheet, wider
  measure, styled tables; derived from xhosi.dev
- `base.njk` switches stylesheet and skips Typekit load based on
  `metadata.stylesheet`
- Added matching table styles to `css/style.css` for schema parity between
  themes
- Documented the switch in README

See: chronicles/phase-4-utilitarian-theme.md

### Phase 5: Maintenance (2026-10-03)

- npm 12 install hygiene: `.npmrc` with `fund=false` + `audit=false`
  (DEC-009); `allowScripts` verified correct (fsevents only, no sharp
  in this tree)

See: chronicles/phase-5-maintenance.md

---

## Current State

The template family is stable. All three templates (folio, pamphlet, chapbook) share:

- Identical `content/` structure (fully portable)
- Identical metadata schema in `content/_data/metadata.js`
- Identical chapter sort behavior
- Identical OG meta conditional rendering

Pamphlet now additionally supports a `metadata.stylesheet` switch for an
alternate utilitarian theme (not yet ported to folio/chapbook).

---

## Future Phases

### Phase 6: (Unplanned)

Ideas if needed:

- RSS/Atom feed for chapters
- sitemap generation (currently absent — folio has it, pamphlet does not)
- Port utilitarian theme switch to folio/chapbook if adopted there
- Additional CSS literary features
- Pagination for long chapter lists
