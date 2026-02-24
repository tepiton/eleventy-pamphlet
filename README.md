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
    base.njk      # Single layout for all pages
  css/
    style.css     # Typography styles
  img/            # Your images
  _data/
    metadata.js   # Site title, author, social info
  chapters/       # Multi-chapter works
    chapter-1.md
    chapter-2.md
    chapter-3.md
  index.md        # Home/contents page
  about.md        # About the author
  404.md          # Not found page
```

## Customization

### Site Metadata

Edit `content/_data/metadata.js`:

```javascript
export default {
  title: "My Literary Work",
  url: "https://example.com/",
  language: "en",
  description: "A description of your work",
  author: {
    name: "Your Name",
    email: "you@example.com",
    url: "https://example.com/"
  },
  image: "/img/cover.png",
  twitter: "@yourhandle",
  typekit: null  // or "your-typekit-id" for custom fonts
}
```

### Adding Chapters

Create markdown files in `content/chapters/`:

```markdown
---
title: Chapter One
layout: base.njk
isChapter: true
order: 1
---

<p class="drop">The story begins...</p>

Your content here...
```

- `isChapter: true` - enables Contents link in nav and prev/next navigation
- `order` - controls chapter sequence (1, 2, 3...)

### Navigation

**Home page**: Shows Title | About

**Chapter pages**: Shows Title | Contents | About (top) + Prev/Next (bottom)

### Typography Classes

- `.drop` - Drop cap on first letter, small caps on first line
- `.first-line` - Small caps on first line only

```markdown
<p class="drop">This paragraph has a drop cap.</p>
```

### Custom Fonts

Set your Typekit ID in `metadata.js`:

```javascript
typekit: "abc1def"
```

Or edit `content/css/style.css` to use any font:

```css
body {
  font-family: YourFont, Georgia, serif;
}
```

### Styling

Edit `content/css/style.css` to customize:

- Colors (background, text, links)
- Fonts and sizes
- Measure (line length)
- Navigation styling

## Single-File Works

For shorter works, put everything in `content/index.md`:

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

Remove the `chapters/` directory and the TOC will be empty.

## Features

- Eleventy v3 with ESM
- markdown-it with typographer
- RSS/Atom feed for chapters
- Open Graph and Twitter meta tags
- Typekit integration (optional)
- Automatic chapter navigation

## Deploy

Works with Netlify, Vercel, Cloudflare Pages, and GitHub Pages.

### Netlify

Push to GitHub, then connect to Netlify. Build command: `npm run build`, publish directory: `_site`.

### GitHub Pages

Use GitHub Actions. See `.github/` for workflow examples.

## License

MIT
