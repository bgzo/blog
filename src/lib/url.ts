export function siteUrl() {
  return import.meta.env.SITE;
}

export function basePath() {
  return import.meta.env.BASE_URL;
}

export function withBase(path) {
  const base = basePath().replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}` || '/';
}

export function canonical(path) {
  return new URL(path, 'https://blog.bgzo.cc').href;
}

export function deploymentUrl(path) {
  return new URL(withBase(path), siteUrl()).href;
}

export function articlePath(id) {
  const filename = id.split('/').pop().replace(/\.md$/, '');
  const slug = filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/[^\p{M}\p{L}\p{Nd}@]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `/${slug}.html`;
}
