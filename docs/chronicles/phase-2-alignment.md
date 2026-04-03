# Phase 2: Alignment

## Entry 1: Move CSS and layouts outside content/ (2026-03-01)

**What**: Moved CSS from `content/css/` to root `css/` and layouts from `content/includes/` to `_includes/layouts/`.

**Why**: CSS and layouts are template skin, not portable content. They should live outside `content/` to maintain the portability contract. See DEC-001.

**How**:

- Moved `content/css/style.css` → `css/style.css`
- Moved `content/includes/base.njk` → `_includes/layouts/base.njk`
- Created `content/content.11tydata.js` for default layout assignment
- Removed `isChapter` flag pattern in favor of collection-based detection — see DEC-002

**Decisions**: DEC-001, DEC-002

**Files**: `css/style.css`, `_includes/layouts/base.njk`, `content/content.11tydata.js`

---

## Entry 2: Standardize across template family (2026-03-03)

**What**: Aligned pamphlet with chapbook and folio on chapter sorting, layout, content files, and dark mode.

**Why**: Needed identical behavior for `content/` portability to be complete.

**How**:

- Changed chapter `order` fallback to 999 — see DEC-006
- Added secondary sort by filename for deterministic tie-breaking — see DEC-006
- Created separate `chapter.njk` layout (extracted from base.njk)
- Created `content/chapters/chapters.11tydata.js` for layout assignment
- Added `.chapter-header` and `.chapter-number` CSS
- Updated `about.md` with colophon and GitHub source link
- Added dark mode with three-way toggle (light/dark/system)

**Decisions**: DEC-006

**Files**: `_includes/layouts/chapter.njk`, `content/chapters/chapters.11tydata.js`, `css/style.css`, `eleventy.config.js`
