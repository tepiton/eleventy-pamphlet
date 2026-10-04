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
