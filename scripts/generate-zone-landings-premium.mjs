import { writeFileSync, existsSync } from 'fs';

const OUT = 'src/pages/';

// ═══════════════════════════════════════════
// SERVICES (same template as previous scripts)
// ═══════════════════════════════════════════
const services = [
  {
    slug: 'remodelacion-cocina',
    name: 'Remodelación de Cocinas',
    shortName: 'cocinas',
    serviceType: 'Kitchen Remodeling',
    heroImage: '/images/cocina.webp',
    bodyImage: '/images/cocina-isla-central.webp',
    priceFrom: '$2,500',
    intro: (zone, neighborhoods) => `¿Buscas una <strong>remodelación de cocina en ${zone}</strong>? En RemodelaT Venezuela diseñamos y ejecutamos cocinas modernas, funcionales y a medida para los hogares de ${zone} y ${neighborhoods}. Con más de 15 años de experiencia, conocemos las tipologías de viviendas de la zona y las soluciones que mejor aprovechan cada espacio.`,
    sections: (zone) => `
<h2>Diseño de Cocinas a Medida para ${zone}</h2>
<p>Cada cocina es única. Nuestro equipo de diseño realiza un levantamiento detallado del espacio, analiza la distribución existente y propone soluciones que maximizan el almacenamiento, la circulación y la ergonomía. Trabajamos con renders 3D fotorrealistas para que veas tu cocina terminada antes de iniciar la obra.</p>
<p>En ${zone}, muchas viviendas tienen cocinas cerradas de origen. Somos especialistas en abrir cocinas al salón con barras americanas, islas centrales y penínsulas que integran los espacios sin comprometer la funcionalidad.</p>

<h2>Materiales y Acabados Premium</h2>
<ul>
<li><strong>Gabinetes:</strong> MDF hidrófugo lacado en poliuretano, madera natural (roble, nogal) y laminados de alta presión (HPL) con herrajes Blum de cierre suave</li>
<li><strong>Encimeras:</strong> Granito natural, cuarzo Silestone/Compac y porcelanato sinterizado Dekton. Resistencia al calor, rayado y manchas</li>
<li><strong>Salpicaderos:</strong> Porcelanato, vidrio templado y acero inoxidable. Instalación sin juntas visibles</li>
<li><strong>Electrodomésticos:</strong> Preinstalación para hornos empotrados, placas de inducción, campanas extractoras y lavavajillas</li>
</ul>

<h2>Instalaciones Incluidas</h2>
<p>La remodelación de cocina incluye renovación completa de instalaciones: puntos de agua fría/caliente, desagües, circuito eléctrico dedicado con tomas de 220V para electrodomésticos, iluminación LED bajo mueble y puntos de luz generales. Todo según norma COVENIN.</p>

<h2>Nuestro Proceso en ${zone}</h2>
<h3>1. Visita y Medición</h3>
<p>Nos desplazamos a tu vivienda en ${zone} para tomar medidas, evaluar instalaciones existentes y escuchar tus necesidades. Sin compromiso.</p>
<h3>2. Diseño 3D y Presupuesto</h3>
<p>Entregamos propuesta de diseño con renders 3D, memoria de materiales y presupuesto cerrado por partidas en un plazo de 5 días hábiles.</p>
<h3>3. Ejecución de Obra</h3>
<p>Demolición, albañilería, instalaciones, alicatados y montaje de mobiliario. Plazo típico: 3-5 semanas según complejidad.</p>
<h3>4. Entrega y Garantía</h3>
<p>Limpieza post-obra, verificación de funcionamiento de todos los elementos y garantía de 2 años en instalación.</p>`,
    faqs: (zone) => [
      { q: `¿Cuánto cuesta remodelar una cocina en ${zone}?`, a: `Una remodelación de cocina estándar en ${zone} parte desde $2,500 (gabinetes, encimera, salpicadero e instalaciones). Las cocinas premium con isla central y electrodomésticos integrados oscilan entre $5,000 y $12,000. Elaboramos presupuesto detallado sin compromiso.` },
      { q: `¿Cuánto tiempo toma la remodelación de una cocina?`, a: `Entre 3 y 5 semanas: 1 semana de demolición e instalaciones, 1-2 semanas de alicatados y acabados, y 1-2 semanas de montaje de gabinetes y encimera. Los plazos dependen del tamaño y la complejidad del diseño.` },
      { q: `¿Puedo usar la cocina durante la obra?`, a: `No durante la fase de demolición e instalaciones (5-7 días). Después, habilitamos una zona provisional si es necesario. Planificamos la obra para minimizar las molestias en tu día a día.` },
      { q: `¿Trabajan en edificios con normativas de condominio?`, a: `Sí, tenemos amplia experiencia en edificios de ${zone}. Gestionamos los permisos con la junta de condominio, respetamos horarios de obra y protegemos áreas comunes durante todo el proyecto.` },
    ]
  },
  {
    slug: 'remodelacion-bano',
    name: 'Remodelación de Baños',
    shortName: 'baños',
    serviceType: 'Bathroom Remodeling',
    heroImage: '/images/bano.webp',
    bodyImage: '/images/bano.webp',
    priceFrom: '$1,800',
    intro: (zone, neighborhoods) => `Expertos en <strong>remodelación de baños en ${zone}</strong>. Transformamos baños antiguos en espacios modernos, seguros y eficientes. Impermeabilización garantizada, duchas de obra, grifería premium y acabados de lujo para viviendas en ${zone} y ${neighborhoods}.`,
    sections: (zone) => `
<h2>Remodelación Integral de Baños en ${zone}</h2>
<p>Un baño bien diseñado mejora tu calidad de vida y revaloriza tu vivienda. En RemodelaT ejecutamos remodelaciones completas que incluyen demolición, nuevas instalaciones hidrosanitarias, impermeabilización certificada, alicatados, sanitarios, grifería y accesorios.</p>
<p>En ${zone}, muchas viviendas tienen baños con más de 20 años de antigüedad. Las tuberías de hierro galvanizado se corroen, la impermeabilización falla y la distribución no aprovecha el espacio. Nosotros solucionamos todo eso en una sola obra.</p>

<h2>Impermeabilización Garantizada</h2>
<p>El paso más crítico de cualquier remodelación de baño. Aplicamos sistemas de impermeabilización flexible tipo Sika Top Seal o Weber Dry en zonas de ducha, bañera y suelo completo. Realizamos prueba de estanqueidad de 48 horas antes de alicatar. Garantía de 5 años contra filtraciones.</p>

<h2>Duchas de Obra y Platos de Ducha</h2>
<ul>
<li><strong>Duchas de obra:</strong> Plato enrasado al suelo con pendiente integrada, sumidero lineal y mampara de vidrio templado. Accesible y elegante</li>
<li><strong>Platos de resina:</strong> Extrarplanos (3 cm), antideslizantes clase C, en colores a elegir. Instalación en 1 día</li>
<li><strong>Columnas de ducha:</strong> Termostáticas con rociador efecto lluvia, teleducha y jets de hidromasaje</li>
</ul>

<h2>Sanitarios y Grifería</h2>
<p>Instalamos sanitarios suspendidos con cisterna empotrada (Geberit, Grohe), inodoros one-piece de bajo consumo (3/6 litros), lavabos sobre encimera de porcelana o piedra natural, y grifería monomando o termostática de primeras marcas con acabado cromado, negro mate o dorado cepillado.</p>

<h2>Proceso de Remodelación en ${zone}</h2>
<h3>1. Diagnóstico y Diseño</h3>
<p>Visita técnica en tu vivienda de ${zone}, medición, evaluación de instalaciones y propuesta de distribución con renders 3D.</p>
<h3>2. Demolición e Instalaciones</h3>
<p>Retiro de sanitarios, alicatados y pavimento. Sustitución completa de tuberías de agua y desagües. Nueva instalación eléctrica con puntos de luz y tomas.</p>
<h3>3. Impermeabilización y Alicatados</h3>
<p>Aplicación de impermeabilizante, prueba de estanqueidad, colocación de porcelanato en suelos y paredes con sistemas de nivelación.</p>
<h3>4. Montaje y Acabados</h3>
<p>Instalación de sanitarios, grifería, mampara, mueble de lavabo, espejo, iluminación y accesorios. Sellado con silicona antihongos.</p>`,
    faqs: (zone) => [
      { q: `¿Cuánto cuesta remodelar un baño en ${zone}?`, a: `Una remodelación completa de baño en ${zone} parte desde $1,800 (baño estándar de 4-6 m² con sanitarios, alicatados e instalaciones). Baños premium con ducha de obra y sanitarios suspendidos: $3,500-$6,000. Presupuesto detallado sin compromiso.` },
      { q: `¿Cuánto dura la remodelación de un baño?`, a: `Entre 2 y 4 semanas: 3-4 días de demolición, 3-4 días de instalaciones, 2-3 días de impermeabilización (incluyendo prueba de 48h), 4-5 días de alicatados y 3-4 días de montaje de sanitarios y acabados.` },
      { q: `¿Ofrecen garantía contra filtraciones?`, a: `Sí, 5 años de garantía en impermeabilización y 2 años en instalación general. Realizamos prueba de estanqueidad de 48 horas antes de cerrar paredes, documentada con fotos y video.` },
      { q: `¿Pueden remodelar el baño sin afectar el resto de la vivienda?`, a: `Sí. Sellamos la zona de obra con mamparas de polvo, protegemos pasillos y suelos de tránsito, y trabajamos con extracción de polvo. La obra queda confinada al baño.` },
    ]
  },
  {
    slug: 'remodelacion-integral',
    name: 'Remodelación Integral',
    shortName: 'integrales',
    serviceType: 'Whole Home Remodeling',
    heroImage: '/images/integrales-antes-despues.webp',
    bodyImage: '/images/integrales-antes-despues.webp',
    priceFrom: '$15,000',
    intro: (zone, neighborhoods) => `<strong>Remodelación integral de viviendas en ${zone}</strong>: apartamentos, casas y oficinas llave en mano. Diseño, permisos, obra y acabados con un único interlocutor. Más de 200 proyectos entregados en ${zone}, ${neighborhoods} y toda el área metropolitana.`,
    sections: (zone) => `
<h2>Remodelación Integral Llave en Mano en ${zone}</h2>
<p>Una remodelación integral transforma por completo tu vivienda: nueva distribución, instalaciones renovadas, acabados premium y diseño de autor. En RemodelaT gestionamos todo el proceso con un único equipo, un único presupuesto y un único responsable de proyecto.</p>
<p>En ${zone}, muchos apartamentos y casas tienen más de 20-30 años. Las instalaciones eléctricas e hidrosanitarias están obsoletas, la distribución no se adapta a la vida moderna y los acabados muestran el paso del tiempo. Una remodelación integral resuelve todo esto y revaloriza tu propiedad entre un 20% y un 40%.</p>

<h2>¿Qué Incluye Nuestra Remodelación Integral?</h2>
<ul>
<li><strong>Diseño y proyecto:</strong> Levantamiento de planos, diseño 3D fotorrealista, memoria de calidades y presupuesto cerrado</li>
<li><strong>Gestión de permisos:</strong> Licencias de obra ante la alcaldía, permisos de condominio y seguros de responsabilidad civil</li>
<li><strong>Demolición y estructura:</strong> Retiro de acabados, tabiquería e instalaciones. Nueva distribución con tabiquería de pladur o bloque</li>
<li><strong>Instalaciones:</strong> Eléctrica completa (cuadro, circuitos, mecanismos LED), fontanería (PPR y PVC), climatización y ventilación</li>
<li><strong>Acabados:</strong> Suelos (porcelanato, laminado, madera), alicatados, pintura, carpintería interior y armarios empotrados</li>
<li><strong>Cocina y baños:</strong> Remodelación completa con mobiliario a medida, sanitarios premium y grifería de diseño</li>
</ul>

<h2>Cronograma Típico en ${zone}</h2>
<p>Para un apartamento de 80-120 m² en ${zone}, el cronograma estimado es de 3 a 5 meses:</p>
<ul>
<li><strong>Semanas 1-2:</strong> Diseño final, permisos y acopio de materiales</li>
<li><strong>Semanas 3-4:</strong> Demolición, desescombro y nueva tabiquería</li>
<li><strong>Semanas 5-7:</strong> Instalaciones (eléctrica, fontanería, climatización)</li>
<li><strong>Semanas 8-10:</strong> Albañilería, falsos techos y regularización</li>
<li><strong>Semanas 11-14:</strong> Acabados (suelos, alicatados, pintura, carpintería)</li>
<li><strong>Semana 15:</strong> Montaje final, limpieza y entrega</li>
</ul>

<h2>¿Por Qué Elegir RemodelaT en ${zone}?</h2>
<p>Conocemos ${zone} como la palma de nuestra mano: las normativas de sus condominios, los horarios de obra permitidos, las particularidades estructurales de sus edificios y las mejores soluciones para cada tipo de vivienda. Nuestro equipo ha trabajado en más de 50 proyectos en la zona.</p>
<p>Además, al ser una empresa local con base en Valencia y presencia en Caracas, ofrecemos tiempos de respuesta rápidos, visitas de seguimiento semanales y garantía de cercanía durante y después de la obra.</p>`,
    faqs: (zone) => [
      { q: `¿Cuánto cuesta una remodelación integral en ${zone}?`, a: `Una remodelación integral en ${zone} parte desde $15,000 para apartamentos de 80 m² con calidades estándar. Proyectos premium con redistribución completa y acabados de lujo: $25,000-$50,000+. Presupuesto cerrado por partidas sin sorpresas.` },
      { q: `¿Necesito desalojar mi vivienda en ${zone} durante la obra?`, a: `En remodelaciones integrales completas, sí es recomendable. Si necesitas permanecer, planificamos por fases (zona día/zona noche), aunque alarga plazos un 30-40%. Te asesoramos sobre la mejor opción según tu caso.` },
      { q: `¿Gestionan permisos de condominio y alcaldía en ${zone}?`, a: `Sí, nos encargamos de todo: proyecto técnico, licencia de obra ante la alcaldía correspondiente, coordinación con la junta de condominio, horarios de obra y protección de áreas comunes. Tú no te preocupas por trámites.` },
      { q: `¿Ofrecen pago por fases?`, a: `Sí: 30% al inicio, 30% a mitad de obra, 30% en acabados y 10% a la entrega. Para proyectos superiores a $20,000, gestionamos financiación a 12-24 meses con entidades aliadas.` },
    ]
  }
];

