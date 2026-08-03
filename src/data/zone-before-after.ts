export type ZoneService = 'cocina' | 'bano' | 'integral';
export type BeforeAfterOrientation = 'tall' | 'portrait' | 'landscape';
export type BeforeAfterScope = 'same-room' | 'same-zone' | 'same-room-process';

interface LocalizedText {
  es: string;
  en: string;
}

export interface ZoneBeforeAfterPair {
  project: LocalizedText;
  location: LocalizedText;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: LocalizedText;
  afterAlt: LocalizedText;
  beforeCaption: LocalizedText;
  afterCaption: LocalizedText;
  comparison: LocalizedText;
  beforeLabel?: LocalizedText;
  afterLabel?: LocalizedText;
  orientation: BeforeAfterOrientation;
  scope: BeforeAfterScope;
}

const INTEGRAL_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Transformación integral documentada',
    en: 'Documented whole-home transformation',
  },
  location: {
    es: 'Caso real de reforma integral',
    en: 'Real whole-home remodeling case',
  },
  beforeSrc: '/images/integrales-antes.webp',
  afterSrc: '/images/integrales-despues.webp',
  beforeAlt: {
    es: 'Espacio de vivienda antes de una reforma integral',
    en: 'Home interior before a whole-home remodel',
  },
  afterAlt: {
    es: 'Espacio de vivienda después de una reforma integral',
    en: 'Home interior after a whole-home remodel',
  },
  beforeCaption: {
    es: 'Estado inicial del espacio antes de actualizar distribución, acabados y equipamiento.',
    en: 'Initial condition before updating the layout, finishes and equipment.',
  },
  afterCaption: {
    es: 'La misma vivienda transformada con nueva lectura espacial, acabados y mobiliario.',
    en: 'The same home transformed with a new spatial layout, finishes and furnishings.',
  },
  comparison: {
    es: 'La pareja conserva la lectura general de la vivienda para mostrar la transformación sin mezclar estancias distintas.',
    en: 'The pair preserves the overall reading of the home so the transformation is shown without mixing unrelated rooms.',
  },
  orientation: 'landscape',
  scope: 'same-room',
};

const CARACAS_KITCHEN_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Cocina integral en quinta',
    en: 'Whole-kitchen remodel in a detached home',
  },
  location: {
    es: 'Proyecto real en Caracas',
    en: 'Real project in Caracas',
  },
  beforeSrc: '/images/proyectos/cocina-caracas-quinta/cocina-antes-1.webp',
  afterSrc: '/images/proyectos/cocina-caracas-quinta/cocina-finalizada-1.webp',
  beforeAlt: {
    es: 'Cocina original antes de la reforma integral en Caracas, vista desde el acceso',
    en: 'Original kitchen before the whole-kitchen remodel in Caracas, viewed from the entrance',
  },
  afterAlt: {
    es: 'La misma cocina de Caracas terminada con mobiliario blanco y electrodomésticos integrados',
    en: 'The same Caracas kitchen finished with white cabinetry and integrated appliances',
  },
  beforeCaption: {
    es: 'La cocina original, fotografiada desde el acceso, antes del desmontaje y la renovación de acabados.',
    en: 'The original kitchen photographed from the entrance before dismantling and finish upgrades.',
  },
  afterCaption: {
    es: 'La misma cocina y el mismo punto de vista, ya terminada con mobiliario blanco y equipos integrados.',
    en: 'The same kitchen and viewpoint, finished with white cabinetry and integrated appliances.',
  },
  comparison: {
    es: 'Ambas imágenes pertenecen a la misma cocina de Caracas y mantienen como referencia el acceso y la distribución general.',
    en: 'Both images belong to the same Caracas kitchen and retain the entrance and overall layout as reference points.',
  },
  orientation: 'tall',
  scope: 'same-room',
};

