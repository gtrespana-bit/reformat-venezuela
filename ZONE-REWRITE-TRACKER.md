# 📊 Tracker — Reescritura de Zone Pages (Opción B)

> Objetivo: eliminar el riesgo de "doorway pages" reescribiendo las 81 páginas de zonas
> con contenido genuinamente único por zona (tipo de vivienda, arquitectura, normativa,
> retos reales, referentes locales) + contenido específico por servicio.
>
> Total: **27 zonas × 3 servicios (baño, cocina, integral) = 81 páginas**
> Generador: `scripts/rewrite-zone-pages.mjs` (perfiles reales por zona)

## Estado: ✅ COMPLETO

Build verificado: **137 páginas, sin errores.**

## Zonas (27) — todas con perfil único

### Caracas (12)
chacao, altamira, campo-alegre, country-club, las-mercedes, el-hatillo,
alto-hatillo, la-lagunita, los-naranjos, prados-del-este, la-castellana, el-penon

### Carabobo / Valencia (15)
el-trigal, la-trigalena, el-vinedo, guataparo, prebo, valencia-centro,
naguanagua, manongo, san-diego, los-guayos, guacara, tocuyito,
puerto-cabello, valles-de-camoruco, el-parral

## Qué hace único a cada perfil
- **Barrios reales** de la zona (no genéricos)
- **Tipología de vivienda**: metraje, época de construcción, layout
- **Reto local específico**: instalaciones antiguas, humedad por ladera,
  corrosión salina (Puerto Cabello), patrimonio (casco histórico), etc.
- **Normativa de condominio / patrimonio** de la urbanización
- **Referente local** (plaza, club, avenida, CC conocido)
- **Estilo de proyecto** predominante en la zona
- **FAQs con precios y datos locales**

## Lotes
| Lote | Páginas | Estado |
|------|---------|--------|
| 1-9 | 1-81 | ✅ generado + build OK + push |
