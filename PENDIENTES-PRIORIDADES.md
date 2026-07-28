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

## 🟠 FASE 2 — IMPORTANTE — ⏳ SIGUIENTE

### 6. Títulos >60 caracteres (truncamiento SERP)
- **Detectado:**
  - Home: 72 chars `ReformaT Venezuela | Reformas en Valencia, San Diego, Carabobo y Caracas`
  - Cocina: 72 chars
- **Propuesto:**
  - Home: `Reformas en Valencia, Carabobo y Caracas | ReformaT` (54 chars)
  - Cocina: `Remodelación de Cocinas en Valencia y Caracas | ReformaT` (56 chars)
  - Revisar todos los títulos en `src/pages/index.astro`, `src/pages/servicios/*.astro`, ciudad pages
- **Estado:** ⏳ PENDIENTE

### 7. BaseLayout duplicado hreflang mapping (dead code)
- `src/layouts/BaseLayout.astro` tiene `esToEnMap` y `esHref/enHref` no usados (SEO.astro es fuente única)
- Limpiar para evitar confusión
- **Estado:** ⏳ PENDIENTE OPCIONAL

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

## 📊 Resumen técnico Fase 1

- **Archivos tocados:** 7
  - `src/components/SEO.astro` (fix hreflang + trailingSlash + no aggregateRating + no SearchAction)
  - `src/components/ServiceSchema.astro`
  - `src/pages/index.astro`
  - `src/pages/caracas.astro`
  - `src/pages/valencia.astro`
  - `src/pages/san-diego.astro`
  - `src/pages/la-guaira.astro`
- **Build:** 245 páginas OK
- **Checks:**
  - canonical con trailingSlash ✓
  - hreflang con trailingSlash ✓
  - hreflang no emite 404 ✓
  - services-grid no vacío ✓
  - no aggregateRating ✓
  - no SearchAction ✓
  - enlaces home corregidos ✓

## ▶️ Próximos pasos recomendados
1. Fase 2: acortar títulos (15 min)
2. Fase 2 opcional: limpiar dead code BaseLayout
3. Fase 3: contenido zone pages + GBP + backlinks (trabajo semanal)
