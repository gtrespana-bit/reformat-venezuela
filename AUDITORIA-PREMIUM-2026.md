# Auditoría "Premium" — ReformaT Venezuela

**Fecha:** 2026-07-28 · **Rama:** `arena/019fa93c-reformat-venezuela`
**Alcance:** Home, Servicios (índice + 12 detalle), Proyectos, Contacto, Blog, Sobre Nosotros, páginas ciudad (4) y páginas de zona (81 ES + 81 EN).
**Base:** análisis de código (253 páginas construidas), `lighthouse-home.json`, y cálculo de contraste WCAG.

---

## 0. Punto de partida: lo que YA está bien

No hay que tocar esto. Es la base sobre la que se construye lo demás.

| Métrica | Valor | Nota |
|---|---|---|
| Lighthouse Performance | **100** | LCP 1.5 s, CLS 0.003, TBT 0 ms |
| Lighthouse SEO | **100** | canonical + hreflang correctos |
| Best Practices | **100** | — |
| Accesibilidad | 95 | falla solo contraste + orden de headings |
| Fuentes | self-hosted WOFF2 + preload | correcto |
| Peso imágenes | 5.2 MB total, todas WebP | correcto |

**Conclusión clave: el problema NO es técnico ni de velocidad. Es de dirección de arte y de coherencia.** Tienes una web rápida que se ve "bien hecha" pero no "cara". Lo que sigue es lo que separa una cosa de la otra.

---

## 1. El diagnóstico en una frase

> Hay **tres sistemas de diseño distintos conviviendo** en el mismo sitio, y el 90 % de las páginas (las de zona) son muros de texto sin una sola imagen.

Un cliente que busca "remodelación de cocina en Altamira", aterriza en una landing de zona, ve un muro de texto, y luego hace clic en Servicios y ve otra estética. Esa inconsistencia es, con diferencia, lo que más resta sensación de marca premium.

---

## 2. Los 6 problemas que más daño hacen

### 🔴 P1 — Tres estéticas incompatibles en el mismo dominio

`src/styles/global.css` contiene una paleta completa **azul / morado / verde** que no tiene nada que ver con la marca oro-negro:

```css
/* global.css — líneas ~210-640 */
.hero-city    { background: linear-gradient(135deg, #1e3a5f, #2d5a87); }  /* azul corporativo */
.info-box     { background: linear-gradient(135deg, #667eea, #764ba2); }  /* morado SaaS */
.btn-primary  { background: #667eea; }                                     /* morado */
.badge .icon  { color: #27ae60; }                                          /* verde */
.stars        { color: #ffc107; }                                          /* amarillo */
.pricing-note { background: #fff3cd; border-left: 4px solid #ffc107; }     /* alerta bootstrap */
.cta-final    { background: linear-gradient(135deg, #1e3a5f, #2d5a87); }   /* azul */
.testimonial-card .author strong { color: #1e3a5f; }                       /* azul */
```

Esos gradientes morado/azul son *el* cliché visual de plantilla gratuita. Aparecen en las páginas ciudad (`/caracas`, `/valencia`, `/san-diego`, `/la-guaira`) vía `.price-card`, `.testimonial-card`, `.pricing-note`.

**Además hay 3 sistemas de botón compitiendo:**

| Sistema | Clases | Dónde | Radio |
|---|---|---|---|
| A (premium) | `.btn-premium` + `.btn-primary-premium` | home, servicios, blog | 4 px |
| B (ciudad) | `.btn` + `.btn-gold` / `.btn-dark` / `.btn-outline` | caracas, valencia, san-diego, la-guaira | 8 px |
| C (bootstrap) | `.btn-primary` / `.btn-secondary` / `.btn-whatsapp` | global.css, morado #667eea | 8 px |

Y 3 sistemas de hero: `.hero` (10 páginas), `.page-hero` (10), `.article-hero` (183).

**Qué hacer:**
1. Borrar de `global.css` todo el bloque "CITY PAGES STYLES" con colores azul/morado/verde (~430 líneas).
2. Reescribir `.price-card`, `.testimonial-card`, `.info-box`, `.cta-final`, `.pricing-note` con la paleta oro/negro/crema.
3. Dejar **un solo** sistema de botón (`.btn-premium`) y un solo `.hero`, y migrar las páginas ciudad.

