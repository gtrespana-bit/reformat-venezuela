// Genera 4 paginas de ciudad en ingles: src/pages/en/{caracas,valencia,la-guaira,san-diego}.astro
import fs from 'node:fs';

const OUT = 'src/pages/en';

const SERVICES_6 = [
  { title: 'Kitchen Remodeling', desc: 'Custom kitchens with modern design and full functionality.', href: '/en/services/kitchens' },
  { title: 'Bathroom Remodeling', desc: 'Wellness spaces with premium finishes, fully waterproofed.', href: '/en/services/bathrooms' },
  { title: 'Full Home Remodeling', desc: 'Complete turnkey transformations of homes and apartments.', href: '/en/services/whole-home' },
  { title: 'Flooring Installation', desc: 'Porcelain, ceramic, laminate and solid wood flooring.', href: '/en/services/flooring' },
  { title: 'Plumbing', desc: 'Professional plumbing and waterproofing solutions.', href: '/en/services/plumbing' },
  { title: 'Electrical', desc: 'Safe, modern electrical installations and upgrades.', href: '/en/services/electrical' },
];

const CITIES = {
  caracas: {
    name:'Caracas', state:'Capital District', waSlug:'Caracas', heroImage:'/images/cocina-isla-central.webp', introImage:'/images/cocina-terminada-final.webp',
    title:'Remodeling in Caracas | Capital District Experts 2026',
    description:'Specialists in apartment, home and office remodeling in Caracas. We work in Chacao, Baruta, El Hatillo, Sucre and the entire metropolitan area. No-obligation quotes.',
    badge:'Capital District · 15+ years of experience',
    heroSub:'We transform apartments, homes and offices with signature design, premium materials and flawless execution across the entire metropolitan area.',
    introH2:'Remodeling experts in the Capital District',
    introP1:'At RemodelaT Venezuela we transform your apartment, home or office in the capital with the highest quality and professionalism.',
    introP2:'With more than 15 years of experience in the <strong>Capital District</strong>, we know the particularities of Caracas buildings, condominium regulations and the best materials for the city\'s climate.',
    introChecks:['Certified in-house crew, no subcontractors','Fixed quote and guaranteed schedule','Condominium permit management','Written warranty on all work'],
    zones:[
      'Chacao (Altamira, Los Palos Grandes, Chuao)','Baruta (Las Mercedes, El Cafetal, Santa Fe)','El Hatillo (La Lagunita, Los Naranjos)',
      'Sucre (Los Dos Caminos, Montalbán, La Carlota)','Libertador (Centro, San Bernardino, Los Chaguaramos)','Nearby: Guarenas, Guatire, Los Teques'],
    processIntro:'Working in Caracas demands knowledge of its buildings, condominium rules and urban logistics. Our process is designed to minimize disruption and meet deadlines in the capital.',
    whyH2:'Why choose us in Caracas, Capital District',
    whyP:'More than 15 years remodeling apartments, homes and offices in the capital make us the trusted choice for residential and commercial projects in the Capital District.',
    whyChecks:[
      'Condominium permit and board management in Chacao, Baruta and El Hatillo buildings',
      'Coordination of loading/unloading schedules with building administrations',
      'In-house crew that travels across the entire metropolitan area with no hidden surcharges',
      'Knowledge of remodeling regulations in municipalities such as Baruta and Chacao',
      'Fixed quote in USD with a guaranteed written schedule'],
    whyP2a:'We serve Chacao, Baruta, El Hatillo, Sucre and Libertador, with travel included and no hidden costs. Every project in Caracas is executed to European standards adapted to the construction reality of the Capital District.',
    whyP2b:'Our commitment is simple: <strong>fixed quote, guaranteed schedule and flawless finishes</strong>. That is how we have built our reputation in Caracas and across the central region of Venezuela.',
    prices:{ 'Kitchen Remodeling':'From $2,500','Bathroom Remodeling':'From $1,800','Floors & Wall Finishes':'From $35/m²','Professional Painting':'From $8/m²','Full Home Remodeling':'From $15,000','Interior Design':'Free consultation' },
    testimonials:[
      { name:'María González', location:'Chacao, Caracas', text:'They remodeled my kitchen in Altamira and it turned out spectacular. The team was very professional and met the deadlines. Highly recommended.' },
      { name:'Carlos Rodríguez', location:'Las Mercedes, Caracas', text:'Excellent work remodeling my office in Las Mercedes. Impeccable attention to detail and fair prices.' },
      { name:'Ana Martínez', location:'El Hatillo, Caracas', text:'They completely transformed my apartment in El Hatillo. The design exceeded my expectations. Very grateful to the whole team.' }],
    faqs:[
      ['How much does a remodel cost in Caracas?','Prices vary by scope: a kitchen remodel from $2,500, a bathroom from $1,800, and full remodels from $15,000. We offer free, no-obligation quotes for projects across the entire Caracas metropolitan area.'],
      ['Do you work in buildings with condominium rules?','Yes, we have extensive experience working in residential and commercial buildings in Caracas. We know the rules of the main condominiums in Chacao, Baruta, El Hatillo and Sucre, and we manage the necessary permits.'],
      ['How long does a remodel take in Caracas?','It depends on the project: a kitchen takes 3-4 weeks, a bathroom 2-3 weeks, and a full remodel 2-3 months. We always set a clear schedule before starting.'],
      ['Do you offer a warranty on the work?','Yes, all our work includes a written warranty. We use first-quality materials and skilled labor to guarantee lasting results.'],
      ['Do you serve areas outside Caracas?','Yes, beyond the Capital District we serve Guarenas, Guatire, Los Teques and nearby areas. Contact us to check availability in your area.']],
  },
  valencia: {
    name:'Valencia', state:'Carabobo', waSlug:'Valencia', heroImage:'/images/cocina-800.webp', introImage:'/images/cocina-terminada-final.webp',
    title:'Remodeling in Valencia | Carabobo Experts 2026',
    description:'Specialists in apartment, home and office remodeling in Valencia, San Diego, Naguanagua and the entire central region. No-obligation quotes.',
    badge:'Carabobo · 15+ years of experience',
    heroSub:'We transform apartments, homes and offices with signature design, premium materials and flawless execution across the central region.',
    introH2:'Remodeling experts in Carabobo',
    introP1:'At RemodelaT Venezuela we transform your apartment, home or office in Valencia with the highest quality and professionalism.',
    introP2:'With more than 15 years of experience in <strong>Carabobo</strong>, we know the particularities of Valencia\'s buildings and neighborhoods, condominium regulations and the best materials for the region\'s climate.',
    introChecks:['Certified in-house crew, no subcontractors','Fixed quote and guaranteed schedule','Condominium permit management','Written warranty on all work'],
    zones:[
      'Valencia Centro (El Viñedo, El Palotal, Candelaria)','San Diego (Urb. San José, El Bosque, La Coromoto)','Naguanagua (El Trigal, Vistahermosa, Campo de Carabobo)',
      'Guacara (Centro, San Agustín, Las Adjuntas)','Puerto Cabello (Bartolomé Salom, Morón)','Los Guayos, Tocuyito, Tacarigua'],
    processIntro:'Working in Valencia demands knowledge of its buildings, condominium rules and urban logistics. Our process is designed to minimize disruption and meet deadlines in the central region.',
    whyH2:'Why choose us in Valencia, Carabobo',
    whyP:'More than 15 years remodeling apartments, homes and offices in Valencia make us the trusted choice for residential and commercial projects in Carabobo.',
    whyChecks:[
      'Condominium permit and board management in San Diego, Naguanagua and El Trigal buildings',
      'Coordination of loading/unloading schedules with building administrations',
      'In-house crew that travels across Valencia, San Diego and Carabobo with no hidden surcharges',
      'Knowledge of remodeling regulations in the main Carabobo municipalities',
      'Fixed quote in USD with a guaranteed written schedule'],
    whyP2a:'We serve Valencia Centro, San Diego, Naguanagua, Guacara and Puerto Cabello, with travel included and no hidden costs. Every project is executed to high standards adapted to the construction reality of Carabobo.',
    whyP2b:'Our commitment is simple: <strong>fixed quote, guaranteed schedule and flawless finishes</strong>. That is how we have built our reputation in Valencia and across the central region of Venezuela.',
    prices:{ 'Kitchen Remodeling':'From $2,200','Bathroom Remodeling':'From $1,500','Floors & Wall Finishes':'From $30/m²','Professional Painting':'From $7/m²','Full Home Remodeling':'From $12,000','Interior Design':'Free consultation' },
    testimonials:[
      { name:'Ana María Rodríguez', location:'El Viñedo, Valencia', text:'They completely transformed my apartment. The kitchen design turned out spectacular and they met the estimated time.' },
      { name:'Luis Eduardo Mendoza', location:'San Diego, Carabobo', text:'Excellent professional service. My office in San Diego turned out modern and functional. Highly recommended.' },
      { name:'Gabriela Hernández', location:'Naguanagua, Carabobo', text:'They renovated my bathroom in Naguanagua. Excellent communication throughout the project and first-rate finishes.' }],
    faqs:[
      ['How much does a remodel cost in Valencia?','Prices vary by scope: a kitchen remodel from $2,200, a bathroom from $1,500, and full remodels from $12,000. We offer free, no-obligation quotes for projects across Valencia and Carabobo.'],
      ['Do you work in buildings with condominium rules?','Yes, we have extensive experience in residential and commercial buildings. We know the rules of the main condominiums in San Diego, Naguanagua, El Trigal and other areas of Carabobo, and we manage the necessary permits.'],
      ['How long does a remodel take in Valencia?','It depends on the project: a kitchen takes 2-4 weeks, a bathroom 2-3 weeks, and a full remodel 6-12 weeks. We always set a clear schedule before starting.'],
      ['Do you offer a warranty on the work?','Yes, all our work includes a written warranty. We use first-quality materials and skilled labor to guarantee lasting results.'],
      ['Do you serve the whole state of Carabobo?','Yes, beyond Valencia we serve San Diego, Naguanagua, Guacara, Puerto Cabello, Los Guayos, Tocuyito and nearby areas. Contact us to check availability.']],
  },
  'la-guaira': {
    name:'La Guaira', state:'Vargas', waSlug:'La Guaira', heroImage:'/images/bano-800.webp', introImage:'/images/suelo-madera.webp',
    title:'Remodeling in La Guaira | Vargas Experts 2026',
    description:'Specialists in apartment, home and office remodeling in La Guaira, Catia La Mar, Maiquetía and the entire state of Vargas. No-obligation quotes.',
    badge:'State of Vargas · 15+ years of experience',
    heroSub:'We transform apartments, homes and offices with materials engineered for the coastal climate and flawless execution across the state of Vargas.',
    introH2:'Remodeling experts on the Vargas coast',
    introP1:'At RemodelaT Venezuela we transform your apartment, home or office in La Guaira with the highest quality and professionalism.',
    introP2:'With more than 15 years of experience in <strong>Vargas</strong>, we know the particularities of coastal buildings and the best salt- and moisture-resistant materials for the marine climate.',
    introChecks:['Certified in-house crew, no subcontractors','Fixed quote and guaranteed schedule','Salt- and moisture-resistant materials','Written warranty on all work'],
    zones:[
      'La Guaira Centro (El Malecón, Caraballeda, Catia La Mar)','Maiquetía (Centro, La Sosa, Los Héroes)','Macuto (Pueblo, Caribe, Hotel Macuto Sheraton)',
      'Caracas La Costa (San Carlos, Osma, Caribe)','Naiguatá, Carmen de Uria, El Junko','Carayaca, Tacata, Los Anaucos'],
    processIntro:'Working in Vargas demands knowledge of its coastal buildings and marine-climate materials. Our process is designed to deliver durable, moisture-resistant results.',
    whyH2:'Why choose us in La Guaira, Vargas',
    whyP:'More than 15 years remodeling apartments, homes and offices on the Vargas coast make us the trusted choice for projects that must withstand salinity and humidity.',
    whyChecks:[
      'Salt- and moisture-resistant materials selected for the coastal climate',
      'Stainless hardware and fixtures, anti-moisture paints and treated woods',
      'Condominium permit management in Caraballeda, Catia La Mar and Maiquetía',
      'In-house crew that travels across the entire state of Vargas',
      'Fixed quote in USD with a guaranteed written schedule'],
    whyP2a:'We serve La Guaira, Catia La Mar, Maiquetía, Macuto, Caraballeda and Naiguatá, with travel included and no hidden costs. Every project uses materials engineered for the marine environment.',
    whyP2b:'Our commitment is simple: <strong>fixed quote, guaranteed schedule and finishes that last</strong>. That is how we have built our reputation on the coast of Vargas.',
    prices:{ 'Kitchen Remodeling':'From $1,800','Bathroom Remodeling':'From $950','Floors & Wall Finishes':'From $28/m²','Professional Painting':'From $7/m²','Full Home Remodeling':'From $150/m²','Interior Design':'Free consultation' },
    testimonials:[
      { name:'Carmen Elena Vivas', location:'Caraballeda, La Guaira', text:'Excellent work on my seafront apartment. The finishes perfectly withstand the humidity and salinity of the environment.' },
      { name:'Roberto José Martínez', location:'Maiquetía, Vargas', text:'Very professional and punctual. My commercial space turned out modern and functional. 100% recommended.' },
      { name:'Daniela Pérez', location:'Macuto, La Guaira', text:'They remodeled my house in Macuto with climate-resistant materials. The result exceeded what I expected.' }],
    faqs:[
      ['How long does a remodel take in La Guaira?','It depends on the project type. A kitchen or bathroom takes 2-4 weeks. A full apartment remodel can take 6-12 weeks. We always deliver a detailed schedule.'],
      ['Do you handle condominium permits in La Guaira?','Yes, we manage all the permits required by your condominium. We know the rules of the main buildings in Caraballeda, Catia La Mar, Maiquetía and other areas of Vargas.'],
      ['What payment methods do you accept in Venezuela?','We accept cash (USD), bank transfer in bolívars at the BCV rate, Zelle, PayPal and Pago Móvil. We offer payment plans depending on the project.'],
      ['Do you use marine-climate-resistant materials?','Yes, in Vargas we recommend materials specific to coastal environments: stainless hardware and faucetry, anti-moisture paints, treated woods and salt-resistant finishes.'],
      ['Is the quote free?','Yes, we do free technical visits across all of La Guaira and offer detailed quotes with no obligation to hire.']],
  },
  'san-diego': {
    name:'San Diego', state:'Carabobo', waSlug:'San Diego', heroImage:'/images/cocina-isla-central.webp', introImage:'/images/cocina-terminada-final.webp',
    title:'Remodeling in San Diego | Carabobo Experts 2026',
    description:'Specialists in apartment, home and office remodeling in San Diego, La Esmeralda, El Morro and the entire San Diego municipality of Carabobo. No-obligation quotes.',
    badge:'San Diego, Carabobo · 15+ years of experience',
    heroSub:'We transform apartments, homes and offices with signature design, premium materials and flawless execution across the San Diego municipality.',
    introH2:'Remodeling experts in San Diego, Carabobo',
    introP1:'At RemodelaT Venezuela we transform your apartment, home or office in San Diego with the highest quality and professionalism.',
    introP2:'With more than 15 years of experience in <strong>San Diego</strong>, we know the particularities of its gated communities and the best materials for family homes in the municipality.',
    introChecks:['Certified in-house crew, no subcontractors','Fixed quote and guaranteed schedule','Gated-community permit management','Written warranty on all work'],
    zones:[
      'La Esmeralda (Campo Solo, La Esmeralda Norte)','El Morro (Urb. El Morro, La Cumaca)','Valle de Oro (El Remanso, La Floresta)',
      'Los Jarales (El Carmen, San Diego Centro)','La Lagunita (El Trébol, Las Mercedes)','Yuma, El Socorro, La Coromoto'],
    processIntro:'Working in San Diego demands knowledge of its gated communities and their internal regulations. Our process is designed to minimize disruption and meet deadlines.',
    whyH2:'Why choose us in San Diego, Carabobo',
    whyP:'More than 15 years remodeling apartments, homes and offices in San Diego make us the trusted choice for residential and commercial projects in the municipality.',
    whyChecks:[
      'Gated-community permit and board management in La Esmeralda, El Morro and Valle de Oro',
      'Coordination of loading/unloading schedules with each community\'s administration',
      'In-house crew that travels across the entire San Diego municipality',
      'Knowledge of the facade and schedule rules of each gated community',
      'Fixed quote in USD with a guaranteed written schedule'],
    whyP2a:'We serve La Esmeralda, El Morro, Valle de Oro, Los Jarales and the rest of San Diego, with travel included and no hidden costs. Every project is executed to high standards adapted to the construction reality of Carabobo.',
    whyP2b:'Our commitment is simple: <strong>fixed quote, guaranteed schedule and flawless finishes</strong>. That is how we have built our reputation in San Diego.',
    prices:{ 'Kitchen Remodeling':'From $2,200','Bathroom Remodeling':'From $1,500','Floors & Wall Finishes':'From $30/m²','Professional Painting':'From $7/m²','Full Home Remodeling':'From $12,000','Interior Design':'Free consultation' },
    testimonials:[
      { name:'María Alejandra Rojas', location:'La Esmeralda, San Diego', text:'They remodeled my entire house in La Esmeralda. The finish is impeccable and the team very professional. They exceeded my expectations.' },
      { name:'José Gregorio Herrera', location:'El Morro, San Diego', text:'Excellent work on my apartment kitchen in El Morro. They met the schedule and the agreed budget.' },
      { name:'Carolina Medina', location:'Valle de Oro, San Diego', text:'They renovated the bathroom and floors of my house in Valle de Oro. Very attentive to every detail. Fully recommended.' }],
    faqs:[
      ['How long does a remodel take in San Diego?','It depends on the project type. A kitchen or bathroom takes 2-4 weeks. A full apartment remodel can take 6-12 weeks. We always deliver a detailed schedule.'],
      ['Do you handle condominium permits in San Diego?','Yes, we manage all the permits required by your condominium. We know the rules of the main San Diego communities: La Esmeralda, El Morro, Valle de Oro, Los Jarales and more.'],
      ['What payment methods do you accept in Venezuela?','We accept cash (USD), bank transfer in bolívars at the BCV rate, Zelle, PayPal and Pago Móvil. We offer payment plans depending on the project.'],
      ['Do you give a warranty on the work?','Yes, all our work carries a written warranty of 12 months on finishes and 24 months on electrical and plumbing installations.'],
      ['Is the quote free?','Yes, we do free technical visits across all of San Diego and offer detailed quotes with no obligation to hire.']],
  },
};

