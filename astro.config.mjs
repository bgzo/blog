import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL ?? 'https://blog.bgzo.cc',
  base: process.env.BASE_PATH ?? '/',
  outDir: './dist',
  publicDir: './public',
  build: { format: 'file' },
  trailingSlash: 'ignore',
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [remarkBreaks],
    }),
    shikiConfig: {
      themes: { light: 'solarized-light', dark: 'solarized-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
