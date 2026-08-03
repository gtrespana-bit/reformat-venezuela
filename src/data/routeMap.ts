// src/data/routeMap.ts
// -----------------------------------------------------------------------------
// FUENTE ÚNICA DE VERDAD para equivalencias de rutas entre ES y EN.
//
// Usado por:
//   - src/components/SEO.astro         (hreflang, canonical, breadcrumbs)
//   - src/layouts/BaseLayout.astro     (switcher de idioma ES <-> EN en cliente)
//
// Si añades una nueva página/ciudad/proyecto/servicio en uno de los dos idiomas
// Y tiene traducción, añade AQUÍ el par (es -> en y en -> es).
// Si la página NO tiene versión en el otro idioma, añádela a `untranslatedEsPaths`
// o `untranslatedEnPaths` abajo para que no se emita el hreflang roto.
// -----------------------------------------------------------------------------

/** Páginas en español que NO tienen versión inglesa. */
export const untranslatedEsPaths = new Set<string>([
  '/servicios/domotica-automatizacion', // sección domótica: solo ES de momento
]);

/** Páginas en inglés que NO tienen versión española. */
export const untranslatedEnPaths = new Set<string>([]);

/**
 * Mapa de traducción de rutas. La clave es la ruta EN CUALQUIERA de los dos
 * idiomas (sin trailing slash); el valor es su equivalente en el otro idioma.
 *
 * Las rutas "seccionales" genéricas (/servicios, /en/services, /blog, /en/blog,
 * etc.) se resuelven por convención en SEO.astro (prepend/remove `/en`), así que
 * solo hay que listar aquí aquellas cuyo slug NO es el mismo en ambos idiomas.
 */
const pairs: Array<[string, string]> = [
  // --- páginas corporativas ---
  ['/sobre-nosotros', '/en/about-us'],
  ['/metodo-remodelat', '/en/our-method'],
  ['/contacto', '/en/contact'],
  ['/privacidad', '/en/privacy'],
  ['/terminos', '/en/terms'],

  // --- servicios (slugs distintos) ---
  ['/servicios', '/en/services'],
  ['/servicios/remodelacion-cocina', '/en/services/kitchens'],
  ['/servicios/remodelacion-bano', '/en/services/bathrooms'],
  ['/servicios/remodelacion-integral', '/en/services/whole-home'],
  ['/servicios/remodelacion-vivienda', '/en/services/home-remodeling'],
  ['/servicios/remodelacion-apartamentos', '/en/services/apartment-remodeling'],
  ['/servicios/remodelacion-casas', '/en/services/house-remodeling'],
  ['/servicios/instalacion-electrica', '/en/services/electrical'],
  ['/servicios/fontaneria-plomeria', '/en/services/plumbing'],
  ['/servicios/pintura-acabados', '/en/services/painting'],
  ['/servicios/revestimientos-pared', '/en/services/wall-coverings'],
  ['/servicios/instalacion-pisos', '/en/services/flooring'],
  ['/servicios/piscinas-mantenimiento', '/en/services/pools'],
  // domótica no está en EN; no añadir aquí, está en untranslatedEsPaths.

  // --- hubs y ciudades ---
  ['/proyectos', '/en/projects'],
  ['/caracas', '/en/caracas'],
  ['/valencia', '/en/valencia'],
  ['/san-diego', '/en/san-diego'],
  ['/la-guaira', '/en/la-guaira'],

  // --- proyectos (slugs distintos) ---
  ['/proyectos/cocina-caracas-quinta', '/en/projects/kitchen-remodel-caracas-quinta'],
  ['/proyectos/bano-las-mercedes-pequeno', '/en/projects/small-bathroom-remodel-las-mercedes'],
  ['/proyectos/bano-caracas', '/en/projects/bathroom-remodel-caracas'],
  ['/proyectos/bano-la-trigalena', '/en/projects/bathroom-remodel-la-trigalena'],
  ['/proyectos/bano-san-diego', '/en/projects/bathroom-remodel-san-diego'],
  ['/proyectos/banos-quinta-la-lagunita', '/en/projects/luxury-bathrooms-quinta-guataparo'],
  ['/proyectos/cocina-lujo-guataparo', '/en/projects/luxury-kitchen-guataparo'],

  // --- blog ---
  ['/blog', '/en/blog'],
  ['/blog/cuanto-cuesta-reforma-cocina-valencia', '/en/blog/kitchen-remodel-cost-caracas-valencia-2026'],
  ['/blog/porcelanato-vs-ceramica', '/en/blog/porcelain-tile-vs-ceramic-tile-guide'],
  ['/blog/presupuesto-reforma-errores', '/en/blog/budget-remodel-mistakes-avoid'],
  ['/blog/reformas-banos-carabobo', '/en/blog/bathroom-remodels-caracas-carabobo-2026'],
  ['/blog/tendencias-cocinas-2025', '/en/blog/kitchen-design-trends-2026'],
  ['/blog/antes-despues-reforma-cocina-caso-real', '/en/blog/kitchen-remodel-before-after-case-study'],
  ['/blog/como-elegir-empresa-reformas-venezuela', '/en/blog/how-to-choose-remodeling-company-venezuela'],
  ['/blog/cuanto-cuesta-remodelar-bano-caracas', '/en/blog/bathroom-remodel-cost-caracas'],
  ['/blog/cuanto-tarda-reforma-integral-plazos', '/en/blog/how-long-full-remodel-takes'],
  ['/blog/errores-remodelar-zonas-premium-caracas', '/en/blog/remodeling-mistakes-premium-areas-caracas'],
  ['/blog/fontaneria-plomeria-precios-caracas', '/en/blog/plumbing-prices-caracas'],
  ['/blog/fugas-agua-tuberias-como-detectar', '/en/blog/how-to-detect-water-leaks'],
  ['/blog/guia-pisos-porcelanato-marmol-madera', '/en/blog/flooring-guide-porcelain-marble-wood'],
  ['/blog/instalacion-electrica-precios-venezuela', '/en/blog/electrical-installation-prices-venezuela'],
  ['/blog/mantenimiento-piscinas-venezuela', '/en/blog/pool-maintenance-venezuela'],
  ['/blog/microcemento-vs-pintura-acabados', '/en/blog/microcement-vs-paint-finishes'],
  ['/blog/permisos-reforma-apartamento-condominio', '/en/blog/remodel-permits-apartment-condominium'],
  ['/blog/pintura-interior-precios-m2-venezuela', '/en/blog/interior-painting-prices-m2-venezuela'],
  ['/blog/remodelacion-apartamentos-caracas', '/en/blog/apartment-remodeling-caracas'],
  ['/blog/remodelacion-integral-que-incluye', '/en/blog/full-home-remodel-what-it-includes'],
  ['/blog/revestimiento-piedra-madera-pared-precios', '/en/blog/stone-wood-wall-cladding-prices'],
  ['/blog/senales-reinstalacion-electrica-casa', '/en/blog/signs-electrical-rewiring-needed'],
];