const STYLE = `\
.hero { position: relative; min-height: 80vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 120px 24px 60px; }
.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.92), rgba(15,15,15,0.55) 55%, rgba(15,15,15,0.35)); z-index: 2; }
.hero-content { position: relative; z-index: 3; max-width: 1000px; text-align: center; color: #fff; }
.hero-badge { display:inline-block; background: rgba(201,169,97,.18); border:1px solid var(--gold); color:var(--gold); padding:8px 22px; border-radius:30px; font-size:.8rem; font-weight:600; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:24px; }
.hero h1 { font-family: var(--font-serif); font-size: clamp(2.8rem,6vw,4.8rem); line-height:1.08; margin:0 0 20px; font-weight:400; }
.hero h1 em { font-style: normal; color: var(--gold); }
.hero-sub { font-size: 1.25rem; max-width: 720px; margin: 0 auto 36px; line-height:1.7; color: rgba(255,255,255,.88); }
.hero-actions { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:40px; }
.hero-stats { display:flex; gap:40px; justify-content:center; flex-wrap:wrap; }
.hero-stats .stat { text-align:center; }
.hero-stats strong { display:block; font-family:var(--font-serif); font-size:2.4rem; color:var(--gold); }
.hero-stats span { font-size:.9rem; color:rgba(255,255,255,.8); }
.section { padding: 90px 24px; }
.section-alt { background: var(--gray); }
.section-dark { background: var(--bg); color:#fff; }
.container { max-width:1200px; margin:0 auto; }
.container-narrow { max-width:860px; }
.section-header { text-align:center; max-width:760px; margin:0 auto 56px; }
.section-tag { display:inline-block; color:var(--gold); font-size:.8rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:14px; }
.section-header h2 { font-family:var(--font-serif); font-size:clamp(2rem,4vw,3rem); font-weight:500; line-height:1.15; margin:0 0 16px; }
.section-header p { font-size:1.1rem; color:#555; line-height:1.6; }
.section-header-light h2 { color:#fff; }
.section-header-light p { color:rgba(255,255,255,.8); }
.intro { background:#fff; }
.intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.intro-media { position:relative; }
.intro-media img { width:100%; border-radius:14px; box-shadow:0 20px 50px rgba(0,0,0,.12); }
.intro-body h2 { font-family:var(--font-serif); font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:500; line-height:1.2; margin:0 0 18px; }
.intro-body p { font-size:1.1rem; line-height:1.75; color:#444; margin-bottom:16px; }
.intro-checks { list-style:none; padding:0; margin:22px 0; }
.intro-checks li { padding-left:30px; position:relative; margin-bottom:12px; color:#333; }
.intro-checks li::before { content:'✓'; position:absolute; left:0; color:var(--gold); font-weight:700; }
.services-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:28px; }
.service-card { background:#fff; border-radius:14px; padding:32px 28px; box-shadow:0 6px 24px rgba(0,0,0,.06); transition:transform .3s, box-shadow .3s; }
.service-card:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(0,0,0,.1); }
.service-icon { width:54px; height:54px; border-radius:12px; background:rgba(201,169,97,.12); color:var(--gold); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
.service-card h3 { font-family:var(--font-serif); font-size:1.4rem; font-weight:600; margin:0 0 10px; }
.service-card p { color:#666; font-size:.98rem; line-height:1.6; margin:0 0 16px; }
.card-link { color:var(--gold); font-weight:600; text-decoration:none; font-size:.92rem; display:inline-flex; align-items:center; gap:6px; }
.zones-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:18px; }
.zone-item { display:flex; gap:14px; align-items:flex-start; background:#fff; padding:20px 22px; border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,.05); color:#333; }
.zone-item svg { color:var(--gold); flex-shrink:0; margin-top:2px; }
.zone-item strong { display:block; font-size:1.05rem; margin-bottom:4px; }
.zone-item span { color:#666; font-size:.95rem; }
.pricing-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px; }
.price-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:24px; text-align:center; }
.price-label { display:block; color:rgba(255,255,255,.85); font-size:.95rem; margin-bottom:8px; }
.price-value { display:block; font-family:var(--font-serif); font-size:1.5rem; color:var(--gold); }
.pricing-note { text-align:center; color:rgba(255,255,255,.55); font-size:.85rem; margin-top:28px; }
.testimonials-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:28px; }
.testimonial-card { background:#fff; border-radius:14px; padding:30px; box-shadow:0 6px 24px rgba(0,0,0,.06); margin:0; }
.stars { color:#e0a82e; margin-bottom:14px; }
.testimonial-card blockquote { font-size:1.05rem; line-height:1.7; color:#444; margin:0 0 18px; font-style:italic; }
.testimonial-card figcaption strong { display:block; color:#222; }
.testimonial-card figcaption span { color:#888; font-size:.9rem; }
.cta { position:relative; padding:110px 24px; overflow:hidden; text-align:center; }
.cta-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:1; }
.cta-overlay { position:absolute; inset:0; background:linear-gradient(rgba(15,15,15,.85),rgba(15,15,15,.9)); z-index:2; }
.cta-content { position:relative; z-index:3; max-width:760px; margin:0 auto; }
.cta-content h2 { font-family:var(--font-serif); font-size:clamp(2rem,4.5vw,3.2rem); font-weight:400; color:#fff; margin:0 0 18px; }
.cta-content > p { font-size:1.15rem; color:rgba(255,255,255,.85); line-height:1.7; margin:0 0 32px; }
.cta-actions { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
.btn { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; border-radius:6px; font-weight:600; text-decoration:none; font-size:.95rem; transition:.25s; }
.btn-gold { background:var(--gold); color:#1a1a1a; }
.btn-gold:hover { filter:brightness(1.08); transform:translateY(-2px); }
.btn-outline { border:1px solid rgba(255,255,255,.4); color:#fff; }
.btn-outline:hover { border-color:var(--gold); color:var(--gold); }
.btn-outline-light { border:1px solid rgba(255,255,255,.5); color:#fff; }
.btn-outline-light:hover { border-color:var(--gold); color:var(--gold); }
.btn-dark { background:#1a1a1a; color:#fff; }
.btn-dark:hover { background:#000; transform:translateY(-2px); }
@media (max-width:860px){ .intro-grid{ grid-template-columns:1fr; gap:36px; } }
@media (max-width:600px){ .hero-stats{ gap:24px; } .hero-stats strong{ font-size:1.9rem; } .section{ padding:60px 20px; } }`;

