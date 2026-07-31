#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
OUT="$HERE/export"
TMP="$HERE/.render-reels-tmp"
rm -rf "$TMP"
mkdir -p "$OUT" "$TMP"
trap 'rm -rf "$TMP"' EXIT

CIN_BG="#0F1015"
CIN_GOLD="#D99B66"
WHITE="#FFFFFF"
MUTED="#A0A6B2"

HEAD_BOLD="$ROOT/public/fonts/cormorant-garamond-v21-latin-700.v2.woff2"
BODY="$ROOT/public/fonts/manrope-v15-latin-400.v2.woff2"
BODY_MED="$ROOT/public/fonts/manrope-v15-latin-500.v2.woff2"
BODY_BOLD="$ROOT/public/fonts/manrope-v15-latin-700.v2.woff2"
LOGO="$ROOT/public/images/logo-header.webp"

cover() {
  local input="$1" width="$2" height="$3" output="$4" gravity="${5:-center}"
  convert "$input" -auto-orient -resize "${width}x${height}^" -gravity "$gravity" -extent "${width}x${height}" "$output"
}

rounded_cover() {
  local input="$1" width="$2" height="$3" radius="$4" output="$5" gravity="${6:-center}"
  local key
  key="$(basename "$output" | tr -cd '[:alnum:]')"
  cover "$input" "$width" "$height" "$TMP/${key}-photo.miff" "$gravity"
  convert -size "${width}x${height}" xc:none -fill white \
    -draw "roundrectangle 0,0 $((width-1)),$((height-1)) ${radius},${radius}" "$TMP/${key}-mask.png"
  convert "$TMP/${key}-photo.miff" "$TMP/${key}-mask.png" -alpha off -compose CopyOpacity -composite "$output"
}

logo() {
  local width="$1" output="$2"
  convert "$LOGO" -resize "${width}x" "$output"
}

logo 300 "$TMP/logo-300.png"

echo "Generando frames del Reel 1 (Baños Suite - La Lagunita)..."
# --- REEL 1 · BAÑO (4 FRAMES 1080x1920) ---
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-antes-1.webp" 960 750 24 "$TMP/r1-f1-img.png" center
rounded_cover "$ROOT/public/images/proyectos/bano-san-diego/bano-en-proceso.webp" 960 750 24 "$TMP/r1-f2-img.png" center
rounded_cover "$ROOT/public/images/proyectos/bano-san-diego/bano-finalizado-2.webp" 960 750 24 "$TMP/r1-f3-img.png" center
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado.webp" 960 750 24 "$TMP/r1-f4-img.png" center

for idx in 1 2 3 4; do
  convert -size 1080x1920 "xc:$CIN_BG" "$TMP/r1-base-$idx.miff"
  composite -geometry +60+480 "$TMP/r1-f$idx-img.png" "$TMP/r1-base-$idx.miff" "$TMP/r1-comp-$idx.miff"
  composite -geometry +60+100 "$TMP/logo-300.png" "$TMP/r1-comp-$idx.miff" "$TMP/r1-logo-$idx.miff"
done

# Textos para Frame 1 (ANTES)
convert "$TMP/r1-logo-1.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'CASE STUDY VERIFICADO · CARACAS' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 '¿Tu baño sigue' -annotate +60+365 'en el pasado?' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '01 · ESTADO ORIGINAL: ANTES DE OBRA' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Filtraciones, sanitarios de época y distribución poco funcional.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 TOCA O DESLIZA PARA ENTRAR A LA OBRA' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r1-final-1.miff"

# Textos para Frame 2 (PROCESO)
convert "$TMP/r1-logo-2.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'SUPERVISIÓN TÉCNICA DIRECTA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Demolición total e' -annotate +60+365 'instalaciones verificadas.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '02 · EN OBRA: FONTANERÍA Y NIVELACIÓN' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Reemplazo de tuberías, aislamiento térmico e impermeabilización.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 TOCA O DESLIZA PARA VER EL RESULTADO' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r1-final-2.miff"

# Textos para Frame 3 (ACABADO)
convert "$TMP/r1-logo-3.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'ACABADOS DE ÉLITE · CARACAS & VALENCIA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Tu baño convertido en' -annotate +60+365 'una suite de descanso.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '03 · RESULTADO: SUITE TIPO SPA DE LUJO' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Sanitarios suspendidos, espejos LED e iluminación en capas.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 COTIZA TU PROYECTO POR PARTIDAS' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r1-final-3.miff"

# Textos para Frame 4 (CTA FINAL)
convert "$TMP/r1-logo-4.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'OBRA VERIFICADA · LA LAGUNITA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Calidad arquitectónica' -annotate +60+365 'con garantía por escrito.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '04 · GARANTÍA ESCRITA AL 100%' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Un solo equipo coordina tu obra de principio a fin sin costos ocultos.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 SOLICITAR VISITA TÉCNICA EN TU HOGAR' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r1-final-4.miff"

