import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://remodelat.net',
  trailingSlash: 'always',
  viewTransitions: true,
  server: {
    host: true,
    allowedHosts: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en'
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});