function esc(s){ return JSON.stringify(s); }

function buildCity(slug){
  const c = CITIES[slug];
  const wa = `https://wa.me/584129449929?text=${encodeURIComponent(`Hello, I want a quote for my remodel in ${c.waSlug}`)}`;
  const waDirect = `https://wa.me/584129449929?text=${encodeURIComponent(`Hello, I want a quote for my remodeling in ${c.waSlug}`)}`;
  const serviceCards = SERVICES_6.map(s => `        <article class="service-card">
            <div class="service-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
            <a href="${s.href}" class="card-link">
              View details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </article>`).join('\n');
  const zones = c.zones.map(z => `          <div class="zone-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${z}</span>
          </div>`).join('\n');
  const priceCards = Object.entries(c.prices).map(([k,v]) => `          <div class="price-card">
            <span class="price-label">${k}</span>
            <span class="price-value">${v}</span>
          </div>`).join('\n');
  const testimonials = c.testimonials.map(t => `        <figure class="testimonial-card">
            <div class="stars" aria-label="5 of 5 stars">
              ${Array.from({length:5}).map(()=>'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}
            </div>
            <blockquote>"${t.text}"</blockquote>
            <figcaption>
              <strong>${t.name}</strong>
              <span>${t.location}</span>
            </figcaption>
          </figure>`).join('\n');
  const faqProps = c.faqs.map(([q,a]) => `{ question: ${esc(q)}, answer: ${esc(a)} }`).join(',\n    ');
  const introChecks = c.introChecks.map(x => `<li>${x}</li>`).join('\n          ');
  const whyChecks = c.whyChecks.map(x => `<li>${x}</li>`).join('\n          ');

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import FAQ from '../../components/FAQ.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
---

<BaseLayout title=${esc(c.title)} description=${esc(c.description)} image=${esc(c.heroImage)}>

  <section class="hero">
    <img class="hero-bg" src=${esc(c.heroImage)} alt=${esc(`Remodeling in ${c.name} | RemodelaT`)} fetchpriority="high" loading="eager" decoding="async" />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="hero-badge">${c.badge}</span>
      <h1>Remodeling in <em>${c.name}</em></h1>
      <p class="hero-sub">${c.heroSub}</p>
      <div class="hero-actions">
        <a href="#contacto" class="btn btn-gold">Get a free quote</a>
        <a href=${esc(waDirect)} class="btn btn-outline" target="_blank" rel="noopener">Message on WhatsApp</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><strong>200+</strong><span>Projects delivered</span></div>
        <div class="stat"><strong>15+</strong><span>Years of experience</span></div>
        <div class="stat"><strong>5.0</strong><span>Client rating</span></div>
      </div>
    </div>
  </section>

  <Breadcrumb items={[
    { name: 'Home', url: '/en' },
    { name: ${esc(c.name)}, url: ${esc(`/en/${slug}`)} }
  ]} />

  <section class="section intro">
    <div class="container intro-grid">
      <div class="intro-media">
        <img src=${esc(c.introImage)} alt=${esc(`Remodeling project in ${c.name}`)} loading="lazy" />
      </div>
      <div class="intro-body">
        <span class="section-tag">Why RemodelaT</span>
        <h2>${c.introH2}</h2>
        <p>${c.introP1}</p>
        <p>${c.introP2}</p>
        <ul class="intro-checks">
          ${introChecks}
        </ul>
        <a href="#contacto" class="btn btn-dark">Learn more about us</a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Services</span>
        <h2>Complete remodeling solutions</h2>
        <p>From a single renovation to a turnkey project, we cover every stage to premium standards.</p>
        <a href="/en/services" class="btn btn-dark" style="margin-top: 28px;">View all services</a>
      </div>
      <div class="services-grid">
${serviceCards}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Coverage</span>
        <h2>We serve the entire area</h2>
        <p>Our team travels to the main municipalities and neighborhoods of ${c.name}.</p>
      </div>
      <div class="zones-grid">
${zones}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">How we work</span>
        <h2>Our remodeling process in ${c.name}</h2>
        <p>${c.processIntro}</p>
      </div>
      <div class="zones-grid">
        <div class="zone-item"><strong>1. Free technical visit</strong><span>We assess the space, take measurements and listen to your vision with no obligation.</span></div>
        <div class="zone-item"><strong>2. Fixed quote</strong><span>You receive a detailed quote in USD with materials, labor and schedule.</span></div>
        <div class="zone-item"><strong>3. Design & planning</strong><span>We define materials, finishes and dates. We coordinate permits where needed.</span></div>
        <div class="zone-item"><strong>4. Supervised execution</strong><span>Our in-house crew executes the work with daily supervision and progress reports.</span></div>
        <div class="zone-item"><strong>5. Handover & warranty</strong><span>We deliver clean and working, with a written warranty on all work.</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Why RemodelaT</span>
        <h2>${c.whyH2}</h2>
        <p>${c.whyP}</p>
      </div>
      <div class="intro-grid">
        <div class="intro-body">
          <ul class="intro-checks">
          ${whyChecks}
          </ul>
          <a href="#contacto" class="btn btn-dark">Get a quote in ${c.name}</a>
        </div>
        <div class="intro-body">
          <p>${c.whyP2a}</p>
          <p>${c.whyP2b}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-dark">
    <div class="container">
      <div class="section-header section-header-light">
        <span class="section-tag">Investment</span>
        <h2>Transparent prices, no surprises</h2>
        <p>Every project is unique. These are our starting points; the final quote is set after a free technical visit.</p>
      </div>
      <div class="pricing-grid">
${priceCards}
      </div>
      <p class="pricing-note">* Reference prices in USD. Do not include materials unless stated otherwise.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Testimonials</span>
        <h2>What our clients say</h2>
      </div>
      <div class="testimonials-grid">
${testimonials}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container container-narrow">
      <div class="section-header">
        <span class="section-tag">FAQ</span>
        <h2>Frequently asked questions</h2>
      </div>
      <FAQ items={[
    ${faqProps}
  ]} title="Frequently Asked Questions" />
    </div>
  </section>

  <section class="cta" id="contacto">
    <img class="cta-bg" src="/images/cocina-terminada-final.webp" alt=${esc(`Finished modern kitchen ready for handover in ${c.name} | RemodelaT`)} loading="lazy" decoding="async" />
    <div class="cta-overlay"></div>
    <div class="cta-content">
      <span class="section-tag section-tag-light">Take the first step</span>
      <h2>Ready to transform your space in ${c.name}?</h2>
      <p>Book a free technical visit. We assess your project, advise you on materials and deliver a detailed quote with no obligation.</p>
      <div class="cta-actions">
        <a href=${esc(wa)} class="btn btn-gold" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Direct WhatsApp
        </a>
        <a href="/en/contact" class="btn btn-outline-light">Contact form</a>
      </div>
    </div>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": \`RemodelaT Venezuela - ${c.name}\`,
    "description": ${esc(c.description)},
    "areaServed": { "@type": "City", "name": ${esc(c.name)} },
    "address": { "@type": "PostalAddress", "addressLocality": ${esc(c.name)}, "addressRegion": ${esc(c.state)}, "addressCountry": "VE" },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-17:00"
  })} />
</BaseLayout>

<style>
${STYLE}
</style>
`;
}

let n=0;
for (const slug of Object.keys(CITIES)) {
  fs.writeFileSync(`${OUT}/${slug}.astro`, buildCity(slug), 'utf8');
  n++;
}
console.log(`Generadas ${n} paginas de ciudad en ingles -> ${OUT}/`);
