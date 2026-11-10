import { copyFileSync } from 'node:fs';

for (const name of ['README.md', 'changelogs.md']) {
  copyFileSync(name, `src/content/pages/${name}`);
}
