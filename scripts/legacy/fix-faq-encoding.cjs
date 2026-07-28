const fs = require('fs');
const path = require('path');
const serviceDir = 'C:\\Users\\kr-im\\.openclaw\\workspace\\reformat-venezuela\\src\\pages\\servicios';

const faqs = {
  'cocinas.astro': [
    { q: "¿Cuánto tiempo toma una reforma de cocina completa?", a: "Una reforma integral de cocina toma entre 4 y 8 semanas, dependiendo de la complejidad del diseño, los materiales seleccionados y si se requieren cambios en las instalaciones." },
    { q: "¿Qué incluye el presupuesto de reforma de cocina?", a: "Incluimos diseño 3D, demolición, instalaciones eléctricas y de fontanería, mobiliario a medida, encimeras, revestimientos y electrodomésticos empotrados. Todo detallado por partidas." },
    { q: "¿Ofrecen garantía en los trabajos de cocina?", a: "Sí, todos nuestros trabajos cuentan con garantía de 2 años en mano de obra y la garantía del fabricante en materiales, encimeras y electrodomésticos." },
    { q: "¿Puedo elegir los materiales y acabados?", a: "Por supuesto. Trabajamos con marcas premium y te asesoramos en la selección de materiales, colores y acabados que mejor se adapten a tu estilo y presupuesto." }
  ],
  'banos.astro': [
    { q: "¿Cuánto dura una reforma de baño completa?", a: "Una reforma completa de baño toma entre 2 y 4 semanas. Incluye demolición, impermeabilización, fontanería, electricidad, revestimientos y colocación de sanitarios." },
    { q: "¿Qué tipo de impermeabilización utilizan?", a: "Aplicamos sistemas de impermeabilización en capa continua con garantía de 10 años, cubriendo plato de ducha, paredes húmedas y suelo con materiales certificados." },
    { q: "¿Puedo mantener la distribución actual del baño?", a: "Sí, podemos reformar manteniendo la distribución existente o proponer una nueva. Cambiar la ubicación de sanitarios implica modificar fontanería y puede afectar el presupuesto." },
    { q: "¿Incluyen la retirada de escombros?", a: "Sí, nuestro servicio incluye demolición, retirada de escombros y limpieza final. Dejamos el baño listo para usar sin que tengas que preocuparte por nada." }
  ],
  'electricidad.astro': [
    { q: "¿Cuándo debo renovar la instalación eléctrica de mi hogar?", a: "Si tu instalación tiene más de 20 años, usa cableado antiguo o los cuadros eléctricos no tienen diferenciales modernos, es momento de una renovación por seguridad." },
    { q: "¿Ofrecen certificados eléctricos?", a: "Sí, emitimos certificados de instalación eléctrica y boletines oficiales requeridos por las compañías distribuidoras y para trámites de compraventa de inmuebles." },
    { q: "¿Pueden instalar domótica y automatización?", a: "Sí, instalamos sistemas de domótica para control de iluminación, persianas, climatización y seguridad, compatibles con asistentes de voz y control desde el móvil." },
    { q: "¿Realizan instalaciones para carga de vehículos eléctricos?", a: "Sí, instalamos puntos de carga para vehículos eléctricos en garajes privados y comunitarios, con la potencia y protecciones adecuadas según el equipo." }
  ],
  'fontaneria.astro': [
    { q: "¿Cómo detectan fugas de agua sin romper paredes?", a: "Utilizamos equipos de detección por ultrasonido y cámaras termográficas que nos permiten localizar fugas con precisión sin necesidad de obras destructivas." },
    { q: "¿Qué tipos de calentadores instalan?", a: "Instalamos calentadores a gas, termos eléctricos, calderas de condensación y sistemas de aerotermia. Te asesoramos sobre la opción más eficiente para tu consumo." },
    { q: "¿Ofrecen servicio de urgencias?", a: "Sí, atendemos urgencias de fontanería como roturas de tuberías, atascos graves y fugas de agua. Contáctanos por WhatsApp para respuesta rápida." },
    { q: "¿Cuánto cuesta desatascar una tubería?", a: "El coste depende de la gravedad y ubicación del atasco. Realizamos inspección con cámara primero para diagnosticar antes de presupuestar, sin sorpresas." }
  ],
  'revestimientos.astro': [
    { q: "¿Qué diferencia hay entre porcelanato y cerámica?", a: "El porcelanato es más denso, resistente y con menor absorción de agua que la cerámica. Es ideal para zonas de alto tráfico y exteriores por su durabilidad superior." },
    { q: "¿Instalan porcelanato de gran formato?", a: "Sí, somos especialistas en porcelanato de gran formato (hasta 320x160 cm). Usamos sistemas de nivelación profesional para garantizar una instalación perfecta sin lippage." },
    { q: "¿Qué son los wall panels?", a: "Son paneles decorativos 3D de PVC, madera o yeso que transforman paredes lisas en superficies con textura y relieve. Ideales para crear paredes de acento." },
    { q: "¿El microcemento necesita mantenimiento especial?", a: "El microcemento sellado requiere limpieza con productos neutros y una reaplicación de sellador cada 2-3 años en zonas de alto uso para mantener su aspecto impecable." }
  ],
  'suelos.astro': [
    { q: "¿Qué tipo de suelo es más duradero?", a: "El porcelanato es el suelo más duradero: resistente a rayaduras, manchas y humedad. Le sigue el gres porcelánico técnico y los suelos vinílicos SPC de alta gama." },
    { q: "¿Puedo instalar suelo laminado sobre cerámica existente?", a: "Sí, siempre que la superficie esté nivelada. Colocamos una base aislante sobre el suelo existente, lo que reduce costes de demolición y tiempo de obra." },
    { q: "¿Cuánto tiempo toma instalar el suelo de una vivienda?", a: "Para una vivienda de 80-100 m², la instalación toma entre 3 y 5 días, incluyendo preparación del subsuelo, instalación y colocación de rodapiés." },
    { q: "¿Qué garantía ofrecen en la instalación de suelos?", a: "Ofrecemos 2 años de garantía en instalación y la garantía del fabricante en materiales. La nivelación y adherencia están cubiertas durante todo el período." }
  ],
  'piscinas.astro': [
    { q: "¿Cuánto cuesta construir una piscina residencial?", a: "El coste varía según tamaño, materiales y equipamiento. Una piscina de obra de 6x3 m con equipo de filtración completo parte desde un presupuesto que podemos detallar sin compromiso." },
    { q: "¿Qué sistema de filtración recomiendan?", a: "Recomendamos sistemas de filtración con bomba de velocidad variable y filtro de vidrio activo. Consumen menos energía, filtran mejor y reducen el uso de productos químicos." },
    { q: "¿Ofrecen mantenimiento periódico de piscinas?", a: "Sí, ofrecemos planes de mantenimiento semanal o quincenal que incluyen control de pH, limpieza de fondo y paredes, revisión de equipos y tratamiento del agua." },
    { q: "¿Cuánto tarda la construcción de una piscina?", a: "La construcción de una piscina de obra toma entre 4 y 8 semanas, dependiendo del tamaño, la complejidad del terreno y los acabados seleccionados." }
  ],
  'integrales.astro': [
    { q: "¿Qué incluye una reforma integral?", a: "Incluye diseño del proyecto, gestión de permisos, demolición, albañilería, instalaciones (eléctrica, fontanería, climatización), acabados, carpintería y limpieza final. Todo llave en mano." },
    { q: "¿Cuánto tiempo toma una reforma integral de vivienda?", a: "Una reforma integral de vivienda de 80-120 m² toma entre 3 y 5 meses. Elaboramos un cronograma detallado con hitos de seguimiento para que estés informado en todo momento." },
    { q: "¿Necesito desalojar la vivienda durante la reforma?", a: "En reformas integrales completas, generalmente sí. Podemos planificar la obra por fases si necesitas permanecer en parte de la vivienda, aunque alarga los plazos." },
    { q: "¿Ofrecen financiación para reformas integrales?", a: "Trabajamos con entidades financieras que ofrecen financiación para reformas con condiciones ventajosas. Te orientamos sobre las opciones disponibles al presupuestar." },
    { q: "¿Gestionan los permisos y licencias de obra?", a: "Sí, nos encargamos de toda la gestión: proyecto técnico, solicitud de licencias, tasas municipales y coordinación con la comunidad de vecinos si aplica." }
  ],
  'pintura-acabados.astro': [
    { q: "¿Qué tipos de pintura utilizan?", a: "Trabajamos con pinturas de marcas premium como Valentine, Bruguer y Jotun, en acabados mate, satinado o brillo. Todas con baja emisión de COV para interiores saludables." },
    { q: "¿Cuánto tiempo toma pintar un piso completo?", a: "Un piso de 80-100 m² toma entre 4 y 6 días laborables, incluyendo preparación de paredes (masillado y lijado), imprimación donde sea necesaria y dos manos de acabado." },
    { q: "¿Qué es el estuco veneciano?", a: "Es un acabado decorativo a base de cal que reproduce el aspecto del mármol pulido. Se aplica en varias capas con espátula y ofrece un acabado elegante y único." },
    { q: "¿Realizan pintura de exteriores e impermeabilización de fachadas?", a: "Sí, realizamos pintura de fachadas con pinturas elastoméricas resistentes a la intemperie e impermeabilización de muros exteriores para proteger contra filtraciones." }
  ]
};

