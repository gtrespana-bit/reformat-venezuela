// Genera 81 paginas de zona en ingles: src/pages/en/remodelacion-{service}-{zone}.astro
// Traducciones manuales fieles al contenido en espanol.
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = 'src/pages/en';
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- ZONAS (conocimiento local traducido, compartido entre servicios) ----------
const ZONES = {
  'altamira': { name:'Altamira', metro:'caracas', nearby:['Plaza Francia','Campo Alegre','Los Palos Grandes'],
    localTitle:'Kitchens tailored to Altamira',
    localText:'Altamira is defined by mid- and high-rise buildings from the 70s to the 90s, with spacious apartments of 120 to 300 m². Many units keep their original layouts with long hallways and enclosed kitchens. Altamira buildings often still have their original copper and galvanized-iron plumbing that has reached the end of its service life. The area\'s uneven water pressure makes pumping and filtration systems advisable.',
    porque:'In Altamira, high-end projects dominate: marble, fine woods, home automation and kitchens with a central island. We know Altamira\'s housing types — near Plaza Francia and the dining corridor of Avenida Luis Roche — and design kitchens that make the most of every space. Altamira buildings often still have their original copper and galvanized-iron plumbing that has reached the end of its service life. The area\'s uneven water pressure makes pumping and filtration systems advisable.',
    faq4:'Yes. Altamira is defined by mid- and high-rise buildings from the 70s to the 90s, with spacious apartments of 120 to 300 m². Many units keep their original layouts with long hallways and enclosed kitchens. Altamira condominiums are strict about noise rules and debris management. We handle work permits, schedules and freight-elevator use with the board of owners.' },
  'alto-hatillo': { name:'Alto Hatillo', metro:'caracas', nearby:['La Boyera','El Cigarral','Los Geranios'],
    localTitle:'Kitchens tailored to Alto Hatillo',
    localText:'Alto Hatillo is a more recently developed area with mountainside homes, townhouses and gated communities from the 90s-2010. Homes range from 150 to 400 m² with city views. Mountain homes in Alto Hatillo face slope moisture, retaining walls and narrow access for materials. We assess drains and retaining walls before any interior work.',
    porque:'Alto Hatillo favors designs that blend indoors and outdoors: large windows, terraces, decks and moisture-resistant materials. We know Alto Hatillo\'s housing types — near the La Boyera lookout and the El Cigarral residential complexes — and design kitchens that make the most of every space. Mountain homes in Alto Hatillo face slope moisture, retaining walls and narrow access for materials. We assess drains and retaining walls before any interior work.',
    faq4:'Yes. Alto Hatillo is a more recently developed area with mountainside homes, townhouses and gated communities from the 90s-2010. Homes range from 150 to 400 m² with city views. Alto Hatillo\'s gated communities have internal rules on construction and aesthetics. We manage approval with the condominium board.' },
  'campo-alegre': { name:'Campo Alegre', metro:'caracas', nearby:['Torre Europa','Centro Lido','El Rosal'],
    localTitle:'Kitchens tailored to Campo Alegre',
    localText:'Campo Alegre mixes luxury residential towers with mixed-use (office-residential) buildings. Apartments are typically 100 to 250 m², many partially remodeled in the 2000s and now in need of a full update. As a high-traffic, mixed-use area, Campo Alegre buildings have strict rules on worker access and material loading. We plan job logistics outside peak hours.',
    porque:'Campo Alegre\'s profile is executive and modern: clean lines, neutral tones, low-maintenance materials and integrated technology. We know Campo Alegre\'s housing types — near Centro Lido and the El Rosal boulevard — and design kitchens that make the most of every space. As a high-traffic, mixed-use area, Campo Alegre buildings have strict rules on worker access and material loading. We plan job logistics outside peak hours.',
    faq4:'Yes. Campo Alegre mixes luxury residential towers with mixed-use (office-residential) buildings. Apartments are typically 100 to 250 m², many partially remodeled in the 2000s and now in need of a full update. Campo Alegre towers require liability insurance and schedules approved by management. We handle all the paperwork.' },
  'chacao': { name:'Chacao', metro:'caracas', nearby:['Altamira','Los Palos Grandes','Chuao'],
    localTitle:'Kitchens tailored to Chacao',
    localText:'Chacao\'s housing stock combines 70s-90s residential buildings with contemporary towers. Apartments of 80 to 220 m² abound, with compartmentalized layouts that today\'s owners want to open up into more modern concepts. In Chacao most buildings are over 30 years old, so drain stacks, water risers and electrical panels are often at the limit of their service life. Before closing any finish we inspect and renew the hidden utilities.',
    porque:'Chacao clients usually seek contemporary finishes: large-format porcelain tile, concealed faucetry, technical lighting and custom carpentry. We know Chacao\'s housing types — near Altamira\'s Plaza Francia and the Los Palos Grandes commercial corridor — and design kitchens that make the most of every space. In Chacao most buildings are over 30 years old, so drain stacks, water risers and electrical panels are often at the limit of their service life. Before closing any finish we inspect and renew the hidden utilities.',
    faq4:'Yes. Chacao\'s housing stock combines 70s-90s residential buildings with contemporary towers. Apartments of 80 to 220 m² abound, with compartmentalized layouts that today\'s owners want to open up into more modern concepts. Chacao condominium boards usually require restricted work hours (8:00 a.m.-12:00 p.m. and 1:30-5:00 p.m.), debris control and elevator protection. We coordinate the entire protocol with building management.' },
  'country-club': { name:'Country Club', metro:'caracas', nearby:['Valle Arriba','El Country','Las Mercedes'],
    localTitle:'Kitchens tailored to Country Club',
    localText:'Country Club is one of Caracas\' most exclusive neighborhoods, with large single-family homes (300-800 m²) and a few penthouses. Many properties date from the 60s-80s and need a full reconfiguration. Country Club homes usually have solid concrete structures but very old utilities and leaky roofs. A full remodel here involves renewing roofs, waterproofing and complete plumbing systems.',
    porque:'In Country Club we work on classic-contemporary luxury projects: natural stone, fine carpentry, pools and large social areas. We know Country Club\'s housing types — near the Caracas Country Club and the Valle Arriba golf course — and design kitchens that make the most of every space. Country Club homes usually have solid concrete structures but very old utilities and leaky roofs. A full remodel here involves renewing roofs, waterproofing and complete plumbing systems.',
    faq4:'Yes. Country Club is one of Caracas\' most exclusive neighborhoods, with large single-family homes (300-800 m²) and a few penthouses. Many properties date from the 60s-80s and need a full reconfiguration. The Country Club neighbors\' association regulates facades, heights and enclosures. We respect the neighborhood\'s aesthetic in every exterior intervention.' },
  'el-hatillo': { name:'El Hatillo', metro:'caracas', nearby:['Casco Histórico','La Boyera','El Calvario'],
    localTitle:'Kitchens tailored to El Hatillo',
    localText:'El Hatillo\'s old town preserves colonial homes and 40s-60s quintas with inner courtyards, high ceilings and load-bearing walls. Outside the old town there are neighborhoods with homes from the 80s-2000s. El Hatillo\'s historic homes have load-bearing walls, wooden beams and obsolete electrical systems. Any structural work requires reinforcement and, in the old town, respect for the architectural heritage.',
    porque:'In El Hatillo the rustic-colonial and the contemporary coexist: exposed beams, restored fired-clay floors combined with modern kitchens and bathrooms. We know El Hatillo\'s housing types — near El Hatillo\'s Plaza Bolívar and the Santa Rosalía de Palermo church — and design kitchens that make the most of every space. El Hatillo\'s historic homes have load-bearing walls, wooden beams and obsolete electrical systems. Any structural work requires reinforcement and, in the old town, respect for the architectural heritage.',
    faq4:'Yes. El Hatillo\'s old town preserves colonial homes and 40s-60s quintas with inner courtyards, high ceilings and load-bearing walls. Outside the old town there are neighborhoods with homes from the 80s-2000s. El Hatillo\'s historic old town is protected: facade remodels and heritage elements require special approval. We advise on what can be changed and what must be preserved.' },
  'el-penon': { name:'El Peñón', metro:'caracas', nearby:['El Peñón','Baruta','Las Mercedes'],
    localTitle:'Kitchens tailored to El Peñón',
    localText:'El Peñón is a residential area with homes and some mid-rise buildings of 150 to 400 m², built between the 70s and the 2000s. It mixes family homes with investment properties. Hillside homes in El Peñón require attention to retaining walls and drains. Ground moisture is a factor to assess before remodeling.',
    porque:'El Peñón favors functional, durable remodels: waterproofing, utility upgrades and high-performance finishes. We know El Peñón\'s housing types — near the Baruta residential areas and the access to Las Mercedes — and design kitchens that make the most of every space. Hillside homes in El Peñón require attention to retaining walls and drains. Ground moisture is a factor to assess before remodeling.',
    faq4:'Yes. El Peñón is a residential area with homes and some mid-rise buildings of 150 to 400 m², built between the 70s and the 2000s. It mixes family homes with investment properties. El Peñón complexes have internal construction rules. We coordinate the necessary permits with the condominium board.' },
  'la-castellana': { name:'La Castellana', metro:'caracas', nearby:['La Castellana','Altamira','Campo Alegre'],
    localTitle:'Kitchens tailored to La Castellana',
    localText:'La Castellana combines 70s-90s residential buildings with corporate towers. Apartments range from 100 to 250 m², many with traditional layouts that lend themselves to being opened up into modern concepts. La Castellana has buildings with aging utilities and variable water pressure. We inspect risers and drain stacks before touching the finishes.',
    porque:'La Castellana favors contemporary, understated finishes: porcelain tile, concealed faucetry, custom carpentry and technical lighting. We know La Castellana\'s housing types — near Avenida Francisco de Miranda and La Castellana\'s financial corridor — and design kitchens that make the most of every space. La Castellana has buildings with aging utilities and variable water pressure. We inspect risers and drain stacks before touching the finishes.',
    faq4:'Yes. La Castellana combines 70s-90s residential buildings with corporate towers. Apartments range from 100 to 250 m², many with traditional layouts that lend themselves to being opened up into modern concepts. La Castellana buildings require work protocols approved by management. We handle schedules, elevators and debris.' },
  'la-lagunita': { name:'La Lagunita', metro:'caracas', nearby:['El Country','La Lagunita Country Club','Valle Arriba'],
    localTitle:'Kitchens tailored to La Lagunita',
    localText:'La Lagunita is a residential neighborhood of single-family homes on large lots, many with gardens and pools. Properties range from 250 to 700 m², built between the 70s and the 2000s. La Lagunita homes frequently have pools, gardens and service areas that need waterproofing and exterior renewal alongside the interior remodel.',
    porque:'In La Lagunita, full remodels of entire homes predominate: reconfiguration, pool, landscaping and high-end finishes. We know La Lagunita\'s housing types — near the Lagunita Country Club and Valle Arriba\'s green areas — and design kitchens that make the most of every space. La Lagunita homes frequently have pools, gardens and service areas that need waterproofing and exterior renewal alongside the interior remodel.',
    faq4:'Yes. La Lagunita is a residential neighborhood of single-family homes on large lots, many with gardens and pools. Properties range from 250 to 700 m², built between the 70s and the 2000s. La Lagunita\'s owners\' association regulates enclosures and facades. We coordinate the exterior work permits.' },
  'las-mercedes': { name:'Las Mercedes', metro:'caracas', nearby:['Tolón','Cerro Verde','Chuao'],
    localTitle:'Kitchens tailored to Las Mercedes',
    localText:'Las Mercedes combines 80s-90s residential buildings with new towers. There are apartments of 90 to 200 m² and several lofts in mixed-use buildings. It is a dynamic area with high owner turnover. Las Mercedes\' nightlife and commercial activity mean many apartments are remodeled for quick rental or resale. We optimize budgets to maximize return without sacrificing quality on critical points.',
    porque:'Las Mercedes asks for modern, urban designs: open kitchens, LED lighting, industrial finishes and multifunctional spaces. We know Las Mercedes\' housing types — near the Tolón mall and Avenida Río de Janeiro — and design kitchens that make the most of every space. Las Mercedes\' nightlife and commercial activity mean many apartments are remodeled for quick rental or resale. We optimize budgets to maximize return without sacrificing quality on critical points.',
    faq4:'Yes. Las Mercedes combines 80s-90s residential buildings with new towers. There are apartments of 90 to 200 m² and several lofts in mixed-use buildings. It is a dynamic area with high owner turnover. Las Mercedes\' mixed-use buildings have particular rules on hours and noise due to coexistence with commercial venues. We coordinate the work with management.' },
  'los-naranjos': { name:'Los Naranjos', metro:'caracas', nearby:['Los Naranjos de La Lagunita','El Hatillo','La Boyera'],
    localTitle:'Kitchens tailored to Los Naranjos',
    localText:'Los Naranjos is a family residential area with homes and townhouses from the 80s-2000s, of 150 to 350 m². It is a quiet neighborhood with a high share of long-term families. Many Los Naranjos homes are 25-40 years old and need their electrical and plumbing utilities updated, plus opening up spaces that were originally very compartmentalized.',
    porque:'Los Naranjos asks for family-friendly, functional designs: spacious kitchens, durable bathrooms, hard-wearing floors and spaces for children. We know Los Naranjos\' housing types — near Los Naranjos\' green areas and the access to La Boyera — and design kitchens that make the most of every space. Many Los Naranjos homes are 25-40 years old and need their electrical and plumbing utilities updated, plus opening up spaces that were originally very compartmentalized.',
    faq4:'Yes. Los Naranjos is a family residential area with homes and townhouses from the 80s-2000s, of 150 to 350 m². It is a quiet neighborhood with a high share of long-term families. Los Naranjos townhouse complexes have rules on coexistence and work hours. We respect each neighborhood\'s regulations.' },
  'prados-del-este': { name:'Prados del Este', metro:'caracas', nearby:['Prados del Este','Las Mercedes','Cerro Verde'],
    localTitle:'Kitchens tailored to Prados del Este',
    localText:'Prados del Este is an established neighborhood with single-family homes of 200 to 500 m² and a few low-rise buildings. Homes mostly date from the 70s-90s. Prados del Este homes usually have solid structures but roofs and terraces that leak from lack of maintenance. Waterproofing is the first step in almost every remodel here.',
    porque:'In Prados del Este we work on family-home remodels: space reconfiguration, bathroom and kitchen renewal, and exterior updates. We know Prados del Este\'s housing types — near the Prados del Este club and the Cerro Verde residential areas — and design kitchens that make the most of every space. Prados del Este homes usually have solid structures but roofs and terraces that leak from lack of maintenance. Waterproofing is the first step in almost every remodel here.',
    faq4:'Yes. Prados del Este is an established neighborhood with single-family homes of 200 to 500 m² and a few low-rise buildings. Homes mostly date from the 70s-90s. Prados del Este\'s neighbors\' association regulates facades and uses. We coordinate work permits and schedules.' },
  'el-parral': { name:'El Parral', metro:'carabobo', nearby:['El Parral','Camoruco','El Viñedo'],
    localTitle:'Kitchens tailored to El Parral',
    localText:'El Parral is a sector with a strong real-estate boom in Valencia, with new homes of 100 to 300 m² and 15-20 year-old properties that need updating. High profitability for revaluation. New El Parral homes require customization of builder-grade finishes, while the 15-20 year-old ones need utility renewal and an aesthetic update.',
    porque:'El Parral asks for designs aimed at adding value: modern kitchens, spa-style bathrooms, premium floors and finishes that maximize return on investment. We know El Parral\'s housing types — near Avenida Bolívar Norte and El Parral\'s new developments — and design kitchens that make the most of every space. New El Parral homes require customization of builder-grade finishes, while the 15-20 year-old ones need utility renewal and an aesthetic update.',
    faq4:'Yes. El Parral is a sector with a strong real-estate boom in Valencia, with new homes of 100 to 300 m² and 15-20 year-old properties that need updating. High profitability for revaluation. New El Parral buildings have strict condominium rules. We manage work approvals.' },
  'el-trigal': { name:'El Trigal', metro:'carabobo', nearby:['El Trigal Norte','El Trigal Sur','El Trigal Centro'],
    localTitle:'Kitchens tailored to El Trigal',
    localText:'El Trigal is one of Valencia\'s largest and most traditional neighborhoods, with single-family homes of 150 to 400 m² and residential buildings. Homes mostly date from the 70s-90s. El Trigal homes usually have old 110V electrical systems and corroded galvanized-iron pipes. Electrical and plumbing upgrades are a priority in almost every remodel.',
    porque:'El Trigal asks for family-friendly, functional remodels: spacious kitchens, modern bathrooms, porcelain-tile floors and good lighting. We know El Trigal\'s housing types — near Avenida Bolívar Norte and the La Granja mall — and design kitchens that make the most of every space. El Trigal homes usually have old 110V electrical systems and corroded galvanized-iron pipes. Electrical and plumbing upgrades are a priority in almost every remodel.',
    faq4:'Yes. El Trigal is one of Valencia\'s largest and most traditional neighborhoods, with single-family homes of 150 to 400 m² and residential buildings. Homes mostly date from the 70s-90s. El Trigal\'s neighbors\' associations regulate facades and work hours. We manage permits with the community.' },
  'el-vinedo': { name:'El Viñedo', metro:'carabobo', nearby:['El Viñedo','Camoruco','Prebo'],
    localTitle:'Kitchens tailored to El Viñedo',
    localText:'El Viñedo is an upper-middle-class neighborhood with homes of 200 to 500 m² and a few buildings. Homes range from the 70s to the 2000s, many with gardens and service areas. El Viñedo has homes with solid concrete structures but aging utilities. Bathroom and kitchen renewals usually involve replacing the entire cold and hot water network.',
    porque:'El Viñedo favors contemporary finishes: large-format porcelain tile, kitchens with an island, modern faucetry and custom carpentry. We know El Viñedo\'s housing types — near Avenida Universidad and the Camoruco residential corridor — and design kitchens that make the most of every space. El Viñedo has homes with solid concrete structures but aging utilities. Bathroom and kitchen renewals usually involve replacing the entire cold and hot water network.',
    faq4:'Yes. El Viñedo is an upper-middle-class neighborhood with homes of 200 to 500 m² and a few buildings. Homes range from the 70s to the 2000s, many with gardens and service areas. El Viñedo\'s associations regulate enclosures and facades. We manage exterior work permits.' },
  'guacara': { name:'Guacara', metro:'carabobo', nearby:['Guacara Centro','La Emboscada','Yagua'],
    localTitle:'Kitchens tailored to Guacara',
    localText:'Guacara is an industrial-residential municipality with homes of 120 to 350 m² and neighborhoods from the 80s-2010. Many homes belong to long-term families. Guacara homes frequently have leaky roofs and electrical systems overloaded by unplanned additions. We assess electrical capacity before remodeling.',
    porque:'Guacara favors practical remodels: bathroom and kitchen renewal, waterproofing and utility upgrades. We know Guacara\'s housing types — near the Guacara-Bárbula intercommunal avenue and the old town center — and design kitchens that make the most of every space. Guacara homes frequently have leaky roofs and electrical systems overloaded by unplanned additions. We assess electrical capacity before remodeling.',
    faq4:'Yes. Guacara is an industrial-residential municipality with homes of 120 to 350 m² and neighborhoods from the 80s-2010. Many homes belong to long-term families. Guacara\'s neighborhoods have internal construction rules. We manage permits and schedules with the community.' },
  'guataparo': { name:'Guataparo', metro:'carabobo', nearby:['Guataparo','El Viñedo','Camoruco'],
    localTitle:'Kitchens tailored to Guataparo',
    localText:'Guataparo is an exclusive residential area with large homes (300-700 m²) and a few gated communities. Properties date from the 80s-2010, many with a pool and garden. Guataparo homes with a pool and green areas require terrace waterproofing, irrigation-system renewal and exterior utility upgrades alongside the interior work.',
    porque:'Guataparo asks for high-end projects: total reconfiguration, pools, landscaping, premium finishes and home automation. We know Guataparo\'s housing types — near the Guataparo Country Club and the neighborhood\'s green areas — and design kitchens that make the most of every space. Guataparo homes with a pool and green areas require terrace waterproofing, irrigation-system renewal and exterior utility upgrades alongside the interior work.',
    faq4:'Yes. Guataparo is an exclusive residential area with large homes (300-700 m²) and a few gated communities. Properties date from the 80s-2010, many with a pool and garden. Guataparo\'s owners\' association regulates facades, pools and enclosures. We coordinate all permits.' },
  'la-trigalena': { name:'La Trigaleña', metro:'carabobo', nearby:['La Trigaleña','El Trigal','Prebo'],
    localTitle:'Kitchens tailored to La Trigaleña',
    localText:'La Trigaleña is an established residential area with homes of 180 to 450 m² on generous lots. Many properties are 30-45 years old and keep their original layouts. La Trigaleña homes frequently have flat-slab roofs with accumulated leaks and overloaded electrical systems. Waterproofing and rewiring are the usual starting point.',
    porque:'In La Trigaleña we work on full-home remodels: reconfiguration, bathroom and kitchen renewal, and exterior recovery. We know La Trigaleña\'s housing types — near Avenida Andrés Eloy Blanco and Prebo\'s commercial areas — and design kitchens that make the most of every space. La Trigaleña homes frequently have flat-slab roofs with accumulated leaks and overloaded electrical systems. Waterproofing and rewiring are the usual starting point.',
    faq4:'Yes. La Trigaleña is an established residential area with homes of 180 to 450 m² on generous lots. Many properties are 30-45 years old and keep their original layouts. La Trigaleña has neighborly rules on coexistence and aesthetics. We coordinate schedules and debris handling with the association.' },
  'los-guayos': { name:'Los Guayos', metro:'carabobo', nearby:['Los Guayos Centro','La Florida','El Carmen'],
    localTitle:'Kitchens tailored to Los Guayos',
    localText:'Los Guayos is a municipality with traditional homes of 100 to 300 m² and neighborhoods from the 80s-2010. It mixes family homes with investment properties for rent. Los Guayos homes usually have old electrical systems and moisture problems on perimeter walls. Waterproofing and rewiring are frequent.',
    porque:'Los Guayos asks for functional, budget-friendly remodels: bathroom and kitchen updates, durable floors and good lighting. We know Los Guayos\' housing types — near the intercommunal avenue and Los Guayos\' old town center — and design kitchens that make the most of every space. Los Guayos homes usually have old electrical systems and moisture problems on perimeter walls. Waterproofing and rewiring are frequent.',
    faq4:'Yes. Los Guayos is a municipality with traditional homes of 100 to 300 m² and neighborhoods from the 80s-2010. It mixes family homes with investment properties for rent. Los Guayos\' neighbors\' associations regulate schedules and aesthetics. We coordinate work permits.' },
  'manongo': { name:'Manongo', metro:'carabobo', nearby:['Manongo','La Granja','Naguanagua'],
    localTitle:'Kitchens tailored to Manongo',
    localText:'Manongo is a growing area with new neighborhoods, townhouses and apartment buildings from the 2000s-2020. Homes range from 90 to 250 m². New Manongo homes usually require customization of builder-grade finishes: generic floors, kitchens and bathrooms that owners want to adapt to their taste.',
    porque:'Manongo favors contemporary designs: open kitchens, spa-style bathrooms, integrated lighting and premium finishes. We know Manongo\'s housing types — near the intercommunal avenue and La Granja\'s new developments — and design kitchens that make the most of every space. New Manongo homes usually require customization of builder-grade finishes: generic floors, kitchens and bathrooms that owners want to adapt to their taste.',
    faq4:'Yes. Manongo is a growing area with new neighborhoods, townhouses and apartment buildings from the 2000s-2020. Homes range from 90 to 250 m². New Manongo complexes have strict condominium rules on modifications. We manage the approvals.' },
  'naguanagua': { name:'Naguanagua', metro:'carabobo', nearby:['Naguanagua Centro','La Granja','El Retobo'],
    localTitle:'Kitchens tailored to Naguanagua',
    localText:'Naguanagua is a municipality with a mix of traditional homes of 120 to 350 m², gated communities and apartment buildings. The housing stock ranges from the 70s to today. Naguanagua has areas with uneven water pressure and homes with old utilities. Installing pumping systems and tanks is frequent in remodels.',
    porque:'Naguanagua asks for practical, durable remodels: utility upgrades, functional bathrooms and kitchens, hard-wearing floors. We know Naguanagua\'s housing types — near Avenida Universidad and the La Granja mall — and design kitchens that make the most of every space. Naguanagua has areas with uneven water pressure and homes with old utilities. Installing pumping systems and tanks is frequent in remodels.',
    faq4:'Yes. Naguanagua is a municipality with a mix of traditional homes of 120 to 350 m², gated communities and apartment buildings. The housing stock ranges from the 70s to today. Naguanagua\'s neighborhoods have internal construction rules. We coordinate permits and schedules with each condominium.' },
  'prebo': { name:'Prebo', metro:'carabobo', nearby:['Prebo I','Prebo II','Camoruco'],
    localTitle:'Kitchens tailored to Prebo',
    localText:'Prebo is one of Valencia\'s most central and commercial areas, with 70s-90s residential buildings and apartments of 80 to 200 m². High density and a good location. Prebo buildings have old utilities and small spaces. Remodeling here optimizes every square meter: linear kitchens, compact bathrooms and integrated storage.',
    porque:'Prebo favors efficient, modern designs: multifunctional spaces, LED lighting, low-maintenance finishes. We know Prebo\'s housing types — near Avenida Bolívar and the Prebo mall — and design kitchens that make the most of every space. Prebo buildings have old utilities and small spaces. Remodeling here optimizes every square meter: linear kitchens, compact bathrooms and integrated storage.',
    faq4:'Yes. Prebo is one of Valencia\'s most central and commercial areas, with 70s-90s residential buildings and apartments of 80 to 200 m². High density and a good location. Prebo condominiums require work hours and protection of common areas. We manage coordination with management.' },
  'puerto-cabello': { name:'Puerto Cabello', metro:'carabobo', nearby:['Casco Histórico','El Malecón','La Sorpresa'],
    localTitle:'Kitchens tailored to Puerto Cabello',
    localText:'Puerto Cabello preserves a colonial old town with 18th-19th century homes, plus coastal homes and apartments from the 70s-2000. Size ranges from 80 to 400 m². The proximity to the sea in Puerto Cabello accelerates corrosion of hardware, electrical systems and faucetry. We use salt-resistant materials and treat capillary moisture.',
    porque:'In Puerto Cabello we work on colonial restoration and coastal housing: salt-resistant materials, cross-ventilation and cool finishes. We know Puerto Cabello\'s housing types — near Fortín Solano and the Puerto Cabello boardwalk — and design kitchens that make the most of every space. The proximity to the sea in Puerto Cabello accelerates corrosion of hardware, electrical systems and faucetry. We use salt-resistant materials and treat capillary moisture.',
    faq4:'Yes. Puerto Cabello preserves a colonial old town with 18th-19th century homes, plus coastal homes and apartments from the 70s-2000. Size ranges from 80 to 400 m². Puerto Cabello\'s old town is heritage: remodels require approval from the cultural heritage institute. We advise on permitted interventions.' },
  'san-diego': { name:'San Diego', metro:'carabobo', nearby:['San Diego Centro','La Esmeralda','Yuma'],
    localTitle:'Kitchens tailored to San Diego',
    localText:'San Diego is a fast-growing municipality with gated communities, townhouses and homes of 120 to 400 m² built mostly between 2000 and 2020. San Diego homes are relatively new but many have basic builder-grade finishes. Remodeling focuses on personalizing kitchens, bathrooms and floors without touching the structure.',
    porque:'San Diego asks for modern, family-friendly designs: kitchens with an island, spacious bathrooms, custom closets and integrated social areas. We know San Diego\'s housing types — near the Don Julio Centeno intercommunal avenue and the Fin de Siglo mall — and design kitchens that make the most of every space. San Diego homes are relatively new but many have basic builder-grade finishes. Remodeling focuses on personalizing kitchens, bathrooms and floors without touching the structure.',
    faq4:'Yes. San Diego is a fast-growing municipality with gated communities, townhouses and homes of 120 to 400 m² built mostly between 2000 and 2020. San Diego\'s gated communities have strict facade and schedule rules. We coordinate with the condominium board.' },
  'tocuyito': { name:'Tocuyito', metro:'carabobo', nearby:['Tocuyito Centro','La Libertad','El Naipe'],
    localTitle:'Kitchens tailored to Tocuyito',
    localText:'Tocuyito is a municipality with homes of 100 to 300 m², many self-built and expanded in stages. Homes range from the 80s to today. Tocuyito homes usually have unplanned additions with improvised utilities. Electrical and plumbing regularization is the first step in any remodel.',
    porque:'Tocuyito asks for functional, good-value remodels: modern bathrooms and kitchens, hard-wearing floors and storage solutions. We know Tocuyito\'s housing types — near Tocuyito\'s old town center and the road to Campo Carabobo — and design kitchens that make the most of every space. Tocuyito homes usually have unplanned additions with improvised utilities. Electrical and plumbing regularization is the first step in any remodel.',
    faq4:'Yes. Tocuyito is a municipality with homes of 100 to 300 m², many self-built and expanded in stages. Homes range from the 80s to today. Tocuyito has less formal regulation, but we coordinate with neighbors\' associations where they exist.' },
  'valencia-centro': { name:'Valencia Centro', metro:'carabobo', nearby:['Casco Histórico','Catedral','El Centro'],
    localTitle:'Kitchens tailored to Valencia Centro',
    localText:'Downtown Valencia preserves historic buildings and 30s-60s homes with inner courtyards, high ceilings and load-bearing walls. There are also apartment buildings from the 70s-80s. Homes in the historic center have load-bearing walls, obsolete electrical systems and moisture problems from poor ventilation. Any structural work requires reinforcement and respect for heritage.',
    porque:'In downtown Valencia the historic and the modern coexist: restoration of original elements combined with contemporary kitchens and bathrooms. We know Valencia Centro\'s housing types — near Valencia\'s Plaza Bolívar and the Cathedral — and design kitchens that make the most of every space. Homes in the historic center have load-bearing walls, obsolete electrical systems and moisture problems from poor ventilation. Any structural work requires reinforcement and respect for heritage.',
    faq4:'Yes. Downtown Valencia preserves historic buildings and 30s-60s homes with inner courtyards, high ceilings and load-bearing walls. There are also apartment buildings from the 70s-80s. Valencia\'s old town has heritage protection: facade remodels require special approval. We advise on what can be modified.' },
  'valles-de-camoruco': { name:'Valles de Camoruco', metro:'carabobo', nearby:['Camoruco','El Viñedo','Prebo'],
    localTitle:'Kitchens tailored to Valles de Camoruco',
    localText:'Valles de Camoruco is a residential area with homes of 180 to 450 m² and a few buildings, built between the 70s and the 2000s. An established, well-located neighborhood. Camoruco homes have solid structures but aging utilities. A full renewal involves updating electricity, water and finishes in a single project.',
    porque:'Camoruco favors full remodels: reconfiguration, modern bathrooms and kitchens, porcelain-tile floors and custom carpentry. We know Valles de Camoruco\'s housing types — near Avenida Universidad and Camoruco\'s commercial corridor — and design kitchens that make the most of every space. Camoruco homes have solid structures but aging utilities. A full renewal involves updating electricity, water and finishes in a single project.',
    faq4:'Yes. Valles de Camoruco is a residential area with homes of 180 to 450 m² and a few buildings, built between the 70s and the 2000s. An established, well-located neighborhood. Camoruco\'s associations regulate facades and schedules. We coordinate permits with the community.' },
};

