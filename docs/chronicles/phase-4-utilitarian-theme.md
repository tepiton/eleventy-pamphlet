# Phase 4: Utilitarian Theme

## Entry 1: Add selectable utilitarian stylesheet (2026-09-27)

**What**: Added a second stylesheet theme (`css/utilitarian.css`) selectable
via a metadata key, alongside the existing default literary theme.

**Why**: Some sites using this template want a plain, wide, table-friendly
look instead of the Stickley/Kabel literary design — without forking the
template or touching layouts.

**How**:

- `css/utilitarian.css`: Helvetica stack, wider `--measure` with narrower
  `--prose` for running text, styled tables; derived from xhosi.dev
- `base.njk`: loads `/css/{{ metadata.stylesheet or 'style' }}.css`; skips
  the Typekit `<link>` tags when `metadata.stylesheet == "utilitarian"`
- `metadata.js`: added commented-out `stylesheet: "utilitarian"` example
- `style.css`: added matching `--color-table-*` vars and table CSS so the
  default theme has the same table styling contract as utilitarian
- README: documented the switch and the two themes in a table

**Decisions**: None recorded as DEC — this is additive and doesn't change
existing behavior when `metadata.stylesheet` is unset.

**Files**: `css/utilitarian.css`, `css/style.css`, `_includes/layouts/base.njk`, `content/_data/metadata.js`, `README.md`
