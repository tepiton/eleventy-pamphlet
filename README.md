# eleventy-pamphlet

An Eleventy v3 starter for short literary works: novellas, single-volume fiction, pamphlets. Simpler structure than eleventy-chapbook — one layout, no blog.

## Quick start

```
git clone <this-repo> my-project
cd my-project
npm install
npm run serve
```

Then open `http://localhost:8080`.

## Customization

### Site metadata

Edit `content/_data/metadata.js`:

```js
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
  typekit: null  // or a Typekit kit ID string for Adobe Fonts
}
```

Note: `metadata.js` lives inside `content/_data/` because `content/` is the Eleventy input directory.

### Chapters

Add files to `content/chapters/`. Each needs front matter:

```yaml
---
title: Chapter One
order: 1
---
```

- `order` controls chapter sequence and prev/next navigation
- Filename determines the URL: `chapter-1.md` → `/chapters/chapter-1/`

### Home page

Edit `content/index.md`. Put your title page, foreword, or opening here.

### About page

Edit `content/about.md`.

### Custom fonts

Set a Typekit kit ID in `metadata.js`, or edit `content/css/style.css` to use any font stack directly.

### Typography classes

- `.drop` — drop cap on first letter, small caps on first line
- `.first-line` — small caps on first line only

```html
<p class="drop">This paragraph has a drop cap.</p>
```

## Project structure

```
content/
  _data/
    metadata.js          # Title, author, URL, social info
  index.md               # Home / title page
  about.md               # About the author
  404.md                 # Not found page
  chapters/
    chapter-1.md
    chapter-2.md
    ...
  css/
    style.css            # All styles
  includes/
    base.njk             # Single layout for all pages
```

## npm scripts

| Command | Description |
|:--------|:------------|
| `npm run serve` | Dev server with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run clean` | Remove `_site/` |
| `npm run debug` | Build with full debug output |

## Deploy

The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. No configuration needed for custom domains — the workflow detects the repo name and sets the path prefix automatically.