// ---------- SERVICIOS (contenido estatico traducido) ----------
const SERVICES = {
  cocina: {
    key:'cocina', slugService:'kitchens', serviceType:'Kitchen Remodeling', serviceLabel:'Kitchen Remodeling',
    heroImage:'/images/cocina.webp', serviceLink:'/en/services/kitchens',
    pageTitle:(z)=>`Kitchen Remodeling in ${z} | 2026 Prices | ReformaT`,
    desc:(z,m,n)=>`Kitchen remodeling specialists in ${z}, ${m==='caracas'?'Caracas':'Valencia'}. We work in ${n.join(', ')} and the whole area. Free quotes. 15+ years of experience. Written warranty.`,
    excerpt:(z,n)=>`Looking for a kitchen remodel in ${z}? At ReformaT Venezuela we design and build modern, functional, custom kitchens for homes in ${z} and ${n.join(', ')}. With more than 15 years of experience, we know the housing types of the area.`,
    includesH2:(z)=>`What our kitchen remodel in ${z} includes`,
    includes:[
      ['Design & layout','kitchen plan, work triangle and space optimization'],
      ['Demolition & removal','dismantling of cabinets, countertop and existing finishes'],
      ['Utilities','renewal of water, gas and electrical points to code'],
      ['Custom cabinetry','upper and lower cabinets in melamine, lacquered MDF or solid wood'],
      ['Countertop','quartz, granite, large-format porcelain or solid surface'],
      ['Backsplash & wall finishes','porcelain, glass or ceramic around the cooking zone'],
      ['Appliances & lighting','installation of range hood, oven, cooktop and under-cabinet lighting'],
    ],
    priceH2:(z)=>`Price of remodeling a kitchen in ${z}`,
    priceIntro:(z)=>`Kitchen prices in ${z} start at <strong>$2,500</strong>. The final budget depends on size, the materials chosen and the complexity of the utilities. We always deliver a fixed, itemized quote with no surprises.`,
    th:['Kitchen type','Indicative price'],
    rows:[['Standard linear kitchen','$2,500 – $5,000'],['L / U-shaped kitchen with island','$5,000 – $9,000'],['Premium custom kitchen','$9,000 – $20,000+']],
    procH2:(z)=>`How we work in ${z}`,
    proc:[
      ['1. Technical visit & measurement',`We visit your home in ${'Z'}, take exact measurements and assess the water, gas and electrical utilities. No obligation.`],
      ['2. 3D design & quote','We deliver a design proposal with 3D renders, a materials list and a fixed itemized quote within 5 business days.'],
      ['3. Manufacturing & construction',`We build the custom cabinetry and carry out the work with our own crew. Z condominiums are strict about noise rules and debris management. We handle work permits, schedules and freight-elevator use with the board of owners.`],
      ['4. Installation & handover','We install the countertop, appliances and final finishes. We hand over clean, with a 2-year written warranty.'],
    ],
    faqs:(z)=>[
      [`How much does it cost to remodel a kitchen in ${z}?`, `A standard kitchen remodel in ${z} starts at $2,500 (cabinets, countertop, backsplash and utilities). Premium kitchens with a central island and integrated appliances range from $5,000 to $12,000. We prepare a detailed quote with no obligation.`],
      [`How long does a kitchen remodel take in ${z}?`, `A standard kitchen takes 3 to 5 weeks, including custom cabinetry manufacturing. Premium kitchens can take 6-8 weeks. We deliver a fixed schedule before starting.`],
      [`Do you build custom cabinetry?`, `Yes. We build custom cabinets in melamine, lacquered MDF or solid wood according to the design and budget. This lets us make the most of the irregular spaces typical of older homes.`],
    ],
    waMsg:(z)=>`Hello, I want to remodel my kitchen in ${z}`,
  },
  bano: {
    key:'bano', slugService:'bathrooms', serviceType:'Bathroom Remodeling', serviceLabel:'Bathroom Remodeling',
    heroImage:'/images/bano.webp', serviceLink:'/en/services/bathrooms',
    pageTitle:(z)=>`Bathroom Remodeling in ${z} | 2026 Prices | ReformaT`,
    desc:(z,m,n)=>`Bathroom remodeling specialists in ${z}, ${m==='caracas'?'Caracas':'Valencia'}. We work in ${n.join(', ')} and the whole area. Free quotes. 15+ years of experience. Written warranty.`,
    excerpt:(z,n)=>`Looking for a bathroom remodel in ${z}? At ReformaT Venezuela we design and build modern, functional, custom bathrooms for homes in ${z} and ${n.join(', ')}. With more than 15 years of experience, we know the housing types of the area.`,
    includesH2:(z)=>`What our bathroom remodel in ${z} includes`,
    includes:[
      ['Demolition & removal','chipping of wall finishes, removal of fixtures and authorized debris disposal'],
      ['Waterproofing','cementitious system + membrane in the shower area with a 48-hour water-tightness test'],
      ['Plumbing','renewal of cold/hot water pipes and drains when age requires it'],
      ['Wall & floor finishes','porcelain, ceramic or microcement on floors and walls'],
      ['Fixtures & faucetry','installation of toilet, vanity sink, shower or tub and concealed or wall-mount faucets'],
      ['Electrical & lighting','light points, GFCI outlets and forced ventilation'],
      ['Carpentry & accessories','vanity cabinet, glass shower enclosure and accessories'],
    ],
    priceH2:(z)=>`Price of remodeling a bathroom in ${z}`,
    priceIntro:(z)=>`Bathroom prices in ${z} start at <strong>$1,200</strong> for a standard 4-6 m² bathroom with mid-range finishes. The final budget depends on size, materials and the complexity of the utilities. We always deliver a fixed, itemized quote with no surprises.`,
    th:['Bathroom type','Indicative price'],
    rows:[['Standard bathroom (4-6 m²)','$1,200 – $2,800'],['Full bathroom with custom shower','$2,800 – $5,500'],['Premium / spa-style bathroom','$5,500 – $12,000+']],
    procH2:(z)=>`How we work in ${z}`,
    proc:[
      ['1. Technical visit & diagnosis',`A technician visits your home in ${'Z'}, measures, inspects hidden utilities and detects moisture or structural issues. No obligation.`],
      ['2. Design & fixed quote','We deliver a proposal with material selection, renders and a detailed itemized quote within 5 business days.'],
      ['3. Construction & supervision',`We carry out the work with our own crew, daily supervision and an agreed schedule. Z condominiums are strict about noise rules and debris management. We handle work permits, schedules and freight-elevator use with the board of owners.`],
      ['4. Handover & warranty','We hand over with final cleaning, a function test and a written warranty: 5 years on waterproofing and 2 years on installation.'],
    ],
    faqs:(z)=>[
      [`How much does it cost to remodel a bathroom in ${z}?`, `A standard bathroom in ${z} starts at $1,200 (4-6 m² with mid-range finishes). Bathrooms with a custom shower range from $2,800 to $5,500, and premium spa-style bathrooms exceed $5,500. We prepare a detailed quote with no obligation.`],
      [`How long does a bathroom remodel take in ${z}?`, `A standard bathroom takes 10 to 15 business days. Projects with a custom shower or layout changes can take 3-4 weeks. We deliver a fixed schedule before starting.`],
      [`Do you offer a warranty against leaks?`, `Yes, 5 years on waterproofing and 2 years on general installation. We run a 48-hour water-tightness test before closing the walls, documented with photos and video.`],
    ],
    waMsg:(z)=>`Hello, I want to remodel my bathroom in ${z}`,
  },
  integral: {
    key:'integral', slugService:'whole-home', serviceType:'Whole Home Remodeling', serviceLabel:'Full Home Remodeling',
    heroImage:'/images/integrales-proyecto-completo.webp', serviceLink:'/en/services/whole-home',
    pageTitle:(z)=>`Full Home Remodeling in ${z} | 2026 Prices | ReformaT`,
    desc:(z,m,n)=>`Full home remodeling specialists in ${z}, ${m==='caracas'?'Caracas':'Valencia'}. Turnkey apartments, homes and offices. We work in ${n.join(', ')} and the whole area. Free quotes. Written warranty.`,
    excerpt:(z,n)=>`Full home remodeling in ${z}: turnkey apartments, homes and offices. Design, permits, construction and finishes with a single point of contact. Over 200 projects delivered in ${z} and ${n.join(', ')}.`,
    includesH2:(z)=>`What a full remodel in ${z} includes`,
    includesIntro:`A full remodel completely transforms your home: a new layout, renewed utilities, premium finishes and signature design. At ReformaT we manage the entire process with a single team, a single budget and a single project lead.`,
    includes:[
      ['Design & project','as-built plans, photorealistic 3D design, specifications sheet and fixed quote'],
      ['Permit management','paperwork with the condominium, city hall and relevant authorities for the area'],
      ['Civil works','demolition, space reconfiguration, partition walls and structural reinforcement'],
      ['Utilities','complete renewal of electrical, water, gas, climate-control and data systems'],
      ['Finishes','flooring, wall coverings, painting, carpentry, lighting and home automation'],
      ['Kitchens & bathrooms','complete remodel of every wet area'],
      ['Turnkey handover','final cleaning, basic styling and written warranty'],
    ],
    priceH2:(z)=>`Price of a full remodel in ${z}`,
    priceIntro:(z)=>`Full remodel prices in ${z} start at <strong>$15,000</strong>. The final budget depends on size, the materials chosen and the complexity of the utilities. We always deliver a fixed, itemized quote with no surprises.`,
    th:['Project type','Indicative price'],
    rows:[['Cosmetic update (floors, paint, bathrooms)','$15,000 – $30,000'],['Remodel with partial layout changes','$30,000 – $60,000'],['Premium turnkey full remodel','$60,000 – $150,000+']],
    procH2:(z)=>`How we work in ${z}`,
    proc:[
      ['1. Diagnosis & preliminary project',`We visit your home in ${'Z'}, assess the structure and utilities, and define the scope and target budget with you.`],
      ['2. Executive project',`We develop plans, 3D renders, a specifications sheet and a fixed itemized quote. Z condominiums are strict about noise rules and debris management. We handle work permits, schedules and freight-elevator use with the board of owners.`],
      ['3. Construction','We execute with our own crew and daily supervision. Weekly progress reports with photos and an updated schedule.'],
      ['4. Turnkey handover','We deliver the home ready to live in, with final cleaning, utility testing and a written warranty of up to 5 years.'],
    ],
    faqs:(z)=>[
      [`How much does a full remodel cost in ${z}?`, `A full remodel in ${z} starts at $15,000 for 80 m² apartments with standard finishes. Premium projects with complete reconfiguration and luxury finishes: $25,000-$50,000+. Fixed itemized quote with no surprises.`],
      [`How long does a full remodel take in ${z}?`, `An 80-120 m² apartment takes 2 to 4 months. Large homes with structural reconfiguration may take 4-6 months. We deliver a detailed schedule before starting.`],
      [`Can I live in the home during the work?`, `It depends on the scope. In phased remodels it's possible to occupy untouched areas. In full remodels with reconfiguration we recommend moving out temporarily for safety and speed.`],
    ],
    waMsg:(z)=>`Hello, I want a full remodel of my home in ${z}`,
  },
};

