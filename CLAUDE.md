# Memory: eleventy-pamphlet

## Project Overview

This is the `eleventy-pamphlet` template repo (`github.com/tepiton/eleventy-pamphlet`), a minimal Eleventy v3 starter for single literary works. It is one of three related templates:

- **eleventy-pamphlet** → served from `orobia.lol`
- **eleventy-chapbook** → served from `orobia.dev`
- **eleventy-folio** → served from `orobia.net`

All three live at `/Users/philip/projects/mimeo-sites/TEMPLATES/`.

## Font Setup (all three templates)

All three use the same fonts from esther.lol, baked in directly:

- **Body**: `p22-stickley-pro-text, neue-kabel, Palatino, Georgia, serif`
- **Heading**: `neue-kabel, 'Gill Sans', 'Helvetica Neue', sans-serif`
- **Typekit kits**: `ztn6rcs` (p22-stickley-pro-text) and `pgn7ley` (neue-kabel), loaded as hardcoded `<link>` tags in `base.njk` (not via metadata)
- **Font size**: `clamp(1rem, .8rem + 1vw, 1.25rem)` on `html` — aligned across all three templates
- CSS vars: `--font-body` and `--font-heading` in `:root`

## CSS Location

- pamphlet: `content/css/style.css`
- chapbook: `css/index.css`
- folio: `css/index.css`

## Base Layout Location

- pamphlet: `content/includes/base.njk`
- chapbook: `_includes/layouts/base.njk`
- folio: `_includes/layouts/base.njk`

## npm Scripts

All three use `npm start` to serve.

## Key Patterns

- Typekit kit IDs are baked into `base.njk`, not in `metadata.js`
- `metadata.js` does NOT have a `typekit` field
- Chronicles are kept in `docs/CHRONICLE.md` in each repo
- Commit messages must use plain hyphens — em dashes break heredoc syntax in bash

## Git Notes

- eleventy-folio remote frequently has commits ahead of local (user pushes independently) — always `git pull --rebase` before pushing if rejected
- em dashes in `git commit -m` heredocs cause syntax errors; use plain hyphens

## Related Sites

- `amalgamedon.com` is a deployed site using the pamphlet template (`/Users/philip/projects/mimeo-sites/amalgamedon.com`)
- `esther.lol` is the font/style reference (`/Users/philip/projects/mimeo-sites/esther.lol`)
