---
goal: Migrate the Jekyll blog to Astro while preserving the complete public URL schema, all feeds, the JSON API, and the existing visual behavior
version: 1.0
created: 2026-11-10
modified: 2026-11-10
status: 'In Progress'
tags: [architecture, migration, astro, url-compatibility, refactor]
---

# Introduction

Migrate the site at `https://blog.bgzo.cc` from Jekyll 4.3.4 to Astro 7.4.8 on branch `astro-migration`, cut from `main` at commit `09395612c970d061c3edc01cf73a426989995df2`, then squash-merge into `main`.

The URL schema is the hard contract. The current site publishes 146 HTML pages, 23 JSON API pages, 2 Atom feeds, 1 sitemap, 1 robots file, 1 root favicon, and the `/assets/**` tree. Every one of these paths must continue to resolve on both `https://blog.bgzo.cc/...` and `https://bgzo.github.io/blog/...`.

The migration is an equivalent rewrite, not a redesign. Liquid templates are replaced with Astro components; the Ruby pagination plugin is replaced with Astro endpoints; the 143-line Liquid TOC include is replaced with an Astro headings component; Tailwind is removed because the repository uses zero Tailwind utilities.

## 1. Requirements & Constraints

- **REQ-001**: Preserve all 146 canonical HTML paths exactly, including the `.html` suffix, letter case, and non-ASCII characters. Source of truth: `tests/fixtures/url-manifest.json`.
- **REQ-002**: Preserve all non-HTML public paths: `/feed.xml`, `/seed.xml`, `/sitemap.xml`, `/robots.txt`, `/favicon.ico`, `/assets/**`, and `/api/posts/1.json` through `/api/posts/23.json`.
- **REQ-003**: Serve both `/name.html` and `/name` for every canonical HTML page. Generated links, canonical tags, feeds, sitemap entries, and giscus paths must point to `/name.html`.
- **REQ-004**: Use `https://blog.bgzo.cc` as the canonical host for every build and keep the GitHub Pages mirror resolvable under `https://bgzo.github.io/blog/`.
- **REQ-005**: Keep giscus `data-mapping="pathname"` and `data-strict="0"` unchanged so existing comments remain attached.
- **REQ-006**: Keep article sources in `_articles/` with their current directory layout and filenames. The external sync bot must not change.
- **REQ-007**: Keep `feed.xml` behavior: entries from `_articles/labs/`, `_articles/thoughts/`, `_articles/stories/`, sorted by `published` descending, limit 50.
- **REQ-008**: Keep `seed.xml` behavior: entries from all articles, sorted by `published` descending, limit 50.
- **REQ-009**: Keep the API contract: non-archive articles only, 5 entries per page, 23 pages, `published` string ascending then reversed. Only the `url` field may change from root-relative to base-aware root-relative, which is identical on root builds.
- **REQ-010**: Replace the Liquid TOC with an Astro component that emits the same `<div class="contents"><ul>...</ul></div>` nested list. Heading IDs must match `_site` output because Astro 7 uses the same `github-slugger` algorithm.
- **REQ-011**: Replace Liquid listing loops in `labs.md`, `thoughts.md`, and `stories.md` with one reusable `PostList.astro` component. Preserve year grouping, 500-character truncation, HTML escaping, and `<br>` conversion.
- **REQ-012**: Replace the Liquid template engine with Astro components. Do not introduce Vue, React, Svelte, or any client framework in this migration.
- **REQ-013**: Remove the Ruby toolchain, Bundler, Jekyll plugins, Tailwind CLI, and `tailwind.config.js` after cutover.
- **REQ-014**: Finish with a squash merge into `main`. Keep the pre-migration commit tagged `pre-astro-migration` for rollback.
- **REQ-015**: Fix only one content file: quote `title: @liulifox233` in `_articles/seeds/20260502-know-@liulifox233.md`.
- **SEC-001**: Do not publish secrets. Before commit, run `grep -RInE 'token|secret|password|api[_-]?key' public/` and confirm every hit is public configuration.
- **CON-001**: Astro must run with `output: 'static'`. No SSR adapter, no runtime server, no database.
- **CON-002**: Use npm and Node 20 in CI. The local environment may use Node 23.
- **CON-003**: Do not rewrite article bodies, descriptions, tags, or frontmatter other than REQ-015.
- **CON-004**: Do not adopt clean URLs as canonical. The `.html` path stays the canonical URL.
- **CON-005**: Do not include tag pages, search, Vue islands, or new content features in this plan.
- **GUD-001**: Port existing JavaScript behavior by copying the source and changing only selectors or base-path handling.
- **GUD-002**: Use Astro 7 Unified processor via `@astrojs/markdown-remark` because Astro 7 defaults to Sätteri and Sätteri has no `remark-breaks` plugin.
- **GUD-003**: Prefer deterministic build-time generation over runtime client fetches, except where the current home stream behavior requires the JSON API.
- **PAT-001**: Treat the captured old-site manifest as the executable URL contract. Every phase ends with a script that verifies it.
- **PAT-002**: Work only on `astro-migration`, deploy previews from that branch, and merge to `main` only after all four deployment targets pass.

## 2. Implementation Steps

Phases execute in order from 0 to 6. Within a phase, tasks execute in ascending TASK number; a lower-numbered task that creates a file or component is a dependency of every higher-numbered task that references it. No phase may start until the previous phase's completion criteria are met.

### Implementation Phase 0

- GOAL-001: Establish the branch, the rollback tag, and the executable old-site baseline.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-001 | Completed | Create branch `astro-migration` from `main` and create annotated tag `pre-astro-migration` at `09395612c970d061c3edc01cf73a426989995df2`. Run `git switch -c astro-migration 09395612c970d061c3edc01cf73a426989995df2` and `git tag -a pre-astro-migration -m "Jekyll baseline before Astro migration" 09395612c970d061c3edc01cf73a426989995df2`. | `git branch --show-current` prints `astro-migration`; `git tag -l pre-astro-migration` prints the tag; `git rev-parse pre-astro-migration` prints `09395612c970d061c3edc01cf73a426989995df2`.  | 2026-11-10 |
| TASK-002 | Completed | Create `scripts/capture-baseline.mjs`. The script accepts `SITE_DIR` (default `_site`) and `OUT` (default `tests/fixtures/url-manifest.json`), walks the directory, and writes a manifest with four keys: `files` (sorted array of all 192 relative paths), `html` (146 objects with `path`, `title` from the first `<title>` element, `canonical` from `<link rel="canonical">`), `api` (object keyed `1.json` through `23.json` containing parsed JSON), and `feeds` (object with `feed.xml` and `seed.xml`, each an array of entry `<link href>` pathnames). Exclude nothing from `files`. Build the baseline from a clean archive of the pre-migration commit, not from the branch working tree, because the untracked plan file and local `debug/` directory would otherwise be processed by Jekyll: `rm -rf /tmp/opencode/blog-baseline && mkdir -p /tmp/opencode/blog-baseline && git archive pre-astro-migration -o /tmp/opencode/blog-baseline.tar && tar -xf /tmp/opencode/blog-baseline.tar -C /tmp/opencode/blog-baseline && cd /tmp/opencode/blog-baseline && bundle exec jekyll build`, then from the repository root run `SITE_DIR=/tmp/opencode/blog-baseline/_site node scripts/capture-baseline.mjs`. Write stable JSON with two-space indentation and a trailing newline. Commit the fixture. | From the repository root: `SITE_DIR=/tmp/opencode/blog-baseline/_site node scripts/capture-baseline.mjs`; `node -e "const m=require('./tests/fixtures/url-manifest.json'); console.log(m.files.length, m.html.length, Object.keys(m.api).length, m.feeds['feed.xml'].length, m.feeds['seed.xml'].length)"` prints `192 146 23 50 50`; `git status --porcelain` shows the fixture staged after `git add tests/fixtures/url-manifest.json`. | 2026-11-10 |
| TASK-003 | Completed | Create `tests/fixtures/url-contract.md` containing the article URL rule, page URL list, host matrix, alias rule, and API/feed/sitemap contracts. The article rule is: take the source filename without `.md`, remove a leading `YYYY-MM-DD-` prefix if present, keep all other characters and case, then append `.html`. Page list: `/`, `/README.html`, `/labs.html`, `/thoughts.html`, `/stories.html`, `/changelogs.html`, `/404.html`. Host matrix: root builds use `SITE_URL=https://blog.bgzo.cc` and `BASE_PATH=/`; GitHub Pages uses `SITE_URL=https://bgzo.github.io` and `BASE_PATH=/blog`. Alias rule: every canonical HTML file except `index.html` and `404.html` gets a byte-identical copy at `<name>/index.html`. | `test -s tests/fixtures/url-contract.md`; `grep -q 'YYYY-MM-DD-' tests/fixtures/url-contract.md`; `grep -q 'BASE_PATH=/blog' tests/fixtures/url-contract.md`.  | 2026-11-10 |

#### TASK-001 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Confirmed the `astro-migration` branch and annotated `pre-astro-migration` tag already exist at the baseline commit.
- **Logic Changes**:
  - **Added**: Nothing; the branch and tag were already present in the repository.
  - **Modified**: Nothing.
