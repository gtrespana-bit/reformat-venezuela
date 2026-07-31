#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
OUT="$HERE/export"
TMP="$HERE/.render-tmp"
rm -rf "$TMP"
mkdir -p "$OUT" "$TMP"
trap 'rm -rf "$TMP"' EXIT

INK="#06101d"
INK2="#101c2a"
INK3="#192737"
CREAM="#f5f0e6"
PAPER="#fffdf8"
GOLD="#d4b565"
GOLD2="#efd99a"
WHITE="#ffffff"
MUTED="#c7cdd3"
GREEN="#118148"
HEAD="$ROOT/public/fonts/cormorant-garamond-v21-latin-600.v2.woff2"
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

circle_cover() {
  local input="$1" diameter="$2" output="$3" gravity="${4:-center}"
  local key
  key="$(basename "$output" | tr -cd '[:alnum:]')"
  cover "$input" "$diameter" "$diameter" "$TMP/${key}-photo.miff" "$gravity"
  convert -size "${diameter}x${diameter}" xc:none -fill white \
    -draw "circle $((diameter/2)),$((diameter/2)) $((diameter-2)),$((diameter/2))" "$TMP/${key}-mask.png"
  convert "$TMP/${key}-photo.miff" "$TMP/${key}-mask.png" -alpha off -compose CopyOpacity -composite "$output"
}

logo() {
  local width="$1" output="$2"
  convert "$LOGO" -resize "${width}x" "$output"
}

finish() {
  local input="$1" output="$2"
  convert "$input" -colorspace sRGB -strip -interlace Plane -sampling-factor 4:2:0 -quality 94 "$OUT/$output"
  identify "$OUT/$output"
}

logo 270 "$TMP/logo-270.png"
logo 300 "$TMP/logo-300.png"
logo 340 "$TMP/logo-340.png"
logo 380 "$TMP/logo-380.png"

# ---------------------------------------------------------------------------
# 01 · Master flyer — collage editorial + menú completo de servicios
# ---------------------------------------------------------------------------
convert -size 1080x1350 gradient:"$INK2-$INK" "$TMP/01-base.miff"
rounded_cover "$ROOT/public/images/hero-lcp.webp" 618 620 30 "$TMP/01-main.png" center
circle_cover "$ROOT/public/images/bano-terminado-final.webp" 290 "$TMP/01-circle.png" center
convert "$TMP/01-base.miff" \
  -fill 'rgba(212,181,101,0.06)' -draw 'circle 936,160 1170,160 circle 98,708 324,708' \
  -stroke 'rgba(212,181,101,0.24)' -strokewidth 1 -fill none -draw 'circle 936,160 1140,160 circle 98,708 300,708' \
  -fill 'rgba(0,0,0,0.34)' -draw 'roundrectangle 405,177 1037,811 32,32 circle 217,703 375,703' \
  -fill none -stroke "$GOLD" -strokewidth 2 -draw 'roundrectangle 382,154 1020,792 30,30 circle 207,687 362,687' \
  "$TMP/01-frames.miff"
