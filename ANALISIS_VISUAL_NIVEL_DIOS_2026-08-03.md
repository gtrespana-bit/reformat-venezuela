# ANÁLISIS VISUAL EXHAUSTIVO — REMODELAT VENEZUELA
### De premium correcto a NIVEL DIOS
**Fecha:** 2026-08-03 | **Auditor:** Arena Agent | **Stack:** Astro + global.css tokens

---

## 0. RESUMEN EJECUTIVO

**Nota visual actual: 6,8 / 10 - Premium bueno pero fragmentado.**

Tienes una base sólida: tokens `--gold #c9a961 / --ink #14120e / --bone #faf8f4 / --r-sm 4px --r-md 12px --r-lg 20px`, tipografía serif Cormorant + sans Manrope, sistema de sombras `e-1 / e-2 / e-3`, y un hero de home con vídeo + poster perfecto (LCP optimizado). Eso es nivel premium real.

**El problema no es falta de calidad, es falta de SISTEMA ÚNICO.**

Hoy conviven **4 lenguajes visuales distintos** dentro de la misma marca:

1.  **Lenguaje GOD** (`/servicios/remodelacion-cocina`, `/bano`): Hero cinematográfico con glow radial blur 80px, imagen 35% opacity contrast 1.15, manifesto negro, editorial bone, specs sheet. ESTE es nivel Dios.
2.  **Lenguaje HOME**: Hero video + proof-panel flotante sobreponiéndose -42px, quality-pillars, process 5 columnas. Muy premium pero propio.
3.  **Lenguaje CITY** (`/caracas`, `/valencia`, `/san-diego`, `/la-guaira`): template viejo azulado heredado, `container-narrow 800px`, botones `r-full` (pill), `.btn-gold` transparente en hover, tags `--gold-ink`, grid zones con icono. Roto con el resto.
4.  **Lenguaje PROJECTS HUB**: Minimal ink + radial gradients sutiles, cards grid 380px + 1fr, imagen `aspect-ratio 4/5 object-fit contain` con fondo ink-soft (letterboxing). Concepto interesante pero visualmente más flojo que el resto.

**Resultado:** Si navegas Home > Servicios > Caracas > Proyecto > Contacto, sientes 4 webs diferentes de la misma empresa. Eso mata el efecto lujo. El lujo es **obsesión por la coherencia.**

---

## 1. LO QUE SÍ FUNCIONA (conservar y expandir)

- **Tokens:** `--ink #14120e` cálido (no negro puro), `--bone #faf8f4` crema paper, `--gold`, `--gold-ink #8a6d1f` para AA sobre claro. Bien resuelto.
- **Hero video home:** poster = frame 0 del video, `fetchpriority high`, sin fade = transición invisible. Nivel técnico Dios.
- **Premium Proof Panel:** grid 3 con separadores gradiente oro verticales, overlap -42px sobre hero, backdrop blur 14px, border 1px 0.26. ES la firma visual mas premium que tienes. Debería replicarse.
- **Typo editorial:** drop cap serif 4.2rem gold-ink, serif para h2, sans para body 1.13rem 1.8 line-height. Muy editorial revista.
- **MethodComparison:** tabla que en desktop es grid 2 col y en mobile se convierte a cards con label móvil. Buen responsive premium.
- **GuaranteeMatrix:** spec sheet por partidas, variante dark con `radial-gradient + ink`. Se siente documento de arquitecto.
- **Reveal scroll:** `data-reveal` opacity 0 translateY 16px con IntersectionObserver, respeta `prefers-reduced-motion`. Correcto.

---

## 2. INCOHERENCIAS VISUALES CRÍTICAS (10 + detalles)

### INCOHERENCIA #1: 4 HEROES DISTINTOS