- **Linked Code**: Git branch `astro-migration`; tag `pre-astro-migration`.
- **Verification Result**: `git branch --show-current` printed `astro-migration`; `git tag -l pre-astro-migration` printed the tag; `git rev-parse pre-astro-migration` printed `09395612c970d061c3edc01cf73a426989995df2`.

#### TASK-002 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added the baseline capture script and generated the golden URL manifest from a clean archive build of the pre-migration commit.
- **Logic Changes**:
  - **Added**: `scripts/capture-baseline.mjs` walks a Jekyll `_site`, records every file path, HTML title and canonical URL, parses all 23 API pages, and extracts entry link pathnames from both Atom feeds.
  - **Modified**: Wrote `tests/fixtures/url-manifest.json` with the observed 192 files and 146 HTML pages.
- **Linked Code**: `scripts/capture-baseline.mjs`; `tests/fixtures/url-manifest.json`; baseline build at `/tmp/opencode/blog-baseline/_site`.
- **Verification Result**: Counts printed `192 146 23 50 50`; the fixture was committed in `63ec23c`.

#### TASK-003 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Documented the executable URL contract for articles, pages, hosts, aliases, API, feeds, and sitemap.
- **Logic Changes**:
  - **Added**: `tests/fixtures/url-contract.md` with the date-prefix stripping rule, page list, host matrix, alias rule, and data endpoint contracts.
  - **Modified**: Nothing.
- **Linked Code**: `tests/fixtures/url-contract.md`.
- **Verification Result**: The file is non-empty and contains both required markers `YYYY-MM-DD-` and `BASE_PATH=/blog`.


**Phase 0 completion criteria**: branch and tag exist, `tests/fixtures/url-manifest.json` contains 192 files, 146 HTML entries, 23 API pages, and 50 entries in each feed, and the contract document exists.

### Implementation Phase 1

- GOAL-002: Create an Astro project that reads `_articles/`, emits exactly the 146 canonical HTML filenames, and fixes the one invalid YAML file.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-004 | Completed | Replace root `package.json` with an Astro project manifest. Set `"name": "bgzo-blog"`, `"private": true`, `"type": "module"`. Scripts: `"dev": "astro dev"`, `"build": "astro build"`, `"preview": "astro preview"`, `"verify": "node scripts/verify-urls.mjs && node scripts/verify-data.mjs"`, `"verify:dom": "node scripts/verify-dom.mjs"`, `"baseline": "bundle exec jekyll build && node scripts/capture-baseline.mjs"`. Dependencies: `astro@7.4.8`, `@astrojs/markdown-remark@7.3.6`, `remark-breaks@4.0.0`. Do not add `serve` or any other dev dependency; the smoke-test server is implemented with Node built-ins. Update `.gitignore` so it contains `dist/`, `.astro/`, `_site/`, `.jekyll-cache/`, and `node_modules/`. Run `npm install` and commit `package-lock.json`. | `node -e "const p=require('./package.json'); console.log(p.scripts.build, p.dependencies.astro, p.dependencies['remark-breaks'])"` prints the build script and exact versions; `npm ls astro @astrojs/markdown-remark remark-breaks` exits 0.  | 2026-11-10 |
| TASK-005 | Completed | Create `astro.config.mjs` with `output: 'static'`, `site: process.env.SITE_URL ?? 'https://blog.bgzo.cc'`, `base: process.env.BASE_PATH ?? '/'`, `outDir: './dist'`, `publicDir: './public'`, `build: { format: 'file' }`, `trailingSlash: 'ignore'`, and `markdown.processor: unified({ gfm: true, smartypants: true, remarkPlugins: [remarkBreaks] })`. Set `markdown.shikiConfig` to `{ themes: { light: 'solarized-light', dark: 'solarized-dark' }, defaultColor: false, wrap: false }`. Import `unified` from `@astrojs/markdown-remark` and `remarkBreaks` from `remark-breaks`. Create `tsconfig.json` extending `astro/tsconfigs/strict`. | `BASE_PATH=/ SITE_URL=https://blog.bgzo.cc npx astro sync` exits 0; `node -e "import('./astro.config.mjs').then(m=>console.log(m.default.build.format))"` prints `file`; `grep -c 'processor: unified' astro.config.mjs` prints `1`.  | 2026-11-10 |
| TASK-006 | Completed | Create `src/content.config.ts`. Define collection `articles` with `loader: glob({ pattern: '**/*.md', base: './_articles', generateId: ({ entry }) => entry.replace(/^\.\//, '').replace(/\.md$/, '') })`. Define collection `pages` with `loader: glob({ pattern: '*.md', base: './src/content/pages' })`. Do not add a Zod schema in this phase; the 139 files have heterogeneous frontmatter and schema validation is not required for the migration. Move `README.md`, `changelogs.md`, and `404.md` to `src/content/pages/` without changing their bodies. Remove the Jekyll `layout` and `permalink` frontmatter keys from the moved files; keep `title`, `created`, and `modified`. | Run `npx astro sync`; the command exits 0 and prints a content sync message; `test -f src/content/pages/README.md && test -f src/content/pages/changelogs.md && test -f src/content/pages/404.md`.  | 2026-11-10 |
| TASK-007 | Completed | Create `scripts/check-frontmatter.mjs`. It uses `yaml` from Astro's dependency tree or `js-yaml` to parse the frontmatter block of every `_articles/**/*.md` and every `src/content/pages/*.md`. Exit 1 with the file path and parser message on the first failure. Fix `_articles/seeds/20260502-know-@liulifox233.md` by changing line 2 from `title: @liulifox233` to `title: "@liulifox233"`. Make no other content edit. | `node scripts/check-frontmatter.mjs` exits 0; `grep -n '^title: "@liulifox233"' _articles/seeds/20260502-know-@liulifox233.md` prints exactly one line; `git diff --stat -- _articles` shows one file changed.  | 2026-11-10 |
| TASK-008 | Completed | Create `src/lib/url.ts` with `siteUrl()` returning `import.meta.env.SITE`, `basePath()` returning `import.meta.env.BASE_URL`, `withBase(path)` returning a single-slash join of base and path, `canonical(path)` returning `new URL(path, 'https://blog.bgzo.cc').href` (constant canonical host for every build), `deploymentUrl(path)` returning `new URL(withBase(path), siteUrl()).href` (host-specific URL for feeds), and `articlePath(id)` implementing the rule from TASK-003. Create `src/lib/dates.ts` with `dateParts(value)` that parses `YYYY-MM-DD` prefixes with a regex and `formatYmd`, `formatSlashYmd`, `formatIsoLocal`, and `formatSortable` helpers that use local getters, never `toISOString()`. Create `src/lib/articles.ts` with `getArticles()` returning entries decorated with `section`, `routeSlug` (filename without `.md`, date prefix stripped, no leading slash), `url` (`articlePath(id)`), `isArchive`, and `date` fields. Sort order helpers are `byPublishedDesc` and `byCreatedDesc`; `byPublishedDesc` compares `formatSortable(published)` strings, and `byCreatedDesc` compares `formatSortable(created)` strings. Fall back to `published`, then `modified`, then `created` when a date is missing. | `node --experimental-strip-types --input-type=module -e "import {articlePath} from './src/lib/url.ts'; console.log(articlePath('archives/2022-12-23-look-back-to-your-loved-ones'))"` prints `/look-back-to-your-loved-ones.html`; `articlePath('seeds/20260522-want-a-windows-pad')` prints `/20260522-want-a-windows-pad.html`; `node --experimental-strip-types --input-type=module -e "import {formatSlashYmd} from './src/lib/dates.ts'; console.log(formatSlashYmd('2025-10-12 00:39:37'))"` prints `2025/10/12`.  | 2026-11-10 |
| TASK-009 | Completed | Create `src/layouts/Base.astro` with `<!doctype html>`, `<html lang="en">`, `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{title} - bGZo's blog</title></head>`, `<body class={bodyClass}><slot /></body>`. Props: `title`, `bodyClass`. Create one flat route `src/pages/[slug].astro` with `getStaticPaths()` that calls `getArticles()` and returns all 139 entries as `{ params: { slug: entry.routeSlug }, props: { entry, isArchive: entry.isArchive } }`. Do not create `src/pages/archives/[slug].astro`; a nested route would change the archive URLs to `/archives/...`. Render `<Base title={entry.data.title}><article><h1>{entry.data.title}</h1><Content /></article></Base>` using `const { Content } = await render(entry)`. The content layer also exposes `entry.rendered.html` for components that need the HTML string. | `npm run build` exits 0; `find dist -name '*.html' > /tmp/opencode/dist-html.txt && wc -l < /tmp/opencode/dist-html.txt` prints at least 139; `test -f dist/look-back-to-your-loved-ones.html`; `test -f dist/20221223-look-back-to-your-loved-ones.html`; `test -f dist/20260502-know-@liulifox233.html`. | 2026-11-10 |
| TASK-010 | Completed | Create the seven non-article routes on the Phase 1 `Base` layout with their real body content: `src/pages/index.astro` (title `Seeds`, preface, stream `<ul>`, pagination nav, and the inline home-stream script), `src/pages/labs.astro`, `src/pages/thoughts.astro`, `src/pages/stories.astro` (title from the section, and an inline `getCollection` loop that reproduces the current Liquid year grouping exactly), `src/pages/README.astro` (title from the `README` page entry, rendered body), `src/pages/changelogs.astro` (title `Changelogs`, an `<article><h2>` shell and rendered body), and `src/pages/404.astro` (title `404 Not Found`, rendered body, and the existing `<style>` block). TASK-021 extracts the listing loop into `PostList.astro` and upgrades the listing pages to `Default`; TASK-022 extracts the home markup and script into `HomeStream.astro` and `home-stream.js` and upgrades the home page to `Default`; TASK-023 upgrades `changelogs.astro` to `Post`, `404.astro` to `Default`, and `[slug].astro` to `Post`/`ArchivedPost`; `README.astro` was already moved to `Default` in TASK-014. | `npm run build` exits 0; `test -f dist/index.html && test -f dist/README.html && test -f dist/labs.html && test -f dist/thoughts.html && test -f dist/stories.html && test -f dist/changelogs.html && test -f dist/404.html`; `grep -o '<title>[^<]*</title>' dist/README.html` prints `README - bGZo's blog`.  | 2026-11-10 |
| TASK-011 | Completed | Create `scripts/verify-url-names.mjs`. Read `tests/fixtures/url-manifest.json`. For every `html[].path`, assert `dist/<path>` exists. Assert the canonical article count is 139 and the page count is 7. Print a summary with `checked`, `missing`, and the first 20 missing paths. Exit 1 if `missing > 0`. | `npm run build && node scripts/verify-url-names.mjs` exits 0 and prints `checked=146 missing=0`.  | 2026-11-10 |

