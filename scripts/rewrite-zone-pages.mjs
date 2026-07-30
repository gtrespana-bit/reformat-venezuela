#!/usr/bin/env node
/**
 * rewrite-zone-pages.mjs
 * Reescribe las 81 páginas de zonas (27 zonas × 3 servicios) con contenido
 * genuinamente único por zona: barrios reales, tipología de vivienda, retos
 * locales, referentes y FAQs específicas. Elimina el patrón "doorway page".
 *
 * Uso: node scripts/rewrite-zone-pages.mjs [--only slug1,slug2] [--service bano|cocina|integral]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.join(__dirname, '..', 'src', 'pages');

const args = process.argv.slice(2);
const onlyArg = args.find(a => a.startsWith('--only='));
const only = onlyArg ? onlyArg.split('=')[1].split(',') : null;
const svcArg = args.find(a => a.startsWith('--service='));
const svcFilter = svcArg ? svcArg.split('=')[1] : null;

const WA = '584129449929';

/* ============================================================
   PERFILES REALES POR ZONA (27)
   ============================================================ */
const ZONES = [
  // ---------- CARACAS (12) ----------
  {
    slug: 'chacao', name: 'Chacao', city: 'Caracas', region: 'Caracas',
    barrios: ['Altamira', 'Los Palos Grandes', 'Chuao', 'El Rosal', 'Bello Campo'],
    housing: 'El parque inmobiliario de Chacao combina edificios residenciales de los años 70-90 con torres contemporáneas. Abundan apartamentos de 80 a 220 m² con layouts compartimentados que los propietarios actuales quieren abrir hacia conceptos más abiertos.',
    challenge: 'En Chacao la mayoría de los edificios superan los 30 años, por lo que las bajantes, montantes de agua y tableros eléctricos suelen estar al límite de su vida útil. Antes de cerrar cualquier acabado revisamos y renovamos las instalaciones ocultas.',
    landmark: 'la Plaza Francia de Altamira y el eje comercial de Los Palos Grandes',
    norm: 'Las juntas de condominio de Chacao suelen exigir horarios de obra restringidos (8:00–12:00 y 13:30–17:00), control de escombros y protección de ascensores. Coordinamos todo el protocolo con la administración del edificio.',
    style: 'El cliente de Chacao suele buscar acabados contemporáneos: porcelanatos de gran formato, grifería empotrada, iluminación técnica y carpintería a medida.'
  },
  {
    slug: 'altamira', name: 'Altamira', city: 'Caracas', region: 'Caracas',
    barrios: ['Plaza Francia', 'Campo Alegre', 'Los Palos Grandes', 'La Castellana'],
    housing: 'Altamira se caracteriza por edificios de mediana y gran altura construidos entre los 70 y los 90, con apartamentos amplios de 120 a 300 m². Muchas unidades conservan distribuciones originales con pasillos largos y cocinas cerradas.',
    challenge: 'Los edificios de Altamira frecuentemente tienen instalaciones de cobre y hierro galvanizado originales que ya cumplieron su ciclo. La presión de agua irregular de la zona hace recomendable instalar sistemas de bombeo y filtración.',
    landmark: 'la Plaza Francia y el corredor gastronómico de la avenida Luis Roche',
    norm: 'Los condominios de Altamira son exigentes con la normativa de ruidos y el manejo de escombros. Gestionamos permisos de obra, horarios y el uso de montacargas con la junta de propietarios.',
    style: 'En Altamira predominan los proyectos de gama alta: mármoles, maderas nobles, domótica y cocinas con isla central.'
  },
  {
    slug: 'campo-alegre', name: 'Campo Alegre', city: 'Caracas', region: 'Caracas',
    barrios: ['Torre Europa', 'Centro Lido', 'El Rosal', 'Chuao'],
    housing: 'Campo Alegre mezcla torres residenciales de lujo con edificios de uso mixto (oficina-vivienda). Los apartamentos suelen ser de 100 a 250 m², muchos reformados parcialmente en los 2000 y ahora necesitados de una actualización integral.',
    challenge: 'Al ser una zona de alto tránsito y uso mixto, los edificios de Campo Alegre tienen normativas estrictas de acceso de obreros y carga de materiales. Planificamos la logística de obra fuera de horas pico.',
    landmark: 'el Centro Lido y el bulevar de El Rosal',
    norm: 'Las torres de Campo Alegre exigen seguros de responsabilidad civil y cronogramas aprobados por la administración. Nos encargamos de toda la documentación.',
    style: 'El perfil de Campo Alegre es ejecutivo y moderno: líneas limpias, tonos neutros, materiales de bajo mantenimiento y tecnología integrada.'
  },
  {
    slug: 'country-club', name: 'Country Club', city: 'Caracas', region: 'Caracas',
    barrios: ['Valle Arriba', 'El Country', 'Las Mercedes', 'Chuao'],
    housing: 'Country Club es una de las urbanizaciones más exclusivas de Caracas, con casas unifamiliares de gran metraje (300-800 m²) y algunos penthouses. Muchas propiedades datan de los 60-80 y requieren redistribución total.',
    challenge: 'Las casas del Country Club suelen tener estructuras de hormigón sólidas pero instalaciones muy antiguas y cubiertas con filtraciones. La remodelación integral aquí implica renovar techos, impermeabilización y sistemas hidrosanitarios completos.',
    landmark: 'el Caracas Country Club y el campo de golf de Valle Arriba',
    norm: 'La asociación de vecinos del Country Club regula fachadas, alturas y cerramientos. Respetamos la estética de la urbanización en cada intervención exterior.',
    style: 'En Country Club trabajamos proyectos de lujo clásico-contemporáneo: piedra natural, carpintería fina, piscinas y áreas sociales amplias.'
  },
  {
    slug: 'las-mercedes', name: 'Las Mercedes', city: 'Caracas', region: 'Caracas',
    barrios: ['Tolón', 'Cerro Verde', 'Chuao', 'El Rosal'],
    housing: 'Las Mercedes combina edificios residenciales de los 80-90 con torres nuevas. Hay apartamentos de 90 a 200 m² y varios lofts en edificios de uso mixto. Es una zona dinámica con alta rotación de propietarios.',
    challenge: 'La vida nocturna y comercial de Las Mercedes implica que muchos apartamentos se remodelan para alquiler o reventa rápida. Optimizamos presupuestos para maximizar el retorno sin sacrificar calidad en puntos críticos.',
    landmark: 'el centro comercial Tolón y la avenida Río de Janeiro',
    norm: 'Los edificios mixtos de Las Mercedes tienen reglas particulares de horarios y ruido por la convivencia con locales comerciales. Coordinamos la obra con la administración.',
    style: 'Las Mercedes pide diseños modernos y urbanos: cocinas abiertas, iluminación LED, acabados industriales y espacios multifuncionales.'
  },
  {
    slug: 'el-hatillo', name: 'El Hatillo', city: 'Caracas', region: 'Caracas',
    barrios: ['Casco Histórico', 'La Boyera', 'El Calvario', 'Los Naranjos'],
    housing: 'El casco de El Hatillo conserva casas coloniales y quintas de los años 40-60 con patios internos, techos altos y muros de carga. Fuera del casco hay urbanizaciones con casas de los 80-2000.',
    challenge: 'Las casas históricas de El Hatillo tienen muros de carga, vigas de madera y sistemas eléctricos obsoletos. Cualquier intervención estructural requiere refuerzo y, en el casco, respeto por el patrimonio arquitectónico.',
    landmark: 'la Plaza Bolívar de El Hatillo y la iglesia Santa Rosalía de Palermo',
    norm: 'El casco histórico de El Hatillo está protegido: las reformas de fachada y elementos patrimoniales requieren aprobación especial. Asesoramos sobre qué se puede modificar y qué debe conservarse.',
    style: 'En El Hatillo conviven lo rústico-colonial y lo contemporáneo: vigas vistas, pisos de barro cocido restaurados combinados con cocinas y baños modernos.'
  },
  {
    slug: 'alto-hatillo', name: 'Alto Hatillo', city: 'Caracas', region: 'Caracas',
    barrios: ['La Boyera', 'El Cigarral', 'Los Geranios', 'La Lagunita'],
    housing: 'Alto Hatillo es una zona de desarrollo más reciente con casas en parcelas de montaña, townhouses y conjuntos cerrados de los 90-2010. Las viviendas van de 150 a 400 m² con vistas a la ciudad.',
    challenge: 'Las casas de montaña del Alto Hatillo enfrentan humedad por ladera, muros de contención y accesos estrechos para materiales. Evaluamos drenajes y contenciones antes de cualquier obra interior.',
    landmark: 'el mirador de La Boyera y los conjuntos residenciales de El Cigarral',
    norm: 'Los conjuntos cerrados del Alto Hatillo tienen reglamentos internos de obra y estética. Gestionamos la aprobación de la junta de condominio.',
    style: 'El Alto Hatillo favorece diseños que integran interior y exterior: grandes ventanales, terrazas, decks y materiales resistentes a la humedad.'
  },
  {
    slug: 'la-lagunita', name: 'La Lagunita', city: 'Caracas', region: 'Caracas',
    barrios: ['El Country', 'La Lagunita Country Club', 'Valle Arriba', 'El Placer'],
    housing: 'La Lagunita es una urbanización residencial de casas unifamiliares en parcelas amplias, muchas con jardín y piscina. Las propiedades van de 250 a 700 m², construidas entre los 70 y los 2000.',
    challenge: 'Las casas de La Lagunita con frecuencia tienen piscinas, jardines y áreas de servicio que requieren impermeabilización y renovación de exteriores junto con la remodelación interior.',
    landmark: 'el Lagunita Country Club y las áreas verdes de Valle Arriba',
    norm: 'La asociación de propietarios de La Lagunita regula cerramientos y fachadas. Coordinamos los permisos de obra exterior.',
    style: 'En La Lagunita predominan las reformas integrales de casas completas: redistribución, piscina, paisajismo y acabados de gama alta.'
  },
  {
    slug: 'los-naranjos', name: 'Los Naranjos', city: 'Caracas', region: 'Caracas',
    barrios: ['Los Naranjos de La Lagunita', 'El Hatillo', 'La Boyera'],
    housing: 'Los Naranjos es una zona residencial familiar con casas y townhouses de los 80-2000, de 150 a 350 m². Es una urbanización tranquila con alto porcentaje de familias de largo plazo.',
    challenge: 'Muchas casas de Los Naranjos tienen 25-40 años y necesitan actualización de instalaciones eléctricas e hidrosanitarias, además de abrir espacios que originalmente eran muy compartimentados.',
    landmark: 'las áreas verdes de Los Naranjos y el acceso a La Boyera',
    norm: 'Los conjuntos de townhouses de Los Naranjos tienen normas de convivencia y horarios de obra. Respetamos los reglamentos de cada urbanización.',
    style: 'Los Naranjos pide diseños familiares y funcionales: cocinas amplias, baños duraderos, pisos resistentes y espacios para niños.'
  },
  {
    slug: 'prados-del-este', name: 'Prados del Este', city: 'Caracas', region: 'Caracas',
    barrios: ['Prados del Este', 'Las Mercedes', 'Cerro Verde', 'El Cafetal'],
    housing: 'Prados del Este es una urbanización consolidada con casas unifamiliares de 200 a 500 m² y algunos edificios bajos. Las viviendas datan mayormente de los 70-90.',
    challenge: 'Las casas de Prados del Este suelen tener estructuras sólidas pero techos y terrazas con filtraciones por falta de mantenimiento. La impermeabilización es el primer paso en casi toda reforma aquí.',
    landmark: 'el club Prados del Este y las zonas residenciales de Cerro Verde',
    norm: 'La asociación de vecinos de Prados del Este regula fachadas y usos. Coordinamos permisos y horarios de obra.',
    style: 'En Prados del Este trabajamos reformas de casas familiares: redistribución de espacios, renovación de baños y cocinas, y actualización de exteriores.'
  },
  {
    slug: 'la-castellana', name: 'La Castellana', city: 'Caracas', region: 'Caracas',
    barrios: ['La Castellana', 'Altamira', 'Campo Alegre', 'Los Palos Grandes'],
    housing: 'La Castellana combina edificios residenciales de los 70-90 con torres corporativas. Los apartamentos van de 100 a 250 m², muchos con layouts tradicionales que se prestan para abrir hacia conceptos modernos.',
    challenge: 'La Castellana tiene edificios con instalaciones antiguas y presión de agua variable. Revisamos montantes y bajantes antes de intervenir los acabados.',
    landmark: 'la avenida Francisco de Miranda y el corredor financiero de La Castellana',
    norm: 'Los edificios de La Castellana exigen protocolos de obra aprobados por la administración. Gestionamos horarios, ascensores y escombros.',
    style: 'La Castellana favorece acabados contemporáneos y sobrios: porcelanatos, grifería empotrada, carpintería a medida e iluminación técnica.'
  },
  {
    slug: 'el-penon', name: 'El Peñón', city: 'Caracas', region: 'Caracas',
    barrios: ['El Peñón', 'Baruta', 'Las Mercedes', 'Prados del Este'],
    housing: 'El Peñón es una zona residencial con casas y algunos edificios de mediana altura, de 150 a 400 m², construidos entre los 70 y los 2000. Combina viviendas familiares con propiedades de inversión.',
    challenge: 'Las casas de El Peñón en ladera requieren atención a muros de contención y drenajes. La humedad por terreno es un factor a evaluar antes de remodelar.',
    landmark: 'las zonas residenciales de Baruta y el acceso a Las Mercedes',
    norm: 'Los conjuntos de El Peñón tienen reglamentos de obra internos. Coordinamos con la junta de condominio los permisos necesarios.',
    style: 'El Peñón pide reformas funcionales y duraderas: impermeabilización, actualización de instalaciones y acabados de buen rendimiento.'
  },

  // ---------- CARABOBO / VALENCIA (15) ----------
  {
    slug: 'el-trigal', name: 'El Trigal', city: 'Valencia', region: 'Carabobo',
    barrios: ['El Trigal Norte', 'El Trigal Sur', 'El Trigal Centro', 'La Alegría'],
    housing: 'El Trigal es una de las urbanizaciones más grandes y tradicionales de Valencia, con casas unifamiliares de 150 a 400 m² y edificios residenciales. Las viviendas datan mayormente de los 70-90.',
    challenge: 'Las casas de El Trigal suelen tener instalaciones eléctricas de 110V antiguas y tuberías de hierro galvanizado corroídas. La actualización eléctrica e hidrosanitaria es prioritaria en casi toda reforma.',
    landmark: 'la avenida Bolívar Norte y el centro comercial La Granja',
    norm: 'Las asociaciones de vecinos de El Trigal regulan fachadas y horarios de obra. Gestionamos los permisos con la comunidad.',
    style: 'El Trigal pide reformas familiares y funcionales: cocinas amplias, baños modernos, pisos de porcelanato y buena iluminación.'
  },
  {
    slug: 'la-trigalena', name: 'La Trigaleña', city: 'Valencia', region: 'Carabobo',
    barrios: ['La Trigaleña', 'El Trigal', 'Prebo', 'Camoruco'],
    housing: 'La Trigaleña es una zona residencial consolidada con casas de 180 a 450 m² en parcelas generosas. Muchas propiedades tienen 30-45 años y conservan distribuciones originales.',
    challenge: 'Las casas de La Trigaleña frecuentemente tienen techos de platabanda con filtraciones acumuladas y sistemas eléctricos sobrecargados. La impermeabilización y el recableado son el punto de partida habitual.',
    landmark: 'la avenida Andrés Eloy Blanco y las zonas comerciales de Prebo',
    norm: 'La Trigaleña tiene normas vecinales de convivencia y estética. Coordinamos horarios y manejo de escombros con la asociación.',
    style: 'En La Trigaleña trabajamos reformas integrales de casas: redistribución, renovación de baños y cocinas, y recuperación de exteriores.'
  },
  {
    slug: 'el-vinedo', name: 'El Viñedo', city: 'Valencia', region: 'Carabobo',
    barrios: ['El Viñedo', 'Camoruco', 'Prebo', 'La Alegría'],
    housing: 'El Viñedo es una urbanización de clase media-alta con casas de 200 a 500 m² y algunos edificios. Las viviendas van de los 70 a los 2000, muchas con jardines y áreas de servicio.',
    challenge: 'El Viñedo tiene casas con estructuras de hormigón sólidas pero instalaciones envejecidas. La renovación de baños y cocinas suele implicar cambiar toda la red de agua fría y caliente.',
    landmark: 'la avenida Universidad y el eje residencial de Camoruco',
    norm: 'Las asociaciones de El Viñedo regulan cerramientos y fachadas. Gestionamos los permisos de obra exterior.',
    style: 'El Viñedo favorece acabados contemporáneos: porcelanatos de gran formato, cocinas con isla, grifería moderna y carpintería a medida.'
  },
  {
    slug: 'guataparo', name: 'Guataparo', city: 'Valencia', region: 'Carabobo',
    barrios: ['Guataparo', 'El Viñedo', 'Camoruco', 'La Alegria'],
    housing: 'Guataparo es una zona residencial exclusiva con casas de gran metraje (300-700 m²) y algunos conjuntos cerrados. Las propiedades datan de los 80-2010, muchas con piscina y jardín.',
    challenge: 'Las casas de Guataparo con piscina y áreas verdes requieren impermeabilización de terrazas, renovación de sistemas de riego y actualización de instalaciones exteriores junto con la obra interior.',
    landmark: 'el Guataparo Country Club y las zonas verdes de la urbanización',
    norm: 'La asociación de propietarios de Guataparo regula fachadas, piscinas y cerramientos. Coordinamos todos los permisos.',
    style: 'Guataparo pide proyectos de gama alta: redistribución total, piscinas, paisajismo, acabados premium y domótica.'
  },
  {
    slug: 'prebo', name: 'Prebo', city: 'Valencia', region: 'Carabobo',
    barrios: ['Prebo I', 'Prebo II', 'Camoruco', 'El Viñedo'],
    housing: 'Prebo es una de las zonas más céntricas y comerciales de Valencia, con edificios residenciales de los 70-90 y apartamentos de 80 a 200 m². Alta densidad y buena ubicación.',
    challenge: 'Los edificios de Prebo tienen instalaciones antiguas y espacios reducidos. La remodelación aquí optimiza cada metro: cocinas lineales, baños compactos y almacenamiento integrado.',
    landmark: 'la avenida Bolívar y el centro comercial Prebo',
    norm: 'Los condominios de Prebo exigen horarios de obra y protección de áreas comunes. Gestionamos la coordinación con la administración.',
    style: 'Prebo favorece diseños eficientes y modernos: espacios multifuncionales, iluminación LED, acabados de bajo mantenimiento.'
  },
  {
    slug: 'valencia-centro', name: 'Valencia Centro', city: 'Valencia', region: 'Carabobo',
    barrios: ['Casco Histórico', 'Catedral', 'El Centro', 'San Blas'],
    housing: 'El centro de Valencia conserva edificaciones históricas y casas de los años 30-60 con patios internos, techos altos y muros de carga. También hay edificios de apartamentos de los 70-80.',
    challenge: 'Las casas del centro histórico tienen muros de carga, instalaciones eléctricas obsoletas y problemas de humedad por falta de ventilación. Cualquier intervención estructural requiere refuerzo y respeto patrimonial.',
    landmark: 'la Plaza Bolívar de Valencia y la Catedral',
    norm: 'El casco histórico de Valencia tiene protección patrimonial: las reformas de fachada requieren aprobación especial. Asesoramos sobre qué se puede modificar.',
    style: 'En el centro de Valencia conviven lo histórico y lo moderno: restauración de elementos originales combinada con cocinas y baños contemporáneos.'
  },
  {
    slug: 'naguanagua', name: 'Naguanagua', city: 'Valencia', region: 'Carabobo',
    barrios: ['Naguanagua Centro', 'La Granja', 'El Retobo', 'Caprenco'],
    housing: 'Naguanagua es un municipio con mezcla de casas tradicionales de 120 a 350 m², urbanizaciones cerradas y edificios de apartamentos. El parque inmobiliario va de los 70 a la actualidad.',
    challenge: 'Naguanagua tiene zonas con presión de agua irregular y casas con instalaciones antiguas. La instalación de sistemas de bombeo y tanques es frecuente en las reformas.',
    landmark: 'la avenida Universidad y el centro comercial La Granja',
    norm: 'Las urbanizaciones de Naguanagua tienen reglamentos internos de obra. Coordinamos permisos y horarios con cada condominio.',
    style: 'Naguanagua pide reformas prácticas y duraderas: actualización de instalaciones, baños y cocinas funcionales, pisos resistentes.'
  },
  {
    slug: 'manongo', name: 'Manongo', city: 'Valencia', region: 'Carabobo',
    barrios: ['Manongo', 'La Granja', 'Naguanagua', 'El Retobo'],
    housing: 'Manongo es una zona en crecimiento con urbanizaciones nuevas, townhouses y edificios de apartamentos de los 2000-2020. Las viviendas van de 90 a 250 m².',
    challenge: 'Las viviendas nuevas de Manongo suelen requerir personalización de acabados de constructora: pisos, cocinas y baños genéricos que los propietarios quieren adaptar a su gusto.',
    landmark: 'la avenida Intercomunal y los nuevos desarrollos de La Granja',
    norm: 'Los conjuntos nuevos de Manongo tienen reglamentos de condominio estrictos sobre modificaciones. Gestionamos las aprobaciones.',
    style: 'Manongo favorece diseños contemporáneos: cocinas abiertas, baños tipo spa, iluminación integrada y acabados premium.'
  },
  {
    slug: 'san-diego', name: 'San Diego', city: 'Valencia', region: 'Carabobo',
    barrios: ['San Diego Centro', 'La Esmeralda', 'Yuma', 'El Morro'],
    housing: 'San Diego es un municipio de rápido crecimiento con urbanizaciones cerradas, townhouses y casas de 120 a 400 m² construidas mayormente entre 2000 y 2020.',
    challenge: 'Las viviendas de San Diego son relativamente nuevas pero muchas tienen acabados básicos de constructora. La remodelación se enfoca en personalizar cocinas, baños y pisos sin tocar la estructura.',
    landmark: 'la avenida Intercomunal Don Julio Centeno y el centro comercial Fin de Siglo',
    norm: 'Las urbanizaciones cerradas de San Diego tienen reglamentos estrictos de fachada y horarios. Coordinamos con la junta de condominio.',
    style: 'San Diego pide diseños modernos y familiares: cocinas con isla, baños amplios, closets a medida y áreas sociales integradas.'
  },
  {
    slug: 'los-guayos', name: 'Los Guayos', city: 'Valencia', region: 'Carabobo',
    barrios: ['Los Guayos Centro', 'La Florida', 'El Carmen', 'Tacarigua'],
    housing: 'Los Guayos es un municipio con casas tradicionales de 100 a 300 m² y urbanizaciones de los 80-2010. Mezcla viviendas familiares con propiedades de inversión para alquiler.',
    challenge: 'Las casas de Los Guayos suelen tener instalaciones eléctricas antiguas y problemas de humedad en paredes perimetrales. La impermeabilización y el recableado son frecuentes.',
    landmark: 'la avenida Intercomunal y el casco central de Los Guayos',
    norm: 'Las asociaciones de vecinos de Los Guayos regulan horarios y estética. Coordinamos los permisos de obra.',
    style: 'Los Guayos pide reformas funcionales y económicas: actualización de baños y cocinas, pisos duraderos y buena iluminación.'
  },
  {
    slug: 'guacara', name: 'Guacara', city: 'Valencia', region: 'Carabobo',
    barrios: ['Guacara Centro', 'La Emboscada', 'Yagua', 'El Samán'],
    housing: 'Guacara es un municipio industrial-residencial con casas de 120 a 350 m² y urbanizaciones de los 80-2010. Muchas viviendas pertenecen a familias de largo plazo.',
    challenge: 'Las casas de Guacara frecuentemente tienen techos con filtraciones y sistemas eléctricos sobrecargados por ampliaciones no planificadas. Evaluamos la capacidad eléctrica antes de remodelar.',
    landmark: 'la avenida Intercomunal Guacara-Bárbula y el casco central',
    norm: 'Las urbanizaciones de Guacara tienen reglamentos de obra internos. Gestionamos permisos y horarios con la comunidad.',
    style: 'Guacara favorece reformas prácticas: renovación de baños y cocinas, impermeabilización y actualización de instalaciones.'
  },
  {
    slug: 'tocuyito', name: 'Tocuyito', city: 'Valencia', region: 'Carabobo',
    barrios: ['Tocuyito Centro', 'La Libertad', 'El Naipe', 'Campo Carabobo'],
    housing: 'Tocuyito es un municipio con casas de 100 a 300 m², muchas autoconstruidas y ampliadas por etapas. Las viviendas van de los 80 a la actualidad.',
    challenge: 'Las casas de Tocuyito suelen tener ampliaciones no planificadas con instalaciones improvisadas. La regularización eléctrica e hidrosanitaria es el primer paso en toda reforma.',
    landmark: 'el casco central de Tocuyito y la vía a Campo Carabobo',
    norm: 'Tocuyito tiene menos regulación formal, pero coordinamos con las asociaciones de vecinos cuando existen.',
    style: 'Tocuyito pide reformas funcionales y de buen rendimiento: baños y cocinas modernas, pisos resistentes y soluciones de almacenamiento.'
  },
  {
    slug: 'puerto-cabello', name: 'Puerto Cabello', city: 'Puerto Cabello', region: 'Carabobo',
    barrios: ['Casco Histórico', 'El Malecón', 'La Sorpresa', 'San Esteban'],
    housing: 'Puerto Cabello conserva un casco histórico colonial con casas de los siglos XVIII-XIX, además de viviendas costeras y apartamentos de los 70-2000. El metraje va de 80 a 400 m².',
    challenge: 'La cercanía al mar en Puerto Cabello acelera la corrosión de herrajes, instalaciones eléctricas y grifería. Usamos materiales resistentes a la salinidad y tratamos la humedad por capilaridad.',
    landmark: 'el Fortín Solano y el malecón de Puerto Cabello',
    norm: 'El casco histórico de Puerto Cabello es patrimonio: las reformas requieren aprobación del instituto de patrimonio cultural. Asesoramos sobre intervenciones permitidas.',
    style: 'En Puerto Cabello trabajamos restauración colonial y vivienda costera: materiales resistentes a la sal, ventilación cruzada y acabados frescos.'
  },
  {
    slug: 'valles-de-camoruco', name: 'Valles de Camoruco', city: 'Valencia', region: 'Carabobo',
    barrios: ['Camoruco', 'El Viñedo', 'Prebo', 'La Alegría'],
    housing: 'Valles de Camoruco es una zona residencial con casas de 180 a 450 m² y algunos edificios, construidos entre los 70 y los 2000. Urbanización consolidada y bien ubicada.',
    challenge: 'Las casas de Camoruco tienen estructuras sólidas pero instalaciones envejecidas. La renovación integral implica actualizar electricidad, agua y acabados en una sola obra.',
    landmark: 'la avenida Universidad y el eje comercial de Camoruco',
    norm: 'Las asociaciones de Camoruco regulan fachadas y horarios. Coordinamos permisos con la comunidad.',
    style: 'Camoruco favorece reformas integrales: redistribución, baños y cocinas modernas, pisos de porcelanato y carpintería a medida.'
  },
  {
    slug: 'el-parral', name: 'El Parral', city: 'Valencia', region: 'Carabobo',
    barrios: ['El Parral', 'Camoruco', 'El Viñedo', 'Prebo'],
    housing: 'El Parral es un sector con gran auge inmobiliario en Valencia, con viviendas nuevas de 100 a 300 m² y propiedades de 15-20 años que necesitan actualización. Alta rentabilidad para revalorización.',
    challenge: 'Las viviendas nuevas de El Parral requieren personalización de acabados de constructora, mientras que las de 15-20 años necesitan renovación de instalaciones y actualización estética.',
    landmark: 'la avenida Bolívar Norte y los nuevos desarrollos de El Parral',
    norm: 'Los edificios nuevos de El Parral tienen reglamentos de condominio estrictos. Gestionamos aprobaciones de obra.',
    style: 'El Parral pide diseños orientados a revalorizar: cocinas modernas, baños tipo spa, pisos premium y acabados que maximizan el retorno de inversión.'
  }
];

