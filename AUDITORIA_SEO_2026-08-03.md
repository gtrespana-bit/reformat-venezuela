# Auditoría SEO — RemodelaT Venezuela

**Fecha:** 3 de agosto de 2026  
**Alcance:** auditoría estática del código fuente y de la compilación de producción (`dist/`). No sustituye los datos de Google Search Console, Google Business Profile ni una medición de Core Web Vitals de usuarios reales.

## Dictamen ejecutivo

La base técnica es **buena**: el sitio es estático, rápido por arquitectura, está correctamente rastreable, tiene sitemap, canonicals, un H1 por página, datos estructurados y páginas específicas para las búsquedas de negocio prioritarias. Es una plataforma mucho más sólida que una web genérica de servicios.

Sin embargo, no hay una configuración que pueda garantizar ser primero. Para competir por consultas amplias como *remodelación de cocina*, *remodelación de baño* o *instalaciones eléctricas*, Google necesitará comprobar tres señales que no se obtienen solo con HTML: **relevancia y contenido realmente útil, autoridad externa y confianza local verificable**.

El mayor riesgo detectado es la escala de las páginas locales: hay **81 páginas geolocalizadas en español y 81 equivalentes en inglés**, para un total de 162 URLs del patrón `remodelacion-[servicio]-[zona]`. Si no aportan pruebas, fotos, casos, precios, permisos o detalles propios de cada zona, pueden parecer páginas de localización creadas en serie (“doorway pages”) y diluir el rastreo, la autoridad interna y la confianza. Es prioritario corregir esto antes de seguir creando URLs.

---

## 1. Inventario y controles técnicos comprobados

| Control | Resultado | Lectura |
|---|---:|---|
| HTML generado | 273 documentos | 270 URLs incluidas en el sitemap; las 2 páginas 404 llevan `noindex`; la página offline queda fuera del sitemap. |
| Sitemap | `sitemap-index.xml` + 270 URLs | Correcto y declarado en `robots.txt`. |
| Rastreo | `User-agent: *` sin bloqueos | Correcto para buscadores. |
| Canonical | 1 canonical en cada página indexable auditada | Correcto, con slash final consistente. |
| Idiomas | `lang`, canonical y `hreflang` ES/EN | Bien planteado; no se emite alterna inglesa para posts que no tienen traducción. |
| Títulos | 270 títulos indexables, **sin duplicados** | Muy buen control. 65 exceden 65 caracteres y pueden truncarse en resultados. |
| Descripciones | 270 indexables, **sin duplicados** | Solo 57 están en una banda práctica de 70–165 caracteres; 211 son demasiado largas y 3 demasiado cortas. Google puede reescribirlas. |
| Encabezados | 1 H1 en cada página de contenido | Correcto. Las únicas sin H2 son offline/404. |
| Enlaces internos | 0 destinos internos inexistentes detectados en el HTML compilado | Correcto. |
| Imágenes | 406 etiquetas `img`, 369 textos alternativos distintos | Buen punto de partida; las imágenes principales cuentan con `alt`, dimensiones, `loading` y formatos WebP. |
| Datos estructurados | JSON-LD parsea sin errores | Se usan `WebSite`, `HomeAndConstructionBusiness`, `BreadcrumbList`, `Service`, `FAQPage` y `BlogPosting`. |
| Medición | GA4 configurado (`G-213W48VR6M`) | Falta confirmar en Search Console que se mide la conversión real a WhatsApp/formulario y no solo las visitas. |

### Elementos ya bien resueltos

- `robots.txt` permite rastreo y declara el sitemap.
- Canonical, Open Graph, Twitter cards y las vistas previas de imagen se producen desde un único componente (`src/components/SEO.astro`).
- Las páginas de negocio existen y tienen intención clara para: vivienda, casa, apartamento, cocina, baño e instalación eléctrica.
- Se genera Schema `Service` en páginas de servicio y Schema de preguntas frecuentes donde existe el contenido visible.
- Hay URLs de casos reales y artículos informativos, dos tipos de contenido que deben reforzar la credibilidad de los servicios.
- El build incluye controles de imágenes y de experiencia móvil/PWA.

