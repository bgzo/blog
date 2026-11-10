# Preview URLs

| Target | Branch | URL | Status |
| ------ | ------ | --- | ------ |
| Vercel | `astro-migration` | https://blog-bjuverh46-bgzos-projects.vercel.app | PASS |
| Cloudflare Workers | `astro-migration` | — | BLOCKED: no Cloudflare credentials or Wrangler CLI session is available in this environment |

The Vercel preview was created automatically from commit `3eee895960404dab05f93bcad4d6c561b7f87c20`.
All 20 smoke paths return HTTP 200, including `.html`, extensionless, non-ASCII,
archive, API, feed, sitemap, and asset paths.

The Cloudflare preview requires `CLOUDFLARE_API_TOKEN` or an interactive
`wrangler login`; neither is available here.
