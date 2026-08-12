import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const PRIMARY_CARABOBO = new Set([
  'san-diego', 'valencia-centro', 'naguanagua', 'guacara',
  'el-trigal', 'guataparo', 'la-vina', 'el-bosque',
  'la-esmeralda', 'el-morro', 'el-vinedo', 'manongo',
  'la-trigalena', 'prebo',
]);
const CARABOBO = new Set([
  ...PRIMARY_CARABOBO,
  'valle-de-oro', 'el-parral', 'valles-de-camoruco',
  'los-guayos', 'tocuyito', 'puerto-cabello',
]);

function sitemapPriority(url) {
  const path = new URL(url).pathname;
  if (path === '/' || path === '/en/') return 1.0;
  if (
    path === '/san-diego/' || path === '/valencia/' ||
    path === '/naguanagua/' || path === '/guacara/' ||
    path === '/el-trigal/' || path === '/guataparo/' ||
    path === '/la-vina/' || path === '/el-bosque/' || path === '/la-esmeralda/' ||
    path === '/en/san-diego/' || path === '/en/valencia/' ||
    path === '/en/naguanagua/' || path === '/en/guacara/' ||
    path === '/en/el-trigal/' || path === '/en/guataparo/' ||
    path === '/en/la-vina/' || path === '/en/el-bosque/' || path === '/en/la-esmeralda/'
  ) return 0.95;
  if (path.startsWith('/servicios/') || path.startsWith('/en/services/')) return 0.85;
  if (path === '/proyectos/' || path === '/en/projects/') return 0.8;
  if (path === '/caracas/' || path === '/en/caracas/') return 0.55;
  if (path === '/la-guaira/' || path === '/en/la-guaira/') return 0.4;

  const zone = path.match(/\/(?:en\/)?remodelacion-(?:bano|cocina|integral)-([a-z-]+)\/$/);
  if (zone) {
    if (PRIMARY_CARABOBO.has(zone[1])) return 0.8;
    if (CARABOBO.has(zone[1])) return 0.7;
    return 0.4;
  }
  if (path.includes('/blog/')) return 0.55;
  if (path.includes('/proyectos/') || path.includes('/projects/')) return 0.65;
  return 0.5;
}

function sitemapChangefreq(url) {
  const path = new URL(url).pathname;
  if (path === '/' || path === '/en/') return 'weekly';
  if (path.includes('/blog/')) return 'monthly';
  if (path === '/caracas/' || path === '/en/caracas/' || path === '/la-guaira/' || path === '/en/la-guaira/') {
    return 'monthly';
  }
  return 'weekly';
}

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
      // Prioridad comercial: Carabobo (San Diego / Valencia / Naguanagua /
      // Guacara) por encima de Caracas. Google usa esto como pista de
      // crawl budget, no como ranking directo, pero ayuda a que las URLs
      // de la zona principal se rastreen antes.
      serialize(item) {
        item.priority = sitemapPriority(item.url);
        item.changefreq = sitemapChangefreq(item.url);
        return item;
      },
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