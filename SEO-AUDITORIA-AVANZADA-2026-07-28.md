# Auditoría SEO avanzada — ReformaT Venezuela

Fecha: 2026-07-28  
Objetivo: acercar el sitio a posiciones #1 para búsquedas de remodelaciones en Venezuela.

## Resumen ejecutivo

El sitio ya tiene una base SEO fuerte: muchas páginas locales, contenido profundo, schema, sitemap, canonical y buena estructura técnica. La mejora real ahora no es “poner más keywords”, sino ganar autoridad, confianza y señales locales reales.

En esta revisión se detectaron y corrigieron problemas técnicos que podían frenar indexación, rastreo e interlinking interno. La validación final del build queda en 253 páginas, sin enlaces internos rotos, sin hreflang roto, sin errores de reciprocidad hreflang y sin imágenes sin alt.

## Correcciones aplicadas en esta revisión

1. **Hreflang y traducciones EN del blog**
   - Se corrigieron slugs ingleses inexistentes en `SEO.astro` y `BaseLayout.astro`.
   - Se publicaron 5 artículos ingleses que ya existían en contenido pero no se estaban generando en `/en/blog/`.
   - Se eliminaron alternates no recíprocos para páginas ES que comparten una sola página EN genérica.

2. **Enlaces internos rotos**
   - Se corrigieron enlaces hacia slugs EN inexistentes.
   - Se corrigieron enlaces internos en artículos ingleses que apuntaban a rutas españolas incorrectas.
   - Se corrigió un enlace roto en pintura hacia un artículo de humedad inexistente.
   - Se corrigió `/remodelacion-vivienda-valencia` hacia una ruta existente.

3. **404 noindex**
   - Las páginas 404 ahora pasan `noindex` al componente SEO.
   - Se evita emitir hreflang en páginas 404.
   - `robots` y `googlebot` quedan alineados con `noindex, follow`.

4. **Validación final**
   - `npm run build`: OK.
   - Páginas generadas: 253.
   - Enlaces internos rotos: 0.
   - Hreflang roto: 0.
   - Hreflang no recíproco: 0.
   - Canonical faltante: 0.
   - H1 faltante/múltiple: 0.
   - Imágenes sin alt: 0.

## Oportunidades prioritarias para competir por #1

### 1. Google Business Profile y reseñas reales
Impacto: muy alto para búsquedas locales.

Acciones:
- Optimizar categoría principal y secundarias.
- Publicar fotos reales cada semana.
- Subir proyectos antes/después por ciudad.
- Conseguir 30–50 reseñas reales en 90 días.
- Responder todas las reseñas con keywords naturales: Valencia, San Diego, Caracas, cocina, baño, remodelación integral.

### 2. Portafolio real con casos antes/después
Impacto: alto en conversión, E-E-A-T y confianza.

Problema actual: la página de proyectos todavía parece demasiado genérica y repite imágenes. Para superar competidores no basta con texto; Google y usuarios necesitan señales reales.

Acciones:
- Crear casos reales por tipo: cocina, baño, integral, pisos, electricidad.
- Añadir ubicación, reto, solución, tiempo, materiales y galería real.
- Crear schema de proyecto/caso de estudio.
- Enlazar cada caso desde su ciudad y servicio correspondiente.

### 3. Optimizar titles y meta descriptions masivamente
Impacto: alto en CTR.

Estado actual:
- Muchos artículos del blog tienen titles demasiado largos por el sufijo automático `| Blog ReformaT Venezuela`.
- Muchas descriptions superan 160 caracteres, especialmente en blog y páginas locales.

Acciones:
- Crear `seoTitle` y `seoDescription` separados del H1 en frontmatter.
- Mantener titles entre 45–60 caracteres.
- Mantener descriptions entre 135–155 caracteres.
- Priorizar primero las páginas con intención comercial: home, servicios, ciudades y 10 mejores posts.

### 4. Backlinks locales y autoridad externa
Impacto: alto para pasar de “bien optimizado” a “top 1”.

Acciones:
- Directorios venezolanos de construcción y servicios.
- Alianzas con arquitectos, inmobiliarias, proveedores de materiales y blogs locales.
- Notas de prensa de proyectos reales.
- Citaciones NAP consistentes: nombre, dirección, teléfono y web.

### 5. Reforzar contenido local único en zone pages
Impacto: medio-alto.

Acciones:
- Añadir un mini caso real o dato local por zona.
- Añadir fotos reales cuando existan.
- Evitar que todas las páginas parezcan plantillas con solo cambios de barrio.
- Enlazar cada zona con servicios, ciudad y proyecto relacionado.

### 6. Mejoras de conversión SEO
Impacto: alto en leads aunque el ranking no cambie.

Acciones:
- Añadir formulario corto por servicio con selección de zona.
- Medir clics de WhatsApp, llamadas y formularios como eventos.
- Crear página de gracias para conversion tracking.
- Añadir “presupuesto estimado” o calculadora simple de cocina/baño.
- Añadir prueba social cerca de cada CTA.

### 7. Seguridad y dependencias
Impacto: técnico y reputacional.

`npm audit` reporta vulnerabilidades en dependencias del stack Astro/Vite/RSS. Conviene planificar actualización controlada de Astro y paquetes relacionados, con build y QA posterior.

## Prioridad recomendada

1. Ejecutar Google Business Profile + reseñas reales.
2. Crear 6–10 casos reales de proyectos con fotos antes/después.
3. Optimizar titles/metas de páginas comerciales y blog top.
4. Ejecutar campaña de backlinks/citaciones locales.
5. Añadir pruebas locales únicas a zone pages.
6. Mejorar tracking de conversiones.
7. Actualizar dependencias con QA.

## Nota importante

No se puede garantizar ser #1 solo con cambios técnicos. Para llegar a #1 en búsquedas competitivas hacen falta tres bloques trabajando juntos: SEO técnico limpio, autoridad externa y confianza real del negocio. El sitio ya tiene bastante del primer bloque; ahora la mayor ganancia está en autoridad, reseñas, casos reales y CTR.
