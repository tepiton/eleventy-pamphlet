# Phase 3: Schema Parity

## Entry 1: Align metadata schema, OG meta, and version (2026-03-30)

**What**: Final alignment pass across all three templates for metadata schema, OG meta, and Eleventy version.

**Why**: Pamphlet, folio, and chapbook had drifted in schema. Needed identical schemas for `content/` portability to be complete. Also bumped Eleventy to latest.

**How**:

- Bumped Eleventy from `^3.0.0` to `^3.1.2`
- Dropped `twitter` field from `content/_data/metadata.js`
- Added `subtitle: ""` to metadata schema
- Reset `image` value to `""`
- Removed Twitter meta tags from `base.njk`
- Made `og:image` conditional — see DEC-008

**Decisions**: DEC-008

**Files**: `content/_data/metadata.js`, `_includes/layouts/base.njk`, `package.json`
