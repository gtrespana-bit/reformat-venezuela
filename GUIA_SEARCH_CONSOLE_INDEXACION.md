# Guía: resolver "Página con redirección" en Search Console y mantener la indexación sana

**Sitio:** remodelat.net · **Fecha:** 12 de agosto de 2026

---

## 1. Qué significa el informe de Google

Google Search Console muestra **"Página con redirección"** cuando una URL que él
ya conocía devuelve un redirect (301/308) en lugar de la página. Las 34 URLs del
informe son de 3 tipos:

| Tipo | Ejemplo del informe | Por qué aparece |
|---|---|---|
| **Variantes sin barra final** | `remodelat.net/proyectos/banos-quinta-la-lagunita`, `remodelat.net/en`, `remodelat.net/caracas` | El sitio usa `trailingSlash: always`: la versión sin `/` redirige (308) a la versión con `/`. Google conoció esas variantes por versiones antiguas del sitemap y enlaces internos anteriores a la unificación. |
| **URLs de la migración/rebrand** | `remodelat.net/metodo-reformat/` | La marca pasó de "reformat" a "remodelat" y el dominio se migró a Vercel. Esas URLs antiguas redirigen 301 a su destino nuevo, que es lo correcto. |
| **Variantes de host** | `http://remodelat.net/`, `https://www.remodelat.net/` | Redirigen automáticamente a `https://remodelat.net/`. Es comportamiento normal y permanente. |

**Ninguna de estas URLs debe indexarse.** El objetivo es que Google deje de
considerarlas "esperadas" y confirme que las URLs finales (con `/`) son las
canónicas.

---

## 2. Qué ya está corregido en el código (verificado con build)

- **Sitemap limpio**: solo contiene URLs finales con slash (271 URLs), con
  alternates `hreflang` ES/EN y ahora con `lastmod` en cada despliegue.
- **Enlaces internos**: el build normaliza TODOS los enlaces internos a su
  forma final con slash (`scripts/fix-trailing-slashes.mjs`). Verificado en el
  HTML compilado: 0 enlaces sin slash.
- **Canonical / og:url / hreflang**: un solo canonical con slash en cada página
  indexable, `og:url` idéntico, y cada `hreflang` apunta a una página que
  existe. Las páginas 404 y la de offline llevan `noindex`.
- **Redirects antiguos**: `/metodo-reformat/`, `/contact/`, `/servicios/pintura/`,
  etc. siguen con 301 en `vercel.json` (se conservan para no perder señal), pero
  ya no aparecen en ningún enlace interno ni en el sitemap.
- **Eliminado el redirect redundante** `/proyectos` → `/proyectos/` (Vercel ya
  lo hacía con `trailingSlash: true`).

### Nuevas protecciones añadidas en esta revisión

1. **`scripts/check-seo.mjs`** (se ejecuta en cada build y rompe el despliegue
   si hay una regresión): enlace interno sin slash, enlace a una URL antigua,
   canonical/hreflang inconsistente, sitemap con URLs no finales o sin HTML, o
   páginas sin un único H1.
2. **IndexNow** (`scripts/indexnow.mjs` + clave en `public/`): notifica a Bing,
   Yandex, Seznam y Naver el sitemap y las páginas clave en cada despliegue de
   Vercel (no se ejecuta en builds locales).
3. **`lastmod`** en el sitemap = fecha de cada build.

---

## 3. Qué hacer ahora en Google Search Console (15 minutos)

### 3.1 Validar la corrección

1. Entra en **Search Console → Páginas → "Página con redirección"**.
2. Pulsa **"¿Has terminado de corregir?" / "Validar corrección"**.
3. Google volverá a rastrear las URLs afectadas durante ~2 semanas. Las URLs
   cuyos enlaces/sitemap ya no las referencian irán desapareciendo del informe.

### 3.2 Inspeccionar y confirmar el estado real

Con la herramienta **Inspección de URL**, comprueba 3 de los ejemplos:

- `https://remodelat.net/proyectos/banos-quinta-la-lagunita` → debe mostrar
  *"Redirige a"* `https://remodelat.net/proyectos/banos-quinta-la-lagunita/` ✔
- `https://remodelat.net/metodo-reformat/` → redirige a `/metodo-remodelat/` ✔
- `https://www.remodelat.net/` → redirige a `https://remodelat.net/` ✔

Esto confirma que los redirects son permanentes (301/308) y apuntan bien.

### 3.3 Solicitar indexación de las URLs finales (solo las 8 prioritarias)

Pide indexación de las versiones **con slash** de las páginas de negocio
clave (no pidas cientos a la vez):

1. `https://remodelat.net/`
2. `https://remodelat.net/servicios/remodelacion-integral/`
3. `https://remodelat.net/servicios/remodelacion-cocina/`
4. `https://remodelat.net/servicios/remodelacion-bano/`
5. `https://remodelat.net/servicios/instalacion-electrica/`
6. `https://remodelat.net/caracas/`
7. `https://remodelat.net/san-diego/`
8. `https://remodelat.net/proyectos/`

### 3.4 Reenviar el sitemap

- **Sitemaps →** confirma `https://remodelat.net/sitemap-index.xml` y pulsa
  "Volver a enviar". Verifica que en **Páginas → "Vistas pero no indexadas"**
  el número de URLs del sitemap coincide con las indexables (~271).

### 3.5 Bing Webmaster Tools

- Añade el sitio a **Bing Webmaster Tools** (importa desde GSC) y verifica la
  clave IndexNow. Con IndexNow, Bing re-rastrea el sitemap automáticamente en
  cada despliegue.

---

## 4. Qué esperar y cuándo

- **Semana 1–2**: tras "Validar corrección", Google recorre de nuevo las URLs.
- **Semanas 2–6**: las variantes sin slash y las URLs de la migración van
  saliendo del informe; las URLs finales aparecen como *indexadas*.
- Las variantes `http://` y `www.` pueden seguir apareciendo (siempre
  redirigen); es normal y no afecta al posicionamiento.

Si después de 4–6 semanas alguna URL sin slash sigue en el informe, revísala
con Inspección de URL y vuelve a solicitar indexación de su versión final.

---

## 5. Rutina mensual de SEO (30–45 min)

1. **Search Console → Rendimiento**: ordena por impresiones. Para las URLs en
   posiciones 8–20, refuerza contenido y enlaces internos; para las de CTR bajo
   con muchas impresiones, ajusta título/meta description.
2. **Páginas**: revisa que no aparezcan nuevos grupos de "no indexadas". Si
   aparece "Página con redirección" de nuevo, ejecuta
   `npm run check:seo` en local: el guardián te dirá qué enlace quedó sin slash.
3. **Cobertura local**: céntrate en Valencia, San Diego, Caracas + las zonas con
   obra y fotos reales. No publiques más landings de zona hasta tener evidencia
   propia (fotos, permisos, precios, plazos) para las que ya existen.
4. **Conversiones (GA4)**: mide clic de WhatsApp, teléfono y envío de
   formulario, y vincula GA4 con Search Console. El objetivo es leads de
   calidad, no solo posiciones.
5. **Perfil de Empresa en Google**: mantén NAP idéntico al del sitio
   (RemodelaT, Callejón Los Cocos, San Diego, +58 422-7997043), responde
   reseñas y publica un caso real al mes.
6. **Contenido**: 2 piezas útiles al mes (precios por partidas, permisos de
   condominio, casos antes/después con fotos propias), cada una enlazando a su
   página de servicio y ciudad.

---

## 6. Comandos útiles

```bash
npm run build            # build completo con guardián SEO (falla si algo está mal)
npm run check:seo        # solo la auditoría SEO del dist/
INDEXNOW_PING=1 npm run indexnow   # ping manual a IndexNow (Bing, Yandex…)
npm run check:images     # referencias rotas / nombres de imagen inseguros
npm run check:mobile-pwa # viewport, PWA e íconos
```