---

### 🔴 P2 — Faux-bold: el texto se ve "sucio" y no sabes por qué

Solo cargas Manrope en **400, 500, 600**:

```
public/fonts/manrope-v15-latin-400.woff2
public/fonts/manrope-v15-latin-500.woff2
public/fonts/manrope-v15-latin-600.woff2
```

Pero el CSS pide **700 y 800** en decenas de sitios:

```css
.footer-heading           { font-weight: 700; }
.about-badges span        { font-weight: 700; }
.area-chips a             { font-weight: 700; }
.proof-item span          { font-weight: 700; }
.home-service-kicker      { font-weight: 800; }
.hero-badges span:before  { font-weight: 800; }
.price-card h3, .cta-final h2, .hero-city h1 { font-weight: 700; }
```

Cuando el peso no existe, el navegador **sintetiza el negrita** engordando los trazos algorítmicamente. El resultado son letras deformes, con contornos irregulares — exactamente la textura que el ojo lee como "barato", aunque no sepa nombrarla. Y afecta también a todo `<strong>` del cuerpo de texto (que hereda `bold` = 700).

**Qué hacer** — cualquiera de las dos:
- **A (recomendada):** añadir `manrope-v15-latin-700.woff2` (+~18 KB) y mantener los pesos.
- **B (peso cero):** cambiar todos los `700`/`800` a `600` y confiar en el `letter-spacing` para dar énfasis.

---

### 🔴 P3 — Las páginas de zona son muros de texto sin una sola imagen

**162 páginas** (81 ES + 81 EN) — el 64 % del sitio — tienen esta estructura:

```
hero con imagen de stock  →  breadcrumb  →  1 caja gris  →  5 <h2> de texto seguido
→ 1 tabla  →  FAQ  →  CTA
```

`grep -c "<img"` en `remodelacion-cocina-altamira.astro` = **1** (solo el hero). Cero testimonios, cero galería, cero antes/después. Y las 3 imágenes de hero se repiten en las 162 páginas:

| Imagen | Nº de páginas de zona |
|---|---|
| `cocina.webp` | 56 |
| `bano.webp` | 56 |
| `integrales-proyecto-completo.webp` | 54 |

Estas son las páginas que capturan el tráfico local de mayor intención comercial ("remodelación cocina Altamira"), y son las que peor se ven.

**Qué hacer** (por orden de impacto):
1. Crear un componente `ZoneGallery.astro` con 3-4 fotos y meterlo tras el primer `<h2>`. Aunque roten de un pool común, rompe el muro de texto.
2. Componente `BeforeAfter.astro` (slider o par de imágenes) — ya tienes `integrales-antes.webp` / `integrales-despues.webp`. Es *el* formato que vende reformas.
3. Un `<blockquote>` de testimonio con la zona real.
4. Tarjeta lateral pegajosa (sticky) con "Presupuesto en Altamira · visita gratis" + WhatsApp.

---

### 🟠 P4 — Contraste: el oro no es legible sobre blanco

Cálculo WCAG real de tu paleta:

| Combinación | Ratio | Mínimo | Estado |
|---|---|---|---|
| `#c9a961` sobre blanco | **2.25** | 4.5 | ❌ falla |
| `#c9a961` sobre `#f5f5f5` | **2.06** | 4.5 | ❌ falla |
| `#8B6914` sobre blanco | 5.09 | 4.5 | ✅ |
| `#6f5413` sobre `#faf8f2` | 6.70 | 4.5 | ✅ |
| `#c9a961` sobre `#0a0a0a` | 8.80 | 4.5 | ✅ |

Lighthouse marca exactamente esto (`color-contrast: 0`) en `.tag`, los 9 `.card-link` de la home y el teléfono `<a style="color: var(--gold)">`.

**Esto no es solo accesibilidad — es percepción.** El oro claro sobre blanco se ve *lavado*, como si la pantalla tuviera poco brillo. El oro premium sobre fondo claro tiene que ser más oscuro y saturado.

**Qué hacer:** introducir dos tokens de oro y usar cada uno en su fondo:

```css
:root {
  --gold: #c9a961;          /* SOLO sobre fondos oscuros */
  --gold-ink: #8a6d1f;      /* texto oro sobre fondos claros — ratio 4.90 */
  --gold-ink-strong: #7a5c14; /* ratio 6.23, para cuerpo de texto */
}
```

Y sustituir en `.tag`, `.card-link`, `.info-item a`, `.gold-link`.

---

### 🟠 P5 — La página de Proyectos mata la credibilidad

`src/pages/proyectos.astro` — 45 líneas, y **los 6 proyectos usan la misma imagen**:

```js
{ title: "Reforma Integral Piso Centro",  image: "/images/integrales-800.webp" },
{ title: "Cocina Moderna Open Space",     image: "/images/integrales-800.webp" },
{ title: "Baño Spa Principal",            image: "/images/integrales-800.webp" },
{ title: "Local Comercial Restaurante",   image: "/images/integrales-800.webp" },
{ title: "Reforma Piso Antiguo",          image: "/images/integrales-800.webp" },
{ title: "Cocina Rústica Moderna",        image: "/images/integrales-800.webp" },
```

Seis tarjetas idénticas etiquetadas "Cocina", "Baño", "Comercial". Un cliente que llega aquí a validar si eres real, sale con la conclusión contraria.

Además:
- **El overlay con toda la información solo existe en `:hover`** → en móvil (donde está la mayoría de tu tráfico) las tarjetas son fotos mudas sin título ni ubicación.
- **Las tarjetas no son enlaces** (`<div class="project-card">`, 1 solo `href` en toda la página). No hay página de detalle de proyecto. Es un callejón sin salida.

**Qué hacer:**
1. Asignar la imagen correcta a cada proyecto (ya tienes `cocina-isla-central.webp`, `bano-ducha-walkin.webp`, `integrales-despues.webp`…).
2. Mostrar título + ubicación **siempre** debajo de la foto; reservar el hover solo para el zoom.
3. Convertir cada tarjeta en `<a>` hacia un caso de estudio (aunque sean 3 al principio: reto → solución → antes/después → duración → materiales). **Un caso de estudio bien hecho vende más que 20 landings de zona.**

---

### 🟠 P6 — Números de la marca que se contradicen

`grep` sobre todo el contenido:

| Afirmación | Nº de apariciones |
|---|---|
| "+15 años de experiencia" | **166** |
| "más de 15 años" | 60 |
| "más de 20 años" | 10 |
| "más de 10 años" | 2 |
| "desde 2005" | 1 (footer, en las 253 páginas) |
| "+200 proyectos entregados" | páginas ciudad |

La home dice 20+, las zonas dicen 15+, el footer dice 2005 (=21 años). Un cliente atento lo nota, y es justo el tipo de detalle que erosiona la confianza en el segmento alto.

**Qué hacer:** elegir **una** cifra, definirla como constante en un `src/data/brand.ts` y usarla en todo el sitio.

```ts
export const BRAND = {
  yearsExperience: 20,
  foundedSpain: 2005,
  yearsVenezuela: 2,
  projectsDelivered: 200,
  phone: '+584227997043',
} as const;
```

Mismo problema con el teléfono `584227997043`, hardcodeado literalmente en cientos de sitios.

---

## 3. Detalles finos que separan "bien hecho" de "caro"

### 3.1 Tipografía

- **Sin `letter-spacing` negativo en titulares grandes.** `.section-title`, `.page-title`, `.article-title` no lo tienen. Cormorant Garamond a 5 rem sin apretar se ve suelto y amateur. La home lo hace bien (`letter-spacing:-.02em`) pero solo ahí y con `!important`.
  → Añadir `letter-spacing: -0.02em` a todos los titulares ≥2.5 rem.
- **`line-height: 1.75` en `body`** es demasiado aire para UI (chips, botones, labels). Bajar el global a 1.6 y subir a 1.8 solo en `.article-body`.
- **Cuerpo del artículo a `1.2-1.3 rem` en Cormorant** (serif) es difícil de leer en pantalla en bloques largos. Considerar Manrope para el cuerpo y reservar el serif para titulares.

### 3.2 Sistema de espaciado y formas — no existe

