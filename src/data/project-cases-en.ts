export type ProjectCaseEn = {
  slug: string;
  esPath: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  heroImage: string;
  excerpt: string;
  challenge: string;
  solution: string;
  technicalHighlights: string[];
  specs: { label: string; value: string }[];
  gallery: { src: string; alt: string; caption: string }[];
};

export const projectCasesEn: Record<string, ProjectCaseEn> = {
  kitchenCaracas: {
    slug: 'kitchen-remodel-caracas-quinta',
    esPath: '/proyectos/cocina-caracas-quinta',
    title: 'Full Kitchen Remodel in a Caracas Quinta',
    category: 'High-Standard Kitchen',
    location: 'Caracas, Venezuela',
    duration: '1 week',
    heroImage: '/images/proyectos/cocina-caracas-quinta/cocina-finalizada-3.webp',
    excerpt: 'A complete kitchen remodel in a Caracas quinta: full dismantling, ceramic demolition, electrical upgrade with fire-retardant cable, imported rectified wall tile, high-gloss MDF cabinetry with thermoformed PVC polymer, dark quartz countertop, induction cooktop and TEKA appliances.',
    challenge: 'The existing kitchen required a complete technical and aesthetic update: old cabinetry, outdated ceramic surfaces, electrical upgrades and a new furniture system capable of resisting humidity, daily impact and intensive use.',
    solution: 'We dismantled the previous kitchen, demolished the existing ceramic material, upgraded the electrical system with high-quality fire-retardant cable, installed imported rectified ceramic tile and mounted a high-gloss white kitchen with thermoformed PVC polymer fronts and a dark quartz countertop for contrast.',
    technicalHighlights: [
      'Complete dismantling of existing kitchen furniture and controlled demolition of old ceramic surfaces',
      'Electrical system updated with high-quality fire-retardant cable',
      'Imported modern rectified ceramic tile for cleaner joints and a more refined finish',
      '19 mm MDF doors and fronts with high-gloss lacquered finish and thermoformed PVC polymer foil',
      '16 mm moisture-resistant particleboard cabinet carcass protected on both sides',
      'Dark quartz countertop adapted for an L-shaped sink',
      'Induction cooktop, built-in dishwasher, microwave column and TEKA oven/microwave with up to 10-year manufacturer warranty',
      'Cabinetry warranty of up to 25 years according to manufacturer terms and proper use'
    ],
    specs: [
      { label: 'Location', value: 'Residential quinta in Caracas, Venezuela' },
      { label: 'Duration', value: '1 week of execution' },
      { label: 'Electrical system', value: 'High-quality fire-retardant cable upgrade' },
      { label: 'Wall covering', value: 'Imported modern rectified ceramic tile' },
      { label: 'Doors and fronts', value: '19 mm MDF with high-gloss lacquered finish and thermoformed PVC polymer' },
      { label: 'Cabinet carcass', value: '16 mm moisture-resistant particleboard protected on both sides' },
      { label: 'Back panel', value: '6 mm white board on both sides' },
      { label: 'Countertop', value: 'Dark quartz adapted for an L-shaped sink' },
      { label: 'Appliances', value: 'Induction cooktop, built-in dishwasher, TEKA oven and microwave' },
      { label: 'Warranties', value: 'Up to 25 years on cabinetry and up to 10 years on TEKA appliances according to manufacturer terms' }
    ],
    gallery: [
      { src: '/images/proyectos/cocina-caracas-quinta/cocina-finalizada-3.webp', alt: 'Finished kitchen in a Caracas quinta with white cabinetry and dark quartz countertop', caption: 'Final view: high-gloss white cabinetry, dark quartz countertop and a modern high-contrast composition.' },
      { src: '/images/proyectos/cocina-caracas-quinta/cocina-finalizada-1.webp', alt: 'Finished kitchen with white high-gloss upper and lower cabinets', caption: 'Finished cabinets with 19 mm MDF fronts and thermoformed PVC polymer foil.' },
      { src: '/images/proyectos/cocina-caracas-quinta/cocina-finalizada-2.webp', alt: 'Finished kitchen with built-in appliances and column cabinetry', caption: 'Integrated appliances, TEKA oven and microwave column, and functional daily-use layout.' },
      { src: '/images/proyectos/cocina-caracas-quinta/adaptacion-encimera-fregadero-l.webp', alt: 'Quartz countertop adaptation for L-shaped sink', caption: 'Dark quartz countertop adaptation for the L-shaped sink installation.' },
      { src: '/images/proyectos/cocina-caracas-quinta/proceso-montaje-muebles-1.webp', alt: 'Kitchen cabinet installation process in Caracas quinta', caption: 'Cabinet installation phase after utilities and wall covering work.' },
      { src: '/images/proyectos/cocina-caracas-quinta/proceso-montaje-muebles-2.webp', alt: 'Kitchen cabinet fronts being installed', caption: 'Module and front alignment for a clean final reading.' },
      { src: '/images/proyectos/cocina-caracas-quinta/proceso-montaje-muebles-3.webp', alt: 'Upper and lower kitchen cabinets being mounted', caption: 'Upper and lower cabinet installation with level and plumb control.' },
      { src: '/images/proyectos/cocina-caracas-quinta/cocina-antes-1.webp', alt: 'Kitchen before full remodel in Caracas quinta', caption: 'Original kitchen before full furniture dismantling and ceramic demolition.' },
      { src: '/images/proyectos/cocina-caracas-quinta/ultimos-retoques.webp', alt: 'Final touch-ups in remodeled kitchen', caption: 'Final touch-ups, adjustment review, visual cleaning and handover preparation.' }
    ]
  },
  bathroomLasMercedesSmall: {
    slug: 'small-bathroom-remodel-las-mercedes',
    esPath: '/proyectos/bano-las-mercedes-pequeno',
    title: 'Small Secondary Bathroom Remodel in Las Mercedes',
    category: 'Compact Bathroom & Layout Correction',
    location: 'Las Mercedes, Caracas',
    duration: '2 weeks',
    heroImage: '/images/proyectos/bano-las-mercedes-pequeno/bano-finalizado-mueble-poceta.webp',
    excerpt: 'Complete remodel of a small secondary bathroom in a Las Mercedes apartment: removal of a poorly positioned partition, new brick wall, relocated plumbing, imported 30x90 rectified porcelain, ROCA marble-powder shower tray, oak-look floor tile, LED anti-fog mirror and tempered glass screen.',
    challenge: 'The bathroom was very small and the original partition was poorly positioned, further limiting usable space and access. The project required a layout correction before the finish work could make sense.',
    solution: 'We demolished the existing partition, rebuilt it in brick with a moisture-area cement render, repositioned the door, renewed all plumbing and installed imported rectified porcelain, a ROCA shower tray, oak-tone vanity, LED anti-fog mirror, tempered-glass screen and ROCA rain shower column.',
    technicalHighlights: [
      'Complete removal of the partition separating the bathroom from the corridor',
      'New brick wall built in the correct position and rendered with cement mortar for wet areas',
      'Full plumbing replacement with adjusted positions for better use of space',
      'Imported 30x90 rectified porcelain: smooth matte white and matte white 3D relief in the shower L',
      'Imported ROCA solid marble-powder shower tray',
      'Rectified oak-look porcelain floor tile paired with oak-tone vanity',
      'LED mirror with touch controls and anti-fog system',
      'Tempered safety-glass screen and ROCA shower column with rain head and handheld shower'
    ],
    specs: [
      { label: 'Location', value: 'Apartment in Las Mercedes, Caracas' },
      { label: 'Bathroom type', value: 'Compact secondary bathroom' },
      { label: 'Layout', value: 'Partition removed and rebuilt; door position corrected' },
      { label: 'Wall system', value: 'Brick wall rendered with cement mortar for wet areas' },
      { label: 'Plumbing', value: 'New plumbing installation with relocated fixtures' },
      { label: 'Wall tile', value: 'Imported rectified 30x90 matte white porcelain and 3D relief porcelain' },
      { label: 'Flooring', value: 'Rectified oak-look porcelain tile' },
      { label: 'Shower tray', value: 'Imported ROCA solid marble-powder shower tray' },
      { label: 'Fixtures', value: 'ROCA rain shower column with handheld shower' },
      { label: 'Handover', value: 'Tempered glass screen, oak vanity and LED anti-fog mirror' }
    ],
    gallery: [
      { src: '/images/proyectos/bano-las-mercedes-pequeno/bano-finalizado-mueble-poceta.webp', alt: 'Finished compact secondary bathroom with oak vanity and LED mirror in Las Mercedes', caption: 'Final view with oak-tone vanity, LED anti-fog mirror, matte white porcelain and oak-look floor.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/bano-finalizado-zona-ducha.webp', alt: 'Finished shower area with 3D porcelain, ROCA shower tray and tempered screen', caption: 'Shower L with matte white 3D relief porcelain, ROCA marble-powder tray and rain shower column.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/bano-finalizado-suelo.webp', alt: 'Finished oak-look porcelain floor in compact bathroom', caption: 'Rectified oak-look porcelain floor adds warmth and connects visually with the vanity.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/puerta-corredera-exterior.webp', alt: 'Finished exterior sliding door for compact bathroom', caption: 'Corrected door position and sliding solution improve access and usable space.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/plato-ducha-instalado-1.webp', alt: 'ROCA shower tray installed before final screen', caption: 'Imported ROCA solid marble-powder shower tray during installation.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/ceramica-paredes-suelo-listos.webp', alt: 'Wall and floor porcelain completed before final fixtures', caption: 'Wall and floor tile completed before vanity, screen and accessories.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/tabique-ladrillo-realizado.webp', alt: 'New brick partition built for compact bathroom layout', caption: 'New brick partition built in the corrected position and prepared for wet-area rendering.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/demolicion-tabique-1.webp', alt: 'Demolition of original misplaced partition', caption: 'Removal of the original partition that limited the compact bathroom layout.' },
      { src: '/images/proyectos/bano-las-mercedes-pequeno/bano-antes-1.webp', alt: 'Bathroom before remodel in Las Mercedes apartment', caption: 'Original secondary bathroom before demolition, plumbing replacement and layout correction.' }
    ]
  },
  caracas: {
    slug: 'bathroom-remodel-caracas',
    esPath: '/proyectos/bano-caracas',
    title: 'Master Bathroom Remodel and Accessible Powder Room',
    category: 'Bathrooms & Accessibility',
    location: 'Caracas, Venezuela',
    duration: '3 weeks',
    heroImage: '/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp',
    excerpt: 'A full master bathroom remodel with PEX-Al-PEX multilayer plumbing and the architectural conversion of a built-in closet into an accessible powder room with a floating sliding door.',
    challenge: 'The property needed more than a cosmetic update: old finishes, outdated plumbing and the need to create a compact accessible bathroom for an elderly family member without compromising the bedroom layout.',
    solution: 'We demolished the original finishes, replaced the plumbing network with multilayer PEX-Al-PEX, routed new drains and water points, built a moisture-resistant drywall enclosure and installed Spanish 60x60 porcelain with a warm wood-effect anti-slip floor.',
    technicalHighlights: [
      'PEX-Al-PEX multilayer hot and cold water lines',
      '110 mm and 40 mm PVC drain routing for the new powder room',
      'Moisture-resistant RH drywall with steel framing',
      'Double-buttering installation technique with leveling wedges',
      'ROCA matte black fixtures and tempered-glass shower screen',
      'Floating sliding door to eliminate swing radius and improve accessibility'
    ],
    specs: [
      { label: 'Wall covering', value: 'Imported Spanish 60x60 cm grey-cement porcelain' },
      { label: 'Flooring', value: 'Anti-slip wood-effect porcelain tile' },
      { label: 'Plumbing', value: 'PEX-Al-PEX multilayer network' },
      { label: 'Accessible powder room', value: 'RH moisture-resistant drywall + steel framing' },
      { label: 'Shower', value: 'Rain shower + wall handset in matte black ROCA finish' },
      { label: 'Lighting', value: 'Backlit mirrors and 6500K LED downlights' }
    ],
    gallery: [
      { src: '/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp', alt: 'Finished master bathroom with grey porcelain and wood-effect floor', caption: 'Finished master bathroom: grey porcelain walls, warm anti-slip floor and layered LED lighting.' },
      { src: '/images/proyectos/bano-caracas/bano-principal-mampara-mas-ducha-instalada.webp', alt: 'Walk-in shower with matte black fixtures and tempered glass screen', caption: 'Walk-in shower with matte black ROCA rain head and tempered-glass screen.' },
      { src: '/images/proyectos/bano-caracas/bano-principal-espejo-instalado.webp', alt: 'Vanity with LED mirror and matte black faucet', caption: 'Vanity area with 100 cm cabinet, LED mirror and clean fixture alignment.' },
      { src: '/images/proyectos/bano-caracas/bano-2-finalizado-1.webp', alt: 'Accessible powder room built inside former closet', caption: 'Former closet converted into a compact accessible powder room.' },
      { src: '/images/proyectos/bano-caracas/bano-principal-antes-1.webp', alt: 'Original master bathroom before remodel', caption: 'Original condition before full demolition and utility replacement.' },
      { src: '/images/proyectos/bano-caracas/bano-principal-porcelanato-instalacion.webp', alt: 'Porcelain installation with leveling wedges', caption: '60x60 porcelain installation using double-buttering and leveling wedges.' }
    ]
  },
  trigalena: {
    slug: 'bathroom-remodel-la-trigalena',
    esPath: '/proyectos/bano-la-trigalena',
    title: 'Townhouse Bathroom Remodel in La Trigaleña',
    category: 'High-End Bathroom',
    location: 'La Trigaleña, Valencia',
    duration: '2 weeks',
    heroImage: '/images/proyectos/bano-la-trigalena/bano-final-1.webp',
    excerpt: 'A fragmented townhouse bathroom was opened up and rebuilt with rectified 60x120 porcelain, TEKA sanitaryware and PEX-Al-PEX multilayer plumbing.',
    challenge: 'The original bathroom felt divided and visually heavy. The owner needed a cleaner, brighter and more spacious layout with finishes consistent with a high-standard home.',
    solution: 'We removed dividing partitions, renewed plumbing, corrected the substrate and installed large-format rectified porcelain to create a more continuous, refined and easy-to-maintain bathroom.',
    technicalHighlights: [
      'Removal of internal partitions to increase perceived space',
      'Large-format rectified 60x120 porcelain installation',
      'PEX-Al-PEX multilayer plumbing renovation',
      'TEKA Manacor sanitaryware and fixtures',
      'Leveling, alignment and micro-joint control',
      'Final handover with finish checklist'
    ],
    specs: [
      { label: 'Wall covering', value: 'Rectified 60x120 porcelain' },
      { label: 'Sanitaryware', value: 'TEKA Manacor line' },
      { label: 'Utilities', value: 'PEX-Al-PEX plumbing network' },
      { label: 'Layout', value: 'Partition removal for a more open bathroom' },
      { label: 'Finish control', value: 'Micro-joints, plumbs, cuts and alignment reviewed' }
    ],
    gallery: [
      { src: '/images/proyectos/bano-la-trigalena/bano-final-1.webp', alt: 'Finished townhouse bathroom in La Trigaleña', caption: 'Final bathroom with a cleaner, larger visual reading after removing partitions.' },
      { src: '/images/proyectos/bano-la-trigalena/bano-final-2.webp', alt: 'Finished bathroom with rectified porcelain', caption: 'Rectified porcelain and carefully aligned fixtures.' },
      { src: '/images/proyectos/bano-la-trigalena/bano-mueble-instalado.webp', alt: 'Installed vanity in remodeled bathroom', caption: 'Vanity area installed and checked for alignment and usability.' },
      { src: '/images/proyectos/bano-la-trigalena/bano-porcelanato-instalando.webp', alt: 'Porcelain installation in process', caption: 'Large-format porcelain installation phase.' },
      { src: '/images/proyectos/bano-la-trigalena/bano-antes-1.webp', alt: 'Bathroom before remodel', caption: 'Original condition before layout and finish transformation.' },
      { src: '/images/proyectos/bano-la-trigalena/bano-cambio-de-suelo.webp', alt: 'Floor replacement process', caption: 'Floor replacement and substrate preparation.' }
    ]
  },
  sanDiego: {
    slug: 'bathroom-remodel-san-diego',
    esPath: '/proyectos/bano-san-diego',
    title: 'Bathroom Remodel with TEKA Wall-Hung Toilet',
    category: 'Bathroom & Wall-Hung Sanitaryware',
    location: 'San Diego, Carabobo',
    duration: '2 weeks',
    heroImage: '/images/proyectos/bano-san-diego/bano-finalizado-1.webp',
    excerpt: 'A technical bathroom remodel centered on a TEKA wall-hung toilet, brick masonry support, multilayer plumbing and rectified beige porcelain.',
    challenge: 'Installing a wall-hung toilet requires structural and hydraulic precision. The project needed a clean monolithic finish without compromising the support and future performance of the concealed system.',
    solution: 'We built the support enclosure, renewed the plumbing network, installed the TEKA wall-hung kit and finished the bathroom with rectified beige porcelain and carefully controlled alignments.',
    technicalHighlights: [
      'TEKA Manacor wall-hung toilet kit',
      'Specialized masonry support for concealed cistern',
      'PEX-Al-PEX multilayer plumbing',
      'Rectified 60x60 beige porcelain',
      'Precise alignment around wall-hung sanitaryware',
      'Final tests before handover'
    ],
    specs: [
      { label: 'Sanitaryware', value: 'TEKA wall-hung toilet system' },
      { label: 'Support', value: 'Specialized masonry enclosure for concealed cistern' },
      { label: 'Wall/Floor covering', value: 'Rectified beige porcelain' },
      { label: 'Plumbing', value: 'PEX-Al-PEX multilayer network' },
      { label: 'Finish', value: 'Minimal, warm, monolithic beige aesthetic' }
    ],
    gallery: [
      { src: '/images/proyectos/bano-san-diego/bano-finalizado-1.webp', alt: 'Finished bathroom with wall-hung toilet in San Diego', caption: 'Final bathroom with warm beige porcelain and wall-hung sanitaryware.' },
      { src: '/images/proyectos/bano-san-diego/bano-finalizado-2.webp', alt: 'Finished bathroom detail in San Diego', caption: 'Finished surfaces and clean fixture layout.' },
      { src: '/images/proyectos/bano-san-diego/bano-finalizado-3.webp', alt: 'Bathroom completed with beige porcelain', caption: 'Monolithic beige finish with rectified porcelain.' },
      { src: '/images/proyectos/bano-san-diego/bano-en-proceso.webp', alt: 'Bathroom process with plumbing and masonry', caption: 'Technical phase before final finishes.' },
      { src: '/images/proyectos/bano-san-diego/bano-en-proceso-2.webp', alt: 'Wall-hung toilet installation process', caption: 'Support and concealed system preparation.' },
      { src: '/images/proyectos/bano-san-diego/teka-manacor-flotante-kit.webp', alt: 'TEKA Manacor wall-hung toilet kit', caption: 'TEKA Manacor wall-hung kit used in the installation.' }
    ]
  },
  guataparo: {
    slug: 'luxury-bathrooms-quinta-guataparo',
    esPath: '/proyectos/banos-quinta-la-lagunita',
    title: 'Luxury Bathroom Remodel in a Guataparo Quinta',
    category: 'Luxury Bathrooms & Architecture',
    location: 'Guataparo, Valencia',
    duration: '4 weeks',
    heroImage: '/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado-2.webp',
    excerpt: 'A landmark bathroom remodel divided into two independent rooms with a panoramic thermal-break window, volcanic stone, white microcement and green metro tile.',
    challenge: 'The existing bathroom required a deep architectural intervention: demolition, new openings, independent zones, better natural light and high-end finishes capable of matching a premium quinta.',
    solution: 'We opened a new panoramic window, rebuilt partitions, created two independent bathroom areas and combined microcement, volcanic stone, custom concrete countertops and green metro porcelain for a refined architectural result.',
    technicalHighlights: [
      'Demolition and new panoramic window opening',
      'Thermal-break window installation',
      'Independent bathroom zones separated by new masonry',
      'White microcement flooring and surfaces',
      'Volcanic stone and green metro porcelain details',
      'Custom concrete countertops and vessel sinks'
    ],
    specs: [
      { label: 'Main finishes', value: 'Microcement, volcanic stone and green metro porcelain' },
      { label: 'Architecture', value: 'Two independent bathroom rooms' },
      { label: 'Window system', value: 'Panoramic thermal-break window' },
      { label: 'Countertops', value: 'Custom concrete counters' },
      { label: 'Design intent', value: 'Luxury, natural light and architectural contrast' }
    ],
    gallery: [
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado-2.webp', alt: 'Completed luxury bathroom zone in Guataparo quinta', caption: 'Completed Zone 1 with microcement, stone and refined natural light.' },
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado-3.webp', alt: 'Luxury bathroom completed with green tile and microcement', caption: 'Green metro porcelain and microcement create a controlled contrast.' },
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-zona-2-completado.webp', alt: 'Second completed bathroom zone in luxury quinta', caption: 'Second independent bathroom zone after full remodel.' },
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-instalacion-ventanal-nuevo.webp', alt: 'Installation of new panoramic window', caption: 'New panoramic window installation to transform natural light.' },
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-demolicion-y-apertura-ventanal.webp', alt: 'Demolition and new window opening', caption: 'Demolition and opening phase before the new window system.' },
      { src: '/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-piso-microcemento-mas-lavabo-sobrepuesto.webp', alt: 'Microcement floor and vessel sink', caption: 'Microcement floor and vessel sink before final styling.' }
    ]
  }
};

export const projectCasesEnList = [
  projectCasesEn.kitchenCaracas,
  projectCasesEn.bathroomLasMercedesSmall,
  projectCasesEn.caracas,
  projectCasesEn.trigalena,
  projectCasesEn.sanDiego,
  projectCasesEn.guataparo
];
