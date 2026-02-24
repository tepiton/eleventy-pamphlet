# Chronicle: Building eleventy-base-literary

## Overview

Converted the off-the-shelf `eleventy-base-blog` into `eleventy-base-literary` - a starter template for literary and chaptered sites, inspired by [twohorses.lol](https://twohorses.lol) and [esther.lol](https://esther.lol).

## Source Analysis

### Reference Sites Examined

1. **twohorses.lol** (`/Users/philip/projects/mimeo-sites/EXPERIMENT/twohorses.lol`)
   - Eleventy v2 with CommonJS
   - Single-file work (entire story in `src/index.md`)
   - Inline CSS in `base.njk` layout
   - markdown-it with typographer
   - Simple structure: `src/`, `dist/`

2. **esther.lol** (`/Users/philip/projects/mimeo-sites/esther.lol`)
   - Eleventy v2 with CommonJS
   - Single-file work with chapter headings
   - External CSS file (`src/css/styles.css`)
   - Same markdown-it config
   - Similar simple structure

### Key Patterns Identified

- Minimal config (no plugins beyond markdown-it)
- Literary typography: drop caps, small caps, narrow measure
- OG/Twitter meta tags
- Typekit fonts
- No blog features (tags, archives, navigation plugin)

## Requirements

User specified:
- Use `content/` directory (not `src/`)
- Support both single-file and multi-chapter works
- External CSS file
- Keep RSS feed

## Changes Made

### 1. Removed Blog-Specific Content

Deleted:
```
content/blog/
content/feed/
content/blog.njk
content/tag-pages.njk
content/tags.njk
content/sitemap.xml.njk
content/index.njk
content/content.11tydata.js
public/
_config/
css/
_includes/
_data/
```

### 2. Created New Directory Structure

```
content/
  includes/
    base.njk
    chapter.njk
  css/
    style.css
  img/
  _data/
    metadata.js
  chapters/
    sample-chapter-1.md
    sample-chapter-2.md
  index.md
  about.md
  404.md
```

### 3. Configuration (`eleventy.config.js`)

Created new config with:
- ESM syntax (`"type": "module"` in package.json)
- markdown-it with typographer enabled
- `chapters` collection sorted by `order` frontmatter
- RSS feed plugin for chapters
- Passthrough copy for `img/` and `css/`
- Server options: `showAllHosts: true`, `port: 8086`

```javascript
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("content/css");

  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  }).disable("code");

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/chapters/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  eleventyConfig.setServerOptions({
    showAllHosts: true,
    port: 8086
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: {
      name: "chapters",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "My Literary Work",
      subtitle: "A description of this work",
      base: "https://example.com/",
      author: {
        name: "Your Name"
      }
    }
  });

  return {
    dir: {
      input: "content",
      includes: "includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
```

### 4. Layouts

#### `content/includes/base.njk`

Minimal HTML wrapper with:
- Open Graph meta tags
- Twitter Card meta tags
- Optional Typekit integration
- External CSS link
- RSS alternate link

```html
<!DOCTYPE html>
<html lang="{{ metadata.language or 'en' }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title or metadata.title }}</title>
  <meta name="description" content="{{ description or excerpt or metadata.description }}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{{ title or metadata.title }} &bull; {{ metadata.title }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ metadata.url }}{{ page.url }}">
  <meta property="og:image" content="{{ metadata.image }}">
  <meta property="og:description" content="{{ description or excerpt or metadata.description }}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="{{ metadata.twitter }}">
  <meta name="twitter:title" content="{{ title or metadata.title }} &bull; {{ metadata.title }}">
  <meta name="twitter:description" content="{{ description or excerpt or metadata.description }}">
  <meta name="twitter:image" content="{{ metadata.image }}">
  
  {% if metadata.typekit -%}
  <link rel="stylesheet" href="https://use.typekit.net/{{ metadata.typekit }}.css">
  {% endif -%}
  <link rel="stylesheet" href="/css/style.css">
  
  <link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="{{ metadata.title }}">
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

#### `content/includes/chapter.njk`

Extends base with automatic prev/next navigation:

```html
---
layout: base.njk
---
{{ content | safe }}

{% if collections.chapters and collections.chapters.length > 1 -%}
<nav class="chapter-nav">
  <!-- Navigation logic finds current chapter index -->
  <!-- Renders prev/next links based on position -->
</nav>
{% endif -%}
```

### 5. CSS (`content/css/style.css`)

Extracted typography from reference sites:

- Fluid typography: `clamp(5px, .8rem + 1vw, 92px)`
- Narrow measure: `min(90%, 48ch)`
- Drop caps: `.drop::first-letter`
- Small caps first lines: `.drop::first-line`, `.first-line::first-line`
- Blockquote styling
- Chapter navigation styling

### 6. Metadata (`content/_data/metadata.js`)

```javascript
export default {
  title: "My Literary Work",
  url: "https://example.com/",
  language: "en",
  description: "A description of this literary work",
  author: {
    name: "Your Name",
    email: "you@example.com",
    url: "https://example.com/"
  },
  image: "/img/cover.png",
  twitter: "@yourhandle",
  typekit: null
}
```

### 7. Package.json

Simplified dependencies:

```json
{
  "name": "eleventy-base-literary",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "npx @11ty/eleventy",
    "serve": "npx @11ty/eleventy --serve",
    "clean": "rm -rf _site",
    "debug": "DEBUG=* npx @11ty/eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0",
    "@11ty/eleventy-plugin-rss": "^2.0.4",
    "markdown-it": "^14.0.0"
  }
}
```

### 8. Sample Content

- `content/index.md` - Single-file work example
- `content/about.md` - About page
- `content/chapters/sample-chapter-1.md` - Multi-chapter example
- `content/chapters/sample-chapter-2.md` - Multi-chapter example
- `content/404.md` - Updated with layout

### 9. README

Updated with:
- Getting started instructions
- Directory structure
- Two approaches (single-file vs multi-chapter)
- Configuration guide
- Typography features
- Deployment info

## Build Verification

```
[11ty] Writing ./_site/feed/feed.xml
[11ty] Writing ./_site/404.html
[11ty] Writing ./_site/about/index.html
[11ty] Writing ./_site/index.html
[11ty] Writing ./_site/chapters/sample-chapter-1/index.html
[11ty] Writing ./_site/chapters/sample-chapter-2/index.html
[11ty] Copied 1 Wrote 6 files in 0.11 seconds (v3.1.2)
```

## Final File Structure

```
.
├── .editorconfig
├── .git/
├── .gitattributes
├── .github/
├── .gitignore
├── .nojekyll
├── .nvmrc
├── LICENSE
├── README.md
├── content/
│   ├── 404.md
│   ├── _data/
│   │   └── metadata.js
│   ├── about.md
│   ├── chapters/
│   │   ├── sample-chapter-1.md
│   │   └── sample-chapter-2.md
│   ├── css/
│   │   └── style.css
│   ├── includes/
│   │   ├── base.njk
│   │   └── chapter.njk
│   ├── img/
│   └── index.md
├── docs/
│   └── CHRONICLE.md
├── eleventy.config.js
├── netlify.toml
├── package-lock.json
├── package.json
└── vercel.json
```

## Summary

Successfully converted `eleventy-base-blog` to `eleventy-base-literary`:

- Removed all blog features (posts, tags, navigation plugin, syntax highlighting, image optimization, bundles)
- Added literary-focused features (drop caps, chapter navigation, narrow measure)
- Supports both single-file and multi-chapter works
- Retained RSS feed
- Updated to Eleventy v3 with ESM
- Configured dev server for all interfaces on port 8086