Radios de borde en uso simultáneo: **2, 4, 5, 6, 8, 12, 14, 16, 18, 20, 22, 28, 30, 60, 999 px** — 15 valores distintos.
Paddings de sección: **60, 80, 100, 140, 180 px**.
Sombras: **12+ combinaciones únicas** (`0 5px 20px .05`, `0 8px 25px .045`, `0 24px 70px .14`…).

Esa dispersión es invisible de una en una, pero acumulada es exactamente lo que hace que un sitio se sienta "montado" en vez de "diseñado".

**Qué hacer:** definir escala en `:root` y usar solo esos valores.

```css
:root {
  /* radios */
  --r-sm: 4px; --r-md: 12px; --r-lg: 20px; --r-full: 999px;
  /* espaciado */
  --s-1: 8px; --s-2: 16px; --s-3: 24px; --s-4: 40px;
  --s-5: 64px; --s-6: 96px; --s-7: 128px;
  /* elevación */
  --e-1: 0 2px 8px rgba(16,14,10,.06);
  --e-2: 0 8px 24px rgba(16,14,10,.08);
  --e-3: 0 24px 60px rgba(16,14,10,.12);
}
```

### 3.3 Paleta: falta el "crema"

Ahora mismo los fondos alternan `#fff` y `#f5f5f5` (gris neutro). Un gris puro junto a un dorado se ve *frío* y ligeramente sucio. Las marcas premium del sector usan blancos cálidos.

```css
--bone:  #faf8f4;   /* sustituye #f5f5f5 en .bg-light */
--sand:  #f2ede4;   /* separadores, bordes suaves */
--ink:   #14120e;   /* negro cálido, sustituye #0a0a0a */
```

Un negro con tinte cálido (`#14120e`) junto al oro se lee mucho más lujoso que un `#0a0a0a` puro.

### 3.4 Micro-interacciones ausentes

- **Cero animación de entrada al hacer scroll.** No hay `IntersectionObserver` ni `@keyframes` en todo el sitio. Un fade-up sutil (16 px, 500 ms) en secciones y tarjetas es de lo más barato en rendimiento y de lo que más "sube" la percepción.
- **`prefers-reduced-motion` solo aparece 1 vez** en todo el proyecto. Si añades animaciones, hay que respetarlo.
- **Transiciones genéricas:** `transition: 0.4s` sin especificar propiedad ni curva. Usar `transition: transform .5s cubic-bezier(.22,1,.36,1)` (ease-out expo) — el "feel" caro está en la curva, no en la duración.
- **`.btn-shine`** (el destello que barre el botón) es un efecto de plantilla de los 2010. En el segmento premium resta. Sugiero quitarlo y dejar solo elevación + desplazamiento de flecha.

### 3.5 Imágenes: resolución insuficiente para pantallas Retina

```
hero-lcp.webp   → real 1080×720   pero declarado width="1920" height="1080"
cocina-800.webp → real  800×534   usado a ancho completo en tarjetas
arquitectura-600.webp → real 600×338  pero servido en un contenedor de 500 px de alto
```

El hero declara 1920×1080 y el archivo es de 1080×720: se está **escalando hacia arriba un 78 %**. En cualquier portátil moderno (DPR 2) eso es visiblemente blando. Y `srcset` solo ofrece 400 w y 800 w — no hay variante 1600 w para retina.

Además el hero declara ratio 16:9 (1920×1080) cuando el archivo es 3:2 (1080×720) → distorsión de aspecto en la reserva de espacio.

**Qué hacer:**
1. Regenerar `hero-lcp` a 2400 px de ancho (AVIF + WebP) y corregir `width`/`height` al ratio real.
2. Añadir variante `-1600.webp` a las 9 imágenes de servicio y ampliar el `srcset`.
3. Migrar a `astro:assets` (`<Image />`) para que Astro genere los tamaños y el hash automáticamente en vez de mantener el `getSrcSet()` manual.

### 3.6 Navegación

