# ANÁLISIS COMPLETO WEB — REMODELAT.NET
### Visual · SEO · Código · Rendimiento · Funcionalidad
**Fecha:** 2026-08-03 | **Stack:** Astro 6.4.2 (SSG) | **Páginas build:** 273 | **Hosting:** Vercel | **Idiomas:** es / en

---

## 0. RESUMEN EJECUTIVO

**Estado general: NOTABLE ALTO (8/10).** La web está técnicamente muy por encima de la media del sector reformas en Venezuela. Los fundamentos están bien resueltos:

✅ Astro SSG, build limpio en ~13s, 273 páginas generadas estáticamente.
✅ Core Web Vitals orientados a verde: héroes con poster optimizado, fonts `font-display:swap`, CSS inline en cada página (sin render-blocking), imágenes WebP con `width/height` declarados para evitar CLS.
✅ SEO base serio: canonical con trailing slash unificado, hreflang x-default, sitemap i18n, schema.org LocalBusiness + BreadcrumbList + BlogPosting, Open Graph con dimensiones reales leídas del binario WebP.
✅ PWA: service worker con estrategia network-first para páginas, manifest válido, iconos 192/512/maskable.
✅ Accesibilidad: skip link, labels asociados a inputs, `aria-label` en botones/flotantes, `prefers-reduced-motion` respetado.
✅ Zero errores de build, zero assets rotos, cero páginas sin H1, cero HTML con más de un H1, cero `<img>` sin `alt`.

Dicho esto, hay **problemas REALES que sí impactan** en SEO, rastreo o UX, y oportunidades de mejora medibles. Los ordeno por severidad.

---

## 1. PROBLEMAS QUE SÍ TIENEN IMPACTO REAL (URGENCIA ALTA)

### 🔴 #1 — 10.217 enlaces internos SIN trailing slash generan cadena de redirección 308

**Qué pasa:** `vercel.json` tiene `"trailingSlash": true`, por lo que la URL canónica es `/servicios/`, `/contacto/`, etc. Sin embargo, prácticamente todos los enlaces del código apuntan SIN barra final (`/servicios`, `/contacto`).

**Evidencia objetiva (análisis automatizado del build):**
- 10.217 de 12.095 enlaces internos (84%) apuntan a URLs que devuelven **308 redirect**.
- En la home son 53 enlaces, todos sin trailing slash.
- Localmente, `python -m http.server` responde 301 a `/servicios` → `/servicios/`.

**Impacto real:**
- Cada clic del usuario y cada rastreo de Google paga un RTT extra antes del HTML. En móvil 4G en Venezuela (150-300ms RTT) esto suma mucho.
- Diluye PageRank interno porque Google trata las redirecciones como saltos en el grafo.
- Los core web vitals (LCP) empeoran porque el documento HTML tarda más en empezar a descargarse.
- Es el bug de más alto ROI por esfuerzo mínimo.

**Cómo arreglarlo:** Opción A (recomendada): en `astro.config.mjs` activar `build.format = 'directory'` ya está, pero Astro NO añade trailing slashes a los `<a href>` generados. La solución es añadir un redirect en Vercel ya existente o, mejor, **normalizar todos los `href` del código fuente** para que apunten con `/` final.

Solución pragmática de 1 línea en `astro.config.mjs` (Astro 6 soporta `trailingSlash: 'always'`):
```js
export default defineConfig({
  site: 'https://remodelat.net',
  trailingSlash: 'always',   // ← añadir esto
  ...
});
```
Y luego en `vercel.json` quitar el `"trailingSlash": true` (que es sólo rewrites; con Astro generando los enlaces correctos no hace falta). Con eso, TODOS los `<a href="/servicios">` que Astro renderiza pasarán a `/servicios/` automáticamente.

---

### 🔴 #2 — 3 etiquetas hreflang rotas que apuntan a 404

