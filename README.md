# eleventy-base-literary

An Eleventy starter for literary and chaptered works. Built for sites like [twohorses.lol](https://twohorses.lol) and [esther.lol](https://esther.lol).

## Getting Started

1. Clone this repository:
   ```
   git clone <your-repo-url> my-literary-site
   cd my-literary-site
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run serve
   ```

4. Build for production:
   ```
   npm run build
   ```

## Structure

```
content/
  includes/
    base.njk      # Base layout with OG/Twitter meta
    chapter.njk   # Chapter layout with prev/next navigation
  css/
    style.css     # Typography styles
  img/            # Your images
  _data/
    metadata.js   # Site title, author, social info
  chapters/       # Multi-chapter works (optional)
    sample-chapter-1.md
    sample-chapter-2.md
  index.md        # Main work (single-file approach)
  about.md        # About the author
  404.md          # Not found page
```

## Two Approaches

### Single-File Works

Write your entire work in `content/index.md`. Use markdown headings for chapters:

```markdown
---
title: My Story
layout: base.njk
---

# My Story

<p class="drop">Once upon a time...</p>

## Chapter One

Content here...

## Chapter Two

More content...
```

### Multi-Chapter Works

Create separate files in `content/chapters/`:

```markdown
---
title: Chapter One
layout: chapter.njk
order: 1
---

<p class="drop">The story begins...</p>
```

The `order` frontmatter controls chapter sequence. Navigation between chapters is automatic.

## Configuration

Edit `content/_data/metadata.js`:

```javascript
export default {
  title: "My Literary Work",
  url: "https://example.com/",
  description: "A description of your work",
  author: {
    name: "Your Name",
    url: "https://example.com/"
  },
  image: "/img/cover.png",
  twitter: "@yourhandle",
  typekit: "your-typekit-id"  // or null for default fonts
}
```

## Typography

The base includes literary typography:

- Fluid type scaling (`clamp()`)
- Narrow measure (48ch)
- Drop caps (`.drop`)
- Small caps first lines (`.drop::first-line`, `.first-line::first-line`)
- Blockquote styling

Example:

```markdown
<p class="drop">This paragraph starts with a drop cap and small caps first line.</p>
```

## Features

- Eleventy v3 with ESM
- markdown-it with typographer
- RSS/Atom feed for chapters
- Open Graph and Twitter meta tags
- Typekit integration (optional)
- Automatic chapter navigation

## Deploy

Works with Netlify, Vercel, Cloudflare Pages, and GitHub Pages.
