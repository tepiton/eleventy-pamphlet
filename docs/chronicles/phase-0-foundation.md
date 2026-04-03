# Phase 0: Foundation

## Entry 1: Initial setup (2026-02-23)

**What**: Converted `eleventy-base-blog` into a minimal literary starter for single works. Added GitHub Actions CI.

**Why**: Needed a minimal base for literary sites — the "pamphlet" aesthetic: one text, minimal navigation, clean typography. Part of a three-template family (pamphlet, chapbook, folio). See docs/THREE-TAKES.md.

**How**:

- Forked from `eleventy-base-blog`
- Two-layout structure: `base.njk` and `chapter.njk` (no home.njk — pamphlet is simpler)
- Set title=Pamphlet, URL=orobia.lol, port=8086
- Added GitHub Actions workflow for Eleventy deployment to GitHub Pages
- Fixed branch syntax in workflow

**Files**: `eleventy.config.js`, `_includes/layouts/`, `.github/workflows/`