**Qué pasa:** el mapa de traducciones (`routeMap` en `SEO.astro` y duplicado en el script de cliente en `BaseLayout.astro`) declara equivalencias EN para 2 rutas que **no existen** en EN, y 1 ruta ES que no existe.

**Evidencia (comprobado contra filesystem del `dist/`):**

| Página origen | hreflang roto | Código HTTP |
|---|---|---|
| `/servicios/domotica-automatizacion/` (ES) | `/en/servicios/domotica-automatizacion/` | **404** |
| `/proyectos/cocina-lujo-guataparo/` (ES) | `/en/proyectos/cocina-lujo-guataparo/` | **404** |
| `/en/projects/luxury-kitchen-guataparo/` (EN) | `/projects/luxury-kitchen-guataparo/` | **404** |

**Impacto real:** Google Search Console marcará errores de hreflang, y en el peor caso la página en español de "Cocina lujo Guataparo" no recibirá señal de internacionalización correcta. Es una fuga de autoridad entre idiomas.

**Causa raíz:** el `routeMap` del `SEO.astro` hace fallback automático a `/en${currentPath}` para páginas no mapeadas:
```js
return currentPath === '/' ? '/en' : `/en${currentPath}`;
```
Esto es lo que genera `/en/servicios/domotica-automatizacion` (que no existe). El bug se introduce porque `emitEnHreflang` solo excluye los paths listados en `untranslatedEsPaths = new Set([])` (vacío).

**Cómo arreglarlo:**
1. Añadir `/servicios/domotica-automatizacion` a `untranslatedEsPaths` (no tiene versión EN), o crear la página EN.
2. Añadir la entrada correcta en `routeMap`: `'/proyectos/cocina-lujo-guataparo': '/en/projects/luxury-kitchen-guataparo'` (que ya existe en el script de cliente pero NO en SEO.astro).
3. Añadir la recíproca: `'/en/projects/luxury-kitchen-guataparo': '/proyectos/cocina-lujo-guataparo'`.
4. **Eliminar la duplicación del `routeMap`**: tener el mapa en 2 archivos distintos garantiza bugs futuros. Moverlo a `src/data/routeMap.ts` e importarlo desde `SEO.astro` y el switcher de idioma en `BaseLayout.astro`.

---

### 🔴 #3 — Bug tipográfico: `@font-face` para peso 700 (bold) apunta al archivo 600 (semi-bold)

**Qué pasa:** en `src/styles/global.css` línea 10 y 14:
```css
@font-face { font-family: 'Cormorant Garamond'; font-weight: 700; ...
  src: url('/fonts/cormorant-garamond-v21-latin-600.v2.woff2') ... }
                                              /* ^^^^ debería ser 700 */
@font-face { font-family: 'Manrope'; font-weight: 700; ...
  src: url('/fonts/manrope-v15-latin-600.v2.woff2') ... }
                              /* ^^^^ debería ser 700 */
```
Los archivos `-v21-latin-700.woff2` sí existen en `/public/fonts/` (22 KB y 14 KB respectivamente), pero el CSS los ignora y reutiliza el peso 600.

**Impacto real:**
- Todo el texto en negrita (peso 700) del sitio se ve con grosor **semi-bold 600** en lugar de bold 700.
- Las usos `font-weight: 800` (4 lugares en el CSS: 338, 758, 877, 1072) no tienen `@font-face` declarado, así que el navegador sintetiza (faux bold) el peso 600 → 800, que visualmente se ve "gordo/borroso" en vez de un bold real.
- Perjudica la percepción premium de la tipografía serif editorial (Cormorant), que es parte de la identidad de marca.

**Cómo arreglarlo:**
1. Línea 10: renombrar `...600.v2.woff2` a `...700.v2.woff2` (ambas familias).
2. Línea 14: ídem para Manrope.
3. Para los usos de `font-weight: 800`, o bien cambias esas reglas a `700` (recomendado: 3 pesos son más que suficientes y evitas sintéticos), o añades los archivos 800.
4. El `font-weight: 300` del `+` del FAQ no existe en los font-face cargados → usar 400.