---

## 2. Mapa de intención recomendado

No se debe intentar posicionar una única página para todo. Cada consulta comercial importante necesita una URL canónica, clara y enlazada desde navegación, servicios, proyectos y artículos.

| Grupo de búsqueda | URL principal actual | Acción de enfoque |
|---|---|---|
| remodelación vivienda / reforma vivienda | `/servicios/remodelacion-vivienda/` | Mantener como hub de vivienda completa; enlazar a casas, apartamentos, cocina, baño y eléctrica. |
| remodelación casa | `/servicios/remodelacion-casas/` | Reforzar con casos reales de casas y una guía de presupuesto/plazos. |
| remodelación apartamento | `/servicios/remodelacion-apartamentos/` | Reforzar con permisos de condominio, logística y casos de apartamentos. |
| remodelación cocina | `/servicios/remodelacion-cocina/` | Es la página comercial principal; enlazar desde casos de cocina y artículos de coste/diseño. |
| remodelación baño | `/servicios/remodelacion-bano/` | Es la página comercial principal; enlazar desde casos reales y guías de coste/impermeabilización. |
| instalaciones eléctricas | `/servicios/instalacion-electrica/` | Debe hablar de inspección, seguridad, alcance, normativa aplicable y evidencias de ejecución; enlazar desde vivienda/casa/apartamento. |
| remodelación baño Caracas | `/remodelacion-bano-caracas/` | Convertirla en una página local de referencia, con proyectos comprobables en Caracas. |
| remodelación baño San Diego | `/remodelacion-bano-san-diego/` | Página local prioritaria: conservar y enriquecer con evidencia propia de San Diego. |

**Nota sobre la errata “remodeación”:** no conviene introducir faltas ortográficas de forma artificial. Google suele corregirlas. Es preferible escribir español correcto, variantes naturales (*reforma*, *renovación*, *remodelar*) y responder a la intención de búsqueda.

---

## 3. Hallazgos prioritarios

### P0 — completar fuera del repositorio: medición e indexación

No es posible confirmar posiciones, impresiones, URLs excluidas, Core Web Vitals reales ni consultas que generan leads sin acceso a las propiedades de Google. Una búsqueda pública de `site:remodelat.net` no devolvió resultados en la herramienta de comprobación usada; esto **no prueba** que el dominio no esté indexado, pero sí obliga a validarlo inmediatamente en Search Console.

1. Verificar el dominio completo en **Google Search Console** y en **Bing Webmaster Tools**.
2. Enviar `https://remodelat.net/sitemap-index.xml` y revisar “Páginas”: indexadas, descubiertas/no indexadas, duplicadas y rastreadas/no indexadas.
3. Inspeccionar y solicitar indexación de las 8 URLs del mapa anterior, no de cientos de páginas a la vez.
4. Vincular GA4 con Search Console y definir conversiones: clic de WhatsApp, envío de formulario, clic de teléfono y solicitud de valoración.
5. Revisar mensualmente por consulta, URL, país y dispositivo: impresiones, CTR, posición media, conversiones y páginas que canibalizan la misma keyword.

### P1 — reducir el riesgo de páginas locales masivas

El sitio contiene 162 landings `servicio × zona` en dos idiomas, además de los hubs de ciudad. Esta arquitectura solo funcionará si cada landing demuestra que el servicio se presta allí y ofrece valor irrepetible.

**Regla propuesta antes de dejar una URL local indexable:** debe tener al menos varios de estos elementos propios de esa zona:

- proyecto real identificable (antes/después, fecha, alcance y fotos originales);
- testimonio verificable del área, con permiso del cliente;
- rango de inversión y factores de coste locales honestos;
- detalle concreto de edificio, condominio, logística, normativa o materiales realmente aplicable;
- equipo, dirección/área de cobertura y forma de solicitar visita;
- enlaces desde el hub de la ciudad y desde un caso/proyecto relacionado.