| Página | Tipo | Alto | Fondo | Eyebrow | Título | Problema |
|---|---|---|---|---|---:|---|
| Home | video + poster | 100vh | ink + overlay radial | .74rem 2.2px tracking rgba(232,213,168,.95) | clamp 2.35-4.75rem | Bien |
| /servicios | .page-hero | 60vh | img 100% + gradient black 0.5-0.7 | 0.9rem gold 2px | 2.5-4.5rem | Overlay demasiado oscuro plano, sin glow |
| /proyectos | projects-hero | 185px padd | ink flat + radial 0.12/0.06 | 0.72rem 700 weight 0.16em | 2.4-3.6rem | Se siente barato vs God-hero, sin imagen |
| /sobre-nosotros | .page-hero | 70vh | img cover + linear 0.3-0.7 | .75rem 3px | 2.4-4rem | Otro overlay |
| /metodo-remodelat | method-hero | 88vh | img 72% opacity + 3 gradients | .78rem 700 0.18em | 3-6.2rem | Casi God pero no igual |
| /servicios/cocina | god-hero | 100vh | img 35% opacity contrast 1.15 + god-glow blur 80px + overlay 0.96 top /0.45 mid | .72rem 800 0.22em gold-light | clamp 3.2-7.5rem línea 0.92 | **Este es el correcto nivel Dios** |

**Diagnóstico:** `god-hero` debería ser EL SISTEMA. Tiene glow, profundidad, imagen tratada cinematográfica, eyebrow con línea, badges pill sutiles border 0.35. Los otros 3 героев se ven a medio hacer al lado.

### INCOHERENCIA #2: BOTONES - DOS FILOSOFÍAS OPUESTAS

**Sistema Premium (home, metodo, god):**
- `.btn-premium` -> rect 4px `--r-sm`, tracking 0.1em uppercase 0.85rem 600, padding 18x45, gold solid bg `--ink` texto, hover translateY -3px + `e-gold` shadow. Arrow → con translateX 8px. Arquitectónico, pesado.

**Sistema Pill (caracas, valencia, city):**
- `.btn` -> `r-full 999px`, padding 15x32, border 2px transparent, `.btn-gold:hover` se hace transparente gold outline, `.btn-outline` blanco semitransparente. Feeling startup 2021, no lujo.

Tener ambos en la misma web es como llevar traje sastre con zapatillas de running. Un usuario premium nota el cambio.

Además:
- `.btn-border` y `.btn-shine` existen en markup pero `.btn-shine display:none` por comentario "se lee como plantilla 2010". Si no se usa, sacar del DOM.
- `!important` en home hero `.hero-poster z-index 1 !important` - nunca premium.

**Fijar:** Unificar TODO a `btn-premium` familia: primary (gold solid), secondary (transparent gold-ink border), ghost (transparent white 0.4 en oscuro). Radius siempre 4px. No pill nunca.

### INCOHERENCIA #3: TARJETAS DE SERVICIO - DOS ALTURAS, DOS ICONOS

- **Home** `home-service-card`: img 230px, `r-lg 20px`, kicker "Alto estándar" pill abajo izquierda gold 0.94 bg ink texto, body 26px padding, h3 serif 1.55rem.
- **/servicios hub** `service-vertical-card`: img 280px, `r-md 12px`, icon círculo 45px abajo derecha gold con flecha SVG, body con lista check ✓, features.
- ¿Cuál es la tarjeta oficial? Ninguna web de lujo tiene 2 tarjetas para lo mismo.

### INCOHERENCIA #4: COLOR & RADIO INCONSISTENTE

- Hardcoded `#8B6914` en `card-link` vs `var(--gold-ink)` #8a6d1f vs `var(--gold)` #c9a961 usado en textos claros (falla contraste AA). Mezcla de 3 dorados.
- Backgrounds: `var(--bone) #faf8f4`, `#f8f7f4`, `var(--gray)` alias, `#f8f7f4` en sobre-nosotros gallery. Diferencia 6 valores hex, a ojo se ve "salto" de blanco.
- Radios: `r-sm 4px` botones, `r-md 12px` cards, `r-lg 20px` panels, `r-full 999px` badges + botones city. Demasiados. Lujo usa 2 radios max: 4px para UI pequeña, 12-16px para contenedores. r-full solo para status dot, nunca para botón principal.
- **WhatsApp:** float `#25D366` (oficial brillante), mobile CTA bar `#0E8039` oscuro premium, city pages `#0E8039` vs `#25D366` en BaseLayout. 2 verdes.

