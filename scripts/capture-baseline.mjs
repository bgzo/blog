import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const siteDir = resolve(process.env.SITE_DIR ?? '_site');
const outFile = resolve(process.env.OUT ?? 'tests/fixtures/url-manifest.json');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

const files = walk(siteDir)
  .map((file) => relative(siteDir, file).split('\\').join('/'))
  .sort();
const html = files
  .filter((file) => file.endsWith('.html'))
  .map((path) => {
    const source = readFileSync(join(siteDir, path), 'utf8');
    const title = source.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
    const canonical =
      source.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1] ?? '';
    return { path, title, canonical };
  });

const api = {};
for (const file of files.filter((path) => /^api\/posts\/\d+\.json$/.test(path))) {
  api[file.slice('api/posts/'.length)] = JSON.parse(
    readFileSync(join(siteDir, file), 'utf8'),
  );
}

function feedLinks(file) {
  const source = readFileSync(join(siteDir, file), 'utf8');
  return [...source.matchAll(/<entry>[\s\S]*?<link\s+href="([^"]+)"/g)].map(
    ([, href]) => new URL(href).pathname,
  );
}

const feeds = {
  'feed.xml': feedLinks('feed.xml'),
  'seed.xml': feedLinks('seed.xml'),
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(
  outFile,
  `${JSON.stringify({ files, html, api, feeds }, null, 2)}\n`,
);
console.log(`Wrote ${outFile}: ${files.length} files, ${html.length} html`);