const CARACAS_BATHROOM_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Baño principal reformado',
    en: 'Remodeled main bathroom',
  },
  location: {
    es: 'Proyecto real en Caracas',
    en: 'Real project in Caracas',
  },
  beforeSrc: '/images/proyectos/bano-caracas/bano-principal-antes-1.webp',
  afterSrc: '/images/proyectos/bano-caracas/bano-principal-finalizado-2.webp',
  beforeAlt: {
    es: 'Baño principal antes de la reforma en Caracas, con sanitario y revestimiento original',
    en: 'Main bathroom before remodeling in Caracas, with the original toilet and finishes',
  },
  afterAlt: {
    es: 'El mismo baño principal de Caracas terminado con ducha y revestimientos nuevos',
    en: 'The same Caracas main bathroom finished with a new shower and finishes',
  },
  beforeCaption: {
    es: 'Estado previo de la misma estancia: sanitario instalado, revestimiento antiguo y zona de ducha sin actualizar.',
    en: 'The same room before work: existing toilet, dated finishes and an unmodernized shower area.',
  },
  afterCaption: {
    es: 'La misma estancia terminada, con ducha, sanitario, revestimientos y acabados completamente renovados.',
    en: 'The same room finished with a renewed shower, toilet, wall finishes and details.',
  },
  comparison: {
    es: 'La comparación corresponde al mismo baño de Caracas; el sanitario, la zona de ducha y la geometría del espacio permiten leer el cambio real.',
    en: 'This comparison shows the same Caracas bathroom; the toilet, shower area and room geometry make the real change clear.',
  },
  orientation: 'tall',
  scope: 'same-room',
};

const VALENCIA_KITCHEN_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Cocina reubicada en quinta',
    en: 'Relocated kitchen in a detached home',
  },
  location: {
    es: 'Guataparo · Valencia, Carabobo',
    en: 'Guataparo · Valencia, Carabobo',
  },
  beforeSrc: '/images/proyectos/cocina-lujo-guataparo/antes-acceso-doble-sala.webp',
  afterSrc: '/images/proyectos/cocina-lujo-guataparo/resultado-final-comedor-abierto.webp',
  beforeAlt: {
    es: 'Zona día de una quinta en Guataparo antes de reubicar y abrir la cocina',
    en: 'Day area of a Guataparo home before relocating and opening the kitchen',
  },
  afterAlt: {
    es: 'La misma zona día en Guataparo después de abrir la cocina y unificar el pavimento',
    en: 'The same Guataparo day area after opening the kitchen and unifying the flooring',
  },
  beforeCaption: {
    es: 'Antes de la obra: comedor y acceso doble a la cocina cerrada al fondo de la zona día.',
    en: 'Before work: dining area and double access to the closed kitchen at the back of the day area.',
  },
  afterCaption: {
    es: 'Después de la intervención: cocina abierta, comedor y sala leídos como una sola zona continua.',
    en: 'After the work: kitchen, dining and living areas read as one continuous zone.',
  },
  comparison: {
    es: 'Este proyecto cambió la ubicación de la cocina. No es un simple cambio de muebles: es la misma zona día, reconocible por el ventanal y los pasos, transformada y abierta.',
    en: 'This project relocated the kitchen. It is not a simple cabinet swap: it is the same day area, recognizable by the window and openings, transformed and opened up.',
  },
  orientation: 'landscape',
  scope: 'same-zone',
};

const VALENCIA_BATHROOM_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Baño reformado',
    en: 'Remodeled bathroom',
  },
  location: {
    es: 'La Trigaleña · Valencia, Carabobo',
    en: 'La Trigaleña · Valencia, Carabobo',
  },
  beforeSrc: '/images/proyectos/bano-la-trigalena/bano-antes-1.webp',
  afterSrc: '/images/proyectos/bano-la-trigalena/bano-final-1.webp',
  beforeAlt: {
    es: 'Baño de La Trigaleña antes de la reforma, con revestimientos y distribución originales',
    en: 'La Trigaleña bathroom before remodeling, with its original finishes and layout',
  },
  afterAlt: {
    es: 'El mismo baño de La Trigaleña terminado con ducha y acabados renovados',
    en: 'The same La Trigaleña bathroom finished with a renewed shower and finishes',
  },
  beforeCaption: {
    es: 'Estado inicial del baño antes de retirar los revestimientos y actualizar la zona húmeda.',
    en: 'Initial bathroom condition before removing finishes and updating the wet area.',
  },
  afterCaption: {
    es: 'La misma estancia terminada, con nueva ducha, revestimientos y una lectura más limpia del espacio.',
    en: 'The same room finished with a new shower, wall finishes and a cleaner spatial reading.',
  },
  comparison: {
    es: 'Las dos imágenes pertenecen al mismo baño de La Trigaleña y conservan como referencias la puerta, la ventana y la posición de la zona de ducha.',
    en: 'Both images belong to the same La Trigaleña bathroom and retain the door, window and shower position as reference points.',
  },
  orientation: 'tall',
  scope: 'same-room',
};