composite -geometry +395+165 "$TMP/01-main.png" "$TMP/01-frames.miff" "$TMP/01-a.miff"
composite -geometry +62+542 "$TMP/01-circle.png" "$TMP/01-a.miff" "$TMP/01-b.miff"
composite -geometry +56+46 "$TMP/logo-270.png" "$TMP/01-b.miff" "$TMP/01-logo.miff"
convert "$TMP/01-logo.miff" \
  -fill 'rgba(255,255,255,0.04)' -stroke 'rgba(212,181,101,0.58)' -strokewidth 1 -draw 'roundrectangle 796,55 1024,99 22,22' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +828+65 'LUJO RESIDENCIAL' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 3 -annotate +58+188 'PROYECTOS A MEDIDA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 55 -kerning 0 -annotate +54+246 'Remodelamos' \
  -annotate +54+311 'espacios.' \
  -fill "$GOLD2" -annotate +54+382 'Elevamos tu' \
  -annotate +54+447 'forma de vivir.' \
  -fill "$CREAM" -stroke none -draw 'roundrectangle 44,833 1036,1198 24,24' \
  -fill "$INK" -font "$HEAD_BOLD" -pointsize 38 -annotate +73+865 'Todo lo que tu hogar necesita' \
  -fill '#5a626b' -font "$BODY_MED" -pointsize 15 -annotate +75+915 'SERVICIOS INTEGRALES, COORDINADOS DE PRINCIPIO A FIN' \
  -fill "$GOLD" -draw 'rectangle 75,960 104,963 rectangle 390,960 419,963 rectangle 724,960 753,963 rectangle 75,1052 104,1055 rectangle 390,1052 419,1055 rectangle 724,1052 753,1055' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 13 -annotate +75+972 '01' -annotate +390+972 '02' -annotate +724+972 '03' -annotate +75+1064 '04' -annotate +390+1064 '05' -annotate +724+1064 '06' \
  -font "$BODY_MED" -pointsize 17 -annotate +115+972 'Reformas integrales' -annotate +430+972 'Cocinas de diseño' -annotate +764+972 'Baños tipo spa' \
  -annotate +115+1064 'Pisos y revestimientos' -annotate +430+1064 'Electricidad e iluminación' -annotate +764+1064 'Fontanería y acabados' \
  -fill '#69717a' -font "$BODY" -pointsize 14 -annotate +75+1142 'También: pintura decorativa · piscinas · exteriores · mobiliario a medida' \
  -fill "$GOLD" -draw 'roundrectangle 44,1220 720,1310 12,12' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +75+1233 'DESCUBRE LO QUE PODEMOS CREAR PARA TI' \
  -pointsize 23 -kerning 0 -annotate +75+1265 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 650,1266 681,1266 polyline 668,1253 681,1266 668,1279' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +774+1234 '23+ AÑOS' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 13 -kerning 0.6 -annotate +774+1264 'GARANTÍA POR ESCRITO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 1.6 -annotate +774+1290 'REMODELAT.NET' \
  "$TMP/01-final.miff"
finish "$TMP/01-final.miff" "01-remodelacion-lujo-servicios-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 02 · Portfolio de servicios — bento grid tipo brochure de agencia
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$CREAM" -fill "$INK" -draw 'rectangle 0,0 1080,274 rectangle 0,1135 1080,1350' "$TMP/02-base.miff"
rounded_cover "$ROOT/public/images/cocina-isla-central.webp" 610 350 20 "$TMP/02-kitchen.png" center
rounded_cover "$ROOT/public/images/bano-terminado-final.webp" 330 350 20 "$TMP/02-bath.png" center
rounded_cover "$ROOT/public/images/integrales-proyecto-completo.webp" 330 330 20 "$TMP/02-home.png" center
rounded_cover "$ROOT/public/images/revestimientos-800.webp" 610 330 20 "$TMP/02-living.png" center
composite -geometry +50+316 "$TMP/02-kitchen.png" "$TMP/02-base.miff" "$TMP/02-a.miff"
composite -geometry +700+316 "$TMP/02-bath.png" "$TMP/02-a.miff" "$TMP/02-b.miff"
composite -geometry +50+700 "$TMP/02-home.png" "$TMP/02-b.miff" "$TMP/02-c.miff"
composite -geometry +420+700 "$TMP/02-living.png" "$TMP/02-c.miff" "$TMP/02-d.miff"
composite -geometry +54+48 "$TMP/logo-270.png" "$TMP/02-d.miff" "$TMP/02-logo.miff"
convert "$TMP/02-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2.5 -gravity northwest -annotate +414+62 'SERVICIOS DE REMODELACIÓN DE LUJO' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 48 -annotate +410+104 'Un hogar. Todas las soluciones.' \
  -fill "$GOLD2" -annotate +410+156 'Un solo equipo.' \
  -fill 'rgba(7,17,31,0.92)' -draw 'rectangle 50,573 660,666 rectangle 700,573 1030,666 rectangle 50,937 380,1030 rectangle 420,937 1030,1030' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 1.8 -annotate +76+587 '01 · COCINAS DE DISEÑO' -annotate +726+587 '02 · BAÑOS TIPO SPA' -annotate +76+951 '03 · REFORMAS INTEGRALES' -annotate +446+951 '04 · PISOS Y REVESTIMIENTOS' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 15 -annotate +76+620 'Distribución, mobiliario e iluminación' -annotate +726+620 'Confort, técnica y detalle' -annotate +76+984 'Coordinación completa de obra' -annotate +446+984 'Materiales que elevan cada espacio' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1.3 -annotate +51+1068 'MÁS SERVICIOS' \
  -fill '#59626c' -font "$BODY_MED" -pointsize 15 -annotate +185+1068 'Electricidad · Fontanería · Pintura · Piscinas · Exteriores' \
  -fill "$GOLD" -draw 'roundrectangle 50,1191 657,1286 10,10' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +80+1205 'SOLICITA UNA VALORACIÓN TÉCNICA' \
  -pointsize 24 -kerning 0 -annotate +80+1238 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 594,1239 624,1239 polyline 611,1226 624,1239 611,1252' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -annotate +720+1206 'CARACAS · VALENCIA' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 13 -annotate +720+1238 'SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 1.8 -annotate +720+1270 'REMODELAT.NET' \
  "$TMP/02-final.miff"
