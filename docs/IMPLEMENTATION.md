# Implementation — eleventy-pamphlet

## Phase Overview

| # | Name | Status | Date Range |
|---|------|--------|------------|
| 0 | Foundation | ✅ Complete | 2026-02-23 |
| 1 | Cleanup & Portability | ✅ Complete | 2026-02-25–28 |
| 2 | Alignment | ✅ Complete | 2026-03-01–03 |
| 3 | Schema Parity | ✅ Complete | 2026-03-30 |

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

---

## Current State

The template family is stable. All three templates (folio, pamphlet, chapbook) share:

- Identical `content/` structure (fully portable)
- Identical metadata schema in `content/_data/metadata.js`
- Identical chapter sort behavior
- Identical OG meta conditional rendering

No active feature work. Future changes should track as Phase 4.

---

## Future Phases

### Phase 4: (Unplanned)

Ideas if needed:

- RSS/Atom feed for chapters
- sitemap generation (currently absent — folio has it, pamphlet does not)
- Additional CSS literary features
- Pagination for long chapter lists
