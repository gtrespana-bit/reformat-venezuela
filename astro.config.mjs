import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://remodelat.net',
  trailingSlash: 'always',
  viewTransitions: true,
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
      // lastmod = fecha del build: señala a los buscadores que el sitemap
      // se regenera con contenido actualizado en cada despliegue.
      lastmod: new Date(),
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