#### TASK-004 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Replaced the Tailwind-only manifest with the Astro project manifest and installed the pinned Astro dependencies.
- **Logic Changes**:
  - **Added**: Astro `dev`, `build`, `preview`, `verify`, `verify:dom`, and `baseline` scripts plus the three required dependencies.
  - **Modified**: `.gitignore` now ignores `dist/` and `.astro/`; `package-lock.json` was regenerated by `npm install`.
- **Linked Code**: `package.json`; `package-lock.json`; `.gitignore`.
- **Verification Result**: `npm ls` reports `astro@7.4.8`, `@astrojs/markdown-remark@7.3.6`, and `remark-breaks@4.0.0`; the manifest check printed `astro build 7.4.8 4.0.0`.

#### TASK-005 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added the static Astro build configuration with the Unified processor, remark-breaks, Shiki solarized themes, and strict TypeScript settings.
- **Logic Changes**:
  - **Added**: `astro.config.mjs` with environment-driven `site`/`base`, file-format output, and Markdown configuration; `tsconfig.json` extends the Astro strict preset.
  - **Modified**: Nothing.
- **Linked Code**: `astro.config.mjs`; `tsconfig.json`.
- **Verification Result**: `npx astro sync` exited 0, the config import printed `file`, and `grep -c 'processor: unified'` printed `1`.

#### TASK-006 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Defined the `articles` and `pages` content collections and moved the three page sources into `src/content/pages/`.
- **Logic Changes**:
  - **Added**: `src/content.config.ts` uses glob loaders for `_articles/**/*.md` and `src/content/pages/*.md`.
  - **Modified**: Removed the obsolete Jekyll `layout` and `permalink` frontmatter keys from the moved page files. Also quoted the invalid YAML title early so `astro sync` could complete; the dedicated checker landed in TASK-007.
- **Linked Code**: `src/content.config.ts`; `src/content/pages/README.md`; `src/content/pages/changelogs.md`; `src/content/pages/404.md`.
- **Verification Result**: `npx astro sync` exited 0 and reported synced content; all three page files exist.

#### TASK-007 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added strict frontmatter validation and fixed the one invalid article title.
- **Logic Changes**:
  - **Added**: `scripts/check-frontmatter.mjs` parses every article and page frontmatter block with `yaml` and exits on the first parse error.
  - **Modified**: Quoted `title: "@liulifox233"` in `_articles/seeds/20260502-know-@liulifox233.md`; no other content changed.
- **Linked Code**: `scripts/check-frontmatter.mjs`; `_articles/seeds/20260502-know-@liulifox233.md`.
- **Verification Result**: Checker exited 0 with `checked=142 invalid=0`; the quoted title occurs once; `git diff --stat -- _articles` shows one changed file.

#### TASK-008 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added base-path, canonical, deployment URL, article path, date formatting, and article query helpers.
- **Logic Changes**:
  - **Added**: `src/lib/url.ts`, `src/lib/dates.ts`, and `src/lib/articles.ts`.
  - **Modified**: `articlePath()` additionally collapses characters the old Jekyll permalink treated as separators (`?`, `#`, trailing hyphen) while preserving `@` and non-ASCII letters, so the generated paths match the manifest.
- **Linked Code**: `src/lib/url.ts`; `src/lib/dates.ts`; `src/lib/articles.ts`.
- **Verification Result**: The two article examples and the slash-date example printed the expected values.

#### TASK-009 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added the minimal document layout and the flat route that renders all 139 articles.
- **Logic Changes**:
  - **Added**: `src/layouts/Base.astro`; `src/pages/[slug].astro` with `getStaticPaths()` over `getArticles()` and rendered `<Content />`.
  - **Modified**: Nothing.
- **Linked Code**: `src/layouts/Base.astro`; `src/pages/[slug].astro`.
- **Verification Result**: Build emitted 139 HTML files and all three required sample files exist.

#### TASK-010 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added the seven non-article routes with their original body markup, listing loops, home stream script, and page content.
- **Logic Changes**:
  - **Added**: `index.astro`, `labs.astro`, `thoughts.astro`, `stories.astro`, `README.astro`, `changelogs.astro`, and `404.astro`.
  - **Modified**: The home stream API base is now generated with `withBase('/api/posts/')`; listing pages use the article collection instead of Liquid `site.articles`.
- **Linked Code**: `src/pages/index.astro`; `src/pages/labs.astro`; `src/pages/thoughts.astro`; `src/pages/stories.astro`; `src/pages/README.astro`; `src/pages/changelogs.astro`; `src/pages/404.astro`.
- **Verification Result**: Build emitted all seven expected files; `dist/README.html` contains `<title>README - bGZo's blog</title>`.

#### TASK-011 Execution Record
- **Status**: Completed (2026-11-10)
- **Change Summary**: Added the Phase 1 filename verifier against the captured manifest.
- **Logic Changes**:
  - **Added**: `scripts/verify-url-names.mjs` checks every canonical HTML path, reports the article/page counts, and exits on missing files.
  - **Modified**: Nothing.
- **Linked Code**: `scripts/verify-url-names.mjs`.
- **Verification Result**: `npm run build && node scripts/verify-url-names.mjs` printed `checked=146 missing=0 articles=139 pages=7`.

**Phase 1 completion criteria**: `npm run build` emits all 146 canonical `.html` files with exact names, and `verify-url-names.mjs` reports zero missing paths.

### Implementation Phase 2

