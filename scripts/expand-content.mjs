import { readFileSync, writeFileSync } from 'fs';

const BASE = 'src/pages/servicios/';

// ═══════════════════════════════════════════
// 1. FONTANERIA-PLOMERIA (230 → ~900 words)
// ═══════════════════════════════════════════
{
  const file = BASE + 'fontaneria-plomeria.astro';
  let c = readFileSync(file, 'utf-8');

  // Replace from last content paragraph through FAQ (move FAQ inside BaseLayout)
  c = c.replace(
    `<p>Equipos profesionales de alta presión y cámaras de inspección para desatascar sin dañar tuberías. Limpieza de bajantes y reparación de arquetas.</p>

    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="cta-wrapper">
      <h2 class="cta-title">¿Necesitas un <span class="gold">fontanero de confianza</span>?</h2>
      <p class="cta-text">Fugas, atascos, instalaciones o mantenimiento. Respondemos rápido con presupuesto sin compromiso.</p>
      <a href="https://wa.me/584129449929?text=Hola,%20necesito%20servicio%20de%20fontaner%C3%ADa" class="btn-premium" target="_blank" rel="noopener">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp Directo
      </a>
    </div>
  </section>

</BaseLayout>
<FAQ items={[
{ question: "¿Cómo detectan fugas de agua sin romper paredes?", answer: "Utilizamos equipos de detección por ultrasonido y cámaras termográficas que nos permiten localizar fugas con precisión sin necesidad de obras destructivas." },
{ question: "¿Qué tipos de calentadores instalan?", answer: "Instalamos calentadores a gas, termos eléctricos, calderas de condensación y sistemas de aerotermia. Te asesoramos sobre la opción más eficiente para tu consumo." },
{ question: "¿Ofrecen servicio de urgencias?", answer: "Sí, atendemos urgencias de fontanería como roturas de tuberías, atascos graves y fugas de agua. Contáctanos por WhatsApp para respuesta rápida." },
{ question: "¿Cuánto cuesta desatascar una tubería?", answer: "El coste depende de la gravedad y ubicación del atasco. Realizamos inspección con cámara primero para diagnosticar antes de presupuestar, sin sorpresas." },
]} />`,
    `<h2>Instalaciones Hidrosanitarias Completas</h2>
<p>Diseñamos e instalamos redes completas de agua potable, aguas servidas y ventilación sanitaria para proyectos nuevos y remodelaciones. Calculamos diámetros, pendientes y presiones según norma COVENIN para garantizar un sistema eficiente y duradero.</p>
<p>Incluimos instalación de llaves de paso sectorizadas, contadores, bombas de presión y sistemas de tratamiento de agua. Cada instalación se entrega con prueba de estanqueidad certificada y plano as-built.</p>

<h2>Mantenimiento Preventivo</h2>
<p>Ofrecemos planes de mantenimiento trimestral o semestral para edificios residenciales y comerciales. El plan incluye revisión de bombas, limpieza de tanques, inspección de juntas y válvulas, y reporte fotográfico del estado de la instalación.</p>
<p>El mantenimiento preventivo reduce hasta un 70% las emergencias de fontanería y extiende la vida útil de tuberías y equipos.</p>

<h2>Nuestro Proceso de Trabajo</h2>
<h3>1. Diagnóstico con Tecnología</h3>
<p>Inspección con cámaras endoscópicas, geófonos y termografía para identificar el problema exacto sin romper paredes ni pisos.</p>
<h3>2. Presupuesto Detallado</h3>
<p>Entregamos presupuesto por escrito con materiales, mano de obra y plazos. Sin costos ocultos ni sorpresas.</p>
<h3>3. Ejecución Profesional</h3>
<p>Nuestro equipo certificado realiza el trabajo con herramientas profesionales, protegiendo las áreas circundantes y minimizando molestias.</p>
<h3>4. Pruebas y Verificación</h3>
<p>Realizamos pruebas de presión, estanqueidad y funcionamiento antes de dar por terminado el trabajo.</p>
<h3>5. Garantía y Seguimiento</h3>
<p>Todos los trabajos incluyen garantía por escrito de 12 meses. Hacemos seguimiento post-servicio para asegurar tu satisfacción.</p>

<h2>Materiales y Marcas que Utilizamos</h2>
<p>Trabajamos exclusivamente con materiales certificados de primeras marcas:</p>
<ul>
<li><strong>Tuberías:</strong> PVC Schedule 40 y 80, PPR (polipropileno random) para agua caliente, cobre tipo L para instalaciones premium</li>
<li><strong>Grifería:</strong> Grohe, FV, Helvex y Corona con acabado PVD que resiste corrosión y mantiene brillo por años</li>
<li><strong>Calentadores:</strong> Vaillant, Bosch y Rheem con eficiencia energética A+ y garantía extendida de fábrica</li>
<li><strong>Sellantes y adhesivos:</strong> Sika, Weber y Henkel para uniones estancas y duraderas</li>
<li><strong>Bombas:</strong> Pedrollo, Grundfos y Barnes de fabricación europea con bajo consumo eléctrico</li>
</ul>
<p>Cada material incluye factura y certificado de origen. No utilizamos materiales genéricos que comprometan la durabilidad de la instalación.</p>

    </div>
  </section>

  <FAQ items={[
    { question: "¿Cómo detectan fugas de agua sin romper paredes?", answer: "Utilizamos equipos de detección por ultrasonido (geófonos) y cámaras termográficas que identifican la ubicación exacta de la fuga con precisión milimétrica, sin necesidad de obras destructivas. Solo se abre el punto específico detectado." },
    { question: "¿Qué tipos de calentadores instalan?", answer: "Instalamos calentadores a gas (instantáneos y de acumulación), termos eléctricos, calderas de condensación y sistemas de aerotermia. Evaluamos tu consumo diario y la presión de agua para recomendarte la opción más eficiente y económica a largo plazo." },
    { question: "¿Ofrecen servicio de urgencias 24 horas?", answer: "Sí, atendemos urgencias de fontanería como roturas de tuberías, inundaciones, atascos graves y fugas de gas. Contáctanos por WhatsApp para respuesta en menos de 2 horas en Valencia, San Diego y Caracas." },
    { question: "¿Cuánto cuesta desatascar una tubería?", answer: "El coste depende de la gravedad, profundidad y ubicación del atasco. Realizamos inspección con cámara CCTV primero para diagnosticar el problema exacto y presupuestar antes de intervenir. Sin sorpresas ni cobros adicionales." },
    { question: "¿Hacen instalaciones completas para edificios?", answer: "Sí, diseñamos e instalamos redes hidrosanitarias completas para edificios residenciales y comerciales. Incluimos cálculo hidráulico, instalación de bombas, tanques, montantes y conexiones a red municipal con certificación." },
  ]} />

  <!-- CTA -->
  <section class="cta-section">
    <div class="cta-wrapper">
      <h2 class="cta-title">¿Necesitas un <span class="gold">fontanero de confianza</span>?</h2>
      <p class="cta-text">Fugas, atascos, instalaciones o mantenimiento. Respondemos rápido con presupuesto sin compromiso.</p>
      <a href="https://wa.me/584129449929?text=Hola,%20necesito%20servicio%20de%20fontaner%C3%ADa" class="btn-premium" target="_blank" rel="noopener">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp Directo
      </a>
    </div>
  </section>

</BaseLayout>`
  );

  writeFileSync(file, c);
  console.log('✅ fontaneria-plomeria expandida');
}