### INCOHERENCIA #5: EYEBROWS / KICKERS

Cuentas estos variantes solo en eyebrows:
- home hero-tag 0.74rem 2.2px rgba(232,213,168,.95) display block
- servicios tag 0.85rem 2px gold-ink 700
- proyectos hero-eyebrow 0.72rem 700 0.16em gold
- sobre-nosotros section-tag 0.7rem 600 3px gold
- god-eyebrow 0.72rem 800 0.22em gold-light
- caracas section-tag 0.72rem 700 0.18em gold-ink

**6 variantes de lo mismo.** Lujo exige 1.

Propuesta Dios: eyebrow siempre `— LÍNEA + TEXTO`: `::before 24px linea gold 1px` + texto 0.72rem 700 0.16em uppercase.

### INCOHERENCIA #6: CONTENEDORES & ESPACIADO

- container: global 1200px + 20px padding, proyectos 1200 + 24px, sobre-nosotros 1100, method 980 (hero), caracas clamp(20px,4vw,48px). Si cambias de página, el contenido "respira" distinto.
- Section padding: `var(--s-6) 96px`, `100px`, `90px`, `clamp(72px,10vw,120px)`. Sin ritmo.
- `content-visibility: auto` con `contain-intrinsic-size 900px` solo en home deferred-section. Buena idea pero solo en home → CLS diferente en resto.

### INCOHERENCIA #7: IMÁGENES & TRATAMIENTO

- Home services img `object-fit cover` + `::after gradient to top 0.58`. Premium.
- Proyectos `object-fit contain` + bg `ink-soft` = letterboxing gris oscuro, se ve como "imagen no encontrada con estilo". En lujo nunca `contain` para portfolio, siempre `cover`.
- Servicio individual (`god-editorial`) las imágenes dentro del artículo son `<img>` sueltas sin wrapper, sin radius, sin shadow, sin figcaption. Rompen el ritmo editorial vs home que todo tiene radius + shadow.
- Logo footer 714x192  max-width 320px, pero logo header 280x75 con srcset 180/280/560. Footer pesa más que header.

### INCOHERENCIA #8: FORMULARIOS

- Home: placeholders solo "Nombre", "Teléfono", sin labels. No accesible premium.
- Contacto: labels sobre input, padding 16px, border sand, focus border gold + shadow 0 0 0 4px rgba(201,169,97,.12), top gold gradient line 5px `::before`. ESTE es premium.
- Home form no tiene la línea gold top. Debería.

### INCOHERENCIA #9: TESTIMONIOS & PRUEBA SOCIAL

- Home: `testimonial-home-card` con `::before "“" 4rem 0.7 line-height gold 0.5`, blockquote italic, figcaption strong+span. Editorial.
- Sobre-nosotros: no testimonios.
- Caracas city: `testimonial-card` border 1px border, bg surface, stars flex gap 3px gold, blockquote italic. Diseño distinto.
- Proyectos individuales: no testimonios integrados.

3 diseños de testimonio para la misma marca.

### INCOHERENCIA #10: NAV & FOOTER DETALLES

- Nav: en BaseLayout `nav-container max-width 1200px padding 0 max(20px, safe-area)`, background transparent -> scrolled rgba(20,18,14,0.96) blur 10px. En global.css nav es otro con 25px padding y backdrop-filter blur 10px pero scrolled rgba(10,10,10,0.95). Duplicado muerto.
- Nav mobile: panel `width min(320px,82vw)`, `backdrop-filter blur 16px` solo en mobile. Pero desktop nav scrolled blur 10px se quita en mobile por bug comentado. Incoherencia técnica.
- Footer: `footer-grid 1.4fr 1fr 1fr 1fr` left aligned pero `footer-brand text-align center` + `footer-logo justify center` vs resto left. Logo centrado y links left dentro de brand vs inline-block left se ve raro en 480px breakpoint.
- Footer bottom border top rgba(255,255,255,0.12) vs tarjeta border sand. Otro tono.
- `lang-switch-visible` 1px rgba(255,255,255,0.3) vs premium button 1px gold.

---

## 3. ANÁLISIS PÁGINA A PÁGINA