const SAN_DIEGO_BATHROOM_PAIR: ZoneBeforeAfterPair = {
  project: {
    es: 'Baño con ducha walk-in documentado',
    en: 'Documented walk-in shower bathroom',
  },
  location: {
    es: 'Proyecto real en San Diego, Carabobo',
    en: 'Real project in San Diego, Carabobo',
  },
  beforeSrc: '/images/proyectos/bano-san-diego/bano-en-proceso-2.webp',
  afterSrc: '/images/proyectos/bano-san-diego/bano-finalizado-2.webp',
  beforeAlt: {
    es: 'Baño de San Diego durante la obra, con la ventana circular y el revestimiento en proceso',
    en: 'San Diego bathroom during construction, with the round window and wall finishes in progress',
  },
  afterAlt: {
    es: 'El mismo baño de San Diego terminado con ducha walk-in y ventana circular',
    en: 'The same San Diego bathroom finished with a walk-in shower and round window',
  },
  beforeCaption: {
    es: 'Fase de obra del mismo baño: ventana circular, instalaciones y revestimiento todavía en ejecución.',
    en: 'Construction phase of the same bathroom: round window, utilities and finishes still in progress.',
  },
  afterCaption: {
    es: 'Resultado final del mismo punto de ducha, con mampara, grifería y acabados completamente instalados.',
    en: 'Final result from the same shower point, with enclosure, faucetry and finishes installed.',
  },
  comparison: {
    es: 'En este caso no existe una foto original de demolición desde el mismo punto; por eso la primera imagen se etiqueta honestamente como “En obra”. La ventana circular y la zona de ducha confirman que es el mismo baño.',
    en: 'There is no original demolition photo from the same viewpoint in this case, so the first image is honestly labeled “In progress”. The round window and shower area confirm it is the same bathroom.',
  },
  beforeLabel: { es: 'En obra', en: 'In progress' },
  afterLabel: { es: 'Resultado', en: 'Final result' },
  orientation: 'portrait',
  scope: 'same-room-process',
};

const CARACAS_ZONES = new Set([
  'altamira',
  'alto-hatillo',
  'campo-alegre',
  'chacao',
  'country-club',
  'el-hatillo',
  'el-penon',
  'la-castellana',
  'la-lagunita',
  'las-mercedes',
  'los-naranjos',
  'prados-del-este',
]);

const VALENCIA_ZONES = new Set([
  'el-parral',
  'el-trigal',
  'el-vinedo',
  'guacara',
  'guataparo',
  'la-trigalena',
  'los-guayos',
  'manongo',
  'naguanagua',
  'prebo',
  'tocuyito',
  'valencia-centro',
  'valles-de-camoruco',
]);

/**
 * Returns only documented pairs. A missing pair is intentional: local pages
 * should not show a comparison until there is a real, traceable case for it.
 */
export function getBeforeAfterPair(zone: string, service: ZoneService): ZoneBeforeAfterPair | null {
  if (service === 'integral') return INTEGRAL_PAIR;
  if (zone === 'san-diego') return service === 'bano' ? SAN_DIEGO_BATHROOM_PAIR : null;
  if (zone === 'puerto-cabello') return null;

  if (CARACAS_ZONES.has(zone)) {
    return service === 'cocina' ? CARACAS_KITCHEN_PAIR : CARACAS_BATHROOM_PAIR;
  }

  if (VALENCIA_ZONES.has(zone)) {
    return service === 'cocina' ? VALENCIA_KITCHEN_PAIR : VALENCIA_BATHROOM_PAIR;
  }

  return null;
}
