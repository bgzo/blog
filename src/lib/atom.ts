import { deploymentUrl, articlePath } from './url';
import { formatIsoLocal, formatSortable } from './dates';

const SITE_TITLE = 'bGZo&apos;s blog';
const SITE_SUBTITLE = '分享我的好运，偏见与无知';
const AUTHOR = '華仔';

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncateText(value, limit) {
  const text = String(value ?? '').trim();
  const chars = Array.from(text);
  return chars.length > limit
    ? `${chars.slice(0, limit - 3).join('')}...`
    : text;
}

export function buildAtomFeed(entries, limit = 50) {
  const posts = entries
    .filter((entry) => entry.data.published)
    .sort((a, b) =>
      formatSortable(a.data.published).localeCompare(
        formatSortable(b.data.published),
      ),
    )
    .reverse()
    .slice(0, limit);

  const updated = `${formatIsoLocal(new Date())}+00:00`;

  const items = posts
    .map((entry) => {
      const url = deploymentUrl(articlePath(entry.id));
      const description = truncateText(entry.data.description, 500);
      const content = `${escapeXml(description)}&lt;p&gt;&lt;a href="${url}"&gt;Read More&lt;/a&gt;&lt;/p&gt;`;
      return `  <entry>
    <title type="html">${escapeXml(entry.data.title)}</title>
    <link href="${url}" rel="alternate" type="text/html" title="${escapeXml(entry.data.title)}"/>
    <published>${formatIsoLocal(entry.data.published)}+00:00</published>
    <updated>${formatIsoLocal(entry.data.modified ?? entry.data.published)}+00:00</updated>
    <id>${url.replace(/\.html$/, '')}</id>
    <content type="html" xml:base="${url}">
      ${content}
    </content>
    <summary type="html">${escapeXml(description)}</summary>
  </entry>`;
    })
    .join('\n  \n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <generator uri="https://jekyllrb.com/" version="4.3.4">Jekyll</generator>
  <link href="${deploymentUrl('/feed.xml')}" rel="self" type="application/atom+xml"/>
  <link href="${deploymentUrl('/')}" rel="alternate" type="text/html"/>
  <updated>${updated}</updated>
  <id>${deploymentUrl('/feed.xml')}</id>
  <title type="html">${SITE_TITLE}</title>
  <subtitle>${SITE_SUBTITLE}</subtitle>
  <author>
    <name>${AUTHOR}</name>
  </author>
${items}
</feed>
`;
}

export function atomResponse(xml) {
  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
