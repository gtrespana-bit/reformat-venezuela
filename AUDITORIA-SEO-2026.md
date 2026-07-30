# 🔍 Auditoría SEO Técnica — RemodelaT Venezuela
> Fecha: 2026-07-27 · Basada en análisis del código + build real (148 páginas)

He revisado el código fuente, compilado el sitio y verificado el HTML generado. El proyecto está **muy por encima de la media** en SEO on-page (schema, sitemap, i18n, contenido, zonas locales). Por eso este informe **omite lo que ya hacéis bien** y se centra solo en lo que **realmente necesita arreglo**.

---

## 🔴 CRÍTICO — Arreglar ya (afecta a indexación / ranking / política de Google)

### 1. ~100 páginas con `hreflang` roto → "return tag errors" en Search Console
**Qué pasa:** Todas las páginas en español emiten `<link hreflang="en">` hacia `/en/<mismo-path>`, pero **solo existen 23 páginas en `/en/`**. El resto apunta a URLs que no existen (404).

- Páginas ES con hreflang→EN: **123**
- Páginas `/en/` que existen realmente: **23**

Verificado, por ejemplo:
- `/caracas` → declara `hreflang="en" href="/en/caracas"` → **no existe** (404)
- `/valencia`, `/la-guaira`, `/san-diego` → idem
- Las **81 zone pages** (`/remodelacion-cocina-altamira`, etc.) → `/en/remodelacion-cocina-altamira` **no existe**

**Por qué importa:** Google ignora hreflang inválidos y reporta errores en Search Console. En el peor caso, confunde la segmentación por idioma.

**Solución (en `src/components/SEO.astro`):**
- Solo emitir `hreflang="en"` cuando la ruta traducida **exista** (consultar `routeMap` y un mapa de rutas válidas en `/en/`).
- Para páginas sin versión EN (ciudades, zone pages), emitir **solo** `hreflang="es"` + `x-default` (apuntando a la propia ES), sin la entrada `en`.

### 2. Tres enlaces rotos (404) desde la **home**
En `src/pages/index.astro` el array `services` apunta a slugs que no existen:
| En home apunta a… | Página real |
|---|---|
| `/servicios/fontaneria` ❌ | `/servicios/fontaneria-plomeria` |
| `/servicios/revestimientos` ❌ | `/servicios/revestimientos-pared` |
| `/servicios/piscinas` ❌ | `/servicios/piscinas-mantenimiento` |

La home es la página con más autoridad: 3 enlaces internos rotos desperdician PageRank y empeoran el rastreo. **Cambio de 3 líneas.**

### 3. Sección de servicios **vacía** en las 4 páginas de ciudad
`caracas.astro`, `valencia.astro`, `la-guaira.astro`, `san-diego.astro` hacen:
```js
const services = await getCollection('services');
```
Pero **la colección `services` no existe** (en `content.config.ts` solo está `blog`). El build avisa: *"The collection 'services' does not exist or is empty"*. Resultado: el `<div class="services-grid">` se renderiza **vacío** (verificado, 47 chars).

Las 4 landing pages comerciales más importantes muestran un encabezado "Nuestros servicios en…" **sin ninguna tarjeta debajo**. Pierde conversiones y contenido indexable.

**Solución:** definir un array de servicios local en cada página (o crear la colección `services`) y mapearlo al grid.

### 4. `aggregateRating` auto-calificado → riesgo de acción manual
`ServiceSchema.astro` y `localBusinessSchema` emiten:
```json
"aggregateRating": { "ratingValue": "5.0", "reviewCount": "3" }
```
pero en las páginas **no hay** markup de `Review` individual ni reseñas verificables (0 bloques Review). Mostrar una valoración 5,0/3 sobre tu propio negocio, en tus propias páginas, **viola la política de reseñas de Google** (self-serving reviews) y puede derivar en una acción manual que anula los rich snippets en todo el sitio.

**Solución:** o bien (a) eliminar `aggregateRating` hasta tener reseñas reales en Google Business Profile que puedas reflejar legítimamente, o (b) añadir `Review` individuales con contenido real visible en la página. No pongas una valoración que no se pueda verificar.

---

## 🟠 IMPORTANTE — Consistencia técnica

### 5. Inconsistencia de trailing slash entre canonical y hreflang
Verificado en `/servicios/remodelacion-cocina`:
- `canonical` → `…/remodelacion-cocina/` (con barra)
- `hreflang="es"` → `…/remodelacion-cocina` (sin barra)
- `sitemap` → con barra

Canonical y hreflang deberían apuntar **a la misma URL exacta**. Hoy Google podría verlas como URLs distintas → dilución. Unificar en `SEO.astro` para que canonical, hreflang y las `routeMap` usen el mismo formato (con `trailingSlash: true`, coherente con `vercel.json`).

### 6. `SearchAction` (sitelinks search box) apunta a una búsqueda que no existe
El `WebSite` schema declara:
```
"target": ".../blog?q={search_term_string}"
```
Pero **no hay input de búsqueda en `/blog`**. Si Google muestra la caja de búsqueda en sitelinks, llevará al usuario a una página sin resultados. **Quita el `potentialAction`** o implementa una búsqueda real.

---

## 🟡 ON-PAGE / CONTENIDO

### 7. Títulos > 60 caracteres (se truncarán en SERP)
Verificado:
- Home: **72** chars — "RemodelaT Venezuela | Reformas en Valencia, San Diego, Carabobo y Caracas"
- Cocina: **72** chars
Recortar a ≤60 para que no se corte con "…". Ej. "Reformas en Valencia, Carabobo y Caracas | RemodelaT".

### 8. Zone pages: añadir "prueba" local única
Lo bueno: las zone pages **sí** tienen contenido diferenciado (características del parque inmobiliario, normativas de condominio, etc.) — **no** son doorway pages. ✓

El siguiente paso para que Google las considere realmente únicas y no "templated content": añadir a cada una **un elemento local único irrepetible**: un caso/proyecto real con foto, una cifra concreta, o un dato del sector en esa zona. Hoy ~60-70% del texto es común entre zonas; subir ese "delta único" reduce el riesgo de que Google las agrupe como duplicadas.

---

## ✅ Lo que YA está bien hecho (no tocar)

- Estructura i18n correcta, `hreflang` con `x-default` en las páginas que sí tienen traducción.
- `sitemap-index.xml` + `robots.txt` correctos.
- Schema multilingüe (`HomeAndConstructionBusiness`, `BreadcrumbList`, `Service`, `BlogPosting`).
- `og:image` default válida (2112×1104), `logo-header.webp` existe.
- Analytics diferido tras el LCP (bueno para Core Web Vitals).
- Imagen LCP explícita con `fetchpriority="high"` y dimensiones.
- Fuentes autohospedadas en `woff2`, imágenes en `webp`/`avif` con `srcset`.
- Contenido profundo en servicios y blog con cross-linking en el footer.
- Redirects 301 consolidados en `vercel.json`.

---

## 📋 Orden recomendado de ejecución
1. **#1 hreflang roto** + **#5 trailing slash** (mismo archivo, `SEO.astro`) → mayor impacto en indexación.
2. **#3 grid de servicios vacío** + **#2 enlaces 404** → recuperas contenido y autoridad interna.
3. **#4 aggregateRating** → riesgo de penalización, quítalo si no es verificable.
4. **#6 SearchAction** → 2 minutos.
5. **#7 titles** → al recortar, repasar keywords objetivo.
6. **#8 prueba local** en zone pages → trabajo de contenido, no urgente.