/* ============================================================
   DATOS POR SERVICIO (3)
   ============================================================ */
const SERVICES = {
  bano: {
    file: 'remodelacion-bano',
    titleRoom: 'Remodelación de Baños',
    h1a: 'Remodelación de Baños en',
    category: 'Servicio Local',
    image: '/images/bano.webp',
    serviceType: 'Bathroom Remodeling',
    breadcrumbService: { name: 'Remodelación de Baños', url: '/servicios/remodelacion-bano' },
    waText: 'mi baño',
    priceFrom: '$1,200',
    priceLabel: 'baños',
    excerpt: (z) => `Expertos en remodelación de baños en ${z.name}. Transformamos baños antiguos en espacios modernos, seguros y eficientes: impermeabilización garantizada, duchas de obra, grifería premium y acabados de lujo para viviendas en ${z.name} y ${z.barrios.slice(0, 3).join(', ')}.`,
    intro: (z) => `Expertos en <strong>remodelación de baños en ${z.name}</strong>. Transformamos baños antiguos en espacios modernos, seguros y eficientes: impermeabilización garantizada, duchas de obra, grifería premium y acabados de lujo para viviendas en ${z.name} y ${z.barrios.slice(0, 3).join(', ')}.`,
    localTitle: (z) => `Baños pensados para las viviendas de ${z.name}`,
    localBody: (z) => `${z.housing} ${z.challenge}`,
    sections: (z) => `
<h2>Qué incluye nuestra remodelación de baños en ${z.name}</h2>
<ul>
<li><strong>Demolición y retiro:</strong> picado de revestimientos, retiro de sanitarios y escombro autorizado</li>
<li><strong>Impermeabilización:</strong> sistema cementoso + membrana en zona de ducha con prueba de estanqueidad de 48 horas</li>
<li><strong>Instalaciones hidrosanitarias:</strong> renovación de tuberías de agua fría/caliente y desagües cuando la antigüedad lo exige</li>
<li><strong>Revestimientos:</strong> porcelanato, cerámica o microcemento en pisos y paredes</li>
<li><strong>Louzas y grifería:</strong> instalación de inodoro, lavamanos, ducha o tina y grifería empotrada o de pared</li>
<li><strong>Electricidad e iluminación:</strong> puntos de luz, tomacorrientes GFCI y ventilación forzada</li>
<li><strong>Carpintería y accesorios:</strong> mueble de lavamanos, mampara de vidrio y accesorios</li>
</ul>

<h2>Precio de remodelar un baño en ${z.name}</h2>
<p>Los precios de baños en ${z.name} parten desde <strong>${'$1,200'}</strong> para un baño estándar de 4-6 m² con calidades medias. El presupuesto final depende del metraje, los materiales y la complejidad de las instalaciones. Siempre entregamos presupuesto cerrado por partidas, sin sorpresas.</p>
<table>
<thead><tr><th>Tipo de baño</th><th>Precio orientativo</th></tr></thead>
<tbody>
<tr><td>Baño estándar (4-6 m²)</td><td>$1,200 – $2,800</td></tr>
<tr><td>Baño completo con ducha de obra</td><td>$2,800 – $5,500</td></tr>
<tr><td>Baño premium / tipo spa</td><td>$5,500 – $12,000+</td></tr>
</tbody>
</table>

<h2>Cómo trabajamos en ${z.name}</h2>
<h3>1. Visita técnica y diagnóstico</h3>
<p>Un técnico visita tu vivienda en ${z.name}, mide, revisa instalaciones ocultas y detecta problemas de humedad o estructura. Sin compromiso.</p>
<h3>2. Diseño y presupuesto cerrado</h3>
<p>Entregamos propuesta con selección de materiales, renders y presupuesto detallado por partidas en un plazo de 5 días hábiles.</p>
<h3>3. Obra y supervisión</h3>
<p>Ejecutamos la obra con equipo propio, supervisión diaria y cronograma acordado. ${z.norm}</p>
<h3>4. Entrega y garantía</h3>
<p>Entregamos con limpieza final, prueba de funcionamiento y garantía por escrito: 5 años en impermeabilización y 2 años en instalación.</p>

<h2>Por qué RemodelaT en ${z.name}</h2>
<p>${z.style} Conocemos las tipologías de vivienda de ${z.name} —cerca de ${z.landmark}— y los retos específicos de la zona. ${z.challenge}</p>`,
    faq: (z) => [
      { question: `¿Cuánto cuesta remodelar un baño en ${z.name}?`, answer: `Un baño estándar en ${z.name} parte desde $1,200 (4-6 m² con calidades medias). Los baños con ducha de obra oscilan entre $2,800 y $5,500, y los premium tipo spa superan los $5,500. Elaboramos presupuesto detallado sin compromiso.` },
      { question: `¿Cuánto tarda la remodelación de un baño en ${z.name}?`, answer: `Un baño estándar toma entre 10 y 15 días hábiles. Los proyectos con ducha de obra o redistribución pueden extenderse a 3-4 semanas. Entregamos cronograma cerrado antes de iniciar.` },
      { question: '¿Ofrecen garantía contra filtraciones?', answer: 'Sí, 5 años de garantía en impermeabilización y 2 años en instalación general. Realizamos prueba de estanqueidad de 48 horas antes de cerrar paredes, documentada con fotos y video.' },
      { question: `¿Conocen las viviendas de ${z.name}?`, answer: `Sí. ${z.housing} ${z.norm}` }
    ]
  },
  cocina: {
    file: 'remodelacion-cocina',
    titleRoom: 'Remodelación de Cocinas',
    h1a: 'Remodelación de Cocinas en',
    category: 'Servicio Local',
    image: '/images/cocina.webp',
    serviceType: 'Kitchen Remodeling',
    breadcrumbService: { name: 'Remodelación de Cocinas', url: '/servicios/remodelacion-cocina' },
    waText: 'mi cocina',
    priceFrom: '$2,500',
    priceLabel: 'cocinas',
    excerpt: (z) => `¿Buscas una remodelación de cocina en ${z.name}? En RemodelaT Venezuela diseñamos y ejecutamos cocinas modernas, funcionales y a medida para los hogares de ${z.name} y ${z.barrios.slice(0, 3).join(', ')}. Con más de 15 años de experiencia, conocemos las tipologías de viviendas de la zona.`,
    intro: (z) => `¿Buscas una <strong>remodelación de cocina en ${z.name}</strong>? En RemodelaT Venezuela diseñamos y ejecutamos cocinas modernas, funcionales y a medida para los hogares de ${z.name} y ${z.barrios.slice(0, 3).join(', ')}. Con más de 15 años de experiencia, conocemos las tipologías de viviendas de la zona.`,
    localTitle: (z) => `Cocinas a la medida de ${z.name}`,
    localBody: (z) => `${z.housing} ${z.challenge}`,
    sections: (z) => `
<h2>Qué incluye nuestra remodelación de cocinas en ${z.name}</h2>
<ul>
<li><strong>Diseño y distribución:</strong> plano de cocina, triángulo de trabajo y optimización del espacio</li>
<li><strong>Demolición y retiro:</strong> desmontaje de muebles, encimera y revestimientos existentes</li>
<li><strong>Instalaciones:</strong> renovación de puntos de agua, gas y eléctricos según normativa</li>
<li><strong>Mobiliario a medida:</strong> gabinetes altos y bajos en melamina, MDF lacado o madera</li>
<li><strong>Encimera:</strong> cuarzo, granito, porcelanato o superficie sólida</li>
<li><strong>Salpicadero y revestimientos:</strong> porcelanato, vidrio o cerámica en zona de cocción</li>
<li><strong>Electrodomésticos e iluminación:</strong> instalación de campana, horno, tope y luz bajo mueble</li>
</ul>

<h2>Precio de remodelar una cocina en ${z.name}</h2>
<p>Los precios de cocinas en ${z.name} parten desde <strong>${'$2,500'}</strong>. El presupuesto final depende del tamaño, los materiales elegidos y la complejidad de las instalaciones. Siempre entregamos presupuesto cerrado por partidas, sin sorpresas.</p>
<table>
<thead><tr><th>Tipo de cocina</th><th>Precio orientativo</th></tr></thead>
<tbody>
<tr><td>Cocina lineal estándar</td><td>$2,500 – $5,000</td></tr>
<tr><td>Cocina en L / U con isla</td><td>$5,000 – $9,000</td></tr>
<tr><td>Cocina premium a medida</td><td>$9,000 – $20,000+</td></tr>
</tbody>
</table>

<h2>Cómo trabajamos en ${z.name}</h2>
<h3>1. Visita técnica y medición</h3>
<p>Visitamos tu vivienda en ${z.name}, tomamos medidas exactas y evaluamos instalaciones de agua, gas y electricidad. Sin compromiso.</p>
<h3>2. Diseño 3D y presupuesto</h3>
<p>Entregamos propuesta de diseño con renders 3D, memoria de materiales y presupuesto cerrado por partidas en un plazo de 5 días hábiles.</p>
<h3>3. Fabricación y obra</h3>
<p>Fabricamos el mobiliario a medida y ejecutamos la obra con equipo propio. ${z.norm}</p>
<h3>4. Instalación y entrega</h3>
<p>Instalamos encimera, electrodomésticos y acabados finales. Entregamos con limpieza y garantía por escrito de 2 años.</p>

<h2>Por qué RemodelaT en ${z.name}</h2>
<p>${z.style} Conocemos las tipologías de vivienda de ${z.name} —cerca de ${z.landmark}— y diseñamos cocinas que aprovechan cada espacio. ${z.challenge}</p>`,
    faq: (z) => [
      { question: `¿Cuánto cuesta remodelar una cocina en ${z.name}?`, answer: `Una remodelación de cocina estándar en ${z.name} parte desde $2,500 (gabinetes, encimera, salpicadero e instalaciones). Las cocinas premium con isla central y electrodomésticos integrados oscilan entre $5,000 y $12,000. Elaboramos presupuesto detallado sin compromiso.` },
      { question: `¿Cuánto tarda la remodelación de una cocina en ${z.name}?`, answer: `Una cocina estándar toma entre 3 y 5 semanas, incluyendo fabricación de mobiliario a medida. Las cocinas premium pueden extenderse a 6-8 semanas. Entregamos cronograma cerrado antes de iniciar.` },
      { question: '¿Fabrican los muebles a medida?', answer: 'Sí. Fabricamos gabinetes a medida en melamina, MDF lacado o madera según el diseño y presupuesto. Esto permite aprovechar espacios irregulares típicos de las viviendas antiguas.' },
      { question: `¿Conocen las viviendas de ${z.name}?`, answer: `Sí. ${z.housing} ${z.norm}` }
    ]
  },
  integral: {
    file: 'remodelacion-integral',
    titleRoom: 'Remodelación Integral',
    h1a: 'Remodelación Integral en',
    category: 'Servicio Local',
    image: '/images/integrales-proyecto-completo.webp',
    serviceType: 'Whole Home Remodeling',
    breadcrumbService: { name: 'Remodelación Integral', url: '/servicios/remodelacion-integral' },
    waText: 'mi vivienda',
    priceFrom: '$15,000',
    priceLabel: 'integrales',
    excerpt: (z) => `Remodelación integral de viviendas en ${z.name}: apartamentos, casas y oficinas llave en mano. Diseño, permisos, obra y acabados con un único interlocutor. Más de 200 proyectos entregados en ${z.name}, ${z.barrios.slice(0, 2).join(', ')} y toda el área metropolitana.`,
    intro: (z) => `<strong>Remodelación integral de viviendas en ${z.name}</strong>: apartamentos, casas y oficinas llave en mano. Diseño, permisos, obra y acabados con un único interlocutor. Más de 200 proyectos entregados en ${z.name}, ${z.barrios.slice(0, 2).join(', ')} y toda el área metropolitana.`,
    localTitle: (z) => `Proyectos integrales en ${z.name}`,
    localBody: (z) => `${z.housing} ${z.challenge}`,
    sections: (z) => `
<h2>Qué incluye una remodelación integral en ${z.name}</h2>
<p>Una remodelación integral transforma por completo tu vivienda: nueva distribución, instalaciones renovadas, acabados premium y diseño de autor. En RemodelaT gestionamos todo el proceso con un único equipo, un único presupuesto y un único responsable de proyecto.</p>
<ul>
<li><strong>Diseño y proyecto:</strong> levantamiento de planos, diseño 3D fotorrealista, memoria de calidades y presupuesto cerrado</li>
<li><strong>Gestión de permisos:</strong> trámites ante condominio, alcaldía y entes competentes según la zona</li>
<li><strong>Obra civil:</strong> demoliciones, redistribución de espacios, tabiquería y refuerzos estructurales</li>
<li><strong>Instalaciones:</strong> renovación completa de electricidad, agua, gas, climatización y datos</li>
<li><strong>Acabados:</strong> pisos, revestimientos, pintura, carpintería, iluminación y domótica</li>
<li><strong>Cocinas y baños:</strong> remodelación completa de todas las áreas húmedas</li>
<li><strong>Entrega llave en mano:</strong> limpieza final, decoración básica y garantía por escrito</li>
</ul>

<h2>Precio de una remodelación integral en ${z.name}</h2>
<p>Los precios de integrales en ${z.name} parten desde <strong>${'$15,000'}</strong>. El presupuesto final depende del tamaño, los materiales elegidos y la complejidad de las instalaciones. Siempre entregamos presupuesto cerrado por partidas, sin sorpresas.</p>
<table>
<thead><tr><th>Alcance</th><th>Precio orientativo</th></tr></thead>
<tbody>
<tr><td>Actualización estética (pisos, pintura, baños)</td><td>$15,000 – $30,000</td></tr>
<tr><td>Remodelación con redistribución parcial</td><td>$30,000 – $60,000</td></tr>
<tr><td>Reforma integral premium llave en mano</td><td>$60,000 – $150,000+</td></tr>
</tbody>
</table>

<h2>Cómo trabajamos en ${z.name}</h2>
<h3>1. Diagnóstico y anteproyecto</h3>
<p>Visitamos tu vivienda en ${z.name}, evaluamos estructura e instalaciones y definimos contigo el alcance y el presupuesto objetivo.</p>
<h3>2. Proyecto ejecutivo</h3>
<p>Desarrollamos planos, renders 3D, memoria de calidades y presupuesto cerrado por partidas. ${z.norm}</p>
<h3>3. Ejecución de obra</h3>
<p>Ejecutamos con equipo propio y supervisión diaria. Reportes semanales de avance con fotos y cronograma actualizado.</p>
<h3>4. Entrega llave en mano</h3>
<p>Entregamos la vivienda lista para habitar, con limpieza final, pruebas de instalaciones y garantía por escrito de hasta 5 años.</p>

<h2>Por qué RemodelaT en ${z.name}</h2>
<p>${z.style} Conocemos las tipologías de vivienda de ${z.name} —cerca de ${z.landmark}— y los retos específicos de cada urbanización. ${z.challenge}</p>`,
    faq: (z) => [
      { question: `¿Cuánto cuesta una remodelación integral en ${z.name}?`, answer: `Una remodelación integral en ${z.name} parte desde $15,000 para apartamentos de 80 m² con calidades estándar. Proyectos premium con redistribución completa y acabados de lujo: $25,000-$50,000+. Presupuesto cerrado por partidas sin sorpresas.` },
      { question: `¿Cuánto tarda una remodelación integral en ${z.name}?`, answer: `Un apartamento de 80-120 m² toma entre 2 y 4 meses. Casas grandes con redistribución estructural pueden requerir 4-6 meses. Entregamos cronograma detallado antes de iniciar.` },
      { question: '¿Se puede vivir en la vivienda durante la obra?', answer: 'Depende del alcance. En reformas por etapas es posible habitar zonas no intervenidas. En remodelaciones integrales con redistribución recomendamos mudarse temporalmente por seguridad y rapidez.' },
      { question: `¿Conocen las viviendas de ${z.name}?`, answer: `Sí. ${z.housing} ${z.norm}` }
    ]
  }
};