echo "Ensamblando GIF animado del Reel 1 (Baños Suite)..."
convert -delay 220 "$TMP/r1-final-1.miff" -delay 220 "$TMP/r1-final-2.miff" -delay 250 "$TMP/r1-final-3.miff" -delay 300 "$TMP/r1-final-4.miff" \
  -loop 0 "$OUT/13-reel-animado-bano-1080x1920.gif"

echo "Ensamblando WebP animado del Reel 1 (Baños Suite)..."
convert -delay 220 "$TMP/r1-final-1.miff" -delay 220 "$TMP/r1-final-2.miff" -delay 250 "$TMP/r1-final-3.miff" -delay 300 "$TMP/r1-final-4.miff" \
  -loop 0 "$OUT/13-reel-animado-bano-1080x1920.webp"
identify "$OUT/13-reel-animado-bano-1080x1920.gif"

echo "Generando frames del Reel 2 (Cocinas de Autor)..."
# --- REEL 2 · COCINA (4 FRAMES 1080x1920) ---
rounded_cover "$ROOT/public/images/cocina-encimera-cuarzo.webp" 960 750 24 "$TMP/r2-f1-img.png" center
rounded_cover "$ROOT/public/images/cocina-almacenamiento-inteligente.webp" 960 750 24 "$TMP/r2-f2-img.png" center
rounded_cover "$ROOT/public/images/cocina-terminada-final.webp" 960 750 24 "$TMP/r2-f3-img.png" center
rounded_cover "$ROOT/public/images/cocina-isla-central.webp" 960 750 24 "$TMP/r2-f4-img.png" center

for idx in 1 2 3 4; do
  convert -size 1080x1920 "xc:$CIN_BG" "$TMP/r2-base-$idx.miff"
  composite -geometry +60+480 "$TMP/r2-f$idx-img.png" "$TMP/r2-base-$idx.miff" "$TMP/r2-comp-$idx.miff"
  composite -geometry +60+100 "$TMP/logo-300.png" "$TMP/r2-comp-$idx.miff" "$TMP/r2-logo-$idx.miff"
done

# Textos Reel 2 - Frame 1
convert "$TMP/r2-logo-1.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'PRESUPUESTOS CLAROS 2026' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 '¿Cuánto cuesta tu nueva' -annotate +60+365 'cocina en 2026?' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '01 · COCINAS DE AUTOR · ERGONOMÍA' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'La incertidumbre en precios retrasa el 80% de las obras en Venezuela.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 CALCULAR PRECIO EN 1 CLIC' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r2-final-1.miff"

# Textos Reel 2 - Frame 2
convert "$TMP/r2-logo-2.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'MOBILIARIO A MEDIDA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Herrajes de alta gama y' -annotate +60+365 'aprovechamiento total.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '02 · HERRAJES BLUM & SOFT-CLOSE' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Cada centímetro optimizado para cocinar en familia con confort absoluto.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 VER CATÁLOGO DE ACABADOS' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r2-final-2.miff"

# Textos Reel 2 - Frame 3
convert "$TMP/r2-logo-3.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'ENCIMERAS CUARZO & NEOLITH' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Una cocina pensada para' -annotate +60+365 'ser el centro del hogar.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '03 · SUPERVISIÓN ARQUITECTÓNICA EN SITIO' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Materiales eternos, iluminación LED en capas y acabados de precisión.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 COTIZA TU COCINA POR PARTIDAS' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r2-final-3.miff"

# Textos Reel 2 - Frame 4
convert "$TMP/r2-logo-4.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +60+220 'GARANTÍA ESCRITA AL 100%' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 62 -annotate +60+290 'Sin sorpresas ni' -annotate +60+365 'costos ocultos.' \
  -fill 'rgba(23,25,34,0.92)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,520 620,585 14,14' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +125+543 '04 · PRESUPUESTO TRANSPARENTE' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 18 -annotate +60+1300 'Atendemos residencias en Caracas, Valencia, San Diego y Carabobo.' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1540 1020,1700 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 18 -kerning 1.2 -annotate +110+1595 '👉 SOLICITAR PROPUESTA EN TU PROPIEDAD' \
  -pointsize 32 -kerning 0 -annotate +110+1645 'WhatsApp 0422 799 7043' \
  "$TMP/r2-final-4.miff"

echo "Ensamblando GIF animado del Reel 2 (Cocinas de Autor)..."
convert -delay 220 "$TMP/r2-final-1.miff" -delay 220 "$TMP/r2-final-2.miff" -delay 250 "$TMP/r2-final-3.miff" -delay 300 "$TMP/r2-final-4.miff" \
  -loop 0 "$OUT/14-reel-animado-cocina-1080x1920.gif"

echo "Ensamblando WebP animado del Reel 2 (Cocinas de Autor)..."
convert -delay 220 "$TMP/r2-final-1.miff" -delay 220 "$TMP/r2-final-2.miff" -delay 250 "$TMP/r2-final-3.miff" -delay 300 "$TMP/r2-final-4.miff" \
  -loop 0 "$OUT/14-reel-animado-cocina-1080x1920.webp"
identify "$OUT/14-reel-animado-cocina-1080x1920.gif"
echo "¡Reels animados generados exitosamente en $OUT!"
