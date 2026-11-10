import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './_articles',
    generateId: ({ entry }) =>
      entry.replace(/^\.\//, '').replace(/\.md$/, ''),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
});

export const collections = { articles, pages };