// ---------- PLANTILLA ----------
const STYLE = `\
.article-hero { position: relative; min-height: 80vh; display: flex; align-items: flex-end; justify-content: flex-start; overflow: hidden; padding: 140px 24px 80px; }
.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; transform: scale(1.05); z-index: 1; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.5) 50%, rgba(15,15,15,0.3) 100%); }
.hero-content { position: relative; z-index: 2; max-width: 950px; margin: 0 auto; width: 100%; }
.back-link { display: inline-block; color: var(--gold); text-decoration: none; font-size: 0.9rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 25px; transition: opacity 0.3s; }
.back-link:hover { opacity: 0.7; }
.article-category { display: inline-block; background: rgba(201,169,97,0.2); border: 1px solid var(--gold); color: var(--gold); padding: 8px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; backdrop-filter: blur(10px); }
.article-title { font-family: var(--font-serif); font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 400; line-height: 1.08; margin-bottom: 25px; color: var(--white); }
.article-title .line { display: block; }
.article-title .gold { color: var(--gold); }
.article-excerpt { font-size: 1.3rem; color: rgba(255,255,255,0.85); max-width: 700px; line-height: 1.7; font-weight: 400; }
.article-section { padding: 90px 24px; }
.container { max-width: 950px; margin: 0 auto; }
.article-body { font-size: 1.2rem; line-height: 1.85; color: var(--text); }
.article-body h2 { font-family: var(--font-serif); font-size: 2.4rem; margin: 3rem 0 1.2rem; color: var(--text); line-height: 1.2; font-weight: 500; }
.article-body h3 { font-size: 1.8rem; margin: 2.5rem 0 1rem; color: var(--text); font-weight: 500; }
.article-body p { margin-bottom: 1.5rem; font-weight: 400; }
.article-body a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold); }
.article-body ul { margin: 1.5rem 0 1.5rem 2rem; }
.article-body li { margin-bottom: 0.75rem; font-weight: 400; }
.article-body table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 1.05rem; }
.article-body th { background: var(--bg); color: var(--white); padding: 14px 18px; text-align: left; font-weight: 600; }
.article-body td { padding: 14px 18px; border-bottom: 1px solid #e5e0d5; }
.article-body tr:nth-child(even) td { background: #faf8f3; }
.local-box { background: #f8f6f1; border-left: 4px solid var(--gold); padding: 24px 28px; border-radius: 0 12px 12px 0; margin: 2rem 0; }
.local-box h3 { margin: 0 0 12px; font-size: 1.4rem; }
.local-box p { margin: 0; font-size: 1.1rem; }
.cta-section { background: var(--bg); color: var(--white); text-align: center; padding: 110px 24px; width: 100%; }
.cta-wrapper { max-width: 950px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.cta-title { font-family: var(--font-serif); font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 400; margin-bottom: 24px; line-height: 1.15; color: var(--white); text-align: center; width: 100%; }
.cta-text { color: rgba(255,255,255,0.85); max-width: 800px; margin: 0 auto 45px; font-size: 1.25rem; line-height: 1.7; font-weight: 400; text-align: center; width: 100%; }
.cta-section .btn-premium { padding: 20px 55px; font-size: 0.9rem; }
@media (max-width: 768px) { .article-hero { min-height: 70vh; padding-top: 120px; padding-bottom: 60px; } .article-title { font-size: clamp(2rem, 8vw, 3.5rem); } .article-excerpt { font-size: 1.15rem; } .article-body { font-size: 1.15rem; } .article-body h2 { font-size: 2rem; } .article-body h3 { font-size: 1.5rem; } .cta-section { padding: 90px 20px; } }`;

