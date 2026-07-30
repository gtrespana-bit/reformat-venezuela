/**
 * Constantes de marca — FUENTE ÚNICA DE VERDAD.
 *
 * Antes de este archivo el sitio afirmaba simultáneamente "+15 años" (166 veces),
 * "más de 20 años" (10), "más de 10 años" (2) y "desde 2005" (footer de 253 páginas).
 * Cualquier cifra o dato de contacto que aparezca en la web debe salir de aquí.
 */

export const FOUNDED_YEAR = 2003;

export const BRAND = {
  name: 'ReformaT Venezuela',
  shortName: 'ReformaT',

  /** 23 años en construcción y remodelación de viviendas (desde 2003). */
  yearsExperience: 23,
  foundedYear: FOUNDED_YEAR,
  /** Años operando en Venezuela. */
  yearsInVenezuela: 2,

  phone: '+584227997043',
  phoneDisplay: '0422 799 7043',
  phoneIntl: '+58 422 799 7043',
  email: 'contacto@remodelat.net',

  areas: 'Valencia, San Diego, Carabobo y Caracas',
  areasEn: 'Valencia, San Diego, Carabobo and Caracas',
} as const;

/** Enlace de WhatsApp con mensaje pre-escrito ya codificado. */
export function waLink(text: string): string {
  return `https://wa.me/${BRAND.phone.replace('+', '')}?text=${encodeURIComponent(text)}`;
}

/** Frases reutilizables para no volver a desincronizar las cifras. */
export const COPY = {
  es: {
    experience: `${BRAND.yearsExperience} años de experiencia`,
    experienceLong: `Más de ${BRAND.yearsExperience} años transformando hogares`,
    since: `Desde ${BRAND.foundedYear}`,
    footerDesc: `Transformando espacios con excelencia desde ${BRAND.foundedYear}.`,
  },
  en: {
    experience: `${BRAND.yearsExperience} years of experience`,
    experienceLong: `Over ${BRAND.yearsExperience} years transforming homes`,
    since: `Since ${BRAND.foundedYear}`,
    footerDesc: `Transforming spaces with excellence since ${BRAND.foundedYear}.`,
  },
} as const;