- GOAL-003: Replace all Jekyll layouts and includes with Astro layouts, components, and scripts while preserving DOM structure, titles, canonical URLs, TOC output, and heading IDs.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-012 | Pending | Create `src/components/Head.astro`. Emit exactly one `<title>{title} - bGZo's blog</title>` using the ASCII apostrophe from the current first title tag. Emit the favicon links, manifest link, `msapplication-TileColor`, `theme-color`, `/assets/css/custom.css`, `/assets/css/rouge-solarized.css`, `<link type="application/atom+xml" rel="alternate" href={canonical('/feed.xml')} title="bGZo's blog">`, `<link rel="canonical" href={canonical(pagePath)}>`, `<meta name="description" content={seoDescription}>`, `og:title`, `og:description`, `og:url`, `og:site_name` with value `bGZo’s blog`, `og:type` (`article` for posts, `website` for pages), `article:published_time` when available, `twitter:card` with value `summary`, `twitter:title`, and `twitter:description`. `seoDescription` is the page description or the site description `分享我的好运，偏见与无知`, truncated to 200 code points with a trailing `…` when longer. Include `GoogleAnalytics.astro`. Do not emit the Jekyll generator meta tag. | Build; `node -e "const fs=require('fs'); const h=fs.readFileSync('dist/20260328-refactor-jekyll-blog.html','utf8'); console.log((h.match(/<title>/g) ?? []).length, /<link rel=\"canonical\" href=\"https:\/\/blog.bgzo.cc\/20260328-refactor-jekyll-blog.html\"/.test(h))"` prints `1 true`; `grep -c 'Jekyll v4.3.4' dist/20260328-refactor-jekyll-blog.html` prints `0`.  | |
| TASK-013 | Pending | Create `src/components/Header.astro` by copying the current `_includes/header.html` markup and SVGs verbatim. Replace Liquid active-state checks with a `section` prop. Active rule: `seeds` for `section === 'seeds'` or `pagePath === '/'`; `labs` for `section === 'labs'`; `thoughts` for `section === 'thoughts'`; `stories` for `section === 'stories'`; `README` for `pagePath === '/README.html'`. Replace `relative_url` with `withBase`. In the home-title click script, replace the Liquid `relative_url` expression for `/` with `withBase('/')`. Create `src/components/Footer.astro` with the exact `<center>` copyright markup and the current year `new Date().getFullYear()`; create `src/components/SourceFooter.astro` with the current text, changing `Powered by Jekyll` to `Powered by Astro`. | Build; `grep -o '<li class="active"><a href="/labs.html">LABS</a></li>' dist/labs.html` prints exactly one match; `grep -c 'Powered by Astro' dist/labs.html` prints `1`; `grep -c 'href="/feed.xml"' dist/labs.html` prints at least `1`.  | |
| TASK-014 | Pending | Create `src/layouts/Default.astro`. It renders `Head.astro`, `Header.astro`, `<div class="container"><main><slot /></main></div>`, and `Footer.astro`, matching `_layouts/default.html`. Accept props `title`, `description`, `pagePath`, `section`. Switch `src/pages/README.astro` from `Base` to `Default` so the layout has one consumer. | Build; `diff <(sed -n 's/.*<div class="container">.*/MATCH/p' _site/README.html) <(sed -n 's/.*<div class="container">.*/MATCH/p' dist/README.html)` is empty; `grep -c '<div class="container">' dist/README.html` prints `1`; `grep -c '<header>' dist/README.html` prints `1`.  | |
| TASK-015 | Pending | Create `src/components/PostMeta.astro`. Accept `published`, `modified`, and `contentHtml`. Emit `Published: <time class="publish-date" datetime="YYYY-MM-DD">YYYY/MM/DD</time>` when published exists; emit `Updated: ...` when modified exists; compute character count as `contentHtml.replace(/<[^>]*>/g, '').replace(/\n/g, '').replace(/ /g, '').length`, compute `Math.max(1, Math.floor(count / 400))`, and emit `<span>{count} 字 · {minutes} min</span>`. Use `formatYmd` and `formatSlashYmd` from `src/lib/dates.ts`. | Build; `grep -o 'Published:.*min</span>' dist/20260328-refactor-jekyll-blog.html` prints a single span; extract the `N 字` value from `_site/20260328-refactor-jekyll-blog.html` and `dist/20260328-refactor-jekyll-blog.html` with `grep -o '[0-9]* 字'` and assert the relative difference is at most 1 percent.  | |
| TASK-016 | Pending | Create `src/components/Toc.astro`. Accept `headings` from `render(entry)`. Filter to `depth >= 2`. Build a nested `<ul>` using a stack algorithm: open a `<ul>` when depth increases, close `</li></ul>` when depth decreases, and close one `<li>` per sibling. Emit `<div class="contents"><ul>...</ul></div>` only when at least one heading remains. Each item is `<li><a href="#{slug}">{text}</a>`, with nested `<ul>` inside the parent `<li>`. Render it in both `Post.astro` and `ArchivedPost.astro` before the body. | Build; `node -e "const fs=require('fs');const h=fs.readFileSync('dist/20260328-refactor-jekyll-blog.html','utf8');console.log(h.includes('<div class=\"contents\"> <ul><li><a href=\"#jekyll-兼容自定义类型的-markdown-文件\">'))"` prints `true`; `grep -c 'class="contents"' dist/20260328-refactor-jekyll-blog.html` prints `1`.  | |
| TASK-017 | Pending | Create `src/components/OutdatedNotice.astro` by moving the inline script from `_includes/outdated-notice.html` into `src/scripts/outdated-notice.js` and rendering `<time id="article-updated" datetime={...} hidden></time>` plus a module script import. Create `MathJax.astro` with the exact MathJax config and CDN script from `_includes/mathjax.html`. Create `Giscus.astro` with the exact attributes from `_includes/giscus.html`, including `data-mapping="pathname"` and `data-strict="0"`. Create `GoogleAnalytics.astro` with the exact gtag snippet. | Build; `grep -c 'data-mapping="pathname"' dist/20260328-refactor-jekyll-blog.html` prints `1`; `grep -c 'data-strict="0"' dist/20260328-refactor-jekyll-blog.html` prints `1`; `grep -c 'mathjax@3/es5/tex-mml-chtml.js' dist/20260328-refactor-jekyll-blog.html` prints `1`; `grep -c 'G-T2EL9RT3Y9' dist/labs.html` prints `1`.  | |
| TASK-018 | Pending | Create `src/layouts/Post.astro` and `src/layouts/ArchivedPost.astro`. `Post.astro` renders `Head`, `Header`, `<main><article><h2>{title}</h2>`, `PostMeta`, `Toc`, `OutdatedNotice` only when `section === 'labs'`, `<slot />`, then imports `mathjax`, `embed`, `linkify`, `callout`, and `back-to-top` scripts, imports `code-blocks` only for article pages, renders `BackToTop`, conditionally renders `Giscus` when `comments === true` or `comments === 'True'`, and renders `SourceFooter`. `ArchivedPost.astro` renders the exact archive notice blockquote from `_layouts/archived-post.html`, `PostMeta`, `Toc`, body, `SourceFooter`, `BackToTop`, and the `mathjax`, `embed`, `linkify`, `callout`, and `back-to-top` scripts; it renders neither giscus nor code-blocks, matching `_layouts/archived-post.html`. Add `body class="single-post"`. | Build; `grep -c 'archive-notice' dist/look-back-to-your-loved-ones.html` prints `1`; `grep -c 'archive-notice' dist/20260328-refactor-jekyll-blog.html` prints `0`; `grep -c 'id="ikaros"' dist/20260328-refactor-jekyll-blog.html` prints `1`.  | |
| TASK-019 | Pending | Move `_includes/linkify.html`, `_includes/callout.html`, `_includes/embed.html`, and `_includes/top.html` script blocks into `src/scripts/linkify.js`, `src/scripts/callout.js`, `src/scripts/embed.js`, and `src/scripts/back-to-top.js`. Create `src/components/BackToTop.astro` containing the exact `<img id="ikaros" src={withBase('/assets/imgs/pngegg.png')} onclick="smoothscroll()">` markup from `_includes/top.html`. Keep the `back-to-top` script inline in `BackToTop.astro` with Astro's `is:inline` directive, because a bundled module would scope `smoothscroll()` to the module and break the `onclick` attribute. Preserve every regex, class name, and DOM operation. Add `src/scripts/outdated-notice.js` from TASK-017. Import scripts from `Post.astro` using `<script>import '../scripts/callout.js';</script>` blocks. | Build; `grep -c 'Transform GFM-style callouts' dist/20260328-refactor-jekyll-blog.html` prints `1`; `grep -c 'Add linkify script' dist/20260328-refactor-jekyll-blog.html` prints `1`; run `node --check src/scripts/callout.js && node --check src/scripts/linkify.js && node --check src/scripts/embed.js && node --check src/scripts/back-to-top.js && node --check src/scripts/outdated-notice.js`.  | |
| TASK-020 | Pending | Rewrite `src/scripts/code-blocks.js` for Shiki. Before initializing, wrap every `pre.astro-code` in `<div class="highlighter-rouge"><div class="highlight"></div></div>` and move the pre into the inner div. Determine language from `pre.dataset.language` or `pre.className`. Keep the existing copy button, clipboard fallback, SVG strings, and class names unchanged. Target `div.highlighter-rouge` exactly as before after wrapping. | Build; `grep -c 'pre.astro-code' src/scripts/code-blocks.js` prints at least `1`; serve `dist`, run `curl -s http://localhost:4321/20230708-games-never-played-until-died.html -o /tmp/opencode/code-page.html`, and run `grep -c 'astro-code' /tmp/opencode/code-page.html`; the count is at least `1`; confirm in a browser that the copy button appears and writes to the clipboard. | |
| TASK-021 | Pending | Create `src/components/PostList.astro`. Accept `section` and `title`. Query `getCollection('articles')`, filter by `section`, sort by `created` descending using `byCreatedDesc`, group by the `created` year, and render `<div class="posts-year-group" data-year="YYYY"><ul class="posts">...`. Each item renders `<li class="post">`, `<a class="post-title" href={entry.url}>{title}</a>`, an optional `<div class="post-excerpt">` containing the escaped description truncated to 497 characters plus `...` when longer than 500, with newlines converted to `<br>`, and `<time class="publish-date" datetime="YYYY-MM-DD">YYYY/MM/DD</time>` from `created`. Replace the inline listing loops in `src/pages/labs.astro`, `thoughts.astro`, and `stories.astro` with `PostList`; the rendered HTML must be byte-identical before and after the extraction. | Build; `grep -c 'posts-year-group' dist/thoughts.html` is greater than `0`; `grep -c 'post-excerpt' dist/labs.html` is greater than `0`; compare the number of `class="post"` items in `dist/thoughts.html` to the old `_site/thoughts.html`; the counts must be equal.  | |
| TASK-022 | Pending | Create `src/components/HomeStream.astro` with the exact preface HTML, `<ul class="posts home-stream" id="post-stream">`, and the pagination nav from `index.md`. Move the inline script into `src/scripts/home-stream.js`. Replace the Liquid `API_BASE` with `const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, '') + '/api/posts/'`. Keep every DOM operation, hash parsing, fetch path, image strip, and page button behavior. Replace the inline markup and script in `src/pages/index.astro` with `Default` layout plus `HomeStream`; the rendered HTML must be byte-identical before and after the extraction. | Build; `grep -c 'id="post-stream"' dist/index.html` prints `1`; `grep -c 'var API_BASE' dist/index.html` prints `0`; `grep -c 'api/posts/' dist/index.html` prints at least `1`; serve `dist` and confirm the stream loads page 1 and `/#p2` loads page 2.  | |
| TASK-023 | Pending | Upgrade `src/pages/changelogs.astro` to render the `changelogs` entry inside `Post` with title `Changelogs` instead of the intermediate `Base` shell. Update the flat `src/pages/[slug].astro` to choose `Post.astro` when `isArchive` is false and `ArchivedPost.astro` when `isArchive` is true, passing `entry`, `headings`, and `entry.rendered.html`. Keep `README.astro` on `Default` and `404.astro` on `Default` with its `<style>` block. | Build; `node scripts/verify-url-names.mjs` exits 0; `grep -c '<h2>Changelogs</h2>' dist/changelogs.html` prints `1`; `grep -c 'header,' dist/404.html` prints `1`; `grep -c 'class="single-post"' dist/20260328-refactor-jekyll-blog.html` prints `1`.  | |
| TASK-024 | Pending | Create `scripts/verify-dom.mjs`. For every entry in `tests/fixtures/url-manifest.json` `html` array, parse `dist/<path>`, extract the first `<title>` and the canonical href, and assert equality with the fixture. Extract all `<h2>` through `<h6 id="...">` IDs from both `_site/<path>` and `dist/<path>`, and assert the ID arrays are equal. Extract the `<div class="contents">` inner HTML from both and assert equality after collapsing whitespace. Write `tests/reports/content-diff.json` with one record per page containing `path`, `oldTextLength`, `newTextLength`, and `identical` after stripping tags and collapsing whitespace. Print `title`, `canonical`, `headingIds`, `toc`, and `content` counters. Exit 1 on any title, canonical, heading ID, or TOC mismatch; text differences are recorded but do not fail the build. | `node scripts/verify-dom.mjs` exits 0 and prints `title=146/146 canonical=146/146 headingIds=146/146 toc=146/146`.  | |