// ═══════════════════════════════════════════
// 2. INSTALACION-PISOS (508 → ~950 words)
// ═══════════════════════════════════════════
{
  const file = BASE + 'instalacion-pisos.astro';
  let c = readFileSync(file, 'utf-8');

  c = c.replace(
    `<h2>Instalación de Suelos Vinílicos y Laminados</h2>
<p>Los suelos vinílicos SPC y laminados son la opción perfecta para quienes buscan calidez y rapidez de instalación. Utilizamos sistemas de clic de última generación que permiten una instalación limpia, sin obras y con acabado flotante de alta estabilidad.</p>
<img src="/images/suelo-laminado-madera.webp" alt="Suelo laminado imitación madera" loading="lazy" decoding="async" />`,
    `<h2>Instalación de Suelos Vinílicos y Laminados</h2>
<p>Los suelos vinílicos SPC y laminados son la opción perfecta para quienes buscan calidez y rapidez de instalación. Utilizamos sistemas de clic de última generación que permiten una instalación limpia, sin obras y con acabado flotante de alta estabilidad. Ideales para dormitorios, salas y oficinas donde se busca confort térmico y acústico.</p>
<p>Los suelos SPC (Stone Polymer Composite) combinan la estética de la madera con resistencia total al agua, lo que los hace aptos incluso para cocinas y baños. Los laminados de alta presión (HPL) ofrecen resistencia AC4/AC5 para zonas de alto tráfico residencial y comercial.</p>
<img src="/images/suelo-laminado-madera.webp" alt="Suelo laminado imitación madera instalado en sala moderna" loading="lazy" decoding="async" />

<h2>Preparación del Soporte: La Clave del Éxito</h2>
<p>El 80% de los problemas en suelos instalados se deben a una mala preparación del soporte. En RemodelaT dedicamos el tiempo necesario a esta fase crítica:</p>
<ul>
<li><strong>Nivelación:</strong> Aplicamos pasta autonivelante cuando las irregularidades superan los 3 mm por metro lineal. Usamos productos Weber y Sika con secado rápido.</li>
<li><strong>Impermeabilización:</strong> En plantas bajas y zonas húmedas, aplicamos barrera de vapor y membrana impermeabilizante antes de la instalación.</li>
<li><strong>Base aislante:</strong> Colocamos underlay de polietileno expandido o corcho natural para aislamiento acústico y térmico en suelos flotantes.</li>
<li><strong>Verificación de humedad:</strong> Medimos la humedad residual del soporte con higrómetro. No instalamos hasta que los valores sean óptimos (&lt;2% CM).</li>
</ul>

<h2>Nuestro Proceso de Instalación</h2>
<h3>1. Visita Técnica y Medición</h3>
<p>Medimos el espacio con láser, verificamos escuadras, desniveles y puntos críticos. Calculamos material con un 8-10% de merma según el formato y el patrón de instalación.</p>
<h3>2. Preparación del Subsuelo</h3>
<p>Demolición del pavimento existente si aplica, limpieza, reparación de grietas y aplicación de autonivelante. Tiempo de secado: 24-48 horas según producto.</p>
<h3>3. Instalación del Pavimento</h3>
<p>Colocación según técnica específica: adherido con cemento cola C2TE para porcelanato, sistema clic para laminados/vinílicos, o clavado/encolado para madera. Juntas de dilatación perimetrales de 8-10 mm.</p>
<h3>4. Rodapiés y Remates</h3>
<p>Instalación de rodapiés a juego (MDF lacado, PVC o madera), perfiles de transición entre estancias y sellado de juntas con silicona o masilla epoxi según material.</p>
<h3>5. Limpieza y Entrega</h3>
<p>Limpieza profesional post-obra, tratamiento inicial de sellado (para piedra natural) y entrega con instrucciones de mantenimiento.</p>

<h2>Marcas y Materiales Recomendados</h2>
<ul>
<li><strong>Porcelanato:</strong> Porcelanosa, Marazzi, Roca y Vencerámica (formatos hasta 120x240 cm)</li>
<li><strong>Laminados:</strong> Quick-Step, Pergo y Kronotex (clase AC4/AC5, garantía 25 años)</li>
<li><strong>Vinílicos SPC:</strong> Coretec, Berry Alloc y Gerflor (100% impermeables, clic Unilin)</li>
<li><strong>Madera:</strong> Roble europeo, teca y ipé con acabado al aceite o barniz UV</li>
<li><strong>Adhesivos:</strong> Weber Col Flex, Mapei Keraflex y Sika Ceram para máxima adherencia</li>
</ul>`
  );

  // Move FAQ inside BaseLayout + expand
  c = c.replace(
    `</BaseLayout>
<FAQ items={[
{ question: "¿Qué tipo de suelo es más duradero?", answer: "El porcelanato es el suelo más duradero: resistente a rayaduras, manchas y humedad. Le sigue el gres porcelánico técnico y los suelos vinílicos SPC de alta gama." },
{ question: "¿Puedo instalar suelo laminado sobre cerámica existente?", answer: "Sí, siempre que la superficie esté nivelada. Colocamos una base aislante sobre el suelo existente, lo que reduce costes de demolición y tiempo de obra." },
{ question: "¿Cuánto tiempo toma instalar el suelo de una vivienda?", answer: "Para una vivienda de 80-100 m², la instalación toma entre 3 y 5 días, incluyendo preparación del subsuelo, instalación y colocación de rodapiés." },
{ question: "¿Qué garantía ofrecen en la instalación de suelos?", answer: "Ofrecemos 2 años de garantía en instalación y la garantía del fabricante en materiales. La nivelación y adherencia están cubiertas durante todo el período." },
]} />`,
    `<FAQ items={[
    { question: "¿Qué tipo de suelo es más duradero?", answer: "El porcelanato técnico es el más duradero: resistente a rayaduras, manchas, humedad y tráfico intenso. Le siguen el gres porcelánico esmaltado y los suelos vinílicos SPC de alta gama con capa de uso de 0.55 mm o superior." },
    { question: "¿Puedo instalar suelo laminado sobre cerámica existente?", answer: "Sí, siempre que la superficie esté nivelada (máximo 3 mm de irregularidad por metro). Colocamos una base aislante de polietileno sobre el suelo existente, lo que reduce costes de demolición y tiempo de obra en un 40%." },
    { question: "¿Cuánto tiempo toma instalar el suelo de una vivienda completa?", answer: "Para una vivienda de 80-100 m², la instalación toma entre 3 y 5 días: 1-2 días de preparación del subsuelo, 2-3 días de instalación del pavimento y 1 día de rodapiés y remates finales." },
    { question: "¿Qué garantía ofrecen en la instalación de suelos?", answer: "Ofrecemos 2 años de garantía en mano de obra (nivelación, adherencia y juntas) más la garantía del fabricante en materiales (hasta 25 años en laminados Quick-Step y Pergo)." },
    { question: "¿Instalan porcelanato de gran formato?", answer: "Sí, somos especialistas en porcelanato de gran formato (hasta 160x320 cm). Utilizamos ventosas industriales, sistemas de nivelación con cuñas y adhesivos deformables C2S1 para garantizar una instalación perfecta sin lippage." },
  ]} />

</BaseLayout>`
  );

  writeFileSync(file, c);
  console.log('✅ instalacion-pisos expandida');
}