let fixed = 0;
for (const [file, items] of Object.entries(faqs)) {
  const filePath = path.join(serviceDir, file);
  if (!fs.existsSync(filePath)) { console.log('SKIP: ' + file); continue; }
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove existing <FAQ .../> block (possibly corrupted)
  // It spans multiple lines starting with <FAQ items={[ and ending with ]} />
  content = content.replace(/<FAQ items=\{[\s\S]*?\]}\s*\/>/m, '');

  // Build clean FAQ component
  let faqStr = '<FAQ items={[\n';
  for (const item of items) {
    // Escape double quotes in text (shouldn't be any, but safe)
    const q = item.q.replace(/"/g, '\\"');
    const a = item.a.replace(/"/g, '\\"');
    faqStr += `  { question: "${q}", answer: "${a}" },\n`;
  }
  faqStr += ']} />';

  // Insert before <style> tag (scoped styles) or before </BaseLayout>
  if (content.includes('<style is:global>') || content.match(/^\s*<style\s*>/m)) {
    content = content.replace(/(\r?\n\s*<style)/, '\n\n' + faqStr + '$1');
  } else {
    content = content.replace(/(<\/BaseLayout>)/, faqStr + '\n$1');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('FIXED: ' + file);
  fixed++;
}
console.log('\nFixed ' + fixed + ' service pages');