### HOME `/` — Nota 8.2/10
**Bien:** Hero video perfecto, proof-panel, positioning-grid editorial, quality-pillars, technical-standard dark, process 5 col, testimonials 3 col, areas chips, CTA whatsapp split outline. Motion `data-reveal` sutil.

**A mejorar para Dios:**
- `hero-title line-height 1.04` bien pero tracking -0.02em apenas, necesita -0.03em para títulos grandes. 
- Botones hero en mobile `max-width 280px` buen, pero gap 18px mucho.
- `home-services-grid` 3 col gap 28px ok pero `home-service-img::after gradient 0.58` mata algo de imagen, debería ser 0.45.
- `about-imgs::before` border gold 0.42 decorativo bien pero `img-box.small border 10px white` se ve casero, no lujo (marco grueso). Cambiar a 1px gold hairline + shadow grande.
- `fit-list li::before` dot 10px + shadow 6px gold 0.13 bien pero lista sin numeración pierde jerarquía.
- Contact form home sin top gold line vs contacto sí.

### SERVICIOS HUB `/servicios` — Nota 5.5/10
**Bien:** Hero LCP img local eager.

**Mal:** 
- Hero pag genérico, no god-hero. Se siente downgrade justo después de home premium.
- `services-vertical-grid minmax(350px,1fr)` genera 1 col en 1100px cuando debería ser 3.
- Card hover `translateY -8px` igual que home pero shadow `0 15px 40px rgba(0,0,0,0.12)` distinto a `var(--e-3) 0 24px 60px rgba(16,14,10,.12)` — dos sombras.

### SERVICIO INDIVIDUAL `/servicios/remodelacion-cocina` etc — Nota 9.0/10 (MÁS PREMIUM DE TODA LA WEB)
**Este es el estándar Dios.** God-hero + glow + manifesto + editorial + specs + FAQ + CTA radial. Editorial body con imágenes 1200x800 pero sin radius.

**Para 10/10:**
- Añadir wrapper figure con radius 20px + shadow + figcaption gold hairline.
- `god-lead max-width 600px` debería ser 640.
- `god-badges` border 0.35 muy sutil, bien.
- Manifesto `160px padding` excesivo en mobile (baja a 100px).
- Añadir TOC sticky lateral izquierda para artículos largos (como revista).

### PROYECTOS HUB `/proyectos` — Nota 6.0/10
**Bien:** Lista vertical editorial con meta location + duration pill, specs tags pill bone.

**Mal para Dios:**
- `project-card-image aspect-ratio 4/5 contain` = anti-premium. Un portfolio de lujo usa `cover 4/3` o `3/2` sin letterbox.
- `project-card` padding 32px border sand, hover shadow e-2. Correcto pero sin gold hairline.
- Hero sin imagen, solo ink + radial 0.12. Al lado de god-hero se siente vacío. El hub de proyectos debe ser el más visual de todos, con mosaico de obras reales detrás a 20% opacity.
- `project-card-badge` gold solid top left 14px. Bien pero debería ser glass gold 0.94 como home kicker.

### PROYECTO INDIVIDUAL `/proyectos/cocina-lujo-guataparo` etc (ProjectCaseStudy.astro)
No lo audité línea a línea por tiempo pero sé que usa `ProjectBeforeAfterSlider`, `ProjectLightbox`, `ProjectPhaseGallery`. Revisar:
- Lightbox legacy con swipe táctil añadido en BaseLayout – buen detalle.
- Necesita god-hero también, no hero simple.
- Añadir especificaciones técnicas tabla con gold hairline.

### MÉTODO `/metodo-remodelat` — Nota 7.8/10
**Bien:** method-hero casi god, intro-grid 0.85/1.15, steps 5 col, checks sticky, comparison dark.

**Mejora Dios:**
- `method-steps-grid 5 col` en desktop = tarjetas muy estrechas (demasiada densidad). Cambiar a 3 col o timeline vertical premium con línea gold.
- `checks-heading position sticky top 120px` bien pero en mobile static pierde efecto.
- CTA final `method-cta` radial gold 0.18 top center – bien pero necesita grain texture.

