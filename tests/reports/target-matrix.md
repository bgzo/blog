# Target Matrix

| Target | Scope | Result | Notes |
| ------ | ----- | ------ | ----- |
| Local base-mounted server | `/` and `/blog/` | PASS | `node scripts/serve-and-smoke.mjs` reports `passed=40 failed=0` |
| Vercel preview | 20-path smoke suite | PASS | 20/20 HTTP 200 at https://blog-bjuverh46-bgzos-projects.vercel.app |
| Cloudflare Workers preview | 20-path smoke suite | BLOCKED | No Cloudflare credentials/Wrangler session available |
| `https://blog.bgzo.cc` | post-merge production | PENDING | Not merged; awaits preview sign-off |
| `https://bgzo.github.io/blog` | post-merge production | PENDING | Not merged; awaits preview sign-off |