---

### 🔴 #4 — El feed RSS solo publica 5 posts (de 22) y no existe versión EN

**Qué pasa:** `src/pages/rss.xml.ts` filtra manualmente con un array `spanishSlugs` que solo contiene 5 entradas hardcodeadas:
```js
const spanishSlugs = [
  'cuanto-cuesta-reforma-cocina-valencia',
  'porcelanato-vs-ceramica',
  'presupuesto-reforma-errores',
  'reformas-banos-carabobo',
  'tendencias-cocinas-2025'
];
```
El resto de los 17 posts ES publicados no entran al RSS. Tampoco hay `/en/rss.xml`.

**Impacto real:**
- Los suscriptores de RSS/feeds (y bots de scraping/agregadores que descubren contenido) no verán 17 artículos.
- No hay señal de frescura para Google vía feed.
- Los plugins de newsletter por RSS, plugins de auto-commit a redes, etc. se pierden el 77% del contenido.
- Es un bug de "no inventariar" en lugar de un bug técnico: no rompe nada visible pero pierdes alcance.

**Cómo arreglarlo:** Reutilizar `esBlogSlugs` de `src/data/blog-slugs.ts` en vez de una lista hardcodeada, y crear `src/pages/en/rss.xml.ts` equivalente usando `enBlogSlugs`. Añadir auto-discovery en `<head>`:
```html
<link rel="alternate" type="application/rss+xml" title="RemodelaT Blog" href="/rss.xml" />
```
(y el EN correspondiente).

---

## 2. MEJORAS DE IMPACTO MEDIO (RECOMENDADAS, NO BLOQUEANTES)

### 🟡 #5 — Contenido cannibalizado entre 4 URLs de "remodelación integral/viviendas/casas/apartamentos"

Tienes 4 URLs separadas con intención muy parecida:
- `/servicios/remodelacion-integral/` → T: "Remodelación Integral de Lujo en Venezuela"
- `/servicios/remodelacion-vivienda/` → T: "Remodelación de Viviendas Valencia y Caracas"
- `/servicios/remodelacion-casas/` → T: "Remodelación de Casas Valencia y Caracas"
- `/servicios/remodelacion-apartamentos/` → T: "Remodelación de Apartamentos Valencia y Caracas"

Todas rankean por variantes de "remodelación + [sinónimo] + ciudad" y compiten entre sí. Ninguna apunta canónica a otra. En términos SEO, estás repartiendo la autoridad entre 4 páginas que podrían ser una sola (integral) con anclas internas a casos específicos, o bien dejar viviendas/casas/apartamentos como **páginas de intención long-tail "near me" con enfoque muy diferenciado**, pero hoy el contenido entre viviendas e integral roza el 60% de similitud léxica.

**Recomendación:** Decidir una de estas dos estrategias:
- (A) Mantener solo `/servicios/remodelacion-integral/` como página pilar y convertir casas/apartamentos/vivienda en enlaces de ancla o borrarlas con 301 a la pilar.
- (B) Diferenciarlas de verdad: que "remodelación de casas" hable de fachadas, ampliaciones, exterior, jardín, piscinas; "apartamentos" de condominios, permisos, logística en altura, protección de áreas comunes; "viviendas" hacer 301 a "integral".

### 🟡 #6 — Home EN demasiado delgada: 527 palabras vs 1.255 en ES

`/en/` tiene 527 palabras mientras que la española tiene 1.255. La home es la página con más autoridad. Si la versión EN tiene la mitad de contenido, su capacidad de posicionar para términos competitivos en inglés queda reducida. Revisar si falta contenido (quizá se recortó la narrativa al traducir).

### 🟡 #7 — Meta descripciones >170 caracteres (33 páginas) y títulos >62 caracteres (106 páginas)

