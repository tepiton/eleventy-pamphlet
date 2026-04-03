# Phase 1: Cleanup & Portability

## Entry 1: README and docs (2026-02-25)

**What**: Rewrote README to correctly document the repo and added chronicle.

**Why**: Initial README had incorrect name and paths.

**How**:

- Corrected title to `eleventy-pamphlet`
- Added fonts, colors, and styles documentation
- Added details/summary CSS styling

**Files**: `README.md`, `docs/CHRONICLE.md`

---

## Entry 2: Fonts and Typekit (2026-02-27)

**What**: Parameterized fonts with CSS vars and baked in Typekit kit IDs.

**Why**: Font configuration was implicit; wanted clear CSS custom properties for theming. See DEC-007.

**How**:

- Added `--font-body` and `--font-heading` CSS custom properties
- Baked Typekit kit IDs `ztn6rcs` and `pgn7ley` into `base.njk` unconditionally
- Set `metadata.url` to `https://orobia.lol/`
- Aligned font-size clamp to 1rem–1.25rem range

**Decisions**: DEC-007

**Files**: `css/style.css`, `_includes/layouts/base.njk`

---

## Entry 3: Content portability (2026-02-28)

**What**: Made `content/` portable across all three templates.

**Why**: Goal was to let users swap templates without touching content. See DEC-001.

**How**:

- Made `content/` the single source of truth for portable content
- Deleted unused blog/feed/tag/post files
- Switched chapters to glob-based collection — see DEC-002

**Decisions**: DEC-001, DEC-002, DEC-003, DEC-004, DEC-005

**Files**: `content/`, `eleventy.config.js`
