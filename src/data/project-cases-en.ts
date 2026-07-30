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
  projectCasesEn.caracas,
  projectCasesEn.trigalena,
  projectCasesEn.sanDiego,
  projectCasesEn.guataparo
];
