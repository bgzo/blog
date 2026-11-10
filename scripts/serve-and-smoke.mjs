import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = 'dist';
const PATHS = [
  '/',
  '/README.html',
  '/labs.html',
  '/20260522-want-a-windows-pad.html',
  '/look-back-to-your-loved-ones.html',
  '/20260505-fix-venera-download-long-photos-on-iOS-iPadOS.html',
  '/wnen-u-want-to-use-proxies-on-cybercafé.html',
  '/wnen-u-want-to-use-proxies-on-cybercaf%C3%A9.html',
  '/feed.xml',
  '/seed.xml',
  '/sitemap.xml',
  '/api/posts/1.json',
  '/api/posts/23.json',
  '/404.html',
  '/assets/css/custom.css',
  '/favicon.ico',
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
};

async function resolveFile(pathname) {
  let path = decodeURIComponent(pathname);
  if (path.startsWith('/blog')) path = path.slice('/blog'.length) || '/';
  if (path.endsWith('/')) path += 'index.html';
  if (path === '/') path = '/index.html';

  const candidates = [join(ROOT, path)];
  if (!extname(path)) {
    candidates.push(join(ROOT, `${path}.html`), join(ROOT, path, 'index.html'));
  }

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const file = await resolveFile(url.pathname);
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('not found');
    return;
  }
  const body = await readFile(file);
  response.writeHead(200, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Content-Length': body.length,
  });
  response.end(body);
});

await new Promise((resolve) => server.listen(4321, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:4321';

async function request(pathname) {
  let url = `${origin}${pathname}`;
  for (let redirects = 0; redirects <= 3; redirects += 1) {
    const response = await fetch(url, { redirect: 'manual' });
    if (response.status >= 300 && response.status < 400) {
      url = new URL(response.headers.get('location'), url).href;
      continue;
    }
    const body = await response.text();
    return { status: response.status, body, final: url };
  }
  return { status: 0, body: '', final: url };
}

let passed = 0;
let failed = 0;
for (const base of ['', '/blog']) {
  for (const pathname of PATHS) {
    const result = await request(`${base}${pathname}`);
    if (result.status === 200 && result.body.length > 0) {
      passed += 1;
    } else {
      failed += 1;
      console.log(
        `FAIL ${base}${pathname} -> ${result.status} ${result.final}`,
      );
    }
  }
}

server.close();
console.log(`passed=${passed} failed=${failed}`);
if (failed) process.exit(1);