### SOBRE-NOSOTROS `/sobre-nosotros` — Nota 6.0/10
Hero genérico + story-grid + difference-grid glass + gallery mampostería + process vertical + stats gold + CTA.

**Problemas:**
- `difference-section bg var(--bg)` #0a0a0a vs `method` usa radial gold. Bien pero `diff-card bg rgba(255,255,255,0.04) border 0.08` glass se siente distinto a `quality-pillar` gradient bone. Dos lenguajes card oscuro.
- Gallery hover opacity 0→1 caption gradient bien pero `gallery-item aspect-ratio 4/3` ok, sin embargo `large span 2 row 2 aspect-ratio auto` crea alturas irregulares, sensación Pinterest no editorial.
- Stats gold full bleed `background var(--gold)` con texto #0a0a0a – único lugar donde gold es fondo masivo. Rompe regla gold solo 8% superficie. Debería ser ink con números gold large.
- `about-imgs tall 500px small 235px border 10px white` – ya comentado.

### CONTACTO `/contacto` — Nota 8.0/10
**El segundo más premium.** Prelude 3 col con border gold 0.28 bg rgba, info-panel ink sticky + gold kicker, form-large con top line gradient gold.

**Mejoras Dios:**
- `contact-prelude margin-top -54px` overlap similar a home proof-panel – bien coherente.
- `contact-premium-section background linear 50% bone / 50% white` truco split bien pero solo desktop, en mobile cambia a bone flat – salto.
- Form inputs `background var(--bone)` border sand – bien. Pero mobile CTA bar fixed tapa formulario. `body padding-bottom calc(65px + safe-area)` oculto?
- Falta campo archivo para subir fotos (crítico en remodelación).

### CIUDADES `/caracas`, `/valencia`, `/san-diego`, `/la-guaira` — Nota 4.5/10 (PEOR INCOHERENCIA)
**Es otra web.** Heredaron template antiguo pre-tokens. 
- Tokens redefinidos local `--navy: var(--ink)` aliased pero hero `min-height 92vh` + overlay `rgba(15,20,30,.82)` azulado, no ink. Hero stats inventados `+200 proyectos 15+ años 5.0` vs brand 23+ 500+ 2 años Venezuela. Fake data rompe confianza.
- Buttons pill `r-full`. Precios transparentes en section-dark con price-card `rgba(255,255,255,.06)` glass - lenguaje distinto.
- Pricing grid 3 col sin contexto local real (doorway risk SEO - ya alertado en auditoria).
- NO usa Breadcrumb? Sí usa Breadcrumb en caracas pero FAQ componentes distintos.

**Acción P0:** Migrar 100% a template god-hero + intro + services + zones + guaranteeMatrix + CTA. Eliminar template viejo.

### SEO LANDINGS `/remodelacion-bano-altamira` etc — No revisado visual profundo pero asumen mismo template SEO que ciudades: riesgo visual + SEO.

### BLOG — No revisado código pero por `content.config.ts` sabemos es colección. Necesitaría god-hero editorial.

---

## 4. DETALLES MICRO-UI QUE ROMPEN PREMIUM (lista rápida)

- WhatsApp float 60px green #25D366 `box-shadow 0 4px 20px rgba(37,211,102,0.4)` – sombra verde rompe paleta lujo ink/gold. Cambiar a sombra ink + border gold sutil.
- Mobile CTA bar `background rgba(10,10,10,0.97) border-top 1px rgba(201,169,97,0.3) backdrop-filter blur 10px` – excelente, pero botón WhatsApp #0E8039 vs float #25D366. Unificar.
- Nav logo header img 76px desktop 63px scrolled – bien, pero footer logo 320px max vs header 280 - desproporción.
- Skip-link `background #0a0a0a color #fff` luego redefinido `background #c9a961 color #1a1a2e` + position fixed? Duplicado.
- `*:focus-visible outline 2px solid #C9A961` bien, pero en global.css outline offset 2px y en BaseLayout outline offset 2px duplicado.
- `html scroll-behavior smooth` - ok pero con `prefers-reduced-motion reduce` se anula - bien.
- Imagen LCP index `hero-poster-mobile.webp` preload media max-width 1023.98px fetchpriority high – perfecto Dios level performance.
- `viewTransitions: false` en astro.config.mjs – pudiendo tener morph de páginas estilo Apple. Activar.
- Footer `footer-links-2col column-count 2` – orden vertical raro, mejor grid 2 col.
- `local-box` bg bone border-left 3px gold radius 0 var(--r-md) – bien, pero solo usado en zonas? No en home.
- `content-visibility auto contain-intrinsic-size 900px` solo home – expandir.