**Phase 2 completion criteria**: every page has one title, one canonical, matching heading IDs, matching TOC list content, and the post/archive/listing/home DOM structures match the old site.

### Implementation Phase 3

- GOAL-004: Recreate the JSON API, Atom feeds, and sitemap at their current paths with byte-level behavioral parity.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-025 | Pending | Create `src/pages/api/posts/[page].json.ts`. `getStaticPaths()` filters articles with `section !== 'archives'`, sorts by `formatSortable(data.published)` ascending, reverses the array, chunks it by 5, and returns `{ params: { page: String(index + 1) } }` for each chunk. `GET()` returns `JSON.stringify` of an object with `posts`, `total_pages`, `current_page`, and `next_page`. Each post object has `title`, `url` (base-aware root-relative via `withBase(articlePath(id))`, so the root build emits `/slug.html` and the GitHub Pages build emits `/blog/slug.html`), `date` (`YYYY/MM/DD`), `datetime` (`YYYY-MM-DD`), `image_url` (first image or `null`), `image_urls`, `desc`, and `desc_html`. Implement `truncateText` with code points: if `Array.from(text).length > limit`, return `Array.from(text).slice(0, limit - 3).join('') + '...'`. Implement `plainTextToHtml`: split on two or more newlines, trim, drop empty, HTML-escape `& < > "`, replace single newlines with `<br>`, wrap each paragraph in `<p>`. Implement `extractImages` by scanning the raw markdown for markdown image syntax and raw `<img src>` attributes, merging matches by source index, applying the denylist `img.shields.io`, `github-readme-stats.vercel.app`, `x.com`, `twitter.com`, rejecting URLs containing `{` or `}`, rejecting `.svg`, accepting URLs whose pathname ends in `.apng`, `.avif`, `.gif`, `.jpeg`, `.jpg`, `.png`, `.svg`, or `.webp`, optionally followed by a query string, URLs containing `/assets/` and `github.com`, `githubusercontent.com`, or `private-user-images.githubusercontent.com`, and de-duplicating in encounter order. Use `desc` equal to `truncateText(description, 500)` and `desc_html` equal to `plainTextToHtml(description)`. | `npm run build`; `test -f dist/api/posts/1.json && test -f dist/api/posts/23.json`; `node -e "const a=require('./dist/api/posts/1.json');const b=require('./tests/fixtures/url-manifest.json').api['1.json'];console.log(a.total_pages,b.total_pages,a.posts.length,b.posts.length)"` prints `23 23 5 5`; TASK-028 deep comparison passes.  | |
| TASK-026 | Pending | Create `src/pages/feed.xml.ts` and `src/pages/seed.xml.ts`. Both return `new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } })`. Emit the same Atom structure and fields as `_site/feed.xml`: `generator` with `uri="https://jekyllrb.com/"` and `version="4.3.4"` as literal text, `link rel="self"` with `deploymentUrl('/feed.xml')`, `link rel="alternate"` with `deploymentUrl('/')`, `updated` as the build time in ISO with `+00:00`, `id` with `deploymentUrl('/feed.xml')`, `title type="html"`, `subtitle`, `author/name`, and 50 `entry` elements. Each entry has `title type="html"`, `link rel="alternate"` with `deploymentUrl(articlePath(id))`, `published`, `updated`, `id` equal to `deploymentUrl(articlePath(id))` with `.html` removed, `content type="html"` containing the escaped description plus `&lt;p&gt;&lt;a href="URL"&gt;Read More&lt;/a&gt;&lt;/p&gt;`, and `summary` when description exists. `feed.xml` filters to `labs`, `thoughts`, `stories`; `seed.xml` uses all articles. Sort by `published` descending, limit 50. Use `formatIsoLocal` with `+00:00` suffix to match current output. | Build; `test -f dist/feed.xml && test -f dist/seed.xml`; `grep -c '<entry>' dist/feed.xml` prints `50`; `grep -c '<entry>' dist/seed.xml` prints `50`; `node scripts/verify-data.mjs` (TASK-028) reports matching feed path sets.  | |
| TASK-027 | Pending | Create `src/pages/sitemap.xml.ts`. Return `application/xml`. Emit `<urlset>` with one `<url>` per canonical HTML page except `/404.html`; each `<url>` has `<loc>` equal to the absolute canonical URL and `<lastmod>` equal to `modified` or `published` in `YYYY-MM-DDTHH:mm:ss+00:00` format. The result must contain 145 `<url>` elements. | Build; `test -f dist/sitemap.xml`; `grep -c '<url>' dist/sitemap.xml` prints `145`; `grep -c '<loc>https://blog.bgzo.cc/20260328-refactor-jekyll-blog.html</loc>' dist/sitemap.xml` prints `1`; `grep -c '404.html' dist/sitemap.xml` prints `0`.  | |
| TASK-028 | Pending | Create `scripts/verify-data.mjs`. Accept a `--base` flag with default `/`. Compare `dist/api/posts/N.json` with the fixture for `N` from 1 to 23. Deep-compare all fields; for the `url` field, normalize it by stripping the base prefix and compare the resulting pathname with the fixture value. Compare `dist/feed.xml` and `dist/seed.xml` entry link pathnames with the fixture arrays after stripping the base prefix. Compare the sitemap `<loc>` pathname set with the fixture HTML path set minus `/404.html`. Print `api`, `feed`, and `sitemap` match counters. Exit 1 on any mismatch. | `node scripts/verify-data.mjs` exits 0 and prints `api=23/23 feed=50/50 seed=50/50 sitemap=145/145`.  | |

**Phase 3 completion criteria**: `verify-data.mjs` reports full API, feed, and sitemap parity.

### Implementation Phase 4

