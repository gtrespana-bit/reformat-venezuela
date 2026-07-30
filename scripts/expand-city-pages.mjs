import fs from 'node:fs';

// Inserta 2 secciones nuevas (PROCESO + POR QUÉ ELEGIRNOS) antes de PRICING
// en las 4 páginas de ciudad. Usa clases CSS existentes (section, section-alt).
// Contenido único por ciudad para evitar thin/duplicate content.

const PRICING_ANCHOR = '<!-- ═══════════════ PRICING ═══════════════ -->';

const cities = {
  'src/pages/caracas.astro': {
    name: 'Caracas',
    region: 'Distrito Capital',
    zones: 'Chacao, Baruta, El Hatillo, Sucre y Libertador',
    processIntro: 'Trabajar en Caracas exige conocer sus edificios, normativas de condominio y logística urbana. Nuestro proceso está diseñado para minimizar molestias y cumplir plazos en la capital.',
    whyItems: [
      'Gestión de permisos de condominio y juntas directivas en edificios de Chacao, Baruta y El Hatillo',
      'Coordinación de horarios de carga y descarga con administraciones de edificios',
      'Equipo propio que se desplaza a toda el área metropolitana sin recargos ocultos',
      'Conocimiento de las normativas de remodelación en municipios como Baruta y Chacao',
      'Presupuesto cerrado en USD con cronograma garantizado por escrito'
    ],
    whyIntro: 'Más de 15 años remodelando apartamentos, casas y oficinas en la capital nos convierten en la opción de confianza para proyectos residenciales y comerciales en el Distrito Capital.'
  },
  'src/pages/valencia.astro': {
    name: 'Valencia',
    region: 'Carabobo',
    zones: 'El Trigal, La Trigaleña, El Viñedo, La Castellana, Guataparo, Prebo y El Parral',
    processIntro: 'En Valencia combinamos rapidez de ejecución con acabados premium. Nuestro proceso está optimizado para viviendas unifamiliares, apartamentos y locales comerciales de la capital carabobeña.',
    whyItems: [
      'Sede principal en Carabobo: respuesta y visitas técnicas en menos de 48 horas',
      'Experiencia en remodelaciones de casas en urbanizaciones como El Trigal y La Trigaleña',
      'Proveedores locales de materiales con precios competitivos en la región central',
      'Equipo propio certificado, sin subcontratas, con garantía por escrito',
      'Atención personalizada desde el primer contacto hasta la entrega final'
    ],
    whyIntro: 'Valencia es nuestra casa. Desde aquí operamos para toda la región central, con el mayor volumen de proyectos completados y clientes satisfechos en Carabobo.'
  },
  'src/pages/san-diego.astro': {
    name: 'San Diego',
    region: 'Carabobo',
    zones: 'La Esmeralda, El Morro, Los Jarales, Valle de Oro, La Cumaca y Yuma',
    processIntro: 'San Diego es uno de los municipios con mayor crecimiento residencial de Carabobo. Adaptamos nuestro proceso a casas nuevas, remodelaciones parciales y ampliaciones en sus urbanizaciones.',
    whyItems: [
      'Especialistas en remodelaciones de casas y apartamentos en San Diego',
      'Conocimiento de las normativas municipales de construcción del municipio San Diego',
      'Tiempos de respuesta rápidos por cercanía con nuestra sede en Carabobo',
      'Acabados premium adaptados al clima y estilo de vida de la zona',
      'Presupuesto transparente y cronograma garantizado por escrito'
    ],
    whyIntro: 'Somos la empresa de remodelaciones de referencia en San Diego. Nuestros proyectos en La Esmeralda, El Morro y Los Jarales hablan por sí solos.'
  },
  'src/pages/la-guaira.astro': {
    name: 'La Guaira',
    region: 'Vargas',
    zones: 'Macuto, Caraballeda, Naiguatá, Catia La Mar, Maiquetía y el casco central',
    processIntro: 'El litoral central tiene condiciones únicas: salinidad, humedad y arquitectura costera. Nuestro proceso incorpora materiales y técnicas resistentes al ambiente marino de Vargas.',
    whyItems: [
      'Materiales resistentes a la salinidad y humedad del litoral central',
      'Experiencia en remodelaciones de apartamentos de playa y casas vacacionales',
      'Tratamientos anticorrosivos para estructuras metálicas y herrajes',
      'Pinturas y revestimientos especiales para ambientes costeros',
      'Logística adaptada a la geografía del estado Vargas'
    ],
    whyIntro: 'Remodelar en La Guaira exige conocimiento del clima costero. Adaptamos cada proyecto al ambiente marino para garantizar durabilidad y acabados impecables en Vargas.'
  }
};

function buildSections(c) {
  const processSteps = `
  <!-- ═══════════════ PROCESO ═══════════════ -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Cómo trabajamos</span>
        <h2>Nuestro proceso de remodelación en ${c.name}</h2>
        <p>${c.processIntro}</p>
      </div>
      <div class="zones-grid">
        <div class="zone-item"><strong>1. Visita técnica gratuita</strong><span>Evaluamos el espacio, tomamos medidas y escuchamos tu visión sin compromiso.</span></div>
        <div class="zone-item"><strong>2. Presupuesto cerrado</strong><span>Recibes un presupuesto detallado en USD con materiales, mano de obra y cronograma.</span></div>
        <div class="zone-item"><strong>3. Diseño y planificación</strong><span>Definimos materiales, acabados y fechas. Coordinamos permisos si aplica.</span></div>
        <div class="zone-item"><strong>4. Ejecución supervisada</strong><span>Nuestro equipo propio ejecuta la obra con supervisión diaria y reportes de avance.</span></div>
        <div class="zone-item"><strong>5. Entrega y garantía</strong><span>Entregamos limpio y funcionando, con garantía por escrito en todos los trabajos.</span></div>
      </div>
    </div>
  </section>
`;

  const whyList = c.whyItems.map(i => `          <li>${i}</li>`).join('\n');
  const why = `
  <!-- ═══════════════ POR QUE ELEGIRNOS ═══════════════ -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Por qué RemodelaT</span>
        <h2>Por qué elegirnos en ${c.name}, ${c.region}</h2>
        <p>${c.whyIntro}</p>
      </div>
      <div class="intro-grid">
        <div class="intro-body">
          <ul class="intro-checks">
${whyList}
          </ul>
          <a href="#contacto" class="btn btn-dark">Solicitar presupuesto en ${c.name}</a>
        </div>
        <div class="intro-body">
          <p>Atendemos ${c.zones}, con desplazamiento incluido y sin costos ocultos. Cada proyecto en ${c.name} se ejecuta con estándares europeos adaptados a la realidad constructiva de ${c.region}.</p>
          <p>Nuestro compromiso es simple: <strong>presupuesto cerrado, cronograma garantizado y acabados impecables</strong>. Así hemos construido nuestra reputación en ${c.name} y toda la región central de Venezuela.</p>
        </div>
      </div>
    </div>
  </section>
`;

  return processSteps + why + '\n  ';
}

let report = [];
for (const [file, c] of Object.entries(cities)) {
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('Nuestro proceso de remodelación en ' + c.name)) {
    report.push(`SKIP ${file} (ya expandida)`);
    continue;
  }
  if (!src.includes(PRICING_ANCHOR)) {
    report.push(`MISS ${file} (no encontro ancla PRICING)`);
    continue;
  }
  const insertion = buildSections(c);
  src = src.replace(PRICING_ANCHOR, insertion + PRICING_ANCHOR);
  fs.writeFileSync(file, src, 'utf8');
  report.push(`OK   ${file}`);
}
console.log(report.join('\n'));
