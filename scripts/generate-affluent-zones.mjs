/**
 * Clona landings modernas (plantilla El Viñedo) para urbanizaciones
 * de poder adquisitivo medio-alto que faltaban.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const ZONES = [
  {
    slug: 'la-vina',
    name: 'La Viña',
    watermark: 'LA VIÑA',
    nearby: 'El Bosque, Camoruco y el centro de Valencia',
    localEs: 'La Viña es una de las urbanizaciones más emblemáticas y caras de Valencia: quintas de 350–900 m², jardines, anexos y casonas de los 60–90. Hoy hay un volumen alto de propiedades “a remodelar” (anuncios de US$100.000–350.000). El trabajo típico es integral de quinta: instalaciones nuevas, impermeabilización, cocina abierta y baños tipo spa, respetando fachada y asociación.',
    localEn: 'La Viña is one of Valencia’s most emblematic high-value neighborhoods: 350–900 m² estates, gardens and 1960s–90s houses. Many listings are sold “to remodel” (US$100k–350k). Typical work is a whole-home estate job: new utilities, waterproofing, an open kitchen and spa baths, with façade rules respected.',
    areasEs: "['La Viña', 'El Bosque', 'Camoruco', 'Valencia']",
    areasEn: "['La Viña', 'El Bosque', 'Camoruco', 'Valencia']",
  },
  {
    slug: 'el-bosque',
    name: 'El Bosque',
    watermark: 'EL BOSQUE',
    nearby: 'La Viña, Guataparo y el Paseo Cuatricentenario',
    localEs: 'El Bosque es una urbanización consolidada y exclusiva de Valencia: casas unifamiliares, apartoquintas y calles cerradas con vigilancia. Predominan lotes generosos, piscinas y viviendas de 200–400 m². Hay demanda clara de remodelación (fachada, cocina, baños y potencial comercial en avenidas). Exige acabados de alto estándar y logística de obra en calle privada.',
    localEn: 'El Bosque is an exclusive, established Valencia neighborhood: detached houses, duplex quintas and gated streets. Lots are generous, often with pools, 200–400 m². Demand is high for façade, kitchen and bath work. High-standard finishes and private-street logistics are required.',
    areasEs: "['El Bosque', 'La Viña', 'Guataparo', 'Valencia']",
    areasEn: "['El Bosque', 'La Viña', 'Guataparo', 'Valencia']",
  },
  {
    slug: 'la-esmeralda',
    name: 'La Esmeralda',
    watermark: 'LA ESMERALDA',
    nearby: 'El Morro, Valle de Oro y el resto de San Diego',
    localEs: 'La Esmeralda es la urbanización de referencia de San Diego: casas y townhouses de alto valor, condominios estrictos y familias que invierten en acabado, no en “obra barata”. Lomas de La Esmeralda y Altos de La Esmeralda concentran quintas y conjuntos cerrados. El trabajo suele ser personalización de acabados de constructora, cocinas a medida e integrales de 150–350 m².',
    localEn: 'La Esmeralda is San Diego’s flagship neighborhood: high-value houses and townhouses, strict condos and owners who pay for finish quality. Lomas and Altos de La Esmeralda hold gated estates. Work is usually upgrading builder finishes, custom kitchens and 150–350 m² whole-home jobs.',
    areasEs: "['La Esmeralda', 'El Morro', 'Valle de Oro', 'San Diego']",
    areasEn: "['La Esmeralda', 'El Morro', 'Valle de Oro', 'San Diego']",
  },
  {
    slug: 'el-morro',
    name: 'El Morro',
    watermark: 'EL MORRO',
    nearby: 'La Esmeralda, La Cumaca y San Diego Centro',
    localEs: 'El Morro I y II son conjuntos de San Diego con control de acceso, normativa de fachada y viviendas de 120–300 m². Perfil familiar de poder adquisitivo medio-alto. Las obras más frecuentes: baños, cocinas y pisos de gran formato, coordinando horarios de carga con la administración. Base operativa a minutos de la urbanización.',
    localEn: 'El Morro I and II are gated San Diego communities with façade rules and 120–300 m² homes. Upper-middle family profile. Typical jobs: baths, kitchens and large-format floors, with loading hours coordinated with management. Our base is minutes away.',
    areasEs: "['El Morro', 'La Esmeralda', 'La Cumaca', 'San Diego']",
    areasEn: "['El Morro', 'La Esmeralda', 'La Cumaca', 'San Diego']",
  },
  {
    slug: 'valle-de-oro',
    name: 'Valle de Oro',
    watermark: 'VALLE DE ORO',
    nearby: 'La Esmeralda, Los Jarales y San Diego',
    localEs: 'Valle de Oro (El Remanso, La Floresta) es residencial consolidado de San Diego: casas de 150–350 m², jardines y conjuntos con normas de condominio. Poder adquisitivo medio-alto. Oportunidad en actualización de instalaciones de 15–25 años, baños e integrales familiares. Desplazamiento incluido desde nuestra base en el municipio.',
    localEn: 'Valle de Oro (El Remanso, La Floresta) is an established San Diego residential area: 150–350 m² houses, gardens and condo rules. Upper-middle income. Opportunity in 15–25-year-old utilities, baths and family whole-home work. Travel from our San Diego base is included.',
    areasEs: "['Valle de Oro', 'La Esmeralda', 'Los Jarales', 'San Diego']",
    areasEn: "['Valle de Oro', 'La Esmeralda', 'Los Jarales', 'San Diego']",
  },
];

const SERVICES = [
  { key: 'integral', file: 'remodelacion-integral' },
  { key: 'cocina', file: 'remodelacion-cocina' },
  { key: 'bano', file: 'remodelacion-bano' },
];

function transform(src, zone, lang) {
  let out = src;
  out = out.replaceAll('el-vinedo', zone.slug);
  out = out.replaceAll('EL VIÑEDO', zone.watermark);
  out = out.replaceAll('El Viñedo', zone.name);
  out = out.replaceAll('El Viñ', zone.name); // truncated leftovers
  if (lang === 'es') {
    out = out.replace(
      /<div class="local-box">[\s\S]*?<\/div>/,
      `<div class="local-box">\n        <h3>Proyectos en ${zone.name}</h3>\n        <p>${zone.localEs}</p>\n      </div>`,
    );
    out = out.replace(/areaServed=\{[^}]+\}/, `areaServed={${zone.areasEs}}`);
    out = out.replace(
      /Además de [^,]+, trabajamos en[\s\S]*?<\/p>/,
      `Además de ${zone.name}, trabajamos en ${zone.nearby}. Consulta nuestra página de <a href="/valencia/">remodelaciones en Valencia</a> y <a href="/san-diego/">San Diego</a>.</p>`,
    );
  } else {
    out = out.replace(
      /<div class="local-box">[\s\S]*?<\/div>/,
      `<div class="local-box">\n        <h3>Projects in ${zone.name}</h3>\n        <p>${zone.localEn}</p>\n      </div>`,
    );
    out = out.replace(/areaServed=\{[^}]+\}/, `areaServed={${zone.areasEn}}`);
  }
  return out;
}

let n = 0;
for (const zone of ZONES) {
  for (const svc of SERVICES) {
    const esIn = `src/pages/${svc.file}-el-vinedo.astro`;
    const enIn = `src/pages/en/${svc.file}-el-vinedo.astro`;
    const esOut = `src/pages/${svc.file}-${zone.slug}.astro`;
    const enOut = `src/pages/en/${svc.file}-${zone.slug}.astro`;
    if (!existsSync(esOut)) {
      writeFileSync(esOut, transform(readFileSync(esIn, 'utf8'), zone, 'es'));
      n++;
      console.log('ES', esOut);
    }
    if (!existsSync(enOut)) {
      writeFileSync(enOut, transform(readFileSync(enIn, 'utf8'), zone, 'en'));
      n++;
      console.log('EN', enOut);
    }
  }
}
console.log(`Created ${n} pages`);
