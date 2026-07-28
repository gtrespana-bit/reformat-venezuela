# ✅ PENDIENTES Y PRIORIDADES — ReformaT Venezuela
> Última actualización: 2026-07-28 (Fase 1 completada)
> Branch: arena/019fa653-reformat-venezuela

Este archivo es el source of truth consolidado de AUDITORIA-SEO-2026.md + SEO-PLAN.md + BACKLINKS-PLAN.md

---

## 🔴 FASE 1 — CRÍTICO — ✅ COMPLETADA (2026-07-28)

### 1. hreflang roto (100 páginas 404) + trailing slash inconsistente
- **Problema:** `canonical` con `/` pero `hreflang` sin `/`. Blog posts sin traducción emitían `en` a 404.
- **Fix aplicado en `src/components/SEO.astro`:**
  - Nueva función `ensureTrailingSlash()` unifica formato con `vercel.json` trailingSlash:true
  - `canonicalUrl` siempre con `/`
  - `esPathSlashed` y `enPathSlashed` siempre con `/`
  - Validación: `isUntranslatedEsBlogPost` y `isUntranslatedEnBlogPost` — solo emite `en` si existe en routeMap
  - `x-default` apunta a ES si existe, si no a self
  - Breadcrumbs también con `/`
- **Verificación build:** 
  - `/` → es `/` , en `/en/` ✓
  - `/servicios/remodelacion-cocina/` → es con `/`, en `/en/services/kitchens/` ✓
  - `/remodelacion-cocina-altamira/` → es `/remodelacion-cocina-altamira/`, en `/en/remodelacion-cocina-altamira/` ✓
  - Blog con mapeo sí emite ambos, sin mapeo solo self + x-default
- **Estado:** ✅ DONE

### 2. Tres enlaces rotos desde home
- **Problema:** `/servicios/fontaneria`, `/servicios/revestimientos`, `/servicios/piscinas` no existen
- **Fix en `src/pages/index.astro` líneas 25-29:**
  - `fontaneria` → `fontaneria-plomeria`
  - `revestimientos` → `revestimientos-pared`
  - `piscinas` → `piscinas-mantenimiento`
- **Verificación:** dist/index.html contiene 1x cada slug correcto
- **Estado:** ✅ DONE

### 3. Sección servicios vacía en 4 páginas ciudad
- **Problema:** `caracas.astro`, `valencia.astro`, `la-guaira.astro`, `san-diego.astro` usaban `getCollection('services')` que no existe (solo `blog` en content.config.ts) → grid vacío
- **Fix:**
  - Eliminado `import { getCollection }`
  - Reemplazado por array estático de 9 servicios con slug + title + description
  - Template sigue usando `services.slice(0,6)` → 6 cards visibles
- **Verificación:** 
  - caracas/index.html 6 service-card ✓
  - valencia 6 ✓
  - san-diego 6 ✓
  - la-guaira 6 ✓
- **Estado:** ✅ DONE

### 4. aggregateRating auto-calificado → riesgo penalización
- **Problema:** `SEO.astro` y `ServiceSchema.astro` emitían rating 5.0/3 sin Reviews visibles → viola política self-serving reviews Google
- **Fix:**
  - `src/components/SEO.astro`: eliminado `aggregateRating` de `localBusinessSchema`
  - `src/components/ServiceSchema.astro`: eliminado `aggregateRating` de schema Service
- **Verificación:** `grep '"aggregateRating"' dist/` = 0 ✓, `grep '"reviewCount"' dist/` = 0 ✓
- **Estado:** ✅ DONE

### 5. SearchAction sitelinks searchbox apunta a búsqueda inexistente
- **Problema:** `WebSite` schema tenía `potentialAction.target = /blog?q={search_term}` pero no hay buscador
- **Fix en `SEO.astro`:** eliminado todo el bloque `potentialAction`, websiteSchema ahora solo name, url, inLanguage
- **Verificación:** `grep '"potentialAction"' dist/` = 0 ✓
- **Estado:** ✅ DONE

**Build:** 245 páginas, 0 errores, verificado en dist/

---

## 🟠 FASE 2 — IMPORTANTE — ✅ COMPLETADA (2026-07-28)

### 6. Títulos >60 caracteres (truncamiento SERP)
- **Detectado:**
  - Home: 72 chars `ReformaT Venezuela | Reformas en Valencia, San Diego, Carabobo y Caracas`
  - Cocina: 71 chars, Baño 69, Integral 69, Pisos 64, Pintura 66, Fontanería 69, Eléctrica 69, Piscinas 62
  - EN: index 79, flooring 74, painting 76, wall-coverings 72, whole-home 61
