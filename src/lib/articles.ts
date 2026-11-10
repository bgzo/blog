import { getCollection } from 'astro:content';
import { articlePath } from './url';
import { formatSortable } from './dates';

export async function getArticles() {
  const entries = await getCollection('articles');
  return entries.map((entry) => {
    const section = entry.id.split('/')[0];
    const url = articlePath(entry.id);
    return {
      ...entry,
      section,
      routeSlug: url.slice(1, -'.html'.length),
      url,
      isArchive: section === 'archives',
      date: entry.data.published ?? entry.data.modified ?? entry.data.created,
    };
  });
}

function fallbackPublished(entry) {
  return entry.data.published ?? entry.data.modified ?? entry.data.created;
}

function fallbackCreated(entry) {
  return entry.data.created ?? entry.data.published ?? entry.data.modified;
}

export function byPublishedDesc(a, b) {
  return formatSortable(fallbackPublished(b)).localeCompare(
    formatSortable(fallbackPublished(a)),
  );
}

export function byCreatedDesc(a, b) {
  return formatSortable(fallbackCreated(b)).localeCompare(
    formatSortable(fallbackCreated(a)),
  );
}