/* ============================================================
   CSS compartido (idéntico en todas las páginas — no es contenido doorway)
   ============================================================ */
const CSS = `
<style>
.article-hero { position: relative; min-height: 80vh; display: flex; align-items: flex-end; justify-content: flex-start; overflow: hidden; padding: 140px 24px 80px; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; transform: scale(1.05); }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.5) 50%, rgba(15,15,15,0.3) 100%); }
.hero-content { position: relative; z-index: 2; max-width: 950px; margin: 0 auto; width: 100%; }
.back-link { display: inline-block; color: var(--gold); text-decoration: none; font-size: 0.9rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 25px; transition: opacity 0.3s; }
.back-link:hover { opacity: 0.7; }
.article-category { display: inline-block; background: rgba(201,169,97,0.2); border: 1px solid var(--gold); color: var(--gold); padding: 8px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; backdrop-filter: blur(10px); }
.article-title { font-family: var(--font-serif); font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 400; line-height: 1.08; margin-bottom: 25px; color: var(--white); }
.article-title .line { display: block; }
.article-title .gold { color: var(--gold); }
.article-excerpt { font-size: 1.3rem; color: rgba(255,255,255,0.85); max-width: 700px; line-height: 1.7; font-weight: 400; }
.article-section { padding: 90px 24px; }
.container { max-width: 950px; margin: 0 auto; }
.article-body { font-size: 1.2rem; line-height: 1.85; color: var(--text); }
.article-body h2 { font-family: var(--font-serif); font-size: 2.4rem; margin: 3rem 0 1.2rem; color: var(--text); line-height: 1.2; font-weight: 500; }
.article-body h3 { font-size: 1.8rem; margin: 2.5rem 0 1rem; color: var(--text); font-weight: 500; }
.article-body p { margin-bottom: 1.5rem; font-weight: 400; }
.article-body a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold); }
.article-body ul { margin: 1.5rem 0 1.5rem 2rem; }
.article-body li { margin-bottom: 0.75rem; font-weight: 400; }
.article-body img { border-radius: 12px; margin: 2.5rem 0; box-shadow: 0 15px 40px rgba(0,0,0,0.08); width: 100%; }
.article-body table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 1.05rem; }
.article-body th { background: var(--bg); color: var(--white); padding: 14px 18px; text-align: left; font-weight: 600; }
.article-body td { padding: 14px 18px; border-bottom: 1px solid #e5e0d5; }
.article-body tr:nth-child(even) td { background: #faf8f3; }
.local-box { background: #f8f6f1; border-left: 4px solid var(--gold); padding: 24px 28px; border-radius: 0 12px 12px 0; margin: 2rem 0; }
.local-box h3 { margin: 0 0 12px; font-size: 1.4rem; }
.local-box p { margin: 0; font-size: 1.1rem; }
.cta-section { background: var(--bg); color: var(--white); text-align: center; padding: 110px 24px; width: 100%; }
.cta-wrapper { max-width: 950px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.cta-title { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 400; margin-bottom: 24px; line-height: 1.15; color: var(--white); text-align: center; width: 100%; }
.cta-text { color: rgba(255,255,255,0.85); max-width: 800px; margin: 0 auto 45px; font-size: 1.25rem; line-height: 1.7; font-weight: 400; text-align: center; width: 100%; }
.cta-section .btn-premium { padding: 20px 55px; font-size: 0.9rem; }
@media (max-width: 768px) { .article-hero { min-height: 70vh; padding-top: 120px; padding-bottom: 60px; } .article-title { font-size: clamp(2rem, 8vw, 3.5rem); } .article-excerpt { font-size: 1.15rem; } .article-body { font-size: 1.15rem; } .article-body h2 { font-size: 2rem; } .article-body h3 { font-size: 1.5rem; } .cta-section { padding: 90px 20px; } }
</style>`;

