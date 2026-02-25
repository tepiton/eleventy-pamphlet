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

## Summary

Built a minimal Eleventy starter for literary sites with:
- Single layout using `isChapter` flag
- External CSS file
- RSS feed
- Three sample chapters with navigation
- Dev server on port 8086, all interfaces

The result is the simplest of the three LLM implementations, trading features for clarity and build speed.