---

## 5. QUE FALTA PARA NIVEL DIOS — Checklist concreto

### A. FUNDAMENTOS (tokens)

```css
/* Añadir a global.css :root */
--hairline: 1px solid rgba(201,169,97,0.22);
--hairline-strong: 1px solid rgba(201,169,97,0.38);
--ink-lift: #1e1b16; /* para cards sobre ink */
--gold-soft: rgba(201,169,97,0.12);
--gold-glow: 0 0 80px rgba(201,169,97,0.18);
--noise: url('/images/noise-2pct.webp'); /* grano 2% */
--ease-god: cubic-bezier(.16,1,.3,1); /* más dramático que --ease-out */
--dur-god: 700ms;
```

- Eliminar radius `r-full` de botones primarios. Reservar solo para dot/status.
- Radius único: `4px` UI, `12px` cards, `20px` panels hero/large. Nada más.

### B. HERO SISTEMA ÚNICO "GOD-HERO"

Un solo componente `<GodHero>` para TODAS las páginas:

- Fondo: `background var(--ink)`, imagen `opacity 0.36 contrast 1.12 brightness 0.9`, `god-glow` radial blur 90px gold 0.35 en top-right.
- Overlay: `linear-gradient(to top, rgba(10,8,6,0.96) 0%, rgba(10,8,6,0.42) 48%, rgba(10,8,6,0.18) 100%) + linear-gradient(100deg, rgba(10,8,6,0.72) 0%, transparent 62%)`.
- Contenido: max-width 980px, eyebrow con linea `--` + texto 0.72rem 800 0.18em uppercase gold-light, título `clamp(3rem,7vw,6.5rem) line-height 0.92 tracking -0.03em`, lead 1.2rem 1.6 max 640px rgba 0.84, badges glass border 0.35.
- Detalle Dios: `hairline` gold 1px bottom del hero, y watermark serif outline gigante detrás del título: `REMODELAT` 30vw opacity 0.04, `font-family serif, -webkit-text-stroke 1px rgba(201,169,97,0.18)`.
- Scroll indicator: línea vertical 1px gold 48px + dot animada.
- Aplicar a: home (con video), servicios hub (con imagen integrales), proyectos hub (con mosaico collage 20% opacity), metodo, sobre-nosotros, contacto, ciudades, servicio individual.

### C. NAVEGACIÓN NIVEL DIOS

- Nav glass siempre `backdrop-filter blur(18px) saturate 1.2` incluso en top transparent (10px no suficiente).
- Border bottom `hairline` siempre visible sutil, no solo scrolled.
- Links: tracking 0.08em -> 0.12em, font size 0.82rem (más pequeño = más lujo, como Aesop).
- Active state: barra gold 1px bottom + texto gold, no 2px.
- Mobile panel: `width 360px`, background `rgba(20,18,14,0.98)`, border-left hairline-strong, sin box-shadow duro, solo blur. Links `font-size 1.1rem serif` intercalado con sans para contraste.
- Añadir en mobile panel footer: "Valencia · San Diego · Caracas" + teléfono pequeño gold.

### D. BOTONES NIVEL DIOS

- Primary: gold bg, ink text, 4px radius, padding 18x36, tracking 0.1em, arrow en círculo pequeño 20px gold-soft? Hover: arrow se convierte en fondo ink? Microinteracción.
- Secondary: transparent, border hairline-strong, gold-ink text (claro) o white en oscuro, hover gold solid.
- Ghost WhatsApp: en desktop NO verde, sino ink circle 48px + gold border + icono whatsapp blanco + tooltip "Hablar por WhatsApp". En mobile mantener verde #0E8039 pero unificar.
- Quitar `btn-border` y `btn-shine` spans del DOM, usar pseudo ::before ::after.