- **Fix aplicado (2026-07-28):**
  - `src/pages/index.astro`: 72 → 51 `Reformas en Valencia, Carabobo y Caracas | ReformaT`
  - `remodelacion-cocina`: 71 → 53 `Remodelación de Cocinas Valencia y Caracas | ReformaT`
  - `remodelacion-bano`: 69 → 51 `Remodelación de Baños Valencia y Caracas | ReformaT`
  - `remodelacion-integral`: 69 → 51 `Remodelación Integral Valencia y Caracas | ReformaT`
  - `instalacion-pisos`: 64 → 50 `Instalación de Pisos Valencia y Caracas | ReformaT`
  - `pintura-acabados`: 66 → 48 `Pintura y Acabados Valencia y Caracas | ReformaT`
  - `fontaneria-plomeria`: 69 → 51 `Fontanería y Plomería Valencia y Caracas | ReformaT`
  - `instalacion-electrica`: 69 → 51 `Instalación Eléctrica Valencia y Caracas | ReformaT`
  - `revestimientos-pared`: 59 → 43 `Revestimientos de Pared Valencia | ReformaT`
  - `piscinas-mantenimiento`: 62 → 44 `Piscinas y Mantenimiento Valencia | ReformaT`
  - `caracas`: 61 → 42 `Remodelaciones en Caracas | ReformaT Venezuela`
  - EN index: 79 → 50 `Home Remodeling in Valencia and Caracas | ReformaT`
  - EN flooring: 74 → 51, painting 76 → 49, wall-coverings 72 → 44, whole-home 61 → 42
- **Verificación:** `dist/index.html` title 51 chars, `dist/servicios/remodelacion-cocina/index.html` 53 chars ✓ Todos ≤60
- **Estado:** ✅ DONE

### 7. BaseLayout duplicado hreflang mapping (dead code)
- **Problema:** `src/layouts/BaseLayout.astro` tenía `esToEnMap`, `enToEsMap`, `siteBase`, `esHref`, `enHref` definidos pero nunca usados (SEO.astro es fuente única según comentario)
- **Fix:** Eliminados 4 constants, quedan solo `currentPath`, `isEnglish`, `lang`
- **Verificación:** build OK 245 páginas, sin regresión
- **Estado:** ✅ DONE

---

## 🟡 FASE 3 — ON-PAGE / CONTENIDO

### 8. Zone pages: añadir prueba local única
- Estado actual según `ZONE-REWRITE-TRACKER.md`: ✅ COMPLETO 81 páginas reescritas con perfil único por zona (barrios reales, tipología, reto local, normativa, referente)
- Auditoría pide siguiente paso: añadir por zona 1 elemento irrepetible: foto de proyecto real, cifra concreta, dato sector
- Trabajo de contenido, no técnico
- **Estado:** ⏳ 60-70% hecho, falta proof único

### 9. Google Business Profile (externo)
- Categoría correcta, fotos reales, 10+ reseñas, publicaciones semanales
- **Estado:** ⏳ PENDIENTE (fuera de código)

### 10. Backlinks locales (externo)
- Seguir `BACKLINKS-PLAN.md` Tier 1-5 → objetivo 26-33 backlinks
- **Estado:** ⏳ PENDIENTE

---

## 📊 Resumen técnico Fase 1 + Fase 2

- **Fase 1 — Archivos tocados (7 + 1 doc):**
  - `src/components/SEO.astro` (fix hreflang + trailingSlash + no aggregateRating + no SearchAction)
  - `src/components/ServiceSchema.astro`
  - `src/pages/index.astro` (enlaces rotos)
  - `src/pages/caracas.astro`
  - `src/pages/valencia.astro`
  - `src/pages/san-diego.astro`
  - `src/pages/la-guaira.astro`
- **Fase 2 — Archivos tocados (15):**
  - `src/pages/index.astro` (título 72→51)
  - 9x `src/pages/servicios/*.astro` (títulos 59-71 → 43-53)
  - `src/pages/caracas.astro` (61→42)
  - 4x `src/pages/en/services/*.astro` + `src/pages/en/index.astro` (79→50)
  - `src/layouts/BaseLayout.astro` (dead code removal)
- **Build:** 245 páginas OK en ambas fases
- **Checks Fase 1:**
  - canonical con trailingSlash ✓
  - hreflang con trailingSlash ✓
  - hreflang no emite 404 ✓
  - services-grid no vacío (6 cards) ✓
  - no aggregateRating ✓
  - no SearchAction ✓
  - enlaces home corregidos ✓
- **Checks Fase 2:**
  - Todos los títulos ≤53 chars ✓
  - BaseLayout sin código muerto ✓

## ▶️ Próximos pasos recomendados (Fase 3)
1. Zone pages: añadir prueba local única por zona (foto/cifra) — contenido
2. Google Business Profile — externo
3. Backlinks — seguir BACKLINKS-PLAN.md Tier 1-5