// ═══════════════════════════════════════════
// NEW ZONES — Caracas Premium + Carabobo Premium
// ═══════════════════════════════════════════
const zones = [
  // ── CARACAS PREMIUM ──
  {
    slug: 'la-lagunita',
    name: 'La Lagunita',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Lagunita Country Club, La Boyera y El Hatillo',
    description: 'Remodelaciones en La Lagunita, El Hatillo. El máximo sinónimo de lujo y privacidad en Caracas: mansiones, campo de golf y urbanismos exclusivos.',
    localInsight: 'La Lagunita y Lagunita Country Club representan el nivel más alto de exclusividad residencial en Caracas. Las mansiones de 400-1,200 m² requieren remodelaciones de gran escala: cocinas gourmet con islas de 4+ metros, baños principales tipo spa con bañera exenta y ducha doble, y redistribuciones completas de plantas. Las normativas del country club son estrictas con horarios, ruidos y tránsito de materiales. Nosotros gestionamos toda la coordinación con la administración.',
  },
  {
    slug: 'campo-alegre',
    name: 'Campo Alegre',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Country Club, Chacao y Los Palos Grandes',
    description: 'Remodelaciones en Campo Alegre, Chacao. El lujo clásico de la vieja guardia caraqueña: quintas de gran valor arquitectónico rodeadas de verdor.',
    localInsight: 'Campo Alegre es un oasis de verdor en el corazón de Chacao, con quintas de los años 50-70 de gran valor arquitectónico. Las remodelaciones aquí requieren sensibilidad con la estructura original: vigas de madera, techos altos y fachadas patrimoniales. Somos especialistas en modernizar interiores sin comprometer la identidad arquitectónica, integrando cocinas abiertas, baños contemporáneos y domótica en estructuras clásicas.',
  },
  {
    slug: 'country-club',
    name: 'Country Club',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Campo Alegre, Chacao y Altamira',
    description: 'Remodelaciones en Country Club, Chacao. Quintas exclusivas y residencias de alto estándar en la zona más prestigiosa de Caracas.',
    localInsight: 'Country Club es la dirección más codiciada de la vieja guardia caraqueña. Las quintas de 300-800 m² con jardines amplios requieren remodelaciones que respeten la arquitectura original mientras incorporan estándares modernos: cocinas con despensa y office, baños en suite con vestidor, y sistemas de climatización centralizada. Conocemos las normativas del Caracas Country Club y coordinamos directamente con su administración.',
  },
  {
    slug: 'la-castellana',
    name: 'La Castellana',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Altamira, Chacao y Los Palos Grandes',
    description: 'Remodelaciones en La Castellana, Chacao. Eje de alta cotización que combina residencias sofisticadas, torres corporativas y vida comercial.',
    localInsight: 'La Castellana combina apartamentos de lujo en torres residenciales con penthouses de gran formato. Las remodelaciones en edificios de La Castellana exigen coordinación precisa con administraciones de condominio: horarios de carga, uso de ascensores de servicio, protección de lobby y pasillos. Tenemos experiencia específica en torres de La Castellana y gestionamos todos los permisos de obra.',
  },
  {
    slug: 'altamira',
    name: 'Altamira',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'La Castellana, Los Palos Grandes y Chacao',
    description: 'Remodelaciones en Altamira, Chacao. Residencias sofisticadas y torres de alto standing en el epicentro de Caracas.',
    localInsight: 'Altamira es el epicentro residencial y corporativo de Chacao. Los apartamentos de 120-350 m² en torres de los años 70-90 necesitan actualización completa de instalaciones eléctricas e hidrosanitarias, además de redistribuciones para crear espacios abiertos modernos. Las normativas de condominio en Altamira son particularmente estrictas. Nuestro equipo conoce los edificios de la zona y sus requisitos específicos.',
  },
  {
    slug: 'alto-hatillo',
    name: 'Alto Hatillo',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Los Naranjos, El Hatillo y La Lagunita',
    description: 'Remodelaciones en Alto Hatillo, El Hatillo. Topografía alta con vistas espectaculares, clima fresco y urbanismos modernos de lujo.',
    localInsight: 'Alto Hatillo ofrece las mejores vistas panorámicas de Caracas con un clima fresco único. Las casas y townhouses de 250-600 m² en urbanismos cerrados requieren soluciones específicas: impermeabilización reforzada por la humedad de montaña, aislamiento térmico y grandes ventanales que aprovechen las vistas. Las remodelaciones aquí suelen incluir terrazas panorámicas, cocinas abiertas al jardín y baños con vistas.',
  },
  {
    slug: 'los-naranjos',
    name: 'Los Naranjos',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Alto Hatillo, El Hatillo y La Lagunita',
    description: 'Remodelaciones en Los Naranjos, El Hatillo. Urbanismos modernos, casas de lujo y clima de montaña en el sureste de Caracas.',
    localInsight: 'Los Naranjos es una de las zonas de mayor crecimiento residencial de El Hatillo, con urbanismos modernos de casas y townhouses de 200-500 m². Las viviendas de 10-20 años requieren actualización de cocinas y baños, mientras que las más nuevas buscan personalización de acabados. El clima fresco de montaña exige soluciones de climatización diferentes al resto de Caracas. Conocemos todos los urbanismos de la zona.',
  },
  {
    slug: 'prados-del-este',
    name: 'Prados del Este',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'El Peñón, Baruta y Las Mercedes',
    description: 'Remodelaciones en Prados del Este, Baruta. Área residencial privilegiada y muy familiar en el sureste de Caracas.',
    localInsight: 'Prados del Este es una de las zonas residenciales más familiares y cotizadas de Baruta. Las casas unifamiliares de 250-600 m² con jardines amplios son ideales para remodelaciones integrales: apertura de cocinas al jardín, creación de suites principales con vestidor y baño spa, y ampliación de áreas sociales. Las normativas de la asociación de vecinos regulan fachadas y alturas. Nosotros gestionamos los permisos correspondientes.',
  },
  {
    slug: 'el-penon',
    name: 'El Peñón',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Prados del Este, Baruta y Las Mercedes',
    description: 'Remodelaciones en El Peñón, Baruta. Zona residencial exclusiva con casas de alto standing y ambiente familiar.',
    localInsight: 'El Peñón es una urbanización cerrada de alto standing en Baruta, con casas de 300-700 m² y estrictas normativas de convivencia. Las remodelaciones requieren coordinación con la junta de la urbanización para horarios de obra, tránsito de materiales y protección de áreas verdes. Tenemos experiencia trabajando en El Peñón y conocemos los requisitos específicos de su administración.',
  },
  // ── CARABOBO PREMIUM ──
  {
    slug: 'guataparo',
    name: 'Guataparo',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'El Viñedo, Camoruco y Prebo',
    description: 'Remodelaciones en Guataparo, Valencia. Máxima exclusividad con campo de golf, mansiones y precios en máximos históricos.',
    localInsight: 'Guataparo es la zona más exclusiva de Valencia y una de las más cotizadas de Venezuela. Las mansiones de 500-1,500 m² alrededor del campo de golf requieren remodelaciones de gran envergadura con acabados de lujo: cocinas gourmet con islas de piedra natural, baños tipo spa con mármol importado, y sistemas de domótica completos. Las normativas del Guataparo Country Club son muy estrictas. Coordinamos directamente con la administración para permisos de obra.',
  },
  {
    slug: 'el-vinedo',
    name: 'El Viñedo',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'Guataparo, Prebo y Camoruco',
    description: 'Remodelaciones en El Viñedo, Valencia. Zona de gran prestigio con locales comerciales lujosos, restaurantes y residencias cotizadas.',
    localInsight: 'El Viñedo combina residencias de alto standing con la zona comercial más prestigiosa de Valencia. Los apartamentos de 120-300 m² en torres residenciales y las quintas de la zona requieren remodelaciones con acabados premium. Además, remodelamos locales comerciales y restaurantes de El Viñedo con diseños de autor. Conocemos las normativas de los edificios y del centro comercial.',
  },
  {
    slug: 'prebo',
    name: 'Prebo',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'El Viñedo, Camoruco y Guataparo',
    description: 'Remodelaciones en Prebo, Valencia. Reconocida zona residencial y comercial con quintas y edificios de alta gama.',
    localInsight: 'Prebo es una de las zonas más completas de Valencia: residencial, comercial y gastronómica. Las quintas de 200-500 m² y los apartamentos en edificios de alta gama requieren remodelaciones que combinen funcionalidad moderna con el carácter de la zona. Las cocinas abiertas y los baños tipo spa son las reformas más solicitadas. Conocemos los edificios de Prebo y sus normativas de condominio.',
  },
  {
    slug: 'el-parral',
    name: 'El Parral',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'Mañongo, Naguanagua y La Campiña',
    description: 'Remodelaciones en El Parral, Valencia. Sector con gran auge de inversión inmobiliaria y alta rentabilidad.',
    localInsight: 'El Parral es uno de los sectores con mayor auge inmobiliario de Valencia. Las viviendas nuevas de 100-300 m² suelen requerir personalización de acabados de constructora, mientras que las de 15-20 años necesitan actualización integral. La alta rentabilidad de la zona hace que muchos propietarios remodelen para revalorizar antes de vender o alquilar. Ofrecemos presupuestos orientados a maximizar el retorno de inversión.',
  },
  {
    slug: 'manongo',
    name: 'Mañongo',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'El Parral, La Campiña y Naguanagua',
    description: 'Remodelaciones en Mañongo, Naguanagua. Sector residencial y comercial en pleno crecimiento con alta demanda de reformas.',
    localInsight: 'Mañongo es el epicentro del crecimiento residencial de Naguanagua, con torres de apartamentos modernos y zonas comerciales en expansión. Los apartamentos de 80-200 m² requieren personalización de acabados y redistribuciones para maximizar espacios. Las normativas de condominio en las torres nuevas son estrictas con horarios y protección de áreas comunes. Conocemos los edificios de Mañongo y coordinamos con sus administraciones.',
  },
  {
    slug: 'valles-de-camoruco',
    name: 'Valles de Camoruco',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'Camoruco, El Viñedo y Prebo',
    description: 'Remodelaciones en Valles de Camoruco, Valencia. Zona residencial consolidada que combina tranquilidad y cercanía a servicios clave.',
    localInsight: 'Valles de Camoruco es una zona residencial consolidada con casas y apartamentos de 150-400 m². La tranquilidad de la zona y su cercanía a servicios clave la hacen ideal para familias que buscan remodelar sin mudarse. Las viviendas de 20-35 años requieren actualización completa de instalaciones y acabados. Las remodelaciones más frecuentes son cocinas abiertas, baños modernos y creación de suites principales.',
  },
];