// ═══════════════════════════════════════════
// 3. PISCINAS-MANTENIMIENTO (549 → ~950 words)
// ═══════════════════════════════════════════
{
  const file = BASE + 'piscinas-mantenimiento.astro';
  let c = readFileSync(file, 'utf-8');

  c = c.replace(
    `<h2>Tratamiento y Calidad del Agua</h2>
<p>Instalamos sistemas de cloración salina, dosificadores automáticos de pH y sistemas UV que reducen el uso de químicos. El agua de tu piscina siempre cristalina y segura para tu familia.</p>
<img src="/images/piscinas-mantenimiento.webp" alt="Mantenimiento de piscinas" loading="lazy" decoding="async" />`,
    `<h2>Tratamiento y Calidad del Agua</h2>
<p>Instalamos sistemas de cloración salina, dosificadores automáticos de pH y sistemas UV que reducen el uso de químicos hasta en un 80%. El agua de tu piscina siempre cristalina, sin olor a cloro y segura para niños y personas con piel sensible.</p>
<p>La cloración salina genera cloro natural a partir de sal común disuelta en el agua. El resultado es un agua suave, sin irritación ocular y con mantenimiento mínimo: solo necesitas añadir sal 2-3 veces al año.</p>
<img src="/images/piscinas-mantenimiento.webp" alt="Técnico realizando mantenimiento de piscina con equipos profesionales" loading="lazy" decoding="async" />

<h2>Impermeabilización y Acabados</h2>
<p>La estanqueidad de una piscina depende de un sistema de impermeabilización multicapa correctamente aplicado. Utilizamos morteros impermeabilizantes flexibles (tipo Sika Top Seal o Weber Dry) sobre el vaso de hormigón, seguidos de los acabados decorativos:</p>
<ul>
<li><strong>Gresite vítreo:</strong> El acabado clásico y más duradero. Mosaico de vidrio en mallas de 30x30 cm con junta epoxi. Resistente a químicos UV y con vida útil superior a 20 años.</li>
<li><strong>Liner armado (PVC 150/100):</strong> Membrana armada de PVC plastificado soldada in situ. Ideal para rehabilitación de piscinas con fugas. Instalación rápida y garantía de estanqueidad de 10 años.</li>
<li><strong>Pintura de caucho clorado:</strong> Opción económica para piscinas de hormigón. Requiere reaplicación cada 3-5 años pero es la solución más accesible.</li>
<li><strong>Poliéster reforzado con fibra de vidrio:</strong> Acabado monolítico sin juntas, ideal para formas libres y piscinas desbordantes.</li>
</ul>

<h2>Nuestro Proceso de Construcción</h2>
<h3>1. Diseño y Proyecto Técnico</h3>
<p>Levantamiento topográfico, diseño 3D de la piscina, cálculo estructural del vaso y dimensionamiento del sistema de filtración según volumen y uso previsto.</p>
<h3>2. Excavación y Estructura</h3>
<p>Excavación mecánica, encofrado, armado de ferralla y hormigonado del vaso con hormigón impermeable HA-30. Tiempo de curado: 28 días antes de continuar.</p>
<h3>3. Instalaciones Hidráulicas</h3>
<p>Colocación de skimmers, boquillas de impulsión, sumidero de fondo, tuberías de PVC presión y conexión a sala de máquinas con bomba y filtro.</p>
<h3>4. Impermeabilización y Acabado</h3>
<p>Aplicación del sistema impermeabilizante, instalación del acabado elegido (gresite, liner o poliéster) y sellado de juntas con productos específicos.</p>
<h3>5. Puesta en Marcha</h3>
<p>Llenado, ajuste de pH, tratamiento de choque, calibración de equipos y entrega con manual de mantenimiento y formación al propietario.</p>

<h2>Equipos y Marcas de Referencia</h2>
<ul>
<li><strong>Bombas:</strong> Hayward Super Pump, AstralPool Victoria Plus y Kripsol KS (velocidad variable para ahorro energético)</li>
<li><strong>Filtros:</strong> Filtros de arena de vidrio activo AFM (40% más eficientes que arena sílice), marcas AstralPool y Hayward</li>
<li><strong>Cloración salina:</strong> Zodiac Ei, BSV y AstralPool Sel Clear con producción de 6-25 g/h según volumen</li>
<li><strong>Iluminación:</strong> Focos LED RGB sumergibles AstralPool y Hayward con control por app</li>
<li><strong>Cubiertas:</strong> Cubiertas telescópicas Abrisud y cubiertas de seguridad homologadas NF P90-308</li>
</ul>`
  );

  // Move FAQ inside + expand
  c = c.replace(
    `</BaseLayout>
<FAQ items={[
{ question: "¿Cuánto cuesta construir una piscina residencial?", answer: "El coste varía según tamaño, materiales y equipamiento. Una piscina de obra de 6x3 m con equipo de filtración completo parte desde un presupuesto que podemos detallar sin compromiso." },
{ question: "¿Qué sistema de filtración recomiendan?", answer: "Recomendamos sistemas de filtración con bomba de velocidad variable y filtro de vidrio activo. Consumen menos energía, filtran mejor y reducen el uso de productos químicos." },
{ question: "¿Ofrecen mantenimiento periódico de piscinas?", answer: "Sí, ofrecemos planes de mantenimiento semanal o quincenal que incluyen control de pH, limpieza de fondo y paredes, revisión de equipos y tratamiento del agua." },
{ question: "¿Cuánto tarda la construcción de una piscina?", answer: "La construcción de una piscina de obra toma entre 4 y 8 semanas, dependiendo del tamaño, la complejidad del terreno y los acabados seleccionados." },
]} />`,
    `<FAQ items={[
    { question: "¿Cuánto cuesta construir una piscina residencial en Venezuela?", answer: "El coste varía según tamaño, materiales y equipamiento. Una piscina de obra de 6x3 m con equipo de filtración completo, gresite y cloración salina parte desde $8,000-$15,000. Elaboramos presupuesto detallado sin compromiso tras visita técnica." },
    { question: "¿Qué sistema de filtración recomiendan?", answer: "Recomendamos bomba de velocidad variable (ahorra hasta 70% de electricidad) con filtro de vidrio activo AFM (filtra partículas de hasta 5 micras). Combinado con cloración salina, reduces el uso de químicos en un 80%." },
    { question: "¿Ofrecen planes de mantenimiento periódico?", answer: "Sí, ofrecemos planes semanales o quincenales que incluyen: análisis y ajuste de pH/cloro, limpieza de fondo y paredes con robot, retrolavado del filtro, revisión de bomba y sellados, y reporte fotográfico mensual." },
    { question: "¿Cuánto tarda la construcción completa de una piscina?", answer: "Una piscina de obra estándar de 6x3 m toma entre 6 y 10 semanas: 1 semana de excavación, 2 de estructura y hormigonado, 4 semanas de curado, 2-3 de instalaciones e impermeabilización, y 1 semana de acabados y puesta en marcha." },
    { question: "¿Pueden reparar una piscina con fugas?", answer: "Sí. Realizamos detección de fugas con tinte fluorescente y pruebas de presión sectorizadas. Una vez localizada la fuga, reparamos con inyección de resina epoxi, sustitución de liner o reimpermeabilización del vaso según el caso." },
  ]} />

</BaseLayout>`
  );

  writeFileSync(file, c);
  console.log('✅ piscinas-mantenimiento expandida');
}

