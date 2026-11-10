# Preview URLs

| Target | Branch | URL | Status |
| ------ | ------ | --- | ------ |
| Vercel | `astro-migration` | https://blog-9s1femahj-bgzos-projects.vercel.app | PASS |
| Cloudflare Workers | `astro-migration` | https://astro-migration-blog.lfh010618.workers.dev | PASS |
| Cloudflare version | `astro-migration` | https://cf62b653-blog.lfh010618.workers.dev | PASS (previous version) |

Both previews were built from commit `65a6006541423a4840a688e1bea36956a713c796`.
All 20 smoke paths return HTTP 200 after redirects, including `.html`,
extensionless, non-ASCII, archive, API, feed, sitemap, and asset paths. Both
previews contain the Astro source footer.
