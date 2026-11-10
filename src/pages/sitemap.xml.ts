import { getArticles } from '../lib/articles';
import { canonical } from '../lib/url';
import { formatIsoLocal } from '../lib/dates';

const PAGES = [
  { path: '/', lastmod: null },
  { path: '/README.html', lastmod: null },
  { path: '/labs.html', lastmod: null },
  { path: '/thoughts.html', lastmod: null },
  { path: '/stories.html', lastmod: null },
  { path: '/changelogs.html', lastmod: '2026-04-18T00:00:00' },
];

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const articles = await getArticles();
  const now = formatIsoLocal(new Date());

  const urls = [
    ...articles.map((entry) => ({
      loc: canonical(entry.url),
      lastmod:
        entry.data.modified ??
        entry.data.published ??
        entry.data.created ??
        now,
    })),
    ...PAGES.map((page) => ({
      loc: canonical(page.path),
      lastmod: page.lastmod ?? now,
    })),
  ];

  const body = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <lastmod>${formatIsoLocal(url.lastmod)}+00:00</lastmod>\n  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
