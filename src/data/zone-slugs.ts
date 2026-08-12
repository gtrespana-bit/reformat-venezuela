// src/data/zone-slugs.ts
// -----------------------------------------------------------------------------
// FUENTE ÚNICA DE VERDAD para las zonas atendidas y sus páginas
// `remodelacion-<servicio>-<zona>` (ES y EN comparten slug).
//
// Usado por:
//   - src/components/ZoneCrossLinks.astro  (enlaces entre páginas de zona)
//   - src/components/ZoneHubLinks.astro    (enlaces hub -> spoke desde
//     páginas de servicio y hubs de ciudad)
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

/** Zonas del área metropolitana de Caracas (con páginas generadas). */
export const caracasZones: string[] = [
  'chacao', 'altamira', 'campo-alegre', 'country-club', 'las-mercedes',
  'el-hatillo', 'alto-hatillo', 'la-lagunita', 'los-naranjos',
  'prados-del-este', 'la-castellana', 'el-penon',
];

/** Zonas de Carabobo (Valencia, San Diego y alrededores) con páginas generadas. */
export const caraboboZones: string[] = [
  'el-trigal', 'la-trigalena', 'el-vinedo', 'guataparo', 'prebo',
  'valencia-centro', 'naguanagua', 'manongo', 'san-diego', 'los-guayos',
  'guacara', 'tocuyito', 'puerto-cabello', 'valles-de-camoruco', 'el-parral',
];

export const allZones: string[] = [...caracasZones, ...caraboboZones];

/** Agrupación por área metropolitana (para enlaces "zonas cercanas"). */
export const metroGroups: Record<string, string[]> = {
  caracas: caracasZones,
  carabobo: caraboboZones,
};

/** Nombre legible de una zona a partir de su slug. */
export function zoneLabel(slug: string): string {
  return zoneNames[slug] || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
