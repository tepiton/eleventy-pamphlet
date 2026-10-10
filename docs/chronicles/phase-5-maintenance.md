# Phase 5: Maintenance

## Entry 1: npm 12 install hygiene (2026-10-03)

**What**: Fresh `npm install` is silent — no funding notice, no audit
block, no warnings.

**Why**: npm v12 (2026-07) blocks dependency install scripts by default,
and node 24 (CI's runtime) bundles it. Fleet-wide pass brought every
eleventy template to quiet installs; pamphlet needed the least.

**How**:

- `allowScripts` (`fsevents@2.3.3`, added 2026-09-27) verified correct —
  pamphlet has no sharp in its tree
- `.npmrc`: `fund=false` + `audit=false` (see DEC-009)

**Decisions**: DEC-009.

**Files**: commit 213d31b

## Entry 2: drafts preprocessor, aligning with the content contract (2026-10-04)

**What**: `draft: true` files are excluded from production builds,
matching chapbook and the blogs.

**Why**: The shared content contract (tepiton/content-fixture; mimeo's
TEMPLATE_CONSOLIDATION pass 2) states drafts are excluded from
production builds everywhere; pamphlet was the one template without
the preprocessor.

**How**: `addPreprocessor` copied from chapbook (title gains
"(draft)" in serve mode, exclusion in build mode). `_site/` verified
byte-identical on pamphlet's draftless demo before and after;
production sites (pesach.lol, amalgamedon.com) carry no `draft:`
files (code search, 2026-10-04).

**Decisions**: DEC-010.

**Files**: this commit.

## Entry 3: xhosi.com changes carried into the template (2026-10-08)

**What**: Ported xhosi.com's improvements into pamphlet: GitHub-style
heading ids, a description-marks preprocessor, markdown-it
`breaks: true`, `spine` and `log` timeline stylesheets, and an opt-in
`metadata.sortBy = "date"` (newest-first by last git commit). Follow-up
CSS tweak to blockquote margins (30c01f5).

**Why**: xhosi.com is built on pamphlet; fixes made there belong in
the template. The sort change is opt-in so the contract's `order`
sort stays the default.

**How**: Commit 2e141b8 pushed to main by a separate session before
approval; Philip then chose to keep it on main. The Pages workflow
gained a full-history checkout for the git-date sort.

**Decisions**: DEC-011.

**Files**: 2e141b8, 30c01f5.

## Entry 4: folio references purged from living docs (2026-10-09)

**What**: README.md and CLAUDE.md no longer reference eleventy-folio.

**Why**: folio was retired 2026-10-04 (dek ported to chapbook, repo
archived) per the consolidation recorded in tepiton/TEMPLATES docs;
living docs should name only the four document templates.

**How**: README's family list now names chapbook, pamphlet,
prose-blog, tech-blog with a content-contract link, and the closing
line says "Copy it to any of the other document templates". CLAUDE.md
drops folio from the port list and file-locations table, deletes the
obsolete folio git-remote note, rewords "all three" claims, adds a
retirement note, and corrects stale mimeo-sites paths to tepiton/
(TEMPLATES, amalgamedon.com). No code changed.

**Decisions**: none new — completes the 2026-10-04 retirement.

**Files**: this commit.
