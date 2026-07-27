import { writeFileSync, existsSync, mkdirSync } from 'fs';

const OUT = 'src/pages/';

// ═══════════════════════════════════════════
// DATA: Services × Zones matrix
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
    intro: (zone, neighborhoods) => `¿Buscas una <strong>remodelación de cocina en ${zone}</strong>? En ReformaT Venezuela diseñamos y ejecutamos cocinas modernas, funcionales y a medida para los hogares de ${zone} y ${neighborhoods}. Con más de 15 años de experiencia, conocemos las tipologías de viviendas de la zona y las soluciones que mejor aprovechan cada espacio.`,
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
<p>Un baño bien diseñado mejora tu calidad de vida y revaloriza tu vivienda. En ReformaT ejecutamos remodelaciones completas que incluyen demolición, nuevas instalaciones hidrosanitarias, impermeabilización certificada, alicatados, sanitarios, grifería y accesorios.</p>
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
<p>Una remodelación integral transforma por completo tu vivienda: nueva distribución, instalaciones renovadas, acabados premium y diseño de autor. En ReformaT gestionamos todo el proceso con un único equipo, un único presupuesto y un único responsable de proyecto.</p>
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

<h2>¿Por Qué Elegir ReformaT en ${zone}?</h2>
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

const zones = [
  {
    slug: 'chacao',
    name: 'Chacao',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Altamira, Los Palos Grandes y Chuao',
    description: 'Especialistas en remodelaciones en Chacao, Caracas. Trabajamos en Altamira, Los Palos Grandes, Chuao y todo el municipio.',
    localInsight: 'En Chacao predominan apartamentos de 80-200 m² en edificios con más de 30 años. Las normativas de condominio son estrictas con horarios de obra (8am-5pm) y protección de ascensores. Nosotros gestionamos todos los permisos.',
  },
  {
    slug: 'las-mercedes',
    name: 'Las Mercedes',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'Baruta, El Cafetal y Santa Fe',
    description: 'Remodelaciones en Las Mercedes, Baruta. Apartamentos y casas con diseño premium en el sureste de Caracas.',
    localInsight: 'Las Mercedes combina apartamentos modernos con casas unifamiliares de los años 70-80. Muchas viviendas necesitan actualización completa de instalaciones y redistribución. La zona tiene alta demanda de cocinas abiertas y baños tipo spa.',
  },
  {
    slug: 'el-hatillo',
    name: 'El Hatillo',
    city: 'Caracas',
    citySlug: 'caracas',
    neighborhoods: 'La Lagunita, Los Naranjos y El Calvario',
    description: 'Remodelaciones en El Hatillo: casas de campo, townhouses y apartamentos con acabados de lujo.',
    localInsight: 'El Hatillo se caracteriza por casas unifamiliares y townhouses con amplios espacios. Las remodelaciones aquí suelen incluir cocinas gourmet, baños principales tipo spa y ampliaciones. El clima fresco permite soluciones de climatización diferentes al resto de Caracas.',
  },
  {
    slug: 'valencia-centro',
    name: 'Valencia Centro',
    city: 'Valencia',
    citySlug: 'valencia',
    neighborhoods: 'El Viñedo, Mañongo y La Alegría',
    description: 'Remodelaciones en el centro de Valencia: El Viñedo, Mañongo, La Alegría y zonas aledañas.',
    localInsight: 'El centro de Valencia tiene edificios residenciales y comerciales con más de 40 años. Las remodelaciones requieren actualización completa de instalaciones eléctricas e hidrosanitarias. Somos la empresa local de referencia con base en Valencia.',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    city: 'San Diego',
    citySlug: 'san-diego',
    neighborhoods: 'La Esmeralda, El Morro y Valle de Oro',
    description: 'Remodelaciones en San Diego, Carabobo: urbanizaciones modernas, casas y apartamentos.',
    localInsight: 'San Diego es el municipio de mayor crecimiento en Carabobo. Las viviendas nuevas suelen necesitar personalización de acabados, mientras que las de 10-15 años requieren actualización de cocinas y baños. Conocemos todas las urbanizaciones de la zona.',
  }
];

// ═══════════════════════════════════════════
// GENERATE PAGES
// ═══════════════════════════════════════════
let count = 0;

for (const service of services) {
  for (const zone of zones) {
    const slug = `${service.slug}-${zone.slug}`;
    const filePath = `${OUT}${slug}.astro`;

    // Skip if exists
    if (existsSync(filePath)) {
      console.log(`⏭️  ${slug} ya existe`);
      continue;
    }

    const title = `${service.name} en ${zone.name} | Precios 2026 | ReformaT`;
    const description = `${zone.description} Presupuestos gratis. +15 años de experiencia. Garantía por escrito.`;
    const h1Line1 = `${service.name} en`;
    const h1Line2 = zone.name;
    const breadcrumbName = `${service.name} ${zone.name}`;

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

      <img src="${service.bodyImage}" alt="${service.name} en ${zone.name} - ReformaT Venezuela" loading="eager" fetchpriority="high" decoding="async" />

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

console.log(`\n🎉 ${count} landing pages de zonas generadas`);
