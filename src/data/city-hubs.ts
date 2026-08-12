export type CityHubCopy = {
  slug: string;
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  introTitle: string;
  intro: string;
  zones: string[];
  watermark: string;
  heroImage: string;
  introImage: string;
  waText: string;
  testimonials: { name: string; location: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const cityHubsEs: Record<string, CityHubCopy> = {
  naguanagua: {
    slug: 'naguanagua',
    name: 'Naguanagua',
    title: 'Remodelaciones en Naguanagua | Carabobo 2026',
    description: 'Remodelación de casas y apartamentos en Naguanagua, El Trigal, La Trigaleña y Vistahermosa. Cocinas, baños e integrales con garantía escrita.',
    eyebrow: 'Carabobo · Naguanagua',
    lead: 'Obras grandes en quintas y residencias de Naguanagua: especificación técnica, supervisión de obra y acabados que duran.',
    introTitle: 'Base operativa junto a Valencia y San Diego',
    intro: 'Naguanagua es una de nuestras zonas primarias. Conocemos El Trigal, La Trigaleña, Vistahermosa y las normativas de condominio de las urbanizaciones del municipio.',
    zones: ['El Trigal', 'La Trigaleña', 'Vistahermosa', 'Tarapío', 'Mañongo (límite)', 'Centro de Naguanagua'],
    watermark: 'NAGUANAGUA',
    heroImage: '/images/cocina-800.webp',
    introImage: '/images/cocina-terminada-final.webp',
    waText: 'Hola,%20quiero%20presupuesto%20en%20Naguanagua',
    testimonials: [
      { name: 'Gabriela Hernández', location: 'Naguanagua, Carabobo', text: 'Renovaron el baño de mi casa. Comunicación clara y acabados de primera.' },
      { name: 'Ricardo Peña', location: 'El Trigal, Naguanagua', text: 'La integral se ejecutó por partidas. Sin improvisación y con pruebas antes de cerrar.' },
      { name: 'Laura Campos', location: 'La Trigaleña', text: 'Cocina a medida y pisos de gran formato. El detalle de las juntas se nota.' },
    ],
    faqs: [
      { question: '¿Trabajan en El Trigal y La Trigaleña?', answer: 'Sí. El Trigal y La Trigaleña son zona primaria: mismas cuadrillas, mismos plazos y misma garantía que en San Diego o Valencia.' },
      { question: '¿Cuánto tarda una obra en Naguanagua?', answer: 'Cocina o baño 2-4 semanas. Integral 6-12 semanas, con cronograma por partidas.' },
      { question: '¿Gestionan permisos de condominio?', answer: 'Sí. Coordinamos horarios de carga, fachada y juntas de condominio en las urbanizaciones del municipio.' },
    ],
  },
  guacara: {
    slug: 'guacara',
    name: 'Guacara',
    title: 'Remodelaciones en Guacara | Carabobo 2026',
    description: 'Remodelaciones residenciales en Guacara y urbanizaciones del este de Carabobo. Integrales, cocinas y baños con método técnico y garantía.',
    eyebrow: 'Carabobo · Guacara',
    lead: 'Remodelamos viviendas en Guacara con el mismo estándar de San Diego y Valencia: materiales especificados y entrega documentada.',
    introTitle: 'Cobertura real en el este de Carabobo',
    intro: 'Guacara es zona primaria. Atendemos quintas, casas y apartamentos con equipo propio, sin subcontratas y con presupuesto cerrado.',
    zones: ['Guacara Centro', 'Ciudad Alianza', 'Yagua (límite)', 'Urbanizaciones del este', 'Viviendas unifamiliares', 'Quintas'],
    watermark: 'GUACARA',
    heroImage: '/images/integrales-800.webp',
    introImage: '/images/arquitectura-600.webp',
    waText: 'Hola,%20quiero%20presupuesto%20en%20Guacara',
    testimonials: [
      { name: 'Héctor Rivas', location: 'Guacara', text: 'Integral de casa completa. El cronograma se cumplió y la impermeabilización quedó documentada.' },
      { name: 'Patricia Núñez', location: 'Guacara, Carabobo', text: 'Baños y cocina. Eligieron el adhesivo según el porcelanato, no el pego genérico.' },
      { name: 'Daniela Ortiz', location: 'Este de Carabobo', text: 'Respuesta rápida desde San Diego. Visita técnica y presupuesto por partidas.' },
    ],
    faqs: [
      { question: '¿Van a Guacara desde San Diego?', answer: 'Sí. Guacara es zona primaria: desplazamiento incluido, sin recargos ocultos.' },
      { question: '¿Hacen integrales de quinta?', answer: 'Sí. Coordinamos oficios, instalaciones y acabados en viviendas unifamiliares de alto valor.' },
      { question: '¿Formas de pago?', answer: 'USD efectivo, BCV, Zelle, PayPal y Pago Móvil. Condiciones por escrito en el presupuesto.' },
    ],
  },
  'el-trigal': {
    slug: 'el-trigal',
    name: 'El Trigal',
    title: 'Remodelaciones en El Trigal | Naguanagua 2026',
    description: 'Remodelación de casas y apartamentos en El Trigal y La Trigaleña, Naguanagua. Cocinas, baños e integrales con supervisión técnica.',
    eyebrow: 'Naguanagua · El Trigal',
    lead: 'El Trigal es zona primaria. Reformamos residencias y apartamentos con materiales compatibles, pruebas ocultas y garantía escrita.',
    introTitle: 'Conocemos El Trigal y La Trigaleña',
    intro: 'Trabajamos a diario en El Trigal: condominios, casas y reformas de baño/cocina. Coordinamos permisos, horarios de obra y acabados de alto estándar.',
    zones: ['El Trigal', 'La Trigaleña', 'Vistahermosa (cercano)', 'Naguanagua', 'Tarapío', 'Mañongo'],
    watermark: 'EL TRIGAL',
    heroImage: '/images/bano-800.webp',
    introImage: '/images/cocina-terminada-final.webp',
    waText: 'Hola,%20quiero%20presupuesto%20en%20El%20Trigal',
    testimonials: [
      { name: 'Ricardo Peña', location: 'El Trigal', text: 'Integral por partidas. Sin improvisación y con pruebas antes de cerrar paredes.' },
      { name: 'Mariana Díaz', location: 'El Trigal, Naguanagua', text: 'Baño tipo spa. Pendientes e impermeabilización revisadas antes del porcelanato.' },
      { name: 'Andrés Silva', location: 'La Trigaleña', text: 'Cocina y pisos. El equipo respetó las normas del condominio.' },
    ],
    faqs: [
      { question: '¿El Trigal es zona de cobertura principal?', answer: 'Sí. Está en el núcleo comercial junto a San Diego, Valencia, Naguanagua, Guacara y Guataparo.' },
      { question: '¿También atienden La Trigaleña?', answer: 'Sí. Misma cuadrilla y mismo método. Hay página de proyecto de baño en La Trigaleña.' },
      { question: '¿Tiempos típicos?', answer: 'Baño 2-4 semanas. Cocina 3-5. Integral según metraje, con cronograma cerrado.' },
    ],
  },
  guataparo: {
    slug: 'guataparo',
    name: 'Guataparo',
    title: 'Remodelaciones en Guataparo | Valencia 2026',
    description: 'Remodelación de quintas y residencias en Guataparo, Valencia. Cocinas de lujo, baños e integrales con estándar europeo y garantía.',
    eyebrow: 'Valencia · Guataparo',
    lead: 'Quintas y residencias en Guataparo: acabados de alto estándar, instalaciones probadas y entrega documentada.',
    introTitle: 'Obras de alto valor en Guataparo',
    intro: 'Guataparo es zona primaria. Ejecutamos integrales, cocinas de lujo y baños en quintas con supervisión directa y materiales especificados.',
    zones: ['Guataparo Country', 'Laguna de Guataparo', 'Quintas residenciales', 'El Viñedo (cercano)', 'Prebo (cercano)', 'Valencia'],
    watermark: 'GUATAPARO',
    heroImage: '/images/cocina-isla-central.webp',
    introImage: '/images/integrales-800.webp',
    waText: 'Hola,%20quiero%20presupuesto%20en%20Guataparo',
    testimonials: [
      { name: 'Familia R.', location: 'Guataparo', text: 'Cocina de lujo y revestimientos. El detalle de cortes y encuentros es otro nivel.' },
      { name: 'Carlos M.', location: 'Quinta en Guataparo', text: 'Integral con cronograma real. Instalaciones revisadas antes de los acabados.' },
      { name: 'Elena V.', location: 'Guataparo, Valencia', text: 'Baños y pisos de gran formato. Sin fisuras a los meses, que era lo que temíamos.' },
    ],
    faqs: [
      { question: '¿Hacen cocinas de lujo en Guataparo?', answer: 'Sí. Hay caso publicado de cocina de lujo en Guataparo: mobiliario a medida, superficies y herrajes de alta resistencia.' },
      { question: '¿Atienden quintas completas?', answer: 'Sí. Coordinamos oficios, piscinas/exteriores cuando aplica, y acabados de alto valor.' },
      { question: '¿Hay visita técnica?', answer: 'Sí. Valoramos alcance, metraje y nivel de acabado. Si encaja con el estándar, presupuesto por partidas.' },
    ],
  },
};

export const cityHubsEn: Record<string, CityHubCopy> = {
  naguanagua: {
    slug: 'naguanagua',
    name: 'Naguanagua',
    title: 'Remodeling in Naguanagua | Carabobo 2026',
    description: 'Home remodeling in Naguanagua, El Trigal and La Trigaleña. Kitchens, bathrooms and whole-home projects with a written warranty.',
    eyebrow: 'Carabobo · Naguanagua',
    lead: 'Large residential jobs in Naguanagua: specified materials, site supervision and finishes that last.',
    introTitle: 'Primary zone next to Valencia and San Diego',
    intro: 'Naguanagua is a primary service area. We know El Trigal, La Trigaleña, Vistahermosa and local condominium rules.',
    zones: ['El Trigal', 'La Trigaleña', 'Vistahermosa', 'Tarapío', 'Mañongo (edge)', 'Naguanagua center'],
    watermark: 'NAGUANAGUA',
    heroImage: '/images/cocina-800.webp',
    introImage: '/images/cocina-terminada-final.webp',
    waText: 'Hello,%20I%20want%20a%20quote%20in%20Naguanagua',
    testimonials: [
      { name: 'Gabriela Hernández', location: 'Naguanagua', text: 'They renovated our bathroom. Clear communication and first-class finishes.' },
      { name: 'Ricardo Peña', location: 'El Trigal', text: 'Whole-home by line items. No improvisation; hidden work was tested first.' },
      { name: 'Laura Campos', location: 'La Trigaleña', text: 'Custom kitchen and large-format floors. The joints show the difference.' },
    ],
    faqs: [
      { question: 'Do you work in El Trigal and La Trigaleña?', answer: 'Yes. Both are primary zones with the same crews and warranty as San Diego or Valencia.' },
      { question: 'How long does a job take?', answer: 'Kitchen or bath 2–4 weeks. Whole-home 6–12 weeks with a written schedule.' },
      { question: 'Do you handle condo permits?', answer: 'Yes. We coordinate loading hours, façade rules and condo boards.' },
    ],
  },
  guacara: {
    slug: 'guacara',
    name: 'Guacara',
    title: 'Remodeling in Guacara | Carabobo 2026',
    description: 'Residential remodeling in Guacara, eastern Carabobo. Whole-home, kitchens and bathrooms with a technical method and warranty.',
    eyebrow: 'Carabobo · Guacara',
    lead: 'We remodel homes in Guacara to the same standard as San Diego and Valencia.',
    introTitle: 'Real coverage in eastern Carabobo',
    intro: 'Guacara is a primary zone. In-house crew, closed budget and documented handover.',
    zones: ['Guacara Centro', 'Ciudad Alianza', 'Yagua (edge)', 'Eastern developments', 'Houses', 'Estates'],
    watermark: 'GUACARA',
    heroImage: '/images/integrales-800.webp',
    introImage: '/images/arquitectura-600.webp',
    waText: 'Hello,%20I%20want%20a%20quote%20in%20Guacara',
    testimonials: [
      { name: 'Héctor Rivas', location: 'Guacara', text: 'Full-home remodel. The schedule held and waterproofing was documented.' },
      { name: 'Patricia Núñez', location: 'Guacara', text: 'They chose the adhesive for the porcelain—not a generic mix.' },
      { name: 'Daniela Ortiz', location: 'Eastern Carabobo', text: 'Fast response from San Diego. Technical visit and itemized quote.' },
    ],
    faqs: [
      { question: 'Do you travel to Guacara from San Diego?', answer: 'Yes. Guacara is primary coverage—no hidden travel fees.' },
      { question: 'Do you remodel estates?', answer: 'Yes. We coordinate trades, systems and finishes on high-value homes.' },
      { question: 'Payment methods?', answer: 'USD cash, BCV, Zelle, PayPal and Pago Móvil. Terms in writing.' },
    ],
  },
  'el-trigal': {
    slug: 'el-trigal',
    name: 'El Trigal',
    title: 'Remodeling in El Trigal | Naguanagua 2026',
    description: 'Home remodeling in El Trigal and La Trigaleña, Naguanagua. Kitchens, bathrooms and whole-home work with site supervision.',
    eyebrow: 'Naguanagua · El Trigal',
    lead: 'El Trigal is a primary zone. Compatible materials, tested hidden work and a written warranty.',
    introTitle: 'We know El Trigal and La Trigaleña',
    intro: 'Daily work in El Trigal condos and houses: permits, site hours and high-standard finishes.',
    zones: ['El Trigal', 'La Trigaleña', 'Vistahermosa', 'Naguanagua', 'Tarapío', 'Mañongo'],
    watermark: 'EL TRIGAL',
    heroImage: '/images/bano-800.webp',
    introImage: '/images/cocina-terminada-final.webp',
    waText: 'Hello,%20I%20want%20a%20quote%20in%20El%20Trigal',
    testimonials: [
      { name: 'Ricardo Peña', location: 'El Trigal', text: 'Whole-home by line items. Hidden work tested before closing walls.' },
      { name: 'Mariana Díaz', location: 'El Trigal', text: 'Spa bath. Slopes and waterproofing checked before tile.' },
      { name: 'Andrés Silva', location: 'La Trigaleña', text: 'Kitchen and floors. The crew respected condo rules.' },
    ],
    faqs: [
      { question: 'Is El Trigal a primary area?', answer: 'Yes—alongside San Diego, Valencia, Naguanagua, Guacara and Guataparo.' },
      { question: 'Do you also serve La Trigaleña?', answer: 'Yes. Same crew and method. We published a bathroom case there.' },
      { question: 'Typical timelines?', answer: 'Bath 2–4 weeks. Kitchen 3–5. Whole-home by area, with a closed schedule.' },
    ],
  },
  guataparo: {
    slug: 'guataparo',
    name: 'Guataparo',
    title: 'Remodeling in Guataparo | Valencia 2026',
    description: 'Estate and home remodeling in Guataparo, Valencia. Luxury kitchens, bathrooms and whole-home projects with a European standard.',
    eyebrow: 'Valencia · Guataparo',
    lead: 'Estates in Guataparo: high-standard finishes, tested systems and documented handover.',
    introTitle: 'High-value work in Guataparo',
    intro: 'Guataparo is a primary zone. Whole-home, luxury kitchens and baths with direct supervision.',
    zones: ['Guataparo Country', 'Guataparo lagoon', 'Residential estates', 'El Viñedo', 'Prebo', 'Valencia'],
    watermark: 'GUATAPARO',
    heroImage: '/images/cocina-isla-central.webp',
    introImage: '/images/integrales-800.webp',
    waText: 'Hello,%20I%20want%20a%20quote%20in%20Guataparo',
    testimonials: [
      { name: 'Family R.', location: 'Guataparo', text: 'Luxury kitchen and cladding. Cuts and junctions are another level.' },
      { name: 'Carlos M.', location: 'Estate in Guataparo', text: 'Whole-home with a real schedule. Systems checked before finishes.' },
      { name: 'Elena V.', location: 'Guataparo', text: 'Baths and large-format floors. No cracks months later.' },
    ],
    faqs: [
      { question: 'Do you build luxury kitchens in Guataparo?', answer: 'Yes. We published a luxury kitchen case: custom cabinetry and high-spec hardware.' },
      { question: 'Whole estates?', answer: 'Yes. Trades, exteriors/pools when needed, and high-value finishes.' },
      { question: 'Technical visit?', answer: 'Yes. We review scope and finish level, then issue an itemized quote if it fits our standard.' },
    ],
  },
};
