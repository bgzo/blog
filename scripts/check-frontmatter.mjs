import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

const files = [
  ...walk('_articles').filter((file) => file.endsWith('.md')),
  ...readdirSync('src/content/pages')
    .filter((file) => file.endsWith('.md'))
    .map((file) => join('src/content/pages', file)),
].sort();

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) {
    console.error(`${file}: missing frontmatter block`);
    process.exit(1);
  }
  try {
    parse(match[1]);
  } catch (error) {
    console.error(`${file}: ${error.message}`);
    process.exit(1);
  }
}

console.log(`checked=${files.length} invalid=0`);
