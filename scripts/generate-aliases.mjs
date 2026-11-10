import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const files = readdirSync(dist).filter(
  (file) => file.endsWith('.html') && !['index.html', '404.html'].includes(file),
);

for (const file of files) {
  const name = file.slice(0, -'.html'.length);
  const targetDir = join(dist, name);
  if (statSync(join(dist, file)).isFile()) {
    rmSync(targetDir, { recursive: true, force: true });
    mkdirSync(targetDir, { recursive: true });
    copyFileSync(join(dist, file), join(targetDir, 'index.html'));
  }
}

console.log(`aliases=${files.length}`);
