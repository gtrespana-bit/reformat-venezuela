// Pool de imágenes para selección determinista en zone pages
export const POOLS = {
  cocina: [
    '/images/cocina-isla-central.webp',
    '/images/cocina-terminada-final.webp',
    '/images/cocina-encimera-cuarzo.webp',
    '/images/cocina-electrodomesticos.webp',
    '/images/cocina-iluminacion-capas.webp',
    '/images/cocina-triangulo-trabajo.webp',
    '/images/cocina-muebles-detalle.webp',
    '/images/cocina-distribucion-L.webp',
    '/images/cocina-distribucion-U.webp',
    '/images/cocina-almacenamiento-inteligente.webp'
  ],
  bano: [
    '/images/bano-ducha-walkin.webp',
    '/images/bano-terminado-final.webp',
    '/images/bano-espejo-led.webp',
    '/images/bano-griferia-negra.webp',
    '/images/bano-lavabo-doble.webp',
    '/images/bano-revestimiento-paredes.webp',
    '/images/bano-sanitarios-premium.webp',
    '/images/bano-suelo-antideslizante.webp',
    '/images/bano-almacenamiento.webp'
  ],
  integral: [
    '/images/integrales-proyecto-completo.webp',
    '/images/integrales-despues.webp',
    '/images/integrales-acabados.webp',
    '/images/integrales-albanileria.webp',
    '/images/integrales-instalaciones.webp',
    '/images/integrales-plano-diseno.webp',
    '/images/integrales-equipo-trabajando.webp',
    '/images/integrales-demolicion.webp'
  ]
} as const;

// Genera un hash simple a partir de un string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Retorna 3 imágenes únicas y deterministas para una zona y servicio dados
export function getImagesForZone(zone: string, service: 'cocina' | 'bano' | 'integral'): string[] {
  const pool = POOLS[service] || POOLS.integral;
  const hash = hashString(zone);
  
  const selected: string[] = [];
  const poolCopy = [...pool];
  
  for (let i = 0; i < 3; i++) {
    const index = (hash + i * 7) % poolCopy.length;
    selected.push(poolCopy[index]);
    poolCopy.splice(index, 1); // Evitar duplicados en la misma selección
  }
  
  return selected;
}
