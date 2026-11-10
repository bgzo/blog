import { readFileSync } from 'node:fs';

const baseArg = process.argv.find((arg) => arg.startsWith('--base='));
const base = (baseArg ? baseArg.slice('--base='.length) : '/').replace(
  /\/$/,
  '',
);
const manifest = JSON.parse(
  readFileSync('tests/fixtures/url-manifest.json', 'utf8'),
);

const stripBase = (pathname) => {
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
};

const failures = [];
let apiMatched = 0;

const apiPageCount = Object.keys(manifest.api).length;
for (let page = 1; page <= apiPageCount; page += 1) {
  const actual = JSON.parse(
    readFileSync(`dist/api/posts/${page}.json`, 'utf8'),
  );
  const expected = manifest.api[`${page}.json`];
  let matches = true;

  for (const key of ['total_pages', 'current_page', 'next_page']) {
    if (actual[key] !== expected[key]) matches = false;
  }

  if (actual.posts.length !== expected.posts.length) matches = false;
  actual.posts.forEach((post, index) => {
    const wanted = expected.posts[index];
    if (!wanted) {
      matches = false;
      return;
    }
    for (const key of Object.keys(wanted)) {
      if (key === 'url') {
        const path = stripBase(new URL(post.url, 'https://x').pathname);
        if (path !== wanted.url) matches = false;
      } else if (JSON.stringify(post[key]) !== JSON.stringify(wanted[key])) {
        matches = false;
      }
    }
  });

  if (matches) apiMatched += 1;
  else failures.push(`api page ${page}`);
}

function feedLinks(file) {
  const source = readFileSync(`dist/${file}`, 'utf8');
  return [...source.matchAll(/<entry>[\s\S]*?<link\s+href="([^"]+)"/g)].map(
    (match) => stripBase(new URL(match[1]).pathname),
  );
}

const feedLinksActual = feedLinks('feed.xml');
const seedLinksActual = feedLinks('seed.xml');
const feedMatches =
  JSON.stringify(feedLinksActual) === JSON.stringify(manifest.feeds['feed.xml']);
const seedMatches =
  JSON.stringify(seedLinksActual) === JSON.stringify(manifest.feeds['seed.xml']);
if (!feedMatches) failures.push('feed.xml links');
if (!seedMatches) failures.push('seed.xml links');

const sitemapSource = readFileSync('dist/sitemap.xml', 'utf8');
const sitemapPaths = new Set(
  [...sitemapSource.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    let pathname = stripBase(new URL(match[1]).pathname);
    pathname = decodeURIComponent(pathname);
    return pathname === '/' ? '/index.html' : pathname;
  }),
);
const expectedSitemap = new Set(
  manifest.html
    .map((entry) => `/${entry.path}`)
    .filter((path) => path !== '/404.html'),
);
const sitemapMatches =
  sitemapPaths.size === expectedSitemap.size &&
  [...expectedSitemap].every((path) => sitemapPaths.has(path));
if (!sitemapMatches) failures.push('sitemap paths');

console.log(
  `api=${apiMatched}/${apiPageCount} feed=${feedLinksActual.length}/50 seed=${seedLinksActual.length}/50 sitemap=${sitemapPaths.size}/${expectedSitemap.size}`,
);
if (!feedMatches) console.log('feed mismatch');
if (!seedMatches) console.log('seed mismatch');
if (!sitemapMatches) console.log('sitemap mismatch');
if (failures.length) {
  console.log(`failures=${failures.length}`);
  process.exit(1);
}