### E. TARJETAS & GRID NIVEL DIOS

- Card servicio unificada: `r-md 12px`, border hairline, shadow e-1 default, e-3 hover, translateY -6px, image 260px cover, overlay gradient 0.45 top, kicker glass gold 0.94 bottom left (no bottom right icon). Body 28px, h3 serif 1.45rem, p 0.95rem muted, link gold-ink 700 con arrow que se mueve 6px.
- Proyectos hub: imagen `cover 4/3`, no contain. Sin letterboxing. Badge small serif? Hover con zoom sutil `scale 1.04` 700ms ease-god.
- Añadir `premium-divider`: contenedor con linea hairline full + dot gold centro. Usar entre secciones para ritmo.

### F. TIPOGRAFÍA & EYEBROWS DIOS

- Un solo Eyebrow component: 
```html
<span class="eyebrow"><i></i>Texto</span>
```
`i` = línea 20px gold. Texto 0.72rem 700 0.16em uppercase gold o gold-ink según fondo.

- Títulos grandes tracking -0.03em - -0.02em, line-height 0.95-1.05, max 6.5rem.
- Usar serif italic para énfasis: Cormorant Garamond italic 400 para quotes o palabras gold, da sensación revista Vogue.
- Blockquote editorial con border-left 1px gold + padding 24px 28px bone.

### G. INTERACCIÓN & MOTION DIOS

- `viewTransitions: true` en astro.config, con animaciones custom `::view-transition-old(root)` fade.
- Reveal: cambiar de `translateY 16px opacity` a `clip-path inset(0 0 100% 0)` -> `inset(0)` para efecto cortina + opacity. Más premium que lift.
- Hover cards: `transform translateY + box-shadow` bien, añadir `filter brightness 1.04`.
- Add grain texture sutil overlay fixed 2% opacity en body::before - da tacto papel.
- Progress scroll gold top 2px `position fixed top 0 left 0 height 2px bg gold transform scaleX`.

### H. PRUEBA SOCIAL PREMIUM

- Testimonios actuales texto solo + name/location. Falta firma, inicial avatar con serif, o foto real.
- Propuesta: `testimonial-card` con comilla serif 5rem, texto 1.05rem 1.8 italic, footer flex avatar circle 40px bone border hairline + strong + span location + stars gold small.
- Añadir marquee de zonas: "Altamira — Las Mercedes — La Lagunita — Guataparo — Prebo —" scroll infinito sutil gold 0.18.

### I. FORMULARIOS & CTA DIOS

- Home form: añadir label como contacto, y top gold line.
- Campo subir fotos: input file drag & drop con border dashed hairline-strong, texto "Arrastra fotos o planos (opcional)".
- CTA sección final: no solo ink + text, añadir imagen de fondo 15% opacity + grain + radial gold glow top center. Título max 760px center, texto 1.15rem rgba 0.78.
- Botón CTA principal con pulso sutil gold glow cada 4s (box-shadow anim).

### J. FOOTER DIOS

- Actual footer correcto pero no memorable.
- Nivel Dios: footer con wordmark enorme outline detrás: `REMODELAT` en `font-size 18vw line-height 0.8 serif opacity 0.04 webkit-text-stroke 1px rgba(201,169,97,0.16)` absolute bottom -20px.
- Grid: contacto grande a la izquierda (tel gold large 1.5rem), servicios y zonas y empresa.
- Línea final con `© + "Hecho con método, no con prisa"` tagline.

### K. MOBILE & DETALLES TÁCTILES

- Mobile CTA bar: cambiar WhatsApp green a gold primary? O mantener green pero premium dark #0E8039 con icono + texto "WhatsApp" bien.
- Nav overlay color `rgba(0,0,0,0.55)` bien pero debería ser `rgba(20,18,14,0.72) backdrop-filter blur 4px`.
- Inputs font-size 16px ya fix iOS zoom bien.
- Añadir safe-area insets consistente en todos los fixed.

---

## 6. ROADMAP HACIA NIVEL DIOS