// ═══════════════════════════════════════════
// 4. REVESTIMIENTOS-PARED (518 → ~950 words)
// ═══════════════════════════════════════════
{
  const file = BASE + 'revestimientos-pared.astro';
  let c = readFileSync(file, 'utf-8');

  c = c.replace(
    `<h2>Microcemento y Piedra Natural</h2>
<p>El microcemento ofrece un acabado continuo, sin juntas, ideal para baños, cocinas y espacios comerciales. La piedra natural aporta exclusividad y durabilidad extrema. Ambos requieren instalación especializada que garantizamos.</p>
<img src="/images/revestimiento-microcemento.webp" alt="Revestimiento de microcemento" loading="lazy" decoding="async" />`,
    `<h2>Microcemento: Continuidad y Diseño</h2>
<p>El microcemento es un revestimiento decorativo de 2-3 mm de espesor que se aplica sobre cualquier superficie existente (azulejos, hormigón, yeso) sin necesidad de demolición. Su acabado continuo sin juntas crea espacios visualmente amplios y fáciles de limpiar.</p>
<p>Aplicamos microcemento de la marca Topciment (fabricante español líder) con sistema completo: imprimación, dos capas de base, dos capas de acabado y sellado con poliuretano al agua. Disponible en más de 40 colores con acabados mate, satinado o brillante.</p>
<p>Ideal para baños (paredes y suelos de ducha), cocinas (salpicaderos y encimeras), escaleras, muebles y espacios comerciales de alto diseño.</p>
<img src="/images/revestimiento-microcemento.webp" alt="Pared de microcemento en baño moderno con acabado continuo sin juntas" loading="lazy" decoding="async" />

<h2>Piedra Natural y Sintética</h2>
<p>La piedra natural aporta exclusividad, textura y una durabilidad que supera los 50 años. Trabajamos con mármol, travertino, pizarra, cuarcita y granito en formatos de placa y modular. Cada pieza es seleccionada y numerada para garantizar la continuidad de vetas y tonos.</p>
<p>Para proyectos con presupuesto ajustado, ofrecemos piedra sinterizada (Neolith, Dekton) y paneles de poliuretano de alta densidad que replican piedra, ladrillo y madera con peso reducido y montaje en seco.</p>

<h2>Nuestro Proceso de Instalación</h2>
<h3>1. Evaluación del Soporte</h3>
<p>Verificamos planimetría, adherencia y humedad de la pared existente. En soportes deficientes, aplicamos mortero de regularización o placa de yeso laminado como base.</p>
<h3>2. Selección y Replanteo</h3>
<p>Presentamos las piezas en seco, definimos el punto de inicio y el patrón de colocación. En piedra natural, numeramos cada pieza para controlar la continuidad de vetas.</p>
<h3>3. Instalación</h3>
<p>Colocación con adhesivo cementoso deformable C2S1 (para porcelanato y piedra) o sistema de anclaje mecánico (para placas de gran formato). Juntas mínimas de 1-2 mm con crucetas de nivelación.</p>
<h3>4. Sellado y Acabado</h3>
<p>Rejuntado con masilla epoxi (zonas húmedas) o cementosa mejorada CG2. En piedra natural, aplicación de hidrofugante penetrante anti-manchas. En microcemento, sellado con poliuretano bicomponente.</p>
<h3>5. Protección y Entrega</h3>
<p>Protección de superficies con film y cartón hasta la entrega. Limpieza final con productos específicos según material y guía de mantenimiento para el cliente.</p>

<h2>Marcas y Materiales</h2>
<ul>
<li><strong>Porcelanato:</strong> Porcelanosa, Marazzi, Atlas Concorde y Roca (formatos XL hasta 160x320 cm)</li>
<li><strong>Microcemento:</strong> Topciment (sistema completo con garantía 10 años)</li>
<li><strong>Piedra natural:</strong> Mármol Carrara, Travertino Romano, Pizarra negra y Cuarcita Taj Mahal</li>
<li><strong>Superficies sinterizadas:</strong> Neolith y Dekton (resistentes a UV, calor y rayado)</li>
<li><strong>Wall panels:</strong> Orac Decor, NMC y paneles 3D de PVC con acabado pintable</li>
</ul>`
  );

  // Move FAQ inside + expand
  c = c.replace(
    `</BaseLayout>
<FAQ items={[
{ question: "¿Qué diferencia hay entre porcelanato y cerámica?", answer: "El porcelanato es más denso, resistente y con menor absorción de agua que la cerámica. Es ideal para zonas de alto tráfico y exteriores por su durabilidad superior." },
{ question: "¿Instalan porcelanato de gran formato?", answer: "Sí, somos especialistas en porcelanato de gran formato (hasta 320x160 cm). Usamos sistemas de nivelación profesional para garantizar una instalación perfecta sin lippage." },
{ question: "¿Qué son los wall panels?", answer: "Son paneles decorativos 3D de PVC, madera o yeso que transforman paredes lisas en superficies con textura y relieve. Ideales para crear paredes de acento." },
{ question: "¿El microcemento necesita mantenimiento especial?", answer: "El microcemento sellado requiere limpieza con productos neutros y una reaplicación de sellador cada 2-3 años en zonas de alto uso para mantener su aspecto impecable." },
]} />`,
    `<FAQ items={[
    { question: "¿Qué diferencia hay entre porcelanato y cerámica para paredes?", answer: "El porcelanato tiene absorción de agua inferior al 0.5% (vs 3-10% de la cerámica), mayor resistencia al rayado y disponibilidad en formatos XL. Para paredes de ducha y zonas húmedas, el porcelanato es la opción superior por su impermeabilidad." },
    { question: "¿Instalan porcelanato de gran formato en paredes?", answer: "Sí, instalamos porcelanato de gran formato (hasta 160x320 cm) en paredes con adhesivo deformable C2S1 y sistemas de anclaje mecánico de seguridad. Usamos ventosas industriales y ventosas de vacío para manipulación segura." },
    { question: "¿Qué son los wall panels y dónde se usan?", answer: "Son paneles decorativos 3D de PVC, poliuretano, madera o yeso que transforman paredes lisas en superficies con textura y relieve. Se instalan en seco con adhesivo de montaje. Ideales para cabeceros, paredes de TV, recepciones y locales comerciales." },
    { question: "¿El microcemento se puede aplicar sobre azulejos existentes?", answer: "Sí, esa es una de sus grandes ventajas. Se aplica directamente sobre azulejos, gres, hormigón o yeso con una imprimación especial de adherencia. Sin demolición, sin escombros y en 3-4 días tienes un acabado completamente nuevo." },
    { question: "¿Cuánto cuesta revestir una pared con microcemento?", answer: "El precio del microcemento aplicado (material + mano de obra) oscila entre $45-$80/m² según el estado del soporte, el número de capas y el acabado elegido. Incluye imprimación, 4 capas de producto y sellado con poliuretano." },
  ]} />

</BaseLayout>`
  );

  writeFileSync(file, c);
  console.log('✅ revestimientos-pared expandida');
}