Para las páginas que no puedan cumplirlo todavía, no crear más variantes. Conviene decidir entre **enriquecerlas primero** o marcarlas temporalmente como `noindex, follow`. No se deben canonicalizar de forma masiva hacia otra página si el contenido sigue hablando de una intención/localidad distinta; para contenido realmente duplicado u obsoleto, la solución correcta es consolidar con 301.

Priorizar inicialmente Valencia, San Diego, Caracas y las zonas donde haya obra y evidencia fotográfica propia. Es mejor dominar 8–15 páginas locales excelentes que publicar decenas de páginas muy parecidas.

### P1 — descripciones y títulos que se ven en Google

- 211 de 270 meta descriptions indexables exceden 165 caracteres. Varias landings locales superan 220 caracteres y varias fichas de proyecto superan 300.
- 65 títulos indexables pasan de 65 caracteres; los posts informativos concentran la mayoría.

Esto no bloquea el ranking, pero reduce control sobre el snippet y el CTR. Se recomienda una plantilla de descripción de **120–155 caracteres**: servicio + ciudad/área + prueba o diferenciador + CTA implícita, sin repetir el título completo. Ejemplo:

> Remodelación de baños en San Diego con impermeabilización comprobada, presupuesto por partidas y garantía escrita. Solicita una valoración técnica.

Mantener el término principal al inicio del título y la marca al final. Para artículos largos, acortar sin perder intención, por ejemplo: “Precio de reforma de cocina en Caracas y Valencia (2026) | RemodelaT”.

### P1 — autoridad local y confianza (E-E-A-T)

El contenido afirma experiencia, garantía y especialización. Para que esas afirmaciones se traduzcan en confianza de búsqueda hacen falta pruebas externas y trazables:

1. Reclamar/verificar y optimizar el **Perfil de Empresa en Google** con el mismo nombre, teléfono, dirección, horarios y áreas de servicio que el sitio.
2. Solicitar reseñas reales después de cada obra, sin incentivos y sin guiones; responderlas e incorporar testimonios solo con consentimiento.
3. Añadir perfiles reales del responsable técnico/equipo: nombre, trayectoria, especialidad, foto y proyectos en los que participó.
4. Publicar condiciones concretas de garantía, proceso de visita, contrato/presupuesto por partidas y política de materiales.
5. Conseguir menciones/enlaces editoriales legítimos: proveedores, arquitectos, asociaciones, medios locales, directorios profesionales de calidad y proyectos publicados. No comprar enlaces ni reseñas.
6. Usar el mismo NAP (nombre, dirección, teléfono) en web, Perfil de Empresa, redes y directorios.

### P2 — datos estructurados: simplificar y hacer consistentes

El JSON-LD actual es válido, pero puede ser más preciso:

- `WebSite` y `HomeAndConstructionBusiness` se imprimen en prácticamente todas las páginas. No es dañino, pero es redundante. Mantener la entidad principal en home y usar `@id` para referenciarla desde Service/Article reduce ambigüedad.
- El negocio principal usa dirección de **San Diego**; `ServiceSchema` declara al proveedor en **Valencia**. Debe existir una única dirección comercial real y verificable, igual que en el Perfil de Empresa.
- `sameAs` incluye la URL del propio sitio y una búsqueda de Google/Knowledge Graph. `sameAs` debe contener perfiles oficiales controlados por la empresa (Google Business Profile cuando se disponga de una URL estable, Instagram, Facebook, LinkedIn, etc.), no una página de resultados de búsqueda ni el mismo dominio.
- Las FAQ son válidas si la respuesta está visible, pero para un negocio comercial ya no debe esperarse el rich result de FAQ como palanca de tráfico. Mantenerlas por utilidad al usuario, no por estrellas o resultados enriquecidos.
- Añadir `@id`, `logo`, `foundingDate`, perfiles oficiales y, donde sea demostrable, `hasCredential`/licencias reales. Nunca añadir ratings o reseñas autoasignadas.

### P2 — contenido que puede ganar enlaces y búsquedas

Las páginas de servicio deben convertir. Los artículos y casos deben ganar visibilidad informativa y autoridad hacia esas páginas. El siguiente calendario debe salir de consultas reales de Search Console, pero estos temas están alineados con la demanda:

1. Precio de remodelar un baño en Caracas y San Diego: partidas, rangos, qué cambia el presupuesto y fecha de actualización.
2. Precio de remodelar una cocina en Caracas/Valencia: distribución, mobiliario, instalaciones y tiempos.
3. Instalación eléctrica residencial: señales de riesgo, alcance de una renovación, protecciones y preguntas para el presupuesto.
4. Remodelar un apartamento con condominio: permisos, horarios, ascensores, escombros y cronograma.
5. Casos reales con fotos propias: problema inicial, diagnóstico, solución, materiales, plazo y resultado. Cada caso debe enlazar al servicio y a la ciudad correspondiente.

No publicar contenido solo para repetir keywords. Cada pieza debe responder una pregunta concreta que un propietario haría antes de contratar.

---

## 4. Plan de 90 días

### Días 1–14 — visibilidad y base de datos

- Verificar Search Console, Bing y Perfil de Empresa; enviar sitemap.
- Medir los cuatro eventos de lead y crear un panel mensual.
- Inspeccionar las ocho URLs prioritarias y corregir cualquier exclusión de indexación.
- Definir el NAP oficial y actualizarlo de forma uniforme.
- Elegir las 10–15 landings locales respaldadas por obra real; congelar la expansión de páginas locales hasta terminar su auditoría.

### Días 15–45 — relevancia y confianza

- Reescribir title/meta description de todas las páginas prioritarias y de las landings locales que continúen indexables.
- Enriquecer cada landing prioritaria con evidencia propia y enlaces a 2–4 casos/artículos útiles.
- Publicar 3 casos reales y 2 guías de alto valor, con autor/responsable técnico y fecha de actualización.
- Corregir la consistencia de Schema/NAP y sustituir `sameAs` por perfiles oficiales.
- Activar un proceso ético de solicitud de reseñas tras la entrega de cada obra.

### Días 46–90 — autoridad y optimización por datos

- Publicar de forma sostenida, no masiva: 2 piezas útiles al mes + casos cuando exista obra documentable.
- Conseguir menciones de socios, proveedores y medios locales relevantes.
- Optimizar CTR de consultas con muchas impresiones y bajo CTR (título/meta), y reforzar contenido de URLs que estén entre posiciones 8–20.
- Revisar páginas locales sin impresiones/valor: enriquecer, noindex temporal o consolidar con 301 según corresponda.
- Analizar leads, no solo posiciones: la URL ganadora debe generar solicitudes de valoración de calidad.

---

## 5. Indicadores de éxito

| Indicador | Punto de partida | Objetivo de proceso |
|---|---|---|
| Cobertura indexada | Confirmar en Search Console | Todas las URLs prioritarias indexadas y sin exclusiones técnicas evitables. |
| Consultas comerciales | Confirmar en Search Console | Aumentar impresiones y clics en los grupos de intención del mapa. |
| CTR orgánico | Confirmar por URL/consulta | Mejorar primero las páginas con alta impresión y CTR bajo. |
| Posiciones 8–20 | Confirmar por URL | Prioridad editorial/enlazado: son las oportunidades con retorno más cercano. |
| Leads orgánicos | Configurar eventos GA4 | WhatsApp, teléfono y formularios atribuidos a SEO, con calidad de lead. |
| Reseñas/perfiles | Confirmar Perfil de Empresa | Crecimiento sostenido de reseñas genuinas y completas. |
| Páginas locales útiles | 162 variantes ES/EN | Menos volumen, más evidencia y rendimiento por URL. |

## Conclusión

El repositorio ya tiene una base SEO técnica competente. El camino a liderar resultados no es añadir más keywords ni duplicar ciudades: es concentrar autoridad en las páginas de negocio correctas, demostrar experiencia local con obras reales, conseguir confianza externa y medir cada avance en Search Console y conversiones. La prioridad inmediata es validar la indexación y sanear la estrategia de páginas geolocalizadas; después, el contenido, los casos reales y la reputación local harán el trabajo acumulativo de posicionamiento.