finish "$TMP/02-final.miff" "02-catalogo-servicios-lujo-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 03 · Proyecto real — prueba visual + servicios ejecutados
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp" 1080 800 "$TMP/03-after.miff" center
rounded_cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-antes-1.webp" 300 470 18 "$TMP/03-before.png" center
convert -size 1080x1350 "xc:$INK" "$TMP/03-base.miff"
composite -geometry +0+0 "$TMP/03-after.miff" "$TMP/03-base.miff" "$TMP/03-a.miff"
convert "$TMP/03-a.miff" \
  -fill 'rgba(7,17,31,0.42)' -draw 'rectangle 0,0 1080,170' \
  -fill 'rgba(7,17,31,0.85)' -draw 'polygon 0,655 1080,720 1080,800 0,800' \
  -fill 'rgba(0,0,0,0.34)' -draw 'roundrectangle 57,111 381,605 22,22' \
  -fill "$CREAM" -draw 'roundrectangle 45,99 365,589 22,22' \
  "$TMP/03-bg.miff"
composite -geometry +55+109 "$TMP/03-before.png" "$TMP/03-bg.miff" "$TMP/03-b.miff"
composite -geometry +725+45 "$TMP/logo-300.png" "$TMP/03-b.miff" "$TMP/03-logo.miff"
convert "$TMP/03-logo.miff" \
  -fill "$INK" -draw 'roundrectangle 79,132 218,174 21,21' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +112+143 'ANTES' \
  -fill "$GOLD" -draw 'roundrectangle 833,180 1006,224 22,22' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 13 -kerning 1.6 -annotate +863+191 'DESPUÉS' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2.5 -annotate +54+741 'PROYECTO REAL · CARACAS' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 64 -annotate +50+815 'De antiguo a extraordinario.' \
  -fill "$MUTED" -font "$BODY" -pointsize 19 -annotate +56+897 'Una reforma integral que transformó distribución, luz,' \
  -annotate +56+927 'funcionalidad y percepción del espacio.' \
  -fill 'rgba(255,255,255,0.04)' -stroke 'rgba(212,181,101,0.46)' -strokewidth 1 -draw 'roundrectangle 53,981 1027,1123 16,16' \
  -stroke none -fill "$GOLD" -font "$BODY_BOLD" -pointsize 12 -kerning 1.6 -annotate +82+1001 'SERVICIOS EJECUTADOS EN ESTE PROYECTO' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 15 -annotate +82+1043 'Diseño y distribución' -annotate +300+1043 'Demolición' -annotate +438+1043 'Fontanería' -annotate +577+1043 'Revestimientos' -annotate +772+1043 'Sanitarios y mobiliario' \
  -fill "$GOLD" -draw 'circle 69,1065 74,1065 circle 287,1065 292,1065 circle 425,1065 430,1065 circle 564,1065 569,1065 circle 759,1065 764,1065' \
  -fill "$CREAM" -draw 'roundrectangle 54,1170 700,1267 10,10' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1.1 -annotate +85+1184 '¿IMAGINAS ESTA TRANSFORMACIÓN EN TU HOGAR?' \
  -pointsize 24 -kerning 0 -annotate +85+1218 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 637,1219 667,1219 polyline 654,1206 667,1219 654,1232' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -annotate +754+1186 '23+ AÑOS' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 13 -annotate +754+1217 'SUPERVISIÓN TÉCNICA' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -annotate +754+1249 'GARANTÍA POR ESCRITO' \
  -fill '#78828c' -font "$BODY_MED" -pointsize 12 -kerning 1 -annotate +55+1310 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO  ·  REMODELAT.NET' \
  "$TMP/03-final.miff"
