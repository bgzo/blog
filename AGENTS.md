# AGENTS.md

Static Astro blog migrated from Jekyll. Node `>=22.23.4`, npm, no lint/typecheck/test scripts.

## Commands

- `npm run dev` — copies root docs into the content collection, then Astro dev on `:4321`.
- `npm run build` — same copy, `astro build`, then `scripts/generate-aliases.mjs`.
- `node scripts/serve-and-smoke.mjs` — after a build, serves `dist/` and checks 40 paths for both `/` and `/blog`; run it before finishing routing/URL work.
- Never call `astro build` directly: it skips the doc copy and the alias pages.

## URL contract

- Canonical URLs keep `.html`. Every top-level `*.html` except `index.html` and `404.html` also gets a `<name>/index.html` alias, so `/x`, `/x/`, and `/x.html` all work.
- Cloudflare and Vercel redirect `.html` to the clean URL (307/308); that is platform behavior, not a bug. GitHub Pages serves `.html` directly and depends on the alias directories.
- Article URLs come from `articlePath()` in `src/lib/url.ts`: filename minus the `YYYY-MM-DD-` prefix, slugified. Renaming an article file changes its public URL and breaks giscus comments (mapped by pathname).
- Canonical host is always `https://blog.bgzo.cc`; `SITE_URL` and `BASE_PATH` only change deployment links. GitHub Pages builds with `BASE_PATH=/blog`.

## Content

- Articles live in `_articles/{seeds,labs,thoughts,stories,archives}/*.md`; `src/content.config.ts` exposes them as the `articles` collection. `archives` use the `ArchivedPost` layout.
- Frontmatter fields: `title`, `created`, `modified`, `published`, `description`, `tags`, `comments: True`, `draft: False`, `aliases`. Only entries with `published` reach the feeds. Dates are naive UTC strings such as `2026-05-23 00:17:43`.
- Root `README.md` and `changelogs.md` are the only sources for `/README.html` and `/changelogs.html`. `scripts/sync-pages.mjs` copies them into `src/content/pages/` on `predev`/`prebuild`; those copies are gitignored, so edit the root files.
- README has no frontmatter; its title is hardcoded in `src/pages/README.astro`. Changelogs keeps frontmatter (`created`, `modified`, `title`), and new entries go at the top.

## Compatibility quirks (intentional)

- `seed.xml.ts` excludes `seeds/20260502-know-@liulifox233`; the JSON API has its own `LEGACY_EMPTY_API_IDS`.
- `.html` in canonical/sitemap/feeds, feed `<generator>` claiming Jekyll, and giscus `data-mapping="pathname"` / `data-strict="0"` preserve old-site behavior. Do not "clean up" without checking the original site.
- `public/vercel.json` and `public/wrangler.jsonc` are stale Jekyll copies; deploy config comes from the root files.

## Deploy

- Cloudflare reads root `wrangler.jsonc` (`dist`, `404-page`); Vercel reads root `vercel.json` (`cleanUrls: true`); GitHub Pages uses `.github/workflows/github-pages.yml`.
- Pull requests get Vercel and Cloudflare previews. `[skip ci]` is for changes that cannot affect the built site; content, config, and script changes should build.
