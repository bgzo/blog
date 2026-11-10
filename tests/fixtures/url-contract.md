# URL Contract

The old Jekyll site at `https://blog.bgzo.cc` is the source of truth. The Astro
migration must publish the same public paths and must serve both the canonical
`.html` path and its extensionless alias.

## Article URL rule

Given an article source filename such as `archives/2022-12-23-look-back-to-your-loved-ones.md`
or `seeds/20260522-want-a-windows-pad.md`:

1. Take the source filename without `.md`.
2. Remove a leading `YYYY-MM-DD-` prefix if present.
3. Keep all other characters and case.
4. Append `.html`.

Examples:

- `archives/2022-12-23-look-back-to-your-loved-ones` -> `/look-back-to-your-loved-ones.html`
- `seeds/20260522-want-a-windows-pad` -> `/20260522-want-a-windows-pad.html`
- `seeds/20260502-know-@liulifox233` -> `/20260502-know-@liulifox233.html`

## Page URL list

- `/`
- `/README.html`
- `/labs.html`
- `/thoughts.html`
- `/stories.html`
- `/changelogs.html`
- `/404.html`

## Host matrix

| Build | `SITE_URL` | `BASE_PATH` | Canonical host |
| ----- | ---------- | ----------- | -------------- |
| Root / custom domain | `https://blog.bgzo.cc` | `/` | `https://blog.bgzo.cc` |
| GitHub Pages | `https://bgzo.github.io` | `/blog` | `https://blog.bgzo.cc` |

The canonical host is always `https://blog.bgzo.cc`, regardless of the build.
The GitHub Pages build must keep every internal link and asset under `/blog/`.

## Alias rule

Every canonical HTML file except `index.html` and `404.html` gets a
byte-identical copy at `<name>/index.html`. For example:

- `/labs.html` and `/labs/index.html`
- `/20260522-want-a-windows-pad.html` and `/20260522-want-a-windows-pad/index.html`

## API contract

- Paths: `/api/posts/1.json` through `/api/posts/23.json`.
- Non-archive articles only, 5 entries per page.
- Sorted by the `published` string ascending, then reversed.
- Fields per post: `title`, `url`, `date`, `datetime`, `image_url`,
  `image_urls`, `desc`, `desc_html`.
- Only `url` may change from root-relative to base-aware root-relative; it is
  identical on root builds.

## Feed contract

- `/feed.xml`: articles from `labs`, `thoughts`, and `stories`, sorted by
  `published` descending, limit 50.
- `/seed.xml`: all articles, sorted by `published` descending, limit 50.
- Both are Atom feeds with the Jekyll generator metadata preserved.

## Sitemap contract

- `/sitemap.xml` contains one `<url>` per canonical HTML page except
  `/404.html` (145 entries).
- All `<loc>` values use the canonical host `https://blog.bgzo.cc`.