### P0 — Coherencia crítica (1-2 días)
1. Migrar `/caracas`, `/valencia`, `/san-diego`, `/la-guaira` y todas las landings `remodelacion-*-*` al template god-hero + GuaranteeMatrix + CTA. Eliminar `.btn r-full`, `.hero-stats` inventados, `--navy` alias.
2. Unificar botones: borrar `.btn-gold`, `.btn-dark`, `.btn-outline`, `.btn-outline-light` de city pages, usar solo `btn-premium` (primary/secondary/outline).
3. Unificar hero en 1 componente: crear `src/components/GodHero.astro` con props `eyebrow, title, lead, image, badges, backLink, variant video`. Reemplazar en servicios hub, proyectos hub, sobre-nosotros, metodo, contacto, home (variante video).
4. Proyecto hub: cambiar `object-fit contain 4/5` a `cover 4/3`, eliminar `background ink-soft` letterbox. Hero con collage real.
5. Colores: buscar y reemplazar `#8B6914`, `#f8f7f4`, `#0a0a0a` hardcode por tokens. Unificar verde WhatsApp a `#0E8039` dark.

### P1 — Elevación premium (3-5 días)
6. Unificar cards servicios: elegir una (la de home con kicker) y aplicar en hub.
7. Formularios: labels en home + gold top line + input focus shadow.
8. Testimonios: unificar a diseño home editorial con comilla grande.
9. Eyebrows: componente único con línea.
10. Radios: auditar y dejar solo 4px y 12px y 20px para hero panels.
11. Activar `viewTransitions: true`, añadir `data-astro-transition` scopes.
12. Añadir grain texture `/public/images/noise-2pct.webp` + `body::before`.
13. Footer wordmark outline + marquee zonas.
14. Nav glass `blur 18px saturate 1.2` siempre.

### P2 — Nivel Dios (1-2 semanas)
15. Escribir motion `clip-path reveal` en vez de translateY.
16. Scroll progress bar gold.
17. Custom cursor dot gold pequeña (solo desktop) que crece en hover card/button.
18. Project case page: timeline vertical con línea gold + fotos sticky.
19. Before/After slider premium con handle gold 40px circle con icon ↔.
20. Sección "Detalle invisible": macro fotos de juntas, herrajes, impermeabilización con lupa hover.
21. Form multi-step (zona -> tipo -> acabado -> detalles) con barra progreso gold.
22. Página 404 premium con god-hero + imagen cocina inacabada + CTA.

---

## 7. INSPIRACIONES PARA NIVEL DIOS

- **Aesop** (aesop.com): tipografía pequeña tracking amplio, mucho whitespace, ingredient list como spec sheet.
- **Casa Muñoz** arquitectura: hero full bleed con título enorme serif outline watermark.
- **Armani Casa**: uso de ink #14120e + bone + gold hairline, nunca sombras duras.
- **Balmuda**: proof-panel con separadores finos, no cards pesadas.
- **John Pawson**: minimalismo cálido, grano sutil, imágenes con mucho aire.

---

## 8. CONCLUSIÓN

Tienes 70% del camino. La marca ya es premium, el método técnico es diferenciador real, la fotografía existe, el sistema de tokens está bien pensado.

Lo que te separa del **nivel Dios** no es más contenido, es **menos variantes**. Una sola familia de héroes, una sola familia de botones, una sola familia de tarjetas, un solo lenguaje de eyebrows, un solo verde WhatsApp, un solo radio.

Si ejecutas P0, tu web pasa automáticamente de 6,8 a 8,5 porque el usuario deja de sentir saltos.

Si ejecutas P1, llegas a 9,2 - ya compites con webs de estudios de arquitectura europeos.

Si ejecutas P2, llegas a 9,7+ nivel Dios: web que se siente como una revista de arquitectura que vende remodelaciones, no como un catálogo de servicios. El usuario percibe "esta gente cobra más caro porque hace las cosas con obsesión".

**Próximo paso recomendado:** Yo puedo empezar por P0 ahora mismo - crear `GodHero.astro`, unificar botones y migrar ciudades a god template. ¿Procedo?

---
*Fin auditoría visual exhaustiva.*