Más largo no es sinónimo de mejor: el SERP de Google trunca ~155-165 caracteres la descripción y ~60 caracteres el título (desktop). Tienes:
- **33 páginas** con meta descripción de 200-372 caracteres: se cortan a mitad de frase. Los peores son las páginas de proyecto (372, 349, 312 caracteres).
- **106 páginas** con título >62 caracteres: se cortan con "...". Destacan los posts del blog con títulos de 90+ caracteres.

**Recomendación:** Acortar títulos de posts del blog y descripciones de casos de proyecto a 140-160 caracteres. Prioriza páginas de proyecto y blog (son las que más impresiones tienen).

### 🟡 #8 — 75 imágenes en posts del blog sin atributos `width`/`height` → riesgo CLS

En el post `/blog/antes-despues-reforma-cocina-caso-real/` y similares, las imágenes inline del `.md` no tienen dimensiones. El hero del post sí tiene `width="800" height="533"`, pero las fotos dentro del cuerpo (demolición, isla, plano) no.

**Impacto:** estas imágenes son lazy-loaded pero al entrar en viewport empujan el texto hacia abajo si el navegador no ha reservado espacio (CLS). En Chrome ya se reserva espacio con el `aspect-ratio` inferido de width/height cuando están presentes; sin ellos, no.

**Cómo arreglarlo:** Añadir al `remark` de Astro una opción que inyecte width/height a las imágenes del markdown, o usar `image: { ... }` de Astro con el servicio de imágenes.

### 🟡 #9 — `domotica-automatizacion` no está enlazada desde el nav ni footer

La página `/servicios/domotica-automatizacion/` existe (1.515 palabras, h1, hreflang, etc.), tiene enlace desde el hub `/servicios`, pero **no** está en el menú principal, ni en el footer, ni en los enlaces a servicios de la home. Es una página huérfana a efectos de navegación (aunque Google la encuentra por el sitemap). Con una sola página de enlace interno desde `/servicios` su autoridad es muy baja.

**Recomendación:** O bien enlazarla desde el menú/servicios relacionados de electricidad (tiene sentido porque la domótica es sub-servicio de electricidad), o bien no publicarla hasta tenerla integrada.

### 🟡 #10 — El script `routeMap` duplicado entre `SEO.astro` y `BaseLayout.astro`

Ya mencionado en #2, pero es deuda técnica independiente: tienes el mismo objeto de traducción de rutas en dos archivos. Cada vez que añadas un proyecto/servicio nuevo tienes que editar 2 sitios. Ya generó 2 bugs reales. Centralizarlo en `src/data/routeMap.ts`.

---

## 3. COSAS QUE ESTÁN MUY BIEN HECHAS (NO TOCAR)

🔹 **Hero video con poster optimizado:** poster = frame 0 del video, srcset por breakpoints, `fetchpriority="high"`, preload inteligente sin intentar preload del video (que sabes que no funciona con `as="video"`). Nivel técnico top.

🔹 **Tokens de diseño coherentes:** `--ink / --bone / --gold / --gold-ink`, radios `r-sm/md/lg`, sombras `e-1/2/3` bien documentadas en el CSS.

🔹 **GA4 cargado de forma ética/optimizada:** no bloquea, se carga en `requestIdleCallback` o en la primera interacción, `anonymize_ip`, `transport_type: beacon`. Respeta la privacidad y no mata los LCP.

🔹 **Service worker con estrategia correcta:** network-first para páginas, cache-first para assets, no cachea el vídeo, no cachea ranges. El `CACHE_VERSION` es buena práctica.

🔹 **Open Graph con dimensiones reales:** `getWebpSize()` lee los bytes del webp para emitir `og:image:width/height` correctos. Esto es algo que <1% de las webs hacen bien y mejora el render de previews en WhatsApp/Facebook/LinkedIn.

🔹 **Breadcrumbs schema generados por ruta:** no dependen de que el componente Breadcrumb se renderice visualmente, siempre son correctos.

🔹 **Atributos de accesibilidad:** skip-link `#main-content`, labels asociados a inputs, `aria-expanded` en menú hamburguesa, `aria-label` en flotante WhatsApp, `prefers-reduced-motion` respetado en las animaciones de reveal.