finish "$TMP/03-final.miff" "03-transformacion-real-servicios-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 04 · Anuncio cuadrado — doble aspiración + oferta completa
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/cocina-isla-central.webp" 1080 570 "$TMP/04-kitchen.miff" center
cover "$ROOT/public/images/bano-terminado-final.webp" 540 570 "$TMP/04-bath.miff" center
convert -size 1080x1080 "xc:$INK" "$TMP/04-base.miff"
composite -geometry +0+0 "$TMP/04-kitchen.miff" "$TMP/04-base.miff" "$TMP/04-a.miff"
composite -geometry +540+0 "$TMP/04-bath.miff" "$TMP/04-a.miff" "$TMP/04-b.miff"
convert "$TMP/04-b.miff" \
  -fill 'rgba(7,17,31,0.48)' -draw 'rectangle 0,0 1080,145' \
  -fill 'rgba(7,17,31,0.91)' -draw 'polygon 0,475 1080,415 1080,1080 0,1080' \
  -stroke "$GOLD" -strokewidth 2 -fill none -draw 'line 540,0 540,496' \
  -stroke 'rgba(212,181,101,0.50)' -strokewidth 1 -draw 'rectangle 29,29 1051,1051' \
  "$TMP/04-bg.miff"
composite -geometry +49+42 "$TMP/logo-270.png" "$TMP/04-bg.miff" "$TMP/04-logo.miff"
convert "$TMP/04-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +794+61 'REMODELACIÓN 360°' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 54 -annotate +51+507 'Tu reforma, completa.' \
  -fill "$GOLD2" -annotate +51+568 'Sin improvisaciones.' \
  -fill "$MUTED" -font "$BODY" -pointsize 17 -annotate +55+649 'Un equipo para diseñar, coordinar y ejecutar cada especialidad.' \
  -fill 'rgba(255,255,255,0.04)' -stroke 'rgba(212,181,101,0.38)' -strokewidth 1 -draw 'roundrectangle 50,706 1030,876 14,14' \
  -stroke none -fill "$GOLD" -font "$BODY_BOLD" -pointsize 12 -annotate +79+727 '01' -annotate +390+727 '02' -annotate +705+727 '03' -annotate +79+800 '04' -annotate +390+800 '05' -annotate +705+800 '06' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 15 -annotate +113+727 'Reformas integrales' -annotate +424+727 'Cocinas de diseño' -annotate +739+727 'Baños tipo spa' \
  -annotate +113+800 'Pisos y revestimientos' -annotate +424+800 'Electricidad e iluminación' -annotate +739+800 'Fontanería y acabados' \
  -fill "$GOLD" -draw 'roundrectangle 50,920 713,1010 45,45' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +85+934 'DESCUBRE EL POTENCIAL DE TU HOGAR' \
  -pointsize 23 -kerning 0 -annotate +85+965 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 644,966 677,966 polyline 663,952 677,966 663,980' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 13 -kerning 1.2 -annotate +762+938 '23+ AÑOS' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 12 -annotate +762+969 'REMODELAT.NET' \
  "$TMP/04-final.miff"
finish "$TMP/04-final.miff" "04-anuncio-reforma-completa-1080x1080.jpg"

