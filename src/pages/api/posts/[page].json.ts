import { getArticles } from '../../../lib/articles';
import { withBase, articlePath } from '../../../lib/url';
import { formatYmd, formatSlashYmd, formatSortable } from '../../../lib/dates';

const IMAGE_HOST_DENYLIST = [
  'img.shields.io',
  'github-readme-stats.vercel.app',
  'x.com',
  'twitter.com',
];

const LEGACY_EMPTY_API_IDS = new Set(['seeds/20260502-know-@liulifox233']);

const IMAGE_EXTENSION_RE = /\.(apng|avif|gif|jpe?g|png|svg|webp)(?:\?|$)/i;

function truncateText(value, limit) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  const chars = Array.from(text);
  return chars.length > limit
    ? `${chars.slice(0, limit - 3).join('')}...`
    : text;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function smartypants(value) {
  let result = value
    .replace(/\.\.\./g, '…')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/'/g, '’');
  let open = true;
  result = result.replace(/"/g, () => {
    const quote = open ? '“' : '”';
    open = !open;
    return quote;
  });
  return result;
}

function plainTextToHtml(value) {
  let text = String(value ?? '');
  if (/\|\s*-{3,}\s*\|/.test(text)) {
    text = text
      .split('|')
      .map((cell) => cell.trim())
      .map((cell) => (cell === '' ? '\u00a0' : cell.replace(/^-{3,}$/, '—')))
      .join('\n');
  }
  const paragraphs = smartypants(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return paragraphs
    .map(
      (paragraph) =>
        `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`,
    )
    .join('');
}

function imageLikeUrl(src) {
  let pathname;
  try {
    pathname = new URL(src, 'https://blog.bgzo.cc').pathname;
  } catch {
    pathname = src;
  }
  if (IMAGE_EXTENSION_RE.test(pathname)) return true;
  if (src.includes('/assets/') && src.includes('github.com')) return true;
  if (src.includes('githubusercontent.com')) return true;
  if (src.includes('private-user-images.githubusercontent.com')) return true;
  return false;
}

function extractImages(body) {
  const source = String(body ?? '').replace(/^```[\s\S]*?^```/gm, '');
  const matches = [];
  for (const match of source.matchAll(
    /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g,
  )) {
    matches.push({ index: match.index, src: match[1] });
  }
  for (const match of source.matchAll(
    /<img\b[^>]*\bsrc=(["'])(.*?)\1[^>]*>/gi,
  )) {
    matches.push({ index: match.index, src: match[2] });
  }
  matches.sort((a, b) => a.index - b.index);

  const images = [];
  for (const { src } of matches) {
    if (!src.trim()) continue;
    if (IMAGE_HOST_DENYLIST.some((host) => src.includes(host))) continue;
    if (src.includes('{') || src.includes('}')) continue;
    if (!imageLikeUrl(src)) continue;
    if (src.toLowerCase().endsWith('.svg')) continue;
    if (!images.includes(src)) images.push(src);
  }
  return images;
}

export async function getStaticPaths() {
  const articles = (await getArticles())
    .filter((entry) => entry.section !== 'archives')
    .sort((a, b) => {
      const aPublished = LEGACY_EMPTY_API_IDS.has(a.id)
        ? ''
        : formatSortable(a.data.published);
      const bPublished = LEGACY_EMPTY_API_IDS.has(b.id)
        ? ''
        : formatSortable(b.data.published);
      return aPublished.localeCompare(bPublished);
    })
    .reverse();

  const pages = [];
  for (let index = 0; index < articles.length; index += 5) {
    pages.push(articles.slice(index, index + 5));
  }

  return pages.map((batch, index) => ({
    params: { page: String(index + 1) },
    props: { batch, pageNumber: index + 1, totalPages: pages.length },
  }));
}

export function GET({ props }) {
  const { batch, pageNumber, totalPages } = props;
  const posts = batch.map((entry) => {
    if (LEGACY_EMPTY_API_IDS.has(entry.id)) {
      return {
        title: '',
        url: withBase(articlePath(entry.id)),
        date: '',
        datetime: '',
        image_url: null,
        image_urls: [],
        desc: '',
        desc_html: '',
      };
    }
    const description = String(entry.data.description ?? '').trim();
    const imageUrls = extractImages(entry.body);
    return {
      title: String(entry.data.title ?? ''),
      url: withBase(articlePath(entry.id)),
      date: formatSlashYmd(entry.data.published),
      datetime: formatYmd(entry.data.published),
      image_url: imageUrls[0] ?? null,
      image_urls: imageUrls,
      desc: truncateText(description, 500),
      desc_html: plainTextToHtml(description),
    };
  });

  const data = {
    posts,
    total_pages: totalPages,
    current_page: pageNumber,
    next_page: pageNumber < totalPages ? pageNumber + 1 : null,
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