const WA_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

/* ============================================================
   GENERADOR DE PÁGINA
   ============================================================ */
function faqItems(faq) {
  return faq.map(f => `  { question: ${JSON.stringify(f.question)}, answer: ${JSON.stringify(f.answer)} }`).join(',\n');
}

function buildPage(zone, svc) {
  const s = SERVICES[svc];
  const title = `${s.titleRoom} en ${zone.name} | Precios 2026 | RemodelaT`;
  const description = `Especialistas en ${s.titleRoom.toLowerCase()} en ${zone.name}, ${zone.city}. Trabajamos en ${zone.barrios.slice(0, 3).join(', ')} y todo ${zone.region === 'Caracas' ? 'el municipio' : 'Carabobo'}. Presupuestos gratis. +15 años de experiencia. Garantía por escrito.`;
  const waMsg = encodeURIComponent(`Hola, quiero remodelar ${s.waText} en ${zone.name}`);
  const pageUrl = `/${s.file}-${zone.slug}`;

  return `---
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQ from '../components/FAQ.astro';
import ServiceSchema from '../components/ServiceSchema.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
---

<BaseLayout
  title="${title}"
  description="${description}"
  image="${s.image}"
  activePage="servicios"
>

<header class="article-hero">
  <div class="hero-bg" style="background-image: url('${s.image}')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <a href="/servicios" class="back-link">← Volver a Servicios</a>
    <span class="article-category">${zone.region} · ${s.category}</span>
    <h1 class="article-title"><span class="line">${s.h1a}</span> <span class="line gold">${zone.name}</span></h1>
    <p class="article-excerpt">${s.excerpt(zone)}</p>
  </div>
</header>

<Breadcrumb items={[
  { name: 'Inicio', url: '/' },
  { name: 'Servicios', url: '/servicios' },
  { name: '${s.breadcrumbService.name}', url: '${s.breadcrumbService.url}' },
  { name: '${zone.name}', url: '${pageUrl}' }
]} />

<section class="article-section">
  <div class="container">
    <div class="article-body">
      <p>${s.intro(zone)}</p>

      <div class="local-box">
        <h3>${s.localTitle(zone)}</h3>
        <p>${s.localBody(zone)}</p>
      </div>

${s.sections(zone)}

      <h2>Servicio en todo ${zone.region}</h2>
      <p>Además de ${zone.name}, trabajamos en ${zone.barrios.slice(0, 3).join(', ')} y todo ${zone.region === 'Caracas' ? 'Caracas' : 'el estado Carabobo'}. Consulta nuestra página de <a href="/${zone.region === 'Caracas' ? 'caracas' : 'valencia'}">remodelaciones en ${zone.region === 'Caracas' ? 'Caracas' : 'Valencia'}</a> para ver todos los servicios disponibles en tu zona.</p>
    </div>
  </div>
</section>

<FAQ items={[
${faqItems(s.faq(zone))}
]} />

<ServiceSchema
  name="${s.titleRoom} en ${zone.name}"
  description="${description}"
  serviceType="${s.serviceType}"
  areaServed={[${zone.barrios.slice(0, 4).map(b => `'${b}'`).join(', ')}, '${zone.city}']}
  image="${s.image}"
/>

<!-- CTA -->
<section class="cta-section">
  <div class="cta-wrapper">
    <h2 class="cta-title">¿Listo para remodelar en <span class="gold">${zone.name}</span>?</h2>
    <p class="cta-text">Visita técnica gratuita, presupuesto sin compromiso y garantía por escrito. Respondemos en menos de 2 horas.</p>
    <a href="https://wa.me/${WA}?text=${waMsg}" class="btn-premium" target="_blank" rel="noopener">
      ${WA_ICON}
      Presupuesto Gratis en ${zone.name}
    </a>
  </div>
</section>

</BaseLayout>
${CSS}
`;
}

/* ============================================================
   EJECUCIÓN
   ============================================================ */
let written = 0;
const done = [];
for (const zone of ZONES) {
  if (only && !only.includes(zone.slug)) continue;
  for (const svc of Object.keys(SERVICES)) {
    if (svcFilter && svc !== svcFilter) continue;
    const s = SERVICES[svc];
    const file = path.join(PAGES, `${s.file}-${zone.slug}.astro`);
    fs.writeFileSync(file, buildPage(zone, svc), 'utf8');
    written++;
    done.push(`${s.file}-${zone.slug}`);
  }
}

console.log(`✅ ${written} páginas escritas`);
console.log(done.join('\n'));