- **La barra es transparente con texto blanco *siempre*.** En `/privacidad`, `/terminos` y `/404` el contenido empieza con fondo blanco (`.legal-page { padding: 180px 0; background: var(--white) }`) → **menú blanco sobre fondo blanco, invisible hasta hacer scroll.**
- **El menú móvil se abre con estilos inline en JS** (17 líneas de `navLinks.style.x = ...`). Funciona, pero no anima, no cierra al hacer clic fuera, no atrapa el foco y no bloquea el scroll del body. Un panel deslizante a pantalla completa con transición es un upgrade grande y barato.
- **"Sobre Nosotros" no está en el menú** — solo aparece en el `routeMap` de idiomas. Es una página buena y bien hecha, huérfana.
- **`/privacidad` y `/terminos` no están enlazadas desde el footer** (`grep href` en `dist/index.html` = 0 resultados). Están completamente huérfanas. En una marca premium, los legales visibles son señal de seriedad.

### 3.7 Deuda de código que ya afecta al mantenimiento

| Hallazgo | Detalle |
|---|---|
| **79 `!important`** en `index.astro` | Dos bloques `<style>` peleándose. El segundo bloque ("Refinamiento premium solicitado") sobrescribe al primero por fuerza bruta. Imposible de mantener. |
| **CSS muerto** en `index.astro` | `.services-slider`, `.service-card-slider`, `.slider-prev/next/dots`, `.premium-trust`, `.stat-item`, `.stat-num`, `.hero-badges` → **0 usos en el markup**. Además `.hero-badges` y `.premium-trust` se ocultan con `display:none!important` en vez de borrarse. |
| **JS muerto** | ~25 líneas del slider que buscan `.services-slider` (no existe) + bloque GSAP completo (`if(typeof gsap!=='undefined')`) — **GSAP nunca se carga en ninguna parte**. |
| **192 archivos CSS emitidos** | 211 páginas con su propio `<style>`, cada una redeclarando `.hero-overlay`, `.cta-section`, `.article-body`, `.container`… Es la causa raíz de la inconsistencia. |
| **`tailwind.config.mjs`** | Define toda la paleta y las fuentes, pero **Tailwind no está en `package.json`**. Archivo muerto que confunde. |
| **`WhatsAppButton.astro`** | Componente creado, 0 usos. |
| **Basura en la raíz del repo** | `lighthouse-*.json` (1.7 MB), `remodelat.net_*.report.html` (531 KB), `diagnostico.ps1`, `get-dims.mjs`, `fix-*.cjs`, carpeta vacía `reformat-venezuela/`. |

### 3.8 Otros

- **Testimonios sin nombre.** La home dice "Cliente residencial · San Diego, Carabobo" ×2 y "Cliente de apartamento · Caracas". Un testimonio anónimo vale casi cero. Las páginas ciudad sí tienen nombres ("María González") pero se leen a inventados. → Pedir 5 testimonios reales con nombre, foto y zona. Con foto real el efecto se multiplica.
- **`heading-order` falla** (Lighthouse): en la home hay un `<h4>` dentro de `.info-item` colgando de un `<h2>`, sin `<h3>` intermedio. Son los bloques "Ubicación" / "Teléfono".
- **Iconos emoji** en Contacto (`📍 Cobertura`, `📞 Teléfono`, `⏰ Horario`) y Proyectos (`📍`). Los emojis se renderizan distinto en cada SO y rompen la coherencia visual al instante. → Sustituir por SVG de trazo fino (ya usas ese estilo en `sobre-nosotros.astro` y `caracas.astro`; son correctos).
- **`.card-icon { content: '✦' }`** — carácter tipográfico dentro de un círculo dorado, girando 15° en hover. Se lee como decoración de plantilla.
- **Formulario sin estado.** `formsubmit.co` redirige fuera del sitio: no hay estado de carga, ni confirmación in-page, ni validación en vivo. Después de un formulario premium esperas un mensaje elegante, no salir del dominio.
- **El logo del footer se sirve sin `width`/`height`** (Lighthouse `unsized-images: 0.5`).

---

## 4. Plan de acción priorizado

### Fase 1 — Los cimientos (1 día, impacto altísimo)

