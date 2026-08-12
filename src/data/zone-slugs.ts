// src/data/zone-slugs.ts
// -----------------------------------------------------------------------------
// FUENTE ÚNICA DE VERDAD para las zonas atendidas y sus páginas
// `remodelacion-<servicio>-<zona>` (ES y EN comparten slug).
//
// Prioridad comercial (2026-08):
//   1. CARABOBO es la zona principal de trabajo — especialmente San Diego,
//      Valencia y alrededores (Naguanagua, Guacara, El Viñedo, Guataparo…).
//      Ahí se concentran las obras grandes (integrales, quintas, casas).
//   2. CARACAS es cobertura puntual / obras menores. Se mantiene indexable
//      pero no debe competir con Carabobo por crawl budget ni por autoridad.
//
// Usado por:
//   - src/components/ZoneCrossLinks.astro
//   - src/components/ZoneHubLinks.astro
//   - footer / home / sitemap (prioridad)
// -----------------------------------------------------------------------------

export const zoneNames: Record<string, string> = {
  'altamira': 'Altamira',
  'alto-hatillo': 'Alto Hatillo',
  'campo-alegre': 'Campo Alegre',
  'chacao': 'Chacao',
  'country-club': 'Country Club',
  'el-hatillo': 'El Hatillo',
  'el-parral': 'El Parral',
  'el-penon': 'El Peñón',
  'el-trigal': 'El Trigal',
  'el-vinedo': 'El Viñedo',
  'guacara': 'Guacara',
  'guataparo': 'Guataparo',
  'la-castellana': 'La Castellana',
  'la-lagunita': 'La Lagunita',
  'las-mercedes': 'Las Mercedes',
  'la-trigalena': 'La Trigaleña',
  'los-guayos': 'Los Guayos',
  'los-naranjos': 'Los Naranjos',
  'manongo': 'Manongo',
  'naguanagua': 'Naguanagua',
  'prados-del-este': 'Prados del Este',
  'prebo': 'Prebo',
  'puerto-cabello': 'Puerto Cabello',
  'san-diego': 'San Diego',
  'tocuyito': 'Tocuyito',
  'valencia-centro': 'Valencia Centro',
  'valles-de-camoruco': 'Valles de Camoruco',
};

/** Zonas del área metropolitana de Caracas (cobertura puntual). */
export const caracasZones: string[] = [
  'chacao', 'altamira', 'campo-alegre', 'country-club', 'las-mercedes',
  'el-hatillo', 'alto-hatillo', 'la-lagunita', 'los-naranjos',
  'prados-del-este', 'la-castellana', 'el-penon',
];

/**
 * Zonas de Carabobo, ordenadas por prioridad comercial:
 * San Diego / Valencia / Naguanagua / Guacara primero, luego el resto
 * del área metropolitana.
 */
export const caraboboZones: string[] = [
  'san-diego', 'valencia-centro', 'naguanagua', 'guacara',
  'el-vinedo', 'guataparo', 'manongo', 'el-trigal',
  'la-trigalena', 'prebo', 'el-parral', 'valles-de-camoruco',
  'los-guayos', 'tocuyito', 'puerto-cabello',
];

/** Núcleo comercial: obras grandes y mayor exposición SEO. */
export const primaryCaraboboZones: string[] = [
  'san-diego', 'valencia-centro', 'naguanagua', 'guacara',
  'el-vinedo', 'guataparo', 'manongo',
];

/** Carabobo primero: el grafo interno y los chips de servicio heredan este orden. */
export const allZones: string[] = [...caraboboZones, ...caracasZones];

/** Agrupación por área metropolitana (para enlaces "zonas cercanas"). */
export const metroGroups: Record<string, string[]> = {
  carabobo: caraboboZones,
  caracas: caracasZones,
};

const primarySet = new Set(primaryCaraboboZones);
const caraboboSet = new Set(caraboboZones);

export function isCaraboboZone(slug: string): boolean {
  return caraboboSet.has(slug);
}

export function isPrimaryCaraboboZone(slug: string): boolean {
  return primarySet.has(slug);
}

/** Nombre legible de una zona a partir de su slug. */
export function zoneLabel(slug: string): string {
  return zoneNames[slug] || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Ordena una lista de slugs poniendo el núcleo de Carabobo primero.
 * Útil en "zonas cercanas" para que San Diego / Valencia / Naguanagua
 * no queden enterrados al final de una columna.
 */
export function sortZonesByPriority(slugs: string[]): string[] {
  return [...slugs].sort((a, b) => {
    const ia = caraboboZones.indexOf(a);
    const ib = caraboboZones.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return 0;
  });
}