- GOAL-005: Publish all static assets, remove Tailwind and Rouge, generate extensionless aliases, and pass the full URL and smoke-test suite.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-029 | Pending | Create the `public/` directory and move the static tree with `mkdir -p public && git mv assets public/assets`. Remove only the three `@tailwind` lines from `public/assets/css/custom.css`; leave every other byte unchanged. Copy `assets/favicons/favicon.ico` to `public/favicon.ico`, create `public/robots.txt` containing exactly `Sitemap: https://blog.bgzo.cc/sitemap.xml` followed by a newline, copy `vercel.json` to `public/vercel.json`, and copy `wrangler.jsonc` to `public/wrangler.jsonc`. Do not copy `telegram-iv-template.txt` or `debug/`; they are untracked and absent from a clean Jekyll build. Create an empty file `public/.nojekyll`. Remove `public/assets/js/code-blocks.js` because the script now lives in `src/scripts/`. | Build; `test -f dist/assets/css/custom.css && test -f dist/favicon.ico && test -f dist/robots.txt && test -f dist/vercel.json && test -f dist/wrangler.jsonc && test -f dist/.nojekyll`; `grep -c '@tailwind' dist/assets/css/custom.css` prints `0`; `grep -c 'texture.png' dist/assets/css/custom.css` prints `1`; `test ! -f dist/telegram-iv-template.txt`.  | |
| TASK-030 | Pending | Add Shiki CSS rules to `public/assets/css/custom.css`: `pre.astro-code { padding: 1rem; border-radius: var(--border-radius); overflow-x: auto; }`, `pre.astro-code code { display: block; }`, the light-mode rules `pre.astro-code, pre.astro-code span { color: var(--shiki-light); background-color: var(--shiki-light-bg); }`, and the dark-mode override `@media (prefers-color-scheme: dark) { pre.astro-code, pre.astro-code span { color: var(--shiki-dark) !important; background-color: var(--shiki-dark-bg) !important; } }`. Remove the `<link href="/assets/css/rouge-solarized.css">` line from `Head.astro` and delete `public/assets/css/rouge-solarized.css`. Keep the existing `.highlighter-rouge` rules because TASK-020 wraps Shiki output in that structure. | Build; `grep -c 'pre.astro-code' dist/assets/css/custom.css` prints at least `2`; `grep -c 'rouge-solarized.css' dist/20260328-refactor-jekyll-blog.html` prints `0`; `test ! -f dist/assets/css/rouge-solarized.css`; serve and confirm code blocks have a solarized background in both light and dark color schemes.  | |
| TASK-031 | Pending | Create `scripts/generate-aliases.mjs`. Walk `dist/**/*.html`. For every file except `dist/index.html` and `dist/404.html`, compute `relative = path.relative('dist', file)`, strip `.html`, create `dist/<relative>/`, and copy the file bytes to `dist/<relative>/index.html`. Before copying, remove any existing alias directory for the same target. Do not touch `dist/api/**`, `dist/assets/**`, feeds, or sitemap. The script must be idempotent. Update `package.json` so `"build"` becomes `"astro build && node scripts/generate-aliases.mjs"`; this is the first task that makes alias generation part of the build. | `npm run build`; `test -f dist/labs/index.html && test -f dist/README/index.html && test -f dist/20260522-want-a-windows-pad/index.html && test -f "dist/wnen-u-want-to-use-proxies-on-cybercafé/index.html"`; `test ! -f dist/index/index.html`; `test ! -f dist/404/index.html`; run `node scripts/generate-aliases.mjs` twice and confirm `git status --porcelain` is unchanged.  | |
| TASK-032 | Pending | Create `scripts/verify-urls.mjs`. Assert every `files[]` path from the fixture exists in `dist`. Assert every canonical HTML path has a byte-identical alias at `dist/<path without .html>/index.html`, except `index.html` and `404.html`. Assert no canonical `.html` file exists outside the fixture set, ignoring files under alias directories. Assert every HTML page has exactly one `<title>` and one canonical link. Write `tests/reports/url-parity.json` with `files`, `canonicalHtml`, `aliases`, `titles`, `canonicals`, and `failures`. Exit 1 when `failures` is non-empty. | `node scripts/verify-urls.mjs` exits 0 and prints `files=192/192 html=146/146 aliases=144/144 titles=146/146 canonicals=146/146 failures=0`.  | |
| TASK-033 | Pending | Create `scripts/serve-and-smoke.mjs`. Start a Node HTTP server that serves `dist` at both `/` and `/blog/`, stripping the `/blog` prefix. Request these 20 paths, follow up to 3 redirects, and assert the final response is HTTP 200 with a non-empty body: `/`, `/README.html`, `/README/`, `/labs.html`, `/labs/`, `/20260522-want-a-windows-pad.html`, `/20260522-want-a-windows-pad/`, `/look-back-to-your-loved-ones.html`, `/look-back-to-your-loved-ones/`, `/20260505-fix-venera-download-long-photos-on-iOS-iPadOS.html`, `/wnen-u-want-to-use-proxies-on-cybercafé.html`, `/wnen-u-want-to-use-proxies-on-cybercaf%C3%A9.html`, `/feed.xml`, `/seed.xml`, `/sitemap.xml`, `/api/posts/1.json`, `/api/posts/23.json`, `/404.html`, `/assets/css/custom.css`, `/favicon.ico`. Also request each path under `/blog`. Record the final URL for every request. Print a `passed/failed` counter and exit 1 on any failure. | `npm run build && node scripts/serve-and-smoke.mjs` exits 0 and prints `passed=40 failed=0`.  | |
| TASK-034 | Pending | Run both deployment builds: `BASE_PATH=/ SITE_URL=https://blog.bgzo.cc npm run build` and `BASE_PATH=/blog SITE_URL=https://bgzo.github.io npm run build`. For the `/blog` build, assert every internal `href` and `src` that starts with `/` also starts with `/blog/`, except external URLs and fragment-only links. Add this check to `verify-urls.mjs` behind a `--base=/blog` flag. | `BASE_PATH=/blog SITE_URL=https://bgzo.github.io npm run build && node scripts/verify-urls.mjs --base=/blog` exits 0 and prints `baseLinks=0 failures=0`; `grep -o 'href="/blog/labs.html"' dist/labs.html` prints one match.  | |

**Phase 4 completion criteria**: all 192 public paths exist, all 144 aliases are byte-identical, the 40-request smoke suite passes, and the `/blog` build has zero root-relative internal links.

### Implementation Phase 5

- GOAL-006: Update all deployment targets and verify preview deployments before touching `main`.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-035 | Pending | Replace `.github/workflows/github-pages.yml` build steps. Keep triggers `push` to `main` and `maintain` plus `workflow_dispatch`. Keep permissions and concurrency. Steps: checkout, `actions/setup-node@v4` with `node-version: '20'` and `cache: 'npm'`, `npm ci`, `BASE_PATH=/blog SITE_URL=https://bgzo.github.io npm run build`, `node scripts/verify-urls.mjs --base=/blog`, `node scripts/verify-data.mjs --base=/blog`, `actions/upload-pages-artifact@v3` with `path: dist`, then the existing deploy job. Remove Ruby, Bundler, Tailwind, and `_site` references. | `actionlint .github/workflows/github-pages.yml` exits 0 if actionlint is installed, otherwise `node -e "const y=require('fs').readFileSync('.github/workflows/github-pages.yml','utf8'); console.log(y.includes('BASE_PATH=/blog'), y.includes('ruby/setup-ruby'), y.includes('_site'))"` prints `true false false`.  | |
| TASK-036 | Pending | Replace root `vercel.json` with `{ "buildCommand": "npm run build", "outputDirectory": "dist" }`. Remove `cleanUrls` entirely so `/name.html` and `/name/` are both served without a host redirect from `.html` to extensionless. Keep `public/vercel.json` as the TASK-029 legacy copy. | `node -e "const c=require('./vercel.json'); console.log(c.buildCommand, c.outputDirectory, c.cleanUrls)"` prints `npm run build dist undefined`; `test -f public/vercel.json`.  | |
| TASK-037 | Pending | Update root `wrangler.jsonc`: keep `name` and `compatibility_date`, change `assets.directory` from `_site` to `dist`, and keep `not_found_handling: "404-page"`. Keep `public/wrangler.jsonc` as the TASK-029 legacy copy. | `node -e "const c=require('./wrangler.jsonc'); console.log(c.assets.directory, c.assets.not_found_handling)"` prints `dist 404-page`.  | |
| TASK-038 | Pending | Update `src/content/pages/README.md` build instructions: replace the hidden Jekyll command block with `npm ci`, `npm run build`, and `npm run verify`. Do not change the visible README prose. Update `SourceFooter.astro` if not already done in TASK-013. | `grep -c 'npm run build' src/content/pages/README.md` prints at least `1`; `grep -c 'gem install jekyll' src/content/pages/README.md` prints `0`.  | |
| TASK-039 | Pending | Push `astro-migration` to origin with `git push -u origin astro-migration`. Create a Vercel preview deployment from the branch and a Cloudflare Workers preview deployment from the branch. Record both preview URLs in `tests/reports/preview-urls.md`. | `git ls-remote --heads origin astro-migration` prints the branch; `test -s tests/reports/preview-urls.md`; both preview URLs return HTTP 200 for `/` and `/labs.html`.  | |
| TASK-040 | Pending | Run the 20-path smoke suite against both preview URLs and against a local base-mounted server for the GitHub Pages build. Add each target and its result to `tests/reports/target-matrix.md`. Targets: `https://blog.bgzo.cc` (post-merge), `https://bgzo.github.io/blog` (post-merge), Vercel preview, Cloudflare preview. | `tests/reports/target-matrix.md` contains four rows; the three pre-merge rows contain `PASS`; `grep -c 'FAIL' tests/reports/target-matrix.md` prints `0`.  | |

**Phase 5 completion criteria**: GitHub Actions workflow uses Node only, Vercel and Cloudflare configs point to `dist`, and both preview deployments pass the smoke suite.

### Implementation Phase 6

- GOAL-007: Remove the Jekyll toolchain, run the complete acceptance suite, squash-merge to `main`, verify production on both domains, and preserve rollback.