// ═══════════════════════════════════════════
// 5. REMODELACION-INTEGRAL (991 → ~1300 words)
// ═══════════════════════════════════════════
{
  const file = BASE + 'remodelacion-integral.astro';
  let c = readFileSync(file, 'utf-8');

  c = c.replace(
    `<h2>Gestión de Permisos y Licencias</h2>
<p>Nos encargamos de toda la burocracia: proyecto técnico, solicitud de licencias, tasas municipales y coordinación con comunidades de vecinos. Tú solo disfruta del resultado.</p>
<img src="/images/integrales-antes-despues.webp" alt="Antes y después de remodelación integral" loading="lazy" decoding="async" />`,
    `<h2>Gestión de Permisos y Licencias</h2>
<p>Nos encargamos de toda la burocracia: proyecto técnico, solicitud de licencias de obra menor y mayor, tasas municipales, coordinación con comunidades de vecinos y seguros de responsabilidad civil. Tú solo disfruta del resultado sin preocuparte por trámites.</p>
<p>En Venezuela gestionamos los permisos ante las alcaldías correspondientes (Chacao, Baruta, El Hatillo, Sucre, Valencia, San Diego) y coordinamos con las juntas de condominio para cumplir horarios de obra, protección de áreas comunes y normas de convivencia.</p>
<img src="/images/integrales-antes-despues.webp" alt="Comparativa antes y después de remodelación integral de apartamento" loading="lazy" decoding="async" />

<h2>¿Qué Incluye una Remodelación Integral?</h2>
<p>Nuestro servicio llave en mano cubre absolutamente todas las etapas del proyecto:</p>
<ul>
<li><strong>Diseño y proyecto:</strong> Levantamiento de planos, diseño 3D fotorrealista, memoria de calidades y presupuesto cerrado por partidas</li>
<li><strong>Demolición y desescombro:</strong> Retiro de pavimentos, revestimientos, tabiquería e instalaciones existentes con gestión de residuos en vertedero autorizado</li>
<li><strong>Albañilería:</strong> Nueva tabiquería, trasdosados, falsos techos de pladur, recrecidos y regularización de superficies</li>
<li><strong>Instalación eléctrica:</strong> Nueva distribución de circuitos, cuadro eléctrico, cableado libre de halógenos, mecanismos y puntos de luz LED</li>
<li><strong>Fontanería:</strong> Sustitución completa de tuberías de agua fría/caliente, desagües, llaves de paso y sanitarios</li>
<li><strong>Climatización:</strong> Preinstalación de aire acondicionado por conductos o splits, ventilación mecánica y extracción en baños/cocina</li>
<li><strong>Carpintería:</strong> Puertas interiores, armarios empotrados, frentes de armario y carpintería exterior si aplica</li>
<li><strong>Acabados:</strong> Pintura plástica lisa, instalación de suelos, alicatados, revestimientos decorativos y molduras</li>
<li><strong>Limpieza final:</strong> Limpieza profesional post-obra con entrega lista para habitar</li>
</ul>

<h2>Cronograma Tipo de una Remodelación</h2>
<p>Para un apartamento de 80-120 m², el cronograma estimado es:</p>
<ul>
<li><strong>Semanas 1-2:</strong> Diseño, permisos y acopio de materiales</li>
<li><strong>Semanas 3-4:</strong> Demolición, desescombro y nueva tabiquería</li>
<li><strong>Semanas 5-7:</strong> Instalaciones (eléctrica, fontanería, climatización)</li>
<li><strong>Semanas 8-10:</strong> Albañilería, falsos techos y regularización</li>
<li><strong>Semanas 11-14:</strong> Acabados (suelos, alicatados, pintura, carpintería)</li>
<li><strong>Semana 15:</strong> Instalación de sanitarios, grifería, iluminación y limpieza final</li>
</ul>
<p>Cada proyecto incluye cronograma detallado con hitos de seguimiento y reuniones semanales de avance con el cliente.</p>`
  );

  // Move FAQ inside + expand
  c = c.replace(
    `</BaseLayout>
<FAQ items={[
{ question: "¿Qué incluye una remodelación integral?", answer: "Incluye diseño del proyecto, gestión de permisos, demolición, albañilería, instalaciones (eléctrica, fontanería, climatización), acabados, carpintería y limpieza final. Todo llave en mano." },
{ question: "¿Cuánto tiempo toma una remodelación integral de vivienda?", answer: "Una remodelación integral de vivienda de 80-120 m² toma entre 3 y 5 meses. Elaboramos un cronograma detallado con hitos de seguimiento para que estés informado en todo momento." },
{ question: "¿Necesito desalojar la vivienda durante la remodelación?", answer: "En remodelaciones integrales completas, generalmente sí. Podemos planificar la obra por fases si necesitas permanecer en parte de la vivienda, aunque alarga los plazos." },
{ question: "¿Ofrecen financiación para remodelaciones integrales?", answer: "Trabajamos con entidades financieras que ofrecen financiación para remodelaciones con condiciones ventajosas. Te orientamos sobre las opciones disponibles al presupuestar." },
{ question: "¿Gestionan los permisos y licencias de obra?", answer: "Sí, nos encargamos de toda la gestión: proyecto técnico, solicitud de licencias, tasas municipales y coordinación con la comunidad de vecinos si aplica." },
]} />`,
    `<FAQ items={[
    { question: "¿Qué incluye exactamente una remodelación integral llave en mano?", answer: "Incluye diseño 3D del proyecto, gestión de permisos y licencias, demolición y desescombro, albañilería, instalaciones completas (eléctrica, fontanería, climatización), carpintería, acabados (suelos, pintura, alicatados) y limpieza final. Entregamos la vivienda lista para habitar." },
    { question: "¿Cuánto tiempo toma una remodelación integral de 100 m²?", answer: "Entre 3 y 5 meses según la complejidad. Un apartamento de 100 m² con redistribución de tabiquería y cambio completo de instalaciones toma aproximadamente 14-16 semanas. Entregamos cronograma detallado con hitos semanales." },
    { question: "¿Necesito desalojar la vivienda durante la obra?", answer: "En remodelaciones integrales completas, sí es recomendable. Si necesitas permanecer, podemos planificar la obra por fases (zona día / zona noche), aunque esto alarga los plazos un 30-40% y encarece por la logística de protección." },
    { question: "¿Ofrecen financiación o pago por fases?", answer: "Sí. Estructuramos el pago en hitos: 30% al inicio, 30% a mitad de obra, 30% en acabados y 10% a la entrega final. Para proyectos superiores a $20,000, podemos gestionar financiación a 12-24 meses con entidades aliadas." },
    { question: "¿Gestionan los permisos de condominio y alcaldía?", answer: "Sí, nos encargamos de todo: proyecto técnico visado, solicitud de licencia de obra ante la alcaldía correspondiente, pago de tasas, seguro de responsabilidad civil y coordinación con la junta de condominio para horarios y protección de áreas comunes." },
  ]} />

</BaseLayout>`
  );

  writeFileSync(file, c);
  console.log('✅ remodelacion-integral expandida');
}

console.log('\n🎉 5 páginas expandidas correctamente');