| # | Tarea | Archivos |
|---|---|---|
| 1 | Crear `src/styles/tokens.css` con color, espaciado, radio, sombra, curvas | nuevo |
| 2 | Añadir Manrope 700 → matar el faux-bold | `public/fonts/`, `global.css` |
| 3 | Introducir `--gold-ink` y arreglar los 12 fallos de contraste | `global.css`, `index.astro` |
| 4 | Borrar la paleta azul/morado/verde de `global.css` (~430 líneas) | `global.css` |
| 5 | Borrar CSS y JS muertos de `index.astro`, fusionar los 2 `<style>`, eliminar los 79 `!important` | `index.astro` |
| 6 | `src/data/brand.ts` con años/teléfono/proyectos + reemplazo global | todo el sitio |

### Fase 2 — Unificación visual (2-3 días)

| # | Tarea |
|---|---|
| 7 | Un solo sistema de botón (`.btn-premium`), migrar páginas ciudad |
| 8 | Un solo componente `<Hero>` con variantes `home` / `page` / `article` |
| 9 | Componente `<Section>` con espaciado de la escala |
| 10 | Fondos crema (`--bone`) y negro cálido (`--ink`) |
| 11 | Nav: fondo sólido en páginas de fondo claro + menú móvil animado |
| 12 | Enlazar Privacidad/Términos en el footer y Sobre Nosotros en el menú |
| 13 | Reemplazar emojis por SVG; quitar `.btn-shine` y `.card-icon ✦` |

### Fase 3 — Contenido que vende (la que más convierte)

| # | Tarea |
|---|---|
| 14 | **Arreglar Proyectos:** imágenes correctas, info siempre visible, tarjetas enlazables |
| 15 | **3 casos de estudio reales** con antes/después, duración, materiales, presupuesto |
| 16 | Componente `<BeforeAfter>` reutilizable |
| 17 | `<ZoneGallery>` + testimonio + CTA sticky en las 162 páginas de zona |
| 18 | 5 testimonios reales con nombre y foto |
| 19 | Fotografía propia (ver abajo) |

### Fase 4 — Pulido

| # | Tarea |
|---|---|
| 20 | Fade-up al hacer scroll con `IntersectionObserver` + `prefers-reduced-motion` |
| 21 | Migrar a `astro:assets` y regenerar hero a 2400 px + variantes 1600 w |
| 22 | Estado de envío in-page en los formularios |
| 23 | Arreglar `heading-order` (h4 → h3) y el logo del footer sin dimensiones |
| 24 | Limpiar la raíz del repo (lighthouse json, report html, scripts sueltos, `tailwind.config.mjs`) |

---

## 5. Lo que más va a mover la aguja

Si solo pudieras hacer **tres** cosas:

1. **Fotografía real propia.** Todas las imágenes son de stock reconocible y `integrales-800.webp` se repite en las 6 tarjetas de Proyectos y en 7 heroes. En reformas, la foto *es* el producto. Un día de fotógrafo en 3 obras terminadas transforma el sitio más que cualquier cambio de CSS que pueda hacerte. Esto es el techo real de lo premium que puede verse el sitio.

2. **Casos de estudio con antes/después.** Es el formato que convierte en este sector, y ahora mismo no existe ni uno. Vale más que 20 landings de zona nuevas.

3. **Unificar el sistema de diseño (Fases 1 y 2).** Los gradientes morados, el faux-bold y el oro ilegible sobre blanco son tres señales que el visitante no sabe nombrar pero sí percibe. Quitarlas es puro código, sin depender de nadie.

---

## 6. Referencia rápida: tokens propuestos

```css
:root {
  /* --- color --- */
  --ink:            #14120e;   /* negro cálido (sustituye #0a0a0a) */
  --ink-soft:       #262119;
  --bone:           #faf8f4;   /* crema (sustituye #f5f5f5) */
  --sand:           #f2ede4;
  --gold:           #c9a961;   /* SOLO sobre oscuro */
  --gold-ink:       #8a6d1f;   /* texto oro sobre claro — 4.90:1 */
  --gold-ink-strong:#7a5c14;   /* 6.23:1 */
  --text:           #2a2a2a;
  --text-muted:     #5f5a52;

  /* --- radio --- */
  --r-sm: 4px;  --r-md: 12px;  --r-lg: 20px;  --r-full: 999px;

  /* --- espaciado --- */
  --s-1: 8px;  --s-2: 16px; --s-3: 24px; --s-4: 40px;
  --s-5: 64px; --s-6: 96px; --s-7: 128px;

  /* --- elevación --- */
  --e-1: 0 2px 8px   rgba(16,14,10,.06);
  --e-2: 0 8px 24px  rgba(16,14,10,.08);
  --e-3: 0 24px 60px rgba(16,14,10,.12);

  /* --- movimiento --- */
  --ease-out: cubic-bezier(.22,1,.36,1);
  --dur-fast: 180ms;  --dur-base: 320ms;  --dur-slow: 560ms;
}
```

