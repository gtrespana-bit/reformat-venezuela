# Kit de flyers para Facebook — RemodelaT Venezuela

Paquete preparado para publicaciones orgánicas y campañas de captación por WhatsApp. La línea gráfica usa el azul marino y dorado de la marca, el teléfono oficial y los mensajes de confianza ya presentes en el sitio: experiencia, supervisión técnica, presupuesto por partidas y garantía por escrito.

## Nueva segunda tanda premium

La carpeta [`tanda-2-premium/`](./tanda-2-premium/) contiene **8 diseños adicionales** con una dirección más editorial y elegante, tipografías oficiales de marca y nuevos hooks de captación. Incluye publicaciones verticales, anuncios cuadrados, Stories/Reels y una adaptación horizontal. La vista general está en `tanda-2-premium/preview-contact-sheet.jpg`.

## Archivos listos para publicar

| Archivo | Medida | Uso recomendado |
|---|---:|---|
| `export/publicacion-transforma-hogar-1080x1350.jpg` | 1080 × 1350 | Publicación de marca en el feed |
| `export/publicacion-antes-despues-bano-1080x1350.jpg` | 1080 × 1350 | Publicación de proyecto real / prueba social |
| `export/anuncio-captacion-general-1080x1080.jpg` | 1080 × 1080 | Anuncio general para Feed y Marketplace |
| `export/anuncio-banos-1080x1080.jpg` | 1080 × 1080 | Anuncio específico para remodelación de baños |
| `export/anuncio-horizontal-1200x628.jpg` | 1200 × 628 | Feed horizontal y Audience Network |
| `export/anuncio-stories-1080x1920.jpg` | 1080 × 1920 | Stories y Reels; respeta las zonas seguras |

Los JPG están en sRGB, optimizados y pesan menos de 250 KB cada uno.

## Textos para publicaciones

### Publicación 1 — Transformamos tu hogar

**Texto sugerido**

> Tu hogar puede verse tan bien como funciona.  
> En RemodelaT planificamos cada partida y coordinamos la obra para conseguir acabados de alto estándar, sin improvisaciones.  
>  
> ✓ Cocinas, baños y remodelaciones integrales  
> ✓ Supervisión técnica  
> ✓ Garantía por escrito  
>  
> Atendemos Caracas, Valencia, San Diego y Carabobo.  
> Escríbenos por WhatsApp al **0422 799 7043** y cuéntanos qué espacio quieres transformar.

### Publicación 2 — Antes y después

**Texto sugerido**

> Un baño antiguo no siempre necesita pequeños arreglos. A veces necesita una nueva distribución, instalaciones revisadas y una ejecución completa.  
>  
> Este es el antes y después de un proyecto real en Caracas: planificación, obra y acabados coordinados por un solo equipo.  
>  
> ¿Quieres evaluar el potencial de tu baño? Envíanos fotos y ubicación por WhatsApp: **0422 799 7043**.

## Textos para anuncios

### Anuncio A — Captación general

**Texto principal**

> ¿Vas a remodelar tu casa o apartamento? Evita decisiones improvisadas. En RemodelaT coordinamos diseño, obra, instalaciones y acabados con presupuesto por partidas, supervisión técnica y garantía por escrito. Escríbenos por WhatsApp y envíanos fotos y ubicación de tu proyecto.

**Titular:** `Solicita una valoración técnica`  
**Descripción:** `Cocinas, baños y reformas integrales`  
**Botón:** `Enviar mensaje`

### Anuncio B — Remodelación de baños

**Texto principal**

> ¿Tu baño ya no aprovecha bien el espacio? Lo transformamos con una solución completa: distribución, instalaciones, revestimientos y acabados. Cuéntanos qué necesitas y solicita una valoración técnica por WhatsApp.

**Titular:** `Hablemos de tu nuevo baño`  
**Descripción:** `Remodelación planificada y garantía por escrito`  
**Botón:** `Enviar mensaje`

### Enlace directo de WhatsApp

```text
https://wa.me/584227997043?text=Hola%2C%20vi%20su%20anuncio%20en%20Facebook%20y%20quiero%20solicitar%20una%20valoraci%C3%B3n%20t%C3%A9cnica.%20Mi%20proyecto%20est%C3%A1%20en%3A
```

## Estructura recomendada para captar clientes

1. Crear una campaña con objetivo **Clientes potenciales** o **Mensajes**, usando WhatsApp como destino.
2. Separar dos conjuntos geográficos para poder medirlos:
   - Caracas, Chacao, Baruta y El Hatillo.
   - Valencia, San Diego, Naguanagua y Carabobo.
3. Probar en cada conjunto los dos conceptos cuadrados:
   - Anuncio general.
   - Anuncio de baños.
4. Activar la adaptación por ubicación con el horizontal para Feed/Audience Network y el vertical para Stories/Reels.
5. Evaluar por **conversaciones calificadas**, valoraciones agendadas y proyectos cerrados; no solo por clics o “me gusta”.

### Respuesta automática inicial sugerida

> ¡Hola! Gracias por contactar a RemodelaT. Para orientarte mejor, indícanos:  
> 1. Ciudad y zona del proyecto.  
> 2. Espacio que deseas remodelar.  
> 3. Si es casa, apartamento, quinta o townhouse.  
> 4. Cuándo te gustaría iniciar.  
> 5. Si puedes, envíanos fotos o un video del espacio.

## Fuentes editables y regeneración

- `src/`: composiciones SVG editables.
- `render.sh`: genera nuevamente todos los JPG usando ImageMagick y los recursos de marca del repositorio.

Desde la raíz del proyecto:

```bash
./marketing/facebook/render.sh
```

Los datos de contacto utilizados son los definidos en `src/data/brand.ts`: **RemodelaT Venezuela**, WhatsApp **0422 799 7043** y cobertura principal en Caracas, Valencia, San Diego y Carabobo.