// ═══════════════════════════════════════════
// GENERATE PAGES
// ═══════════════════════════════════════════
let count = 0;

for (const service of services) {
  for (const zone of zones) {
    const slug = `${service.slug}-${zone.slug}`;
    const filePath = `${OUT}${slug}.astro`;

    if (existsSync(filePath)) {
      console.log(`⏭️  ${slug} ya existe`);
      continue;
    }

    const title = `${service.name} en ${zone.name} | Precios 2026 | RemodelaT`;
    const description = `${zone.description} Presupuestos gratis. +15 años de experiencia. Garantía por escrito.`;
    const h1Line1 = `${service.name} en`;
    const h1Line2 = zone.name;

    const faqItems = service.faqs(zone.name).map(f =>
      `  { question: "${f.q.replace(/"/g, '\\"')}", answer: "${f.a.replace(/"/g, '\\"')}" }`
    ).join(',\n');

    const content = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import FAQ from '../components/FAQ.astro';
import ServiceSchema from '../components/ServiceSchema.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
---

<BaseLayout
  title="${title}"
  description="${description}"
  image="${service.heroImage}"
  activePage="servicios"
>

<header class="article-hero">
  <div class="hero-bg" style="background-image: url('${service.heroImage}')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <a href="/servicios" class="back-link">← Volver a Servicios</a>
    <span class="article-category">${zone.city} · Servicio Local</span>
    <h1 class="article-title"><span class="line">${h1Line1}</span><span class="line gold">${h1Line2}</span></h1>
    <p class="article-excerpt">${service.intro(zone.name, zone.neighborhoods).replace(/<[^>]+>/g, '')}</p>
  </div>
</header>

<Breadcrumb items={[
  { name: 'Inicio', url: '/' },
  { name: 'Servicios', url: '/servicios' },
  { name: '${service.name}', url: '/servicios/${service.slug}' },
  { name: '${zone.name}', url: '/${slug}' }
]} />

<section class="article-section">
  <div class="container">
    <div class="article-body">
      <p>${service.intro(zone.name, zone.neighborhoods)}</p>

      <div class="local-box">
        <h3>📍 Conocemos ${zone.name}</h3>
        <p>${zone.localInsight}</p>
      </div>

      <img src="${service.bodyImage}" alt="${service.name} en ${zone.name} - RemodelaT Venezuela" loading="eager" fetchpriority="high" decoding="async" />

      ${service.sections(zone.name)}

      <h2>Precios Orientativos en ${zone.name}</h2>
      <p>Los precios de ${service.shortName} en ${zone.name} parten desde <strong>${service.priceFrom}</strong>. El presupuesto final depende del tamaño, los materiales elegidos y la complejidad de las instalaciones. Siempre entregamos presupuesto cerrado por partidas, sin sorpresas.</p>

      <h2>Servicio en Toda ${zone.city}</h2>
      <p>Además de ${zone.name}, trabajamos en ${zone.neighborhoods} y toda ${zone.city}. Consulta nuestra página de <a href="/${zone.citySlug}">remodelaciones en ${zone.city}</a> para ver todos los servicios disponibles en tu zona.</p>
      <p>También puedes ver el detalle completo de nuestro servicio de <a href="/servicios/${service.slug}">${service.name.toLowerCase()}</a> con todos los materiales, procesos y garantías.</p>
    </div>
  </div>
</section>

<FAQ items={[
${faqItems}
]} />

<ServiceSchema
  name="${service.name} en ${zone.name}"
  description="${description}"
  serviceType="${service.serviceType}"
/>

<!-- CTA -->
<section class="cta-section">
  <div class="cta-wrapper">
    <h2 class="cta-title">¿Listo para remodelar en <span class="gold">${zone.name}</span>?</h2>
    <p class="cta-text">Visita técnica gratuita, presupuesto sin compromiso y garantía por escrito. Respondemos en menos de 2 horas.</p>
    <a href="https://wa.me/584129449929?text=Hola,%20quiero%20remodelar%20mi%20${service.shortName}%20en%20${encodeURIComponent(zone.name)}" class="btn-premium" target="_blank" rel="noopener">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Presupuesto Gratis en ${zone.name}
    </a>
  </div>
</section>

</BaseLayout>

<style>
.article-hero { position: relative; min-height: 80vh; display: flex; align-items: flex-end; justify-content: center; text-align: center; color: var(--white); overflow: hidden; padding-top: 140px; padding-bottom: 80px; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 1; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%); z-index: 2; }
.hero-content { position: relative; z-index: 3; max-width: 900px; padding: 0 20px; }
.article-category { display: inline-block; background: rgba(201,169,97,0.2); border: 1px solid var(--gold); color: var(--gold); padding: 8px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; backdrop-filter: blur(10px); }
.article-title { font-family: var(--font-serif); font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 400; margin-bottom: 20px; line-height: 1.1; }
.article-title .line { display: block; }
.article-excerpt { font-size: 1.3rem; color: rgba(255,255,255,0.9); max-width: 700px; margin: 0 auto; line-height: 1.6; font-weight: 400; }
.back-link { display: inline-block; color: var(--gold); font-size: 0.9rem; margin-bottom: 20px; transition: 0.3s; text-decoration: none; }
.back-link:hover { color: var(--gold-light); }
.article-section { padding: 80px 0; background: var(--white); }
.article-body { max-width: 800px; margin: 0 auto; font-family: var(--font-serif); font-size: 1.3rem; line-height: 1.8; color: var(--text); }
.article-body h2 { font-size: 2.5rem; margin: 3rem 0 1.5rem; color: var(--text); line-height: 1.2; font-weight: 500; }
.article-body h3 { font-size: 1.8rem; margin: 2.5rem 0 1rem; color: var(--text); font-weight: 500; }
.article-body p { margin-bottom: 1.5rem; font-weight: 400; }
.article-body a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold); }
.article-body ul { margin: 1.5rem 0 1.5rem 2rem; }
.article-body li { margin-bottom: 0.75rem; font-weight: 400; }
.article-body img { border-radius: 12px; margin: 2.5rem 0; box-shadow: 0 15px 40px rgba(0,0,0,0.08); width: 100%; }
.local-box { background: #f8f6f1; border-left: 4px solid var(--gold); padding: 24px 28px; border-radius: 0 12px 12px 0; margin: 2rem 0; }
.local-box h3 { margin: 0 0 12px; font-size: 1.4rem; }
.local-box p { margin: 0; font-size: 1.1rem; }
.cta-section { background: var(--bg); color: var(--white); text-align: center; padding: 110px 24px; width: 100%; }
.cta-wrapper { max-width: 950px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.cta-title { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 400; margin-bottom: 24px; line-height: 1.15; color: var(--white); text-align: center; width: 100%; }
.cta-text { color: rgba(255,255,255,0.85); max-width: 800px; margin: 0 auto 45px; font-size: 1.25rem; line-height: 1.7; font-weight: 400; text-align: center; width: 100%; }
.cta-section .btn-premium { padding: 20px 55px; font-size: 0.9rem; }
@media (max-width: 768px) { .article-hero { min-height: 70vh; padding-top: 120px; padding-bottom: 60px; } .article-title { font-size: clamp(2rem, 8vw, 3.5rem); } .article-excerpt { font-size: 1.15rem; } .article-body { font-size: 1.15rem; } .article-body h2 { font-size: 2rem; } .article-body h3 { font-size: 1.5rem; } .cta-section { padding: 90px 20px; } }
</style>
`;

    writeFileSync(filePath, content);
    console.log(`✅ ${slug}`);
    count++;
  }
}

console.log(`\n🎉 ${count} landing pages premium generadas`);