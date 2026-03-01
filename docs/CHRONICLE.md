# Chronicle: Building eleventy-base-literary

## Overview

Converted the off-the-shelf `eleventy-base-blog` into `eleventy-base-literary` - a starter template for literary and chaptered sites, inspired by [twohorses.lol](https://twohorses.lol) and [esther.lol](https://esther.lol).

Built by OpenCode. Compared against implementations by Codex and Claude in `docs/THREE-TAKES.md`.

## Requirements

User specified:
- Use `content/` directory (not `src/`)
- Support both single-file and multi-chapter works
- External CSS file
- Keep RSS feed
- Dev server on all interfaces, port 8086

## Final Architecture

### Single Layout Approach

Unlike the reference sites and other LLM implementations, this version uses a single `base.njk` layout with an `isChapter` frontmatter flag to conditionally render:

- **Home page**: Title | About nav, no chapter navigation
- **Chapter pages**: Title | Contents | About nav, plus prev/next footer

This eliminates the need for a separate `chapter.njk` layout.

### Directory Structure

```
content/
  includes/
    base.njk          # Single layout for all pages
  css/
    style.css         # External CSS (not bundled)
  img/                # Images (passthrough copy)
  _data/
    metadata.js       # Site config
  chapters/
    chapter-1.md      # Sample chapter (isChapter: true, order: 1)
    chapter-2.md
    chapter-3.md
  index.md            # Home/TOC page
  about.md            # About page
  404.md              # Not found
```

## Configuration

### `eleventy.config.js` (59 lines)

Minimal config with:
- markdown-it with typographer enabled
- `chapters` collection via glob pattern (`content/chapters/*.md`)
- RSS feed plugin
- Passthrough copy for img/ and css/
- Dev server: `showAllHosts: true`, `port: 8086`

Key difference from other implementations: Uses glob pattern instead of tags for chapter collection.

### `package.json` (3 dependencies)

```json
{
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0",
    "@11ty/eleventy-plugin-rss": "^2.0.4",
    "markdown-it": "^14.0.0"
  }
}
```

Removed: navigation plugin, syntax highlighting, image optimization, bundles, drafts preprocessor.

## Layout: `content/includes/base.njk`

Conditional rendering based on `isChapter` frontmatter:

```njk
<nav class="site-nav">
  <div class="site-nav-left">
    <a href="/">{{ metadata.title }}</a>
  </div>
  {% if isChapter %}
  <div class="site-nav-center">
    <a href="/">Contents</a>
  </div>
  {% endif %}
  <div class="site-nav-right">
    <a href="/about/">About</a>
  </div>
</nav>

{{ content | safe }}

{% if isChapter and collections.chapters.length > 1 %}
<nav class="chapter-nav">
  <!-- prev/next navigation -->
</nav>
{% endif %}
```

## CSS: `content/css/style.css` (190 lines)

Literary typography extracted from reference sites:
- Fluid typography: `clamp(5px, .8rem + 1vw, 92px)`
- Narrow measure: `min(90%, 48ch)`
- Drop caps: `.drop::first-letter`
- Small caps first lines: `.drop::first-line`
- Blockquote styling
- Site nav with centered Contents link (absolute positioning)
- Chapter nav with flexbox prev/next

## Sample Content

### `content/index.md`
Home page with intro paragraph and auto-generated TOC from `collections.chapters`.

### `content/chapters/chapter-1.md` through `chapter-3.md`
Three sample chapters with `isChapter: true` and `order: 1/2/3`. Demonstrates:
- Drop caps
- Markdown formatting
- Prev/next navigation
- Author byline on final chapter

### `content/about.md`
Simple about page with nav via `eleventyNavigation` frontmatter.

## What Was Removed from Base Blog

- `content/blog/` - blog posts
- `content/feed/` - feed templates
- `content/tags.njk`, `content/tag-pages.njk` - tag pages
- `content/sitemap.xml.njk` - sitemap
- `public/` directory
- `_config/filters.js`
- `_data/eleventyDataSchema.js`
- `_includes/layouts/` - multiple layouts
- `_includes/postslist.njk`
- `css/` - bundled CSS
- All plugins except RSS and markdown-it

## Navigation Evolution

### Iteration 1: Two layouts
Started with `base.njk` and `chapter.njk` extending it. Problem: Nunjucks blocks rendered both layouts.

### Iteration 2: Single layout with `isChapter`
Simplified to one layout with conditional rendering. Much cleaner.

### Iteration 3: Fixed alignment
Contents link needed absolute positioning to sit centered between Title and About.

## Comparison with Other LLMs

See `docs/THREE-TAKES.md` for full comparison.

| Metric | OpenCode | Codex | Claude |
|--------|----------|-------|--------|
| Config lines | 59 | 119 | 111 |
| Layouts | 1 | 3 | 3 |
| Dependencies | 3 | 11 | 7 |
| CSS lines | 190 | 198 | 316 |

OpenCode is the minimal option. Claude has best documentation and polish. Codex is conservative but bloated.

## Build Output

```
[11ty] Writing ./_site/feed/feed.xml
[11ty] Writing ./_site/404.html
[11ty] Writing ./_site/about/index.html
[11ty] Writing ./_site/index.html
[11ty] Writing ./_site/chapters/chapter-1/index.html
[11ty] Writing ./_site/chapters/chapter-2/index.html
[11ty] Writing ./_site/chapters/chapter-3/index.html
[11ty] Copied 1 Wrote 7 files in 0.11 seconds (v3.1.2)
```

## Commits

1. `1228bdb` - Convert base blog to literary site template
2. `07cf9fa` - Simplify to single layout with improved navigation

## GitHub Pages Deployment Fix

### Problem

When deploying to GitHub Pages at `https://tepiton.github.io/eleventy-pamphlet/`, URLs were getting double pathPrefix:

```
/eleventy-pamphlet/eleventy-pamphlet/chapters/chapter-1/
```

Should be:

```
/eleventy-pamphlet/chapters/chapter-1/
```

Local builds worked fine. The base repo (`eleventy-base-pb`) deployed correctly with the same workflow.

### Root Cause

The pamphlet repo's `eleventy.config.js` was missing explicit plugin declarations that the base repo has. The RSS feed plugin (`feedPlugin`) automatically adds `HtmlBasePlugin` internally, but without explicitly adding it at the project level, the URL transformation was being applied inconsistently.

### Fix

Added explicit plugin declarations to `eleventy.config.js`:

```js
eleventyConfig.addPlugin(HtmlBasePlugin);
eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
```

These plugins handle the `--pathprefix` transformation correctly when declared explicitly.

### Commit

- `0e8d6d5` - Fix double pathPrefix issue by explicitly adding HtmlBasePlugin and InputPathToUrlTransformPlugin

## Summary

Built a minimal Eleventy starter for literary sites with:
- Single layout using `isChapter` flag
- External CSS file
- RSS feed
- Three sample chapters with navigation
- Dev server on port 8086, all interfaces
- Proper GitHub Pages deployment support

The result is the simplest of the three LLM implementations, trading features for clarity and build speed.

---

## README rewrite (2026-02-25)

Rewrote `README.md`. Previous version had the title `eleventy-base-literary` (the original OpenCode name) and included filler sections (Netlify deploy, Vercel, single-file works) that aren't specific to this template.

New README covers:
- Correct repo name `eleventy-pamphlet` as title
- `content/_data/metadata.js` path documented with a note explaining why it's under `content/` (Eleventy input dir)
- Full metadata schema including `image`, `twitter`, and `typekit` fields
- Chapters, typography classes, home and about pages
- Project structure tree reflecting the actual layout (`content/includes/` not `_includes/`)
- npm scripts table (uses `serve` not `start`)
- Deploy section

---

## `<details>` styling and font-size cap (2026-02-26)

Two CSS changes from real-world usage:

### Font size cap

Lowered `clamp` max from `92px` to `36px`:

```css
font-size: clamp(5px, .8rem + 1vw, 36px);
```

The 92px ceiling was too large at wide viewports.

### `<details>` / `<summary>` styling

Added styles for `<details>` blocks intended as expandable asides — citations, digressions, supplementary material that would interrupt the main text:

```css
summary {
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 3em;
  margin-left: -2em;
  text-align: left;
  letter-spacing: -.04em;
}

details {
  font-family: monospace;
  color: #773;
  margin-left: 2em;
  margin-right: 2em;
  font-size: 60%;
  line-height: 1.125;
}
```

The `summary` pulls left with negative margin to sit outside the text column. The `details` content renders in monospace at 60%, indented, in a muted olive tone — visually distinct from body text.

Added a sample `<details>` block to `content/chapters/chapter-1.md` demonstrating the pattern.

---

## Font parameterization and Typekit (2026-02-27)

Added `--font-body` and `--font-heading` CSS custom properties to `:root` in `style.css`, set to the esther.lol font stacks. All `font-family` declarations replaced with `var(--font-body)` or `var(--font-heading)`. Baked the two Typekit kit IDs directly into `base.njk`; removed the `typekit` field from `metadata.js`.

Renamed `serve` script to `start` in `package.json` for consistency with the other templates.

## Site URL and title (2026-02-27)

- Set `metadata.url` to `https://orobia.lol/`
- Set `metadata.title` and `content/index.md` title to `"Pamphlet"`
- Updated `content/about.md` to reference orobia.lol

---

## Parameterized fonts + Typekit (2026-02-27)

Pulled font choices from [esther.lol](https://esther.lol) and baked them into the template.

### CSS custom properties

Added `--font-body` and `--font-heading` to `:root` in `style.css`. All `font-family` declarations now use these vars, making it easy to swap fonts in one place:

```css
:root {
  --font-body: p22-stickley-pro-text, neue-kabel, Palatino, Georgia, serif;
  --font-heading: neue-kabel, 'Gill Sans', 'Helvetica Neue', sans-serif;
}
```

`h4` (section dividers) uses `--font-body` since it's a display use of the serif face. `details` keeps `monospace` (intentional).

### Typekit

Baked the two esther.lol Typekit kit IDs directly into `base.njk` rather than threading them through `metadata.js`. Since the CSS vars reference these font names explicitly, the kits and the CSS are coupled — making that explicit in the layout is more honest than a configurable field that would break things if removed.

Removed the `typekit` field from `metadata.js` entirely.

---

## Content portability (2026-02-28)

Made `content/` fully portable across the three template family (pamphlet, chapbook, folio).

### Changes

1. Created `content/chapters/chapters.11tydata.js` to set layout centrally
2. Removed `layout: base.njk` from chapter frontmatter (now inherited from `.11tydata.js`)
3. Moved port from `eleventy.config.js` to `package.json` start script

### Result

The `content/` directory is now self-contained. Drop it into any of the three templates and it works. Each template provides its own layouts, CSS, and personality.