| Task | Status | Description | Verification Steps | Date |
| ---- | ------ | ----------- | ------------------ | ---- |
| TASK-041 | Pending | Delete the Jekyll-only source files and directories: `Gemfile`, `Gemfile.lock`, `_config.yml`, `_config_github.yml`, `_layouts/`, `_includes/`, `_plugins/`, `tailwind.config.js`, `feed.xml`, `seed.xml`, `index.md`, `labs.md`, `thoughts.md`, `stories.md`, `404.md`, `changelogs.md`, `README.md`, and the empty `pages/` directory. Keep `_site/` and `.jekyll-cache/` until TASK-042 finishes the old-site comparison. Keep `_articles/` unchanged. Keep `public/`, `src/`, `scripts/`, `tests/`, `astro.config.mjs`, and `package.json`. | `test ! -e Gemfile && test ! -e _config.yml && test ! -e _plugins && test ! -e _layouts && test ! -e _includes && test ! -e tailwind.config.js`; `test -d _site`; `test -d _articles`; `find _articles -name '*.md' > /tmp/opencode/articles.txt && wc -l < /tmp/opencode/articles.txt` prints `139`. | |
| TASK-042 | Pending | Run the full acceptance suite before deleting the old output: `BASE_PATH=/ SITE_URL=https://blog.bgzo.cc npm run build && npm run verify && npm run verify:dom && node scripts/serve-and-smoke.mjs && BASE_PATH=/blog SITE_URL=https://bgzo.github.io npm run build && node scripts/verify-urls.mjs --base=/blog && node scripts/verify-data.mjs --base=/blog`. Then remove the old output with `rm -rf _site .jekyll-cache`. Ensure `tests/reports/` contains `url-parity.json`, `content-diff.json`, `target-matrix.md`, and `preview-urls.md`. | The command chain exits 0; `node -e "const r=require('./tests/reports/url-parity.json'); console.log(r.failures.length)"` prints `0`; `grep -c 'FAIL' tests/reports/target-matrix.md` prints `0`; `test ! -e _site && test ! -e .jekyll-cache`.  | |
| TASK-043 | Pending | Squash-merge into `main`: `git switch main`, `git pull --ff-only`, `git merge --squash astro-migration`, `git commit -m "refactor: migrate blog from Jekyll to Astro"`, `git push origin main`. Do not force-push. Keep the `astro-migration` branch. | `git log --oneline -1 main` prints the squash commit; `git diff --stat pre-astro-migration..main` shows the migration; `git branch --show-current` prints `main`; `git ls-remote --heads origin main` prints the new commit.  | |
| TASK-044 | Pending | After the GitHub Pages workflow completes, run the 20-path smoke suite against `https://blog.bgzo.cc` and `https://bgzo.github.io/blog`, following up to 3 redirects and accepting the final 200 response. Verify `/20260522-want-a-windows-pad.html`, `/20260522-want-a-windows-pad/`, `/look-back-to-your-loved-ones.html`, `/wnen-u-want-to-use-proxies-on-cybercafé.html`, `/feed.xml`, `/seed.xml`, `/sitemap.xml`, and `/api/posts/1.json` on both hosts. Record each initial URL, final URL, and status in `tests/reports/production-smoke.md`. | `tests/reports/production-smoke.md` contains two host sections and 40 `PASS` lines; `grep -c 'FAIL' tests/reports/production-smoke.md` prints `0`.  | |
| TASK-045 | Pending | After seven consecutive days without a production regression, delete the `astro-migration` branch with `git push origin --delete astro-migration` and `git branch -D astro-migration`. Keep the `pre-astro-migration` tag permanently. | `git ls-remote --heads origin astro-migration` prints nothing; `git tag -l pre-astro-migration` prints the tag; `git rev-parse pre-astro-migration` prints `09395612c970d061c3edc01cf73a426989995df2`.  | |

**Phase 6 completion criteria**: `main` contains the Astro implementation, both production domains pass the smoke suite, and the rollback tag exists.

## 3. Alternatives

- **ALT-001**: Replace Jekyll in place on `main`. Rejected because there is no isolated rollback and the URL parity work would share a branch with production.
- **ALT-002**: Use Astro 7 default Sätteri Markdown processor. Rejected because Sätteri has no `remark-breaks` equivalent, and `hard_wrap: true` behavior is required for 139 existing articles.
- **ALT-003**: Adopt clean URLs without `.html`. Rejected because it changes 146 canonical URLs, breaks existing external links, changes giscus pathnames, and conflicts with the URL compatibility requirement.
- **ALT-004**: Move content to `src/content/articles/`. Rejected because the external sync bot writes to `_articles/` and would require a cross-repository change.
- **ALT-005**: Replace the home stream with build-time static HTML and remove the JSON API. Rejected for this migration because `/api/posts/N.json` is part of the public URL contract and the existing home script already works.
- **ALT-006**: Use `@astrojs/rss` for both feeds. Rejected because it emits RSS 2.0 while the current feeds are Atom with custom fields and a literal Jekyll generator element.
- **ALT-007**: Use `@astrojs/sitemap`. Rejected because it emits `sitemap-index.xml` and `sitemap-0.xml`, while the current public path is a single `/sitemap.xml`.
- **ALT-008**: Use `directory` build format and host rewrites for `.html`. Rejected because GitHub Pages cannot rewrite extensionless paths to `.html` files, so `.html` would stop working there.
- **ALT-009**: Add Vue islands during the migration. Rejected because the agreed scope is equivalent migration only; Vue is deferred until a real interactive component is required.

## 4. Dependencies

- **DEP-001**: `astro@7.4.8`, installed in `package.json` and locked in `package-lock.json`.
- **DEP-002**: `@astrojs/markdown-remark@7.3.6`, required to select the Unified processor and install `remark-breaks`.
- **DEP-003**: `remark-breaks@4.0.0`, required to reproduce kramdown `hard_wrap: true`.
- **DEP-004**: Node.js 20 or newer and npm 10 or newer. CI uses Node 20.
- **DEP-005**: Node.js built-in `http` and `fetch` modules for `scripts/serve-and-smoke.mjs`; no additional HTTP-server dependency is installed.
- **DEP-006**: GitHub Actions `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`.
- **DEP-007**: A Vercel project and a Cloudflare Workers project connected to the repository for branch previews.
- **DEP-008**: Ruby and Bundler only for TASK-002 baseline capture; they are removed in TASK-041.

## 5. Files

- **FILE-001**: `astro.config.mjs` — Astro static configuration, Unified processor, Shiki dual themes.
- **FILE-002**: `package.json` — Astro scripts and pinned dependencies.
- **FILE-003**: `src/content.config.ts` — `articles` and `pages` collections.
- **FILE-004**: `src/lib/url.ts` — base-path helper, canonical helper, article path rule.
- **FILE-005**: `src/lib/dates.ts` — timezone-safe date formatting.
- **FILE-006**: `src/lib/articles.ts` — collection query helpers and sort order.
- **FILE-007**: `src/layouts/Base.astro` — minimal document shell used by Phase 1.
- **FILE-008**: `src/layouts/Default.astro` — page shell.
- **FILE-009**: `src/layouts/Post.astro` — article shell with TOC, meta, giscus, and scripts.
- **FILE-010**: `src/layouts/ArchivedPost.astro` — archived article shell with notice.
- **FILE-011**: `src/components/Head.astro` — title, canonical, description, Open Graph, Twitter, CSS, feed link, analytics.
- **FILE-012**: `src/components/Header.astro` — header, RSS/Telegram/GitHub buttons, nav, active state.
- **FILE-013**: `src/components/Footer.astro` — copyright footer.
- **FILE-014**: `src/components/SourceFooter.astro` — powered-by and license footer.
- **FILE-015**: `src/components/PostMeta.astro` — published, updated, reading time.
- **FILE-016**: `src/components/Toc.astro` — nested table of contents from Astro headings.
- **FILE-017**: `src/components/OutdatedNotice.astro` — labs outdated warning host element.
- **FILE-018**: `src/components/MathJax.astro` — MathJax configuration and CDN script.
- **FILE-019**: `src/components/Giscus.astro` — giscus comment client.
- **FILE-020**: `src/components/GoogleAnalytics.astro` — gtag snippet.
- **FILE-021**: `src/components/PostList.astro` — year-grouped listing for labs, thoughts, stories.
- **FILE-022**: `src/components/HomeStream.astro` — home stream markup and pagination.
- **FILE-023**: `src/pages/[slug].astro` — 112 live article routes.
- **FILE-024**: `src/pages/[slug].astro` also owns the 27 archived article routes; no nested archive route is created because it would change the URLs.
- **FILE-025**: `src/pages/index.astro` — home page at `/`.
- **FILE-026**: `src/pages/labs.astro` — labs listing at `/labs.html`.
- **FILE-027**: `src/pages/thoughts.astro` — thoughts listing at `/thoughts.html`.
- **FILE-028**: `src/pages/stories.astro` — stories listing at `/stories.html`.
- **FILE-029**: `src/pages/README.astro` — README at `/README.html`.
- **FILE-030**: `src/pages/changelogs.astro` — changelogs at `/changelogs.html`.
- **FILE-031**: `src/pages/404.astro` — 404 page at `/404.html`.
- **FILE-032**: `src/pages/api/posts/[page].json.ts` — paginated JSON API.
- **FILE-033**: `src/pages/feed.xml.ts` — filtered Atom feed.
- **FILE-034**: `src/pages/seed.xml.ts` — complete Atom feed.
- **FILE-035**: `src/pages/sitemap.xml.ts` — single sitemap.
- **FILE-036**: `src/scripts/callout.js` — GFM callout transformer.
- **FILE-037**: `src/scripts/linkify.js` — automatic linkification.
- **FILE-038**: `src/scripts/embed.js` — YouTube and Twitter embeds.
- **FILE-039**: `src/scripts/back-to-top.js` — Ikaros back-to-top button.
- **FILE-040**: `src/scripts/outdated-notice.js` — 730-day outdated warning.
- **FILE-041**: `src/scripts/code-blocks.js` — Shiki wrapper and copy button.
- **FILE-042**: `src/scripts/home-stream.js` — home stream fetch, render, hash pagination.
- **FILE-043**: `public/assets/**` — CSS, images, favicons copied from the old `assets/` tree.
- **FILE-044**: `public/favicon.ico`, `public/robots.txt`, `public/vercel.json`, `public/wrangler.jsonc`, `public/.nojekyll` — legacy public files.
- **FILE-045**: `scripts/capture-baseline.mjs` — old-site fixture generator.
- **FILE-046**: `scripts/check-frontmatter.mjs` — YAML validation for all articles.
- **FILE-047**: `scripts/verify-url-names.mjs` — Phase 1 filename check.
- **FILE-048**: `scripts/verify-dom.mjs` — title, canonical, heading ID, and TOC parity.
- **FILE-049**: `scripts/verify-data.mjs` — API, feed, and sitemap parity.
- **FILE-050**: `scripts/generate-aliases.mjs` — extensionless directory aliases.
- **FILE-051**: `scripts/verify-urls.mjs` — full URL, alias, title, canonical, and base-path contract check.
- **FILE-052**: `scripts/serve-and-smoke.mjs` — dual-mount HTTP smoke suite.
- **FILE-053**: `tests/fixtures/url-manifest.json` — golden old-site manifest.
- **FILE-054**: `tests/fixtures/url-contract.md` — human-readable URL rules.
- **FILE-055**: `.github/workflows/github-pages.yml` — Astro build and Pages deploy.
- **FILE-056**: `vercel.json` — Vercel build and output configuration.
- **FILE-057**: `wrangler.jsonc` — Cloudflare Workers assets configuration.
- **FILE-058**: `docs/implement-plans/20261110-architecture-astro-migration.md` — this plan.

