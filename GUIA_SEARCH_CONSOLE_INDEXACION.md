# Guía: resolver "Página con redirección" y "Descubierta: sin indexar" en Search Console

**Sitio:** remodelat.net · **Fecha:** 12 de agosto de 2026

---

## 1. Qué significa cada informe de Google

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

### "Descubierta: actualmente sin indexar" (24 URLs)

Es un estado **distinto y menos grave**: Google ya conoce la URL (la vio en el
sitemap y en enlaces), pero aún **no la ha rastreado**. Es muy común en sitios
nuevos con muchas URLs: Google raciona su presupuesto de rastreo y prioriza las
páginas con más señal interna. Las 24 URLs del informe son casi todas páginas
de zona (`remodelacion-<servicio>-<zona>`), detectadas por primera vez el
5/8/2026 — hace una semana.

El detonante era arquitectónico y ya está corregido (sección 2.1): las zonas de
Carabobo recibían solo 3 enlaces internos, porque el bloque "zonas cercanas"
solo enlazaba las 4 primeras zonas de cada grupo y ni las páginas de servicio
ni los hubs de ciudad enlazaban a las páginas de zona.

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

### 2.1 Reequilibrio del grafo de enlaces internos (para "Descubierta: sin indexar")

Antes de esta revisión, las páginas de zona tenían un enlazado interno muy
desigual:

- `ZoneCrossLinks` solo enlazaba las **4 primeras zonas** de cada grupo
  metropolitano → las zonas de Carabobo a partir del 5º puesto recibían solo
  **3 enlaces internos** (2 hermanas + contraparte EN).
- Las **páginas de servicio** (`/servicios/remodelacion-bano/`, cocina,
  integral y sus versiones EN) **no enlazaban a ninguna página de zona**.
- Los **hubs de ciudad** (`/caracas`, `/valencia`, `/san-diego`) solo
  enlazaban 7 zonas desde el footer global, las mismas en todo el sitio.

Cambios aplicados:

1. **`ZoneCrossLinks`** ahora enlaza **todas** las zonas del grupo metropolitano
   (lista a 2 columnas).
2. **Nuevo componente `ZoneHubLinks`** (chips enlazables) insertado en:
   - Páginas de servicio ES y EN de baños, cocinas e integrales (27 chips).
   - Hubs de ciudad `/caracas`, `/valencia`, `/san-diego` y sus versiones EN
     (3 chips por zona: baños, cocinas, integral).
3. **`src/data/zone-slugs.ts`**: fuente única de zonas/nombres/grupos, usada
   por ambos componentes.

Resultado medido en el HTML compilado: las 24 URLs del informe "Descubierta"
pasaron de **3 a 16–20 páginas que las enlazan**, incluyendo páginas de mayor
autoridad (servicios y ciudades). Eso es la señal interna que Google necesita
para programar su rastreo.

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

**Para "Página con redirección" (34 URLs):**

1. Entra en **Search Console → Páginas → "Página con redirección"**.
2. Pulsa **"¿Has terminado de corregir?" / "Validar corrección"**.
3. Google volverá a rastrear las URLs afectadas durante ~2 semanas. Las URLs
   cuyos enlaces/sitemap ya no las referencian irán desapareciendo del informe.

**Para "Descubierta: actualmente sin indexar" (24 URLs):**

1. Entra en **Páginas → "Descubierta: actualmente sin indexar"** y pulsa
   **"Validar corrección"** tras desplegar el reequilibrio de enlaces internos.
2. No hace falta pedir indexación una a una: con 16–20 enlaces internos desde
   páginas de servicio y ciudad, Google las priorizará por sí solo. Si quieres
   acelerar, inspecciona y solicita indexación de las 5 que más te importen
   comercialmente (p. ej. `/remodelacion-bano-altamira/`,
   `/remodelacion-cocina-las-mercedes/`, `/remodelacion-integral-naguanagua/`).
3. Espera 2–4 semanas y revisa la pestaña de nuevo: lo normal es que el grupo
   baje semana a semana.

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
- **"Descubierta: sin indexar"**: con el grafo interno reequilibrado, la
  mayoría debería rastrearse en 2–4 semanas. Un sitio nuevo con 270+ URLs
  puede tardar 1–3 meses en indexar la cola larga (zonas menos demandadas).
  Eso es normal y no es un fallo del sitio.
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
