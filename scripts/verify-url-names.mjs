import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const manifest = JSON.parse(
  readFileSync('tests/fixtures/url-manifest.json', 'utf8'),
);
const pages = new Set([
  'index.html',
  'README.html',
  'labs.html',
  'thoughts.html',
  'stories.html',
  'changelogs.html',
  '404.html',
]);

const missing = manifest.html
  .map((entry) => entry.path)
  .filter((path) => !existsSync(join('dist', path)));
const articleCount = manifest.html.filter(
  (entry) => !pages.has(entry.path),
).length;

console.log(
  `checked=${manifest.html.length} missing=${missing.length} articles=${articleCount} pages=${pages.size}`,
);
if (missing.length) {
  console.log('first missing:', missing.slice(0, 20));
  process.exit(1);
}
