import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

const baseArg = process.argv.find((arg) => arg.startsWith('--base='));
const base = baseArg ? baseArg.slice('--base='.length) : '';
const manifest = JSON.parse(
  readFileSync('tests/fixtures/url-manifest.json', 'utf8'),
);
const failures = [];

// These two assets are deleted by TASK-029/TASK-030 and are no longer linked.
const RETIRED = new Set([
  'assets/css/rouge-solarized.css',
  'assets/js/code-blocks.js',
]);
const expectedFiles = manifest.files.filter((path) => !RETIRED.has(path));
const files = expectedFiles.filter((path) => existsSync(join('dist', path)));
const canonicalHtml = manifest.html.filter((entry) =>
  existsSync(join('dist', entry.path)),
);

let aliases = 0;
for (const entry of manifest.html) {
  if (['index.html', '404.html'].includes(entry.path)) continue;
  const alias = join(
    'dist',
    entry.path.slice(0, -'.html'.length),
    'index.html',
  );
  if (!existsSync(alias)) {
    failures.push(`missing alias ${entry.path}`);
    continue;
  }
  const original = readFileSync(join('dist', entry.path));
  const copy = readFileSync(alias);
  if (original.equals(copy)) aliases += 1;
  else failures.push(`alias bytes differ ${entry.path}`);
}

let titles = 0;
let canonicals = 0;
let baseLinks = 0;
const expected = new Set(manifest.html.map((entry) => entry.path));
const rootFiles = readdirSync('dist').filter((file) => file.endsWith('.html'));
for (const file of rootFiles) {
  if (!expected.has(file)) failures.push(`unexpected html ${file}`);
}

for (const entry of manifest.html) {
  const source = readFileSync(join('dist', entry.path), 'utf8');
  const titleCount = (source.match(/<title>/g) ?? []).length;
  if (titleCount === 1) titles += 1;
  else failures.push(`titles ${entry.path} (${titleCount})`);

  const canonicalCount = (
    source.match(/<link\s+rel="canonical"\s+href="[^"]*"/g) ?? []
  ).length;
  if (canonicalCount === 1) canonicals += 1;
  else failures.push(`canonicals ${entry.path} (${canonicalCount})`);

  if (base) {
    for (const match of source.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) {
      const value = match[1];
      if (value.startsWith('//')) continue;
      if (!value.startsWith(`${base}/`) && value !== base) {
        baseLinks += 1;
        if (baseLinks <= 20) failures.push(`base link ${entry.path}: ${value}`);
      }
    }
  }
}

mkdirSync('tests/reports', { recursive: true });
writeFileSync(
  'tests/reports/url-parity.json',
  `${JSON.stringify(
    {
      files: files.length,
      canonicalHtml: canonicalHtml.length,
      aliases,
      titles,
      canonicals,
      failures,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `files=${files.length}/${expectedFiles.length} html=${canonicalHtml.length}/${manifest.html.length} aliases=${aliases}/${manifest.html.length - 2} titles=${titles}/${manifest.html.length} canonicals=${canonicals}/${manifest.html.length} failures=${failures.length}`,
);
if (base) console.log(`baseLinks=${baseLinks} failures=${failures.length}`);
if (failures.length) {
  for (const failure of failures.slice(0, 20)) console.log(failure);
  process.exit(1);
}