Files deleted in TASK-041: `Gemfile`, `Gemfile.lock`, `_config.yml`, `_config_github.yml`, `_layouts/`, `_includes/`, `_plugins/`, `tailwind.config.js`, `feed.xml`, `seed.xml`, `index.md`, `labs.md`, `thoughts.md`, `stories.md`, `404.md`, `changelogs.md`, `README.md`, and `pages/`. The generated `_site/` and `.jekyll-cache/` directories are deleted in TASK-042 after the final old-site comparison.

## 6. Testing

- **TEST-001**: `node scripts/check-frontmatter.mjs` parses all 139 articles and all 3 page files with zero errors.
- **TEST-002**: `node scripts/verify-url-names.mjs` confirms all 146 canonical HTML filenames exist.
- **TEST-003**: `node scripts/verify-dom.mjs` confirms 146/146 titles, 146/146 canonical links, 146/146 heading ID arrays, and 146/146 TOC fragments match the old site after whitespace normalization.
- **TEST-004**: `node scripts/verify-data.mjs` confirms 23/23 API pages deep-equal except `url`, 50/50 links in each feed, and 145/145 sitemap paths.
- **TEST-005**: `node scripts/verify-urls.mjs` confirms 192/192 public files, 146/146 canonical pages, 144/144 aliases, 146/146 titles, 146/146 canonicals, and zero failures.
- **TEST-006**: `node scripts/serve-and-smoke.mjs` confirms 40/40 HTTP requests return 200, including `.html`, extensionless, non-ASCII, uppercase, archive, API, feed, sitemap, and asset paths.
- **TEST-007**: `node scripts/verify-urls.mjs --base=/blog` confirms the GitHub Pages build contains zero root-relative internal links without the `/blog` prefix.
- **TEST-008**: `node scripts/generate-aliases.mjs` is idempotent: a second run produces no file changes.
- **TEST-009**: `node scripts/capture-baseline.mjs` is reproducible: running it twice against the same fresh Jekyll build produces an identical fixture.
- **TEST-010**: Manual browser checks on `dist` for one live post, one archived post, the home stream page 2, callout rendering, YouTube embed, code copy button, MathJax, giscus, and the back-to-top button.
- **TEST-011**: Production smoke: `tests/reports/production-smoke.md` contains 40 PASS lines and zero FAIL lines across `https://blog.bgzo.cc` and `https://bgzo.github.io/blog`.
- **TEST-012**: `grep -RInE 'token|secret|password|api[_-]?key' public/` returns only public configuration values.

## 7. Risks & Assumptions

- **RISK-001**: Astro 7 defaults to Sätteri, which would silently drop `remark-breaks` and collapse the hard-wrapped paragraphs. Mitigation: TASK-005 explicitly selects the Unified processor and TASK-003/TEST-003 compare body output.
- **RISK-002**: Non-ASCII route output may be percent-encoded on disk. Mitigation: TASK-031 and TASK-032 verify the raw UTF-8 filename and the `%C3%A9` request; if Astro emits a different filename, `generate-aliases.mjs` must create the exact manifest path as an alias.
- **RISK-003**: Vercel `cleanUrls` previously redirected `.html` to extensionless and would break the canonical `.html` 200 requirement. Mitigation: TASK-036 removes `cleanUrls`.
- **RISK-004**: GitHub Pages is a project site under `/blog`, and root-relative links break there. Mitigation: TASK-034 and TEST-007 fail the build on any root-relative internal link in the `/blog` build.
- **RISK-005**: Date formatting can shift by one day if UTC conversion is used. Mitigation: `src/lib/dates.ts` parses the `YYYY-MM-DD` prefix and formats with local getters, never `toISOString()`.
- **RISK-006**: The API `desc_html` and `image_urls` logic may differ from the Ruby implementation. Mitigation: TASK-025 ports the exact algorithms and TASK-028 deep-compares all 23 pages.
- **RISK-007**: The archive URL rule is easy to miss because 27 files use `YYYY-MM-DD-` prefixes. Mitigation: TASK-008 encodes the rule in one function and TASK-032 checks both `/look-back-to-your-loved-ones.html` and `/20221223-look-back-to-your-loved-ones.html`.
- **RISK-008**: Extensionless aliases double the HTML output from roughly 6 MB to 12 MB. Mitigation: accept the size; the site is static and the files are small.
- **RISK-009**: giscus comments are mapped by pathname; both domains currently produce different pathnames. Mitigation: do not change pathnames, keep `data-mapping="pathname"`, and document that the GitHub Pages mirror may have separate comment threads.
- **RISK-010**: The API is still generated even though Astro could render the home stream statically. Mitigation: keep the API because it is a public URL; schedule static rendering as a future optimization outside this plan.
- **ASSUMPTION-001**: `docs/memories/` does not exist at the start of this plan; the repository state at `09395612c970d061c3edc01cf73a426989995df2` is the source of truth.
- **ASSUMPTION-002**: `/vercel.json` and `/wrangler.jsonc` are tracked files and are part of the current clean Jekyll output; they will be preserved as static files in `public/`. Untracked files such as `telegram-iv-template.txt` and `debug/` are not part of the production contract and will not be published.
- **ASSUMPTION-003**: `main` allows a squash merge from `astro-migration`; if branch protection requires a pull request, create a PR from `astro-migration` and use the same squash-merge commit message.
- **ASSUMPTION-004**: Vercel and Cloudflare projects can build from the `astro-migration` branch and expose preview URLs.
- **ASSUMPTION-005**: The custom domain `blog.bgzo.cc` points to a deployment that serves the repository root, not the `/blog` subpath.
- **ASSUMPTION-006**: No external consumer depends on the internal JSON field types beyond the home stream script; the `url` field may become a base-aware root-relative URL, which is identical to the current value on root builds.

## 8. References

- Jekyll configuration and URL rules: `_config.yml`, `_config_github.yml`, `_plugins/posts_api.rb`.
- Current layouts and includes: `_layouts/default.html`, `_layouts/post.html`, `_layouts/archived-post.html`, `_includes/*.html`.
- Current feeds and sitemap: `feed.xml`, `seed.xml`, `_site/sitemap.xml`.
- Current deployment: `.github/workflows/github-pages.yml`, `vercel.json`, `wrangler.jsonc`.
- Astro configuration: https://docs.astro.build/en/reference/configuration-reference/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro content loader `glob()`: https://docs.astro.build/en/reference/content-loader-reference/
- Astro Unified processor: https://docs.astro.build/en/reference/markdown-processors/unified/
- Astro syntax highlighting: https://docs.astro.build/en/guides/syntax-highlighting/
- Astro endpoints: https://docs.astro.build/en/guides/endpoints/
- Astro GitHub Pages deployment: https://docs.astro.build/en/guides/deploy/github/
- `remark-breaks`: https://github.com/remarkjs/remark-breaks
- `github-slugger`: https://github.com/Flet/github-slugger
