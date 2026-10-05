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
