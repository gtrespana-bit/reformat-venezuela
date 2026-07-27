# 🎯 Plan SEO — ReformaT Venezuela

> Última actualización: 2026-07-27
> Objetivo: Posicionar #1 en Google para remodelaciones en Venezuela

---

## 🔴 Prioridad ALTA — Impacto inmediato

- [x] **1. FAQPage Schema en páginas de ciudad** — ✅ Ya existía en `FAQ.astro` (JSON-LD FAQPage). Las 4 ciudades lo usan.
- [x] **2. Service Schema en páginas de servicios** — ✅ Ya existía en `ServiceSchema.astro` (Service + LocalBusiness + AggregateRating). Las 10 páginas de servicios lo usan.
- [x] **3. BreadcrumbList Schema** — ✅ Implementado 2026-07-26. Componente `Breadcrumb.astro` agregado a 9 servicios + 4 ciudades (13 archivos). Incluye JSON-LD BreadcrumbList + nav visible.
- [x] **4. robots.txt + verificación de sitemap** — ✅ Ya existía `public/robots.txt` apuntando a `sitemap-index.xml`. Sitemap configurado en astro.config.mjs.

## 🟡 Prioridad MEDIA — Semanas 2-4

- [x] **5. Contenido profundo en páginas de servicios** — ✅ Completado 2026-07-26. Las 10 páginas superan 800 palabras. Script: `scripts/expand-content.mjs`. FAQ movidas dentro del layout en 5 páginas.
- [x] **6. Landing pages de zonas específicas (long-tail local)** — ✅ Completado 2026-07-26. 15 páginas generadas (cocina/baño/integral × Chacao/Las Mercedes/El Hatillo/Valencia Centro/San Diego). Script: `scripts/generate-zone-landings.mjs`. Total: 65 páginas en el sitio.
- [x] **7. Blog con keywords long-tail** — ✅ Completado 2026-07-26. 6 artículos nuevos (apartamentos Caracas, costo baño Caracas, guía pisos, piscinas, remodelación integral, errores zonas premium). Total: 16 artículos. Fix: slugs agregados a index.astro y [slug].astro.
- [x] **8. Cross-linking ciudad ↔ servicio** — ✅ Completado 2026-07-26 vía footer sitio-wide (grid 4 columnas: Servicios, Zonas en 2 cols, Empresa) en las 137 páginas.

## 🟢 Prioridad BAJA — Externo pero crítico

- [ ] **9. Google Business Profile** — Categoría "Empresa de reformas", fotos reales, mínimo 10 reseñas, publicaciones semanales
- [ ] **10. Backlinks locales** — Directorios venezolanos de construcción, cámaras de comercio, colaboraciones con arquitectos/inmobiliarias

---

## 📋 Keywords objetivo

| Keyword | Volumen estimado | Competencia | Página objetivo |
|---------|-----------------|-------------|-----------------|
| remodelación de cocina venezuela | Medio | Media | /servicios/remodelacion-cocina |
| remodelación de baño venezuela | Medio | Media | /servicios/remodelacion-bano |
| remodelación de apartamentos caracas | Medio | Baja | /caracas |
| remodelación de casas valencia | Bajo | Baja | /valencia |
| remodelación integral venezuela | Bajo | Baja | /servicios/remodelacion-integral |
| cuanto cuesta remodelar cocina venezuela | Medio | Baja | Blog |
| empresa de remodelaciones caracas | Medio | Media | /caracas |
| remodelacion san diego carabobo | Bajo | Muy baja | /san-diego |
| remodelacion la guaira vargas | Bajo | Muy baja | /la-guaira |

---

## 📝 Notas de progreso

### 2026-07-26
- Inicio del plan SEO
- Páginas de ciudad ya rediseñadas con diseño profesional (Caracas, Valencia, La Guaira, San Diego)
- Sitemap ya configurado en astro.config.mjs
- Meta tags, OG, Twitter Cards ya en BaseLayout
- Organization schema ya en BaseLayout
- **Puntos 1-4 completados:** FAQPage y Service schema ya existían; BreadcrumbList implementado nuevo (componente Breadcrumb.astro en 13 páginas); robots.txt verificado
- Script de automatización: `scripts/add-breadcrumbs.mjs`