// Construir mapa bidireccional a partir de los pares.
export const routeMap: Record<string, string> = {};
for (const [es, en] of pairs) {
  routeMap[es] = en;
  routeMap[en] = es;
}

/**
 * Dada una ruta (sin trailing slash), devuelve su equivalente en el otro
 * idioma, o null si no existe y no hay correspondencia por defecto.
 */
export function getAlternatePath(currentPath: string, isEnglish: boolean): string | null {
  // Ruta con traducción explícita
  if (routeMap[currentPath]) return routeMap[currentPath];

  // Si es una página de ciudad/servicio-zona (e.g. /remodelacion-bano-altamira
  // o /en/remodelacion-bano-altamira), la contraparte es /en/... o la raíz ES.
  // Las páginas de servicio-zona se generan con el mismo slug en ambos idiomas
  // (generadas por scripts/generate-en-zone-pages.mjs) y la estructura EN es
  // `/en/remodelacion-<servicio>-<zona>/`.
  const zonePageRe = /^\/remodelacion-(bano|cocina|integral)-[a-z-]+$/;
  const enZonePageRe = /^\/en\/remodelacion-(bano|cocina|integral)-[a-z-]+$/;

  if (isEnglish && enZonePageRe.test(currentPath)) {
    // /en/remodelacion-bano-altamira -> /remodelacion-bano-altamira
    return currentPath.replace(/^\/en/, '') || '/';
  }
  if (!isEnglish && zonePageRe.test(currentPath)) {
    // /remodelacion-bano-altamira -> /en/remodelacion-bano-altamira
    // Solo si esa página existe en EN.
    return `/en${currentPath}`;
  }

  // Fallback genérico para /algo -> /en/algo (solo para rutas que SÍ tienen
  // contraparte por convención). Si la página está marcada como no traducida,
  // SEO.astro no emitirá el hreflang.
  if (isEnglish) {
    return currentPath.replace(/^\/en/, '') || '/';
  }
  return currentPath === '/' ? '/en' : `/en${currentPath}`;
}