# ---------------------------------------------------------------------------
# 05 · Story/Reel — mini portfolio de servicios con profundidad visual
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/integrales-proyecto-completo.webp" 1080 780 "$TMP/05-hero.miff" center
rounded_cover "$ROOT/public/images/cocina-isla-central.webp" 420 280 22 "$TMP/05-kitchen.png" center
rounded_cover "$ROOT/public/images/bano-terminado-final.webp" 420 280 22 "$TMP/05-bath.png" center
convert -size 1080x1920 gradient:"$INK2-$INK" "$TMP/05-base.miff"
composite -geometry +0+0 "$TMP/05-hero.miff" "$TMP/05-base.miff" "$TMP/05-a.miff"
convert "$TMP/05-a.miff" \
  -fill 'rgba(7,17,31,0.55)' -draw 'rectangle 0,0 1080,230' \
  -fill 'rgba(7,17,31,0.72)' -draw 'rectangle 0,260 1080,620' \
  -fill 'rgba(7,17,31,0.88)' -draw 'polygon 0,620 1080,730 1080,1040 0,1040' \
  -fill 'rgba(0,0,0,0.34)' -draw 'roundrectangle 76,715 520,1019 24,24 roundrectangle 560,715 1004,1019 24,24' \
  -stroke 'rgba(212,181,101,0.60)' -strokewidth 1 -fill none -draw 'rectangle 37,37 1043,1883 roundrectangle 65,704 505,1004 22,22 roundrectangle 545,704 985,1004 22,22' \
  "$TMP/05-bg.miff"
composite -geometry +74+713 "$TMP/05-kitchen.png" "$TMP/05-bg.miff" "$TMP/05-b.miff"
composite -geometry +554+713 "$TMP/05-bath.png" "$TMP/05-b.miff" "$TMP/05-c.miff"
composite -geometry +62+90 "$TMP/logo-340.png" "$TMP/05-c.miff" "$TMP/05-logo.miff"
convert "$TMP/05-logo.miff" \
  -fill 'rgba(7,17,31,0.68)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 779,110 1015,158 24,24' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 13 -kerning 1.8 -gravity northwest -annotate +818+122 'LUJO RESIDENCIAL' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 16 -kerning 3 -annotate +62+335 'IMAGINA · DISEÑA · TRANSFORMA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 71 -annotate +57+405 'Un hogar que se sienta' \
  -fill "$GOLD2" -annotate +57+486 'completamente tuyo.' \
  -fill "$MUTED" -font "$BODY" -pointsize 21 -annotate +63+589 'Creamos espacios de alto estándar, pensados para vivirlos.' \
  -fill 'rgba(7,17,31,0.86)' -draw 'roundrectangle 74,924 494,993 0,0 roundrectangle 554,924 974,993 0,0' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 1.5 -annotate +101+941 'COCINAS DE DISEÑO' -annotate +581+941 'BAÑOS TIPO SPA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 45 -annotate +61+1085 'Servicios para transformar' \
  -fill "$GOLD2" -annotate +61+1137 'cada rincón de tu hogar' \
  -fill 'rgba(255,255,255,0.04)' -stroke 'rgba(212,181,101,0.36)' -strokewidth 1 -draw 'roundrectangle 62,1207 1018,1485 16,16' \
  -stroke none -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -annotate +95+1235 '01' -annotate +551+1235 '02' -annotate +95+1315 '03' -annotate +551+1315 '04' -annotate +95+1395 '05' -annotate +551+1395 '06' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 17 -annotate +138+1235 'Reformas integrales' -annotate +594+1235 'Cocinas a medida' -annotate +138+1315 'Baños premium' -annotate +594+1315 'Pisos y revestimientos' -annotate +138+1395 'Electricidad y fontanería' -annotate +594+1395 'Pintura, piscinas y exterior' \
  -fill "$GREEN" -draw 'roundrectangle 62,1558 851,1670 56,56' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 16 -kerning 1.2 -annotate +105+1578 'SOLICITA TU VALORACIÓN TÉCNICA' \
  -pointsize 27 -kerning 0 -annotate +105+1616 'WhatsApp 0422 799 7043' \
  -stroke "$WHITE" -strokewidth 4 -fill none -draw 'line 777,1617 813,1617 polyline 797,1601 813,1617 797,1633' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1 -annotate +64+1751 '23+ AÑOS · SUPERVISIÓN DIRECTA · GARANTÍA POR ESCRITO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.7 -annotate +64+1801 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$MUTED" -font "$BODY_MED" -pointsize 14 -kerning 1.5 -annotate +64+1845 'REMODELAT.NET' \
  "$TMP/05-final.miff"
