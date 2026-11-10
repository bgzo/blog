# Target Matrix

| Target | Scope | Result | Notes |
| ------ | ----- | ------ | ----- |
| Local base-mounted server | `/` and `/blog/` | PASS | `node scripts/serve-and-smoke.mjs` reports `passed=40 failed=0` |
| Vercel preview | 20-path smoke suite | PASS | 20/20 HTTP 200 at https://blog-9s1femahj-bgzos-projects.vercel.app |
| Cloudflare Workers preview | 20-path smoke suite | PASS | 20/20 HTTP 200 at https://astro-migration-blog.lfh010618.workers.dev |
| `https://blog.bgzo.cc` | post-merge production | PENDING | Awaits merge and production deploy |
| `https://bgzo.github.io/blog` | post-merge production | PENDING | Awaits merge and production deploy |
