// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Macmo product website — static-first, no backend.
// Deploy target: Cloudflare Pages (Git integration).
export default defineConfig({
  site: 'https://macmo.anakterubuk.tech',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