🔹 **Seguridad básica:** enlaces externos `target="_blank"` con `rel="noopener"` (mayoría), no hay `target="_blank"` sin noopener excepto el botón flotante (ver detalle menor abajo).

🔹 **Cache headers en Vercel:** fuentes e iconos cacheados 1 año immutable, imágenes 30 días con stale-while-revalidate, manifest y sw con no-cache. Configuración correcta.

🔹 **Schema.org sin trampas:** eliminaste `aggregateRating` auto-calificado (que Google penaliza) y `SearchAction` que apuntaba a un buscador inexistente. Decisiones correctas.

🔹 **No hay errores de build:** 273 páginas sin warnings de Astro en 13 segundos. Los scripts de auditoría `check-images.mjs` y `check-mobile-pwa.mjs` pasan.

---

## 4. DETALLES MENORES (BAJA PRIORIDAD)

- El botón flotante de WhatsApp y el botón móvil CTA tienen `target="_blank"` pero sin `rel="noopener"` (tienes `noopener` en los botones del cuerpo pero olvidaste estos dos). Riesgo mínimo en modernos navegadores pero añadirlo por higiene.
- `@font-face` para peso 500 de Manrope/Cormorant están declarados pero revisar si realmente se usan (casi todos los usos son 400/600).
- Existen 3 archivos `.md` en `src/content/blog/` (EN) que no están registrados en `enBlogSlugs` ni tienen par en español: `electrical-installation-costs-venezuela-2026.md`, `flooring-guide-2026-venezuela.md`, `plumbing-costs-caracas-valencia-2026.md`. Están "huérfanos" y no generan página (lo cual está bien si están en draft), pero recomendación: moverlos a una carpeta `drafts/` o registrarlos y crear su par ES.
- El `viewTransitions: true` en `astro.config.mjs` está activado pero no hay `<ClientRouter />` importado en ningún layout. Es configuración muerta que no hace daño pero confunde: quitarla o implementar las transiciones si las quieres.
- Color WhatsApp inconsistente: `#25D366` en flotante vs `#0E8039` en CTA móvil. No rompe nada pero es la misma marca que debería usar un solo verde.
- Hard-coded `rgba(201,169,97,.62)` y colores similares en `<style>` de páginas sueltas (ej. `contacto.astro`) en lugar de usar `var(--gold)`. Difícil de mantener.
- PWA `manifest.json` tiene `"lang": "es-VE"` y `"start_url": "/"` que es correcto, pero no tiene un manifest EN equivalente (normal, no es obligatorio).

---

## 5. ANÁLISIS VISUAL (COHERENCIA DE MARCA)

El archivo previo `ANALISIS_VISUAL_NIVEL_DIOS_2026-08-03.md` ya identifica correctamente la fragmentación en 4 lenguajes visuales. Reafirmo sus conclusiones:

- **El hero `god-hero` (usado en `/servicios/cocina`, `/servicios/bano`, `/metodo`)** es el techo visual de la marca. Debería ser el sistema hero base.
- **Las páginas ciudad `/caracas`, `/valencia`, `/san-diego`, `/la-guaira`** siguen con el sistema "azulado/pill" viejo y son la desconexión visual más notable.
- **Los botones `.btn-premium` son los buenos** (radius 4px, tracking 0.1em, arrow); los `.btn` pill de ciudades chirrían con el lujo.
- **4 verdes distintos de WhatsApp**, 3 dorados (`#c9a961`, `#8a6d1f`, `#8B6914`), 6 valores de blanco distinto.

Mi recomendación: la prioridad visual es **unificar botones y el hero de ciudades** al sistema god. No hace falta refactorizar todo de golpe, pero sí decidir "este es el lenguaje oficial" y que cualquier página nueva siga ese patrón.

---

## 6. ANÁLISIS DE RENDIMIENTO ESTIMADO