function metroName(m){ return m==='caracas' ? 'Caracas' : 'Carabobo'; }
function cityPage(m){ return m==='caracas' ? '/en/caracas' : '/en/valencia'; }
function cityLabel(m){ return m==='caracas' ? 'Caracas' : 'Valencia'; }
function nearbyText(z){
  const zone = ZONES[z];
  const city = cityLabel(zone.metro);
  const link = cityPage(zone.metro);
  const list = zone.nearby.join(', ');
  return zone.metro==='caracas'
    ? `Beyond ${zone.name}, we work in ${list} and across all of ${city}. See our <a href="${link}">remodeling in ${city}</a> page for every service available in your area.`
    : `Beyond ${zone.name}, we work in ${list} and across the state of Carabobo. See our <a href="${link}">remodeling in ${city}</a> page for every service available in your area.`;
}

function buildPage(serviceKey, zoneKey){
  const s = SERVICES[serviceKey];
  const z = ZONES[zoneKey];
  const Z = z.name;
  const metro = metroName(z.metro);
  const nearby = z.nearby;
  const slug = `${serviceKey}-${zoneKey}`;
  const procHtml = s.proc.map(([h,p]) => `<h3>${h}</h3>\n<p>${p.replaceAll('Z', Z)}</p>`).join('\n');
  const includesHtml = (s.includesIntro ? `<p>${s.includesIntro}</p>\n` : '') +
    '<ul>\n' + s.includes.map(([k,v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('\n') + '\n</ul>';
  const rowsHtml = s.rows.map(([a,b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('\n');
  const faqs = [...s.faqs(Z), [`Do you know the homes in ${Z}?`, z.faq4]];
  const faqProps = faqs.map(([q,a]) => `{ question: ${JSON.stringify(q)}, answer: ${JSON.stringify(a)} }`).join(',\n  ');
  const waMsg = encodeURIComponent(s.waMsg(Z));
  const areasArr = [...nearby.slice(0,3), cityLabel(z.metro)];

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import FAQ from '../../components/FAQ.astro';
import ServiceSchema from '../../components/ServiceSchema.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import ZoneCrossLinks from '../../components/ZoneCrossLinks.astro';
---

<BaseLayout
  title=${JSON.stringify(s.pageTitle(Z))}
  description=${JSON.stringify(s.desc(Z, z.metro, nearby))}
  image=${JSON.stringify(s.heroImage)}
  activePage="services"
>

<header class="article-hero">
  <img class="hero-bg" src=${JSON.stringify(s.heroImage)} alt=${JSON.stringify(`${s.serviceLabel} in ${Z} | ReformaT Venezuela`)} fetchpriority="high" loading="eager" decoding="async" />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <a href="/en/services" class="back-link">← Back to Services</a>
    <span class="article-category">${metro} · Local Service</span>
    <h1 class="article-title"><span class="line">${s.serviceLabel} in</span> <span class="line gold">${Z}</span></h1>
    <p class="article-excerpt">${s.excerpt(Z, nearby)}</p>
  </div>
</header>

<Breadcrumb items={[
  { name: 'Home', url: '/en' },
  { name: 'Services', url: '/en/services' },
  { name: ${JSON.stringify(s.serviceLabel)}, url: ${JSON.stringify(s.serviceLink)} },
  { name: ${JSON.stringify(Z)}, url: ${JSON.stringify(`/en/${slug}`)} }
]} />

<section class="article-section">
  <div class="container">
    <div class="article-body">
      <p>${s.excerpt(Z, nearby)}</p>

      <div class="local-box">
        <h3>${z.localTitle}</h3>
        <p>${z.localText}</p>
      </div>

<h2>${s.includesH2(Z)}</h2>
${includesHtml}

<h2>${s.priceH2(Z)}</h2>
<p>${s.priceIntro(Z)}</p>
<table>
<thead><tr><th>${s.th[0]}</th><th>${s.th[1]}</th></tr></thead>
<tbody>
${rowsHtml}
</tbody>
</table>

<h2>${s.procH2(Z)}</h2>
${procHtml}

<h2>Why ReformaT in ${Z}</h2>
<p>${z.porque}</p>

      <h2>Service throughout ${cityLabel(z.metro)}</h2>
      <p>${nearbyText(zoneKey)}</p>
    </div>
  </div>
</section>

<FAQ items={[
  ${faqProps}
]} title="Frequently Asked Questions" />

<ServiceSchema
  name=${JSON.stringify(`${s.serviceLabel} in ${Z}`)}
  description=${JSON.stringify(s.desc(Z, z.metro, nearby))}
  serviceType=${JSON.stringify(s.serviceType)}
  areaServed={${JSON.stringify(areasArr)}}
  image=${JSON.stringify(s.heroImage)}
/>

<ZoneCrossLinks zone=${JSON.stringify(zoneKey)} service=${JSON.stringify(serviceKey)} lang="en" />

<!-- CTA -->
<section class="cta-section">
  <div class="cta-wrapper">
    <h2 class="cta-title">Ready to remodel in <span class="gold">${Z}</span>?</h2>
    <p class="cta-text">Free technical visit, no-obligation quote and written warranty. We reply in under 2 hours.</p>
    <a href=${JSON.stringify(`https://wa.me/584129449929?text=${waMsg}`)} class="btn-premium" target="_blank" rel="noopener">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Free Quote in ${Z}
    </a>
  </div>
</section>

</BaseLayout>

<style>
${STYLE}
</style>
`;
}

let count = 0;
for (const serviceKey of Object.keys(SERVICES)) {
  for (const zoneKey of Object.keys(ZONES)) {
    const slug = `${serviceKey}-${zoneKey}`;
    const html = buildPage(serviceKey, zoneKey);
    fs.writeFileSync(path.join(OUT_DIR, `remodelacion-${slug}.astro`), html, 'utf8');
    count++;
  }
}
console.log(`Generadas ${count} paginas de zona en ingles -> ${OUT_DIR}/`);