finish "$TMP/05-final.miff" "05-story-portfolio-servicios-1080x1920.jpg"

# ---------------------------------------------------------------------------
# 06 · Horizontal — campaña multiposición con mosaico de especialidades
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/cocina-isla-central.webp" 610 628 "$TMP/06-kitchen.miff" center
rounded_cover "$ROOT/public/images/bano-terminado-final.webp" 220 205 16 "$TMP/06-bath.png" center
rounded_cover "$ROOT/public/images/integrales-proyecto-completo.webp" 220 205 16 "$TMP/06-home.png" center
convert -size 1200x628 "xc:$INK" "$TMP/06-base.miff"
composite -geometry +0+0 "$TMP/06-kitchen.miff" "$TMP/06-base.miff" "$TMP/06-a.miff"
convert "$TMP/06-a.miff" \
  -fill 'rgba(7,17,31,0.23)' -draw 'rectangle 0,0 610,628' \
  -fill "$INK" -draw 'polygon 560,0 1200,0 1200,628 510,628' \
  -fill 'rgba(0,0,0,0.32)' -draw 'roundrectangle 367,47 605,270 18,18 roundrectangle 367,310 605,533 18,18' \
  -stroke "$GOLD" -strokewidth 2 -fill none -draw 'line 593,0 543,628 roundrectangle 356,36 590,257 16,16 roundrectangle 356,299 590,520 16,16' \
  "$TMP/06-bg.miff"
composite -geometry +363+42 "$TMP/06-bath.png" "$TMP/06-bg.miff" "$TMP/06-b.miff"
composite -geometry +363+305 "$TMP/06-home.png" "$TMP/06-b.miff" "$TMP/06-c.miff"
composite -geometry +660+30 "$TMP/logo-270.png" "$TMP/06-c.miff" "$TMP/06-logo.miff"
convert "$TMP/06-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +662+132 'REMODELACIÓN RESIDENCIAL DE LUJO' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 41 -annotate +658+177 'Descubre el potencial' \
  -fill "$GOLD2" -annotate +658+224 'de tu hogar.' \
  -fill "$MUTED" -font "$BODY" -pointsize 15 -annotate +662+293 'Diseño y ejecución integral para cocinas,' \
  -annotate +662+316 'baños y viviendas completas.' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 11 -annotate +662+358 '01' -annotate +858+358 '02' -annotate +1028+358 '03' -annotate +662+401 '04' -annotate +858+401 '05' -annotate +1028+401 '06' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 13 -annotate +688+358 'Integrales' -annotate +884+358 'Cocinas' -annotate +1054+358 'Baños' -annotate +688+401 'Revestimientos' -annotate +884+401 'Electricidad' -annotate +1054+401 'Fontanería' \
  -fill "$GOLD" -draw 'roundrectangle 661,463 1128,537 37,37' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 12 -kerning 0.8 -annotate +689+473 'SOLICITA UNA VALORACIÓN' \
  -pointsize 20 -kerning 0 -annotate +689+498 '0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 1072,501 1097,501 polyline 1085,489 1097,501 1085,513' \
  -stroke none -fill "$MUTED" -font "$BODY_MED" -pointsize 12 -kerning 0.6 -annotate +662+572 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 12 -kerning 1.5 -annotate +1030+572 'REMODELAT.NET' \
  "$TMP/06-final.miff"
finish "$TMP/06-final.miff" "06-horizontal-servicios-lujo-1200x628.jpg"

# Vista general de la colección
montage "$OUT"/*.jpg \
  -thumbnail '360x450>' \
  -tile 3x2 \
  -geometry +16+16 \
  -background '#e8e1d4' \
  -font "$BODY_BOLD" \
  -pointsize 14 \
  -label '%f' \
  "$HERE/preview-contact-sheet.jpg"
identify "$HERE/preview-contact-sheet.jpg"