---

*Nota metodológica: no pude tomar capturas de pantalla renderizadas (el sandbox no permite descargar un navegador headless). Todo lo anterior sale de leer el código de las 253 páginas construidas, del informe Lighthouse del repo y del cálculo directo de ratios de contraste WCAG. Las cifras (166 apariciones de "+15 años", 79 `!important`, 192 archivos CSS, 6 proyectos con la misma imagen) están verificadas con `grep` sobre el repo.*

---

## ✅ ESTADO DE EJECUCIÓN

### Fase 1 — completada (commit `7c70d9c`)

**Hallazgo crítico no previsto en la auditoría inicial:** los 7 `.woff2` de
`public/fonts` eran archivos placeholder corruptos e idénticos entre sí
(mismo MD5). Manrope contenía 15 glifos (`A ÁĂҮүҺһӨө₴`, sin `a-z` ni tildes)
y Cormorant 153 glifos cirílicos. **El sitio nunca mostró sus tipografías:**
el navegador caía a la fuente del sistema en todo el texto. El problema real
era mucho mayor que el faux-bold reportado. Sustituidos por los reales de
`@fontsource` con latín completo verificado.

| Tarea | Estado |
|---|---|
| 1. Tokens en `:root` (color, radio, espaciado, elevación, curvas) | ✅ |
| 2. Fuentes reales + Manrope 700 → fin del faux-bold | ✅ |
| 3. `--gold-ink` / `--gold-ink-strong`, 8 fallos de contraste | ✅ |
| 4. Paleta azul/morado/verde eliminada | ✅ |
| 5. Home: 79 `!important` → 0, CSS y JS muertos fuera | ✅ |
| 6. `src/data/brand.ts`, cifras unificadas a 23 años / 2003 | ✅ |

### Fase 2 — completada (commit `0dcd262`)

| Tarea | Estado |
|---|---|
| 7. Sistema de botón unificado, páginas ciudad migradas | ✅ |
| 8. Hero unificado (`.article-hero` / `.page-hero` únicos) | ✅ |
| 9. Escala de espaciado, radio y sombra aplicada (45 archivos) | ✅ |
| 10. Fondos crema `--bone` y negro cálido `--ink` | ✅ |
| 11. Nav sólida en páginas claras + menú móvil deslizante | ✅ |
| 12. Privacidad, Términos y Sobre Nosotros enlazados | ✅ |
| 13. Emojis → SVG, `.btn-shine` y `✦` fuera | ✅ |

**Impacto medible:**

| Métrica | Antes | Después |
|---|---|---|
| Archivos CSS emitidos | 192 | **28** |
| Peso de `dist/_astro` | 1.6 MB | **316 KB** |
| `!important` en la home | 79 | **0** |
| Colores fuera de marca en `dist` | ~430 líneas | **0** |
| Bloques `<style>` duplicados | 162 idénticos | **0** |
| Fuentes reales servidas | 0 de 7 | **8 de 8** |

Hallazgos adicionales resueltos en Fase 2: las 4 páginas de ciudad tenían su
propio sistema de tokens con `navy #1a2332` (y un `--ink` que pisaba el negro
cálido global); el componente `Breadcrumb`, presente en ~200 páginas, también
lo usaba; y `.section-tag` / `.stars` de ciudad eran oro sobre fondo claro.

### Pendiente

- **Fase 3** — punto 4 (galería + antes/después + CTA sticky en las 162 páginas
  de zona) y punto 5 (Proyectos: a la espera de imágenes y textos del cliente).
  La estructura de Proyectos ya está corregida; falta el contenido real.
- **Fase 4** — `astro:assets`, hero a 2400 px, estado in-page en formularios.