- **HTML por página:** 95-128 KB (incluyendo ~60 KB de CSS inline). Gzipped serían ~25-30 KB. Excelente TTFB en Vercel.
- **JS total cargado:** ~15 KB (script base de Astro para navegación + lightbox). No hay React/Vue/jQuery.
- **Fuentes:** 8 archivos woff2, ~150 KB total servidos con `font-display: swap`. En home se precargan 4 pesos críticos.
- **Imágenes del hero:** `hero-poster-desktop.webp` 45 KB, `hero-poster-mobile.webp` 38 KB. Perfectas para LCP.
- **Video del hero:** desktop 1.15 MB, mobile 672 KB. No se precarga, se reproduce con `autoplay muted loop playsinline`. Con el poster ya pintado, el video es una mejora progresiva.
- **Mayor imagen:** `hero-lcp.webp` 209 KB, `suelo-porcelanato-1600.webp` 197 KB. Razonables para 1600px de ancho.

No encontré recursos que estén fuera de los tamaños razonables. Con el fix #1 (trailing slashes) esperarías LCP consistentemente por debajo de 1.8s en 4G y FID/INP verde por falta de JS pesado.

---

## 7. PRIORIZACIÓN DE ACCIONES

| # | Acción | Impacto | Esfuerzo | ROI |
|---|---|---|---|---|
| 1 | Añadir `trailingSlash: 'always'` en Astro y normalizar enlaces internos | 🟥 Alto | 🟢 10 min | 🔥🔥🔥 |
| 2 | Arreglar 3 hreflang rotos (domótica, cocina-lujo-guataparo) y centralizar routeMap | 🟥 Alto | 🟡 30 min | 🔥🔥🔥 |
| 3 | Corregir `@font-face` peso 700 al archivo correcto | 🟥 Alto (visual) | 🟢 5 min | 🔥🔥 |
| 4 | Arreglar RSS para use `esBlogSlugs`/`enBlogSlugs` y añadir EN RSS | 🟥 Alto (alcance) | 🟡 30 min | 🔥🔥 |
| 5 | Estrategia de canibalización servicios (integral/vivienda/casas/apartamentos) | 🟡 Medio | 🔴 2-3h | 🔥🔥 |
| 6 | Ampliar contenido de la home EN a nivel de ES | 🟡 Medio | 🟡 1h | 🔥🔥 |
| 7 | Acortar títulos y meta descripciones >62/>170 caracteres (106+33 páginas) | 🟡 Medio | 🟡 1-2h | 🔥🔥 |
| 8 | Añadir width/height a imágenes inline de posts del blog | 🟡 Medio | 🟡 1h (script) | 🔥 |
| 9 | Enlazar domótica desde la sección de electricidad o menú | 🟡 Medio | 🟢 10 min | 🔥 |
| 10 | Unificar 4 lenguajes visuales (heroes + botones) | 🟡 Medio (marca) | 🔴 4-6h | 🔥 |

---

## 8. VEREDICTO

**La web está técnica y estéticamente muy por encima del estándar del sector.** No hay fallos catastróficos (no hay páginas 500, no hay noindex accidental, no hay canonicals rotos, no hay páginas sin H1, no hay contenido duplicado masivo, no hay JS de terceros bloqueando el render, no hay CLS por imágenes sin dimensionar en las páginas principales, no hay errores de schema.org, no hay problemas móviles críticos según tu propio script `check-mobile-pwa.mjs`).

Los problemas que existen son **reales, medibles y con impacto concreto** (especialmente los 4 de severidad alta: redirecciones 308 generalizadas, hreflangs a 404, bug de tipografía y el RSS roto). Arreglarlos llevaría en total **menos de 2 horas** y mejorarías rastreo, autoridad internacional, percepción visual premium y alcance del blog sin rediseñar nada.

Después de esos 4 fixes, el siguiente bloque de trabajo rentable es contenido (home EN más densa, estrategia de cannibalización de servicios) y pulido visual (unificar el sistema de botones/heroes).
