import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const manifest = JSON.parse(
  readFileSync('tests/fixtures/url-manifest.json', 'utf8'),
);
const oldRoot = process.env.OLD_SITE_DIR ?? '_site';

function html(path, root) {
  return readFileSync(join(root, path), 'utf8');
}

function titleOf(source) {
  return source.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
}

function canonicalOf(source) {
  return source.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1] ?? '';
}

function normalizedCanonical(value) {
  if (!value) return '';
  const url = new URL(value);
  return `${url.origin}${url.pathname.replace(/\.html$/, '')}`;
}

function headingIds(source) {
  return [...source.matchAll(/<h[2-6]\b([^>]*)>/g)]
    .map((match) => match[1])
    .filter((attributes) => !/\bclass="[^"]*\bsr-only\b/.test(attributes))
    .map((attributes) => attributes.match(/\bid="([^"]*)"/)?.[1])
    .filter((id) => id && id !== 'footnote-label');
}

function toc(source) {
  const match = source.match(/<div class="contents">([\s\S]*?)<\/div>/);
  if (!match) return '';
  return match[1]
    .replace(/<sup\b[\s\S]*?<\/sup>/g, '')
    .replace(/<li><a href="#footnotes">Footnotes<\/a><\/li>/, '')
    .replace(/<code\b[^>]*>/g, '<code>')
    .replace(/&#x26;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function plainText(source) {
  return source
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<style\b[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const counters = { title: 0, canonical: 0, headingIds: 0, toc: 0 };
const total = manifest.html.length;
const report = [];
const failures = [];

for (const entry of manifest.html) {
  const oldSource = html(entry.path, oldRoot);
  const newSource = html(entry.path, 'dist');
  const oldTitle = titleOf(oldSource);
  const newTitle = titleOf(newSource);

  // REQ-015 intentionally fixes the one formerly invalid YAML title.
  const titleMatches =
    oldTitle === newTitle ||
    (entry.path === '20260502-know-@liulifox233.html' &&
      oldTitle === " - bGZo's blog");
  if (titleMatches) counters.title += 1;
  else failures.push(`title ${entry.path}: ${oldTitle} != ${newTitle}`);

  const oldCanonical = normalizedCanonical(canonicalOf(oldSource));
  const newCanonical = normalizedCanonical(canonicalOf(newSource));
  if (oldCanonical && oldCanonical === newCanonical) counters.canonical += 1;
  else
    failures.push(
      `canonical ${entry.path}: ${oldCanonical} != ${newCanonical}`,
    );

  const oldIds = headingIds(oldSource);
  const newIds = headingIds(newSource);
  if (JSON.stringify(oldIds) === JSON.stringify(newIds)) counters.headingIds += 1;
  else
    failures.push(
      `headingIds ${entry.path}: ${JSON.stringify(oldIds)} != ${JSON.stringify(newIds)}`,
    );

  const oldToc = toc(oldSource);
  const newToc = toc(newSource);
  if (oldToc === newToc) counters.toc += 1;
  else failures.push(`toc ${entry.path}: ${oldToc} != ${newToc}`);

  const oldText = plainText(oldSource);
  const newText = plainText(newSource);
  report.push({
    path: entry.path,
    oldTextLength: oldText.length,
    newTextLength: newText.length,
    identical: oldText === newText,
  });
}

mkdirSync('tests/reports', { recursive: true });
writeFileSync(
  'tests/reports/content-diff.json',
  `${JSON.stringify(report, null, 2)}\n`,
);

for (const [key, value] of Object.entries(counters)) {
  console.log(`${key}=${value}/${total}`);
}
if (failures.length) {
  console.log(`failures=${failures.length}`);
  for (const failure of failures.slice(0, 20)) console.log(failure);
  process.exit(1);
}
