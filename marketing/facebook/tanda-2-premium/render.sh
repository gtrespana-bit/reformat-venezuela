#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
OUT="$HERE/export"
TMP="$HERE/.render-tmp"
rm -rf "$TMP"
mkdir -p "$OUT" "$TMP"
trap 'rm -rf "$TMP"' EXIT

INK="#07111f"
INK2="#101b29"
CREAM="#f3eee4"
PAPER="#fbf8f2"
GOLD="#d4b768"
GOLD2="#ead38f"
WHITE="#ffffff"
MUTED="#c9ced3"
GREEN="#147b46"
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

logo() {
  local width="$1" output="$2"
  convert "$LOGO" -resize "${width}x" "$output"
}

finish() {
  local input="$1" output="$2"
  convert "$input" -colorspace sRGB -strip -interlace Plane -sampling-factor 4:2:0 -quality 93 "$OUT/$output"
  identify "$OUT/$output"
}

logo 300 "$TMP/logo-300.png"
logo 330 "$TMP/logo-330.png"
logo 360 "$TMP/logo-360.png"

# 01 · Editorial de marca — aspiracional y minimalista
cover "$ROOT/public/images/integrales-proyecto-completo.webp" 1080 840 "$TMP/01-photo.miff" center
convert -size 1080x1350 "xc:$CREAM" "$TMP/01-base.miff"
composite -geometry +0+0 "$TMP/01-photo.miff" "$TMP/01-base.miff" "$TMP/01-a.miff"
convert "$TMP/01-a.miff" \
  -fill 'rgba(7,17,31,0.32)' -draw 'rectangle 0,0 1080,200' \
  -fill 'rgba(7,17,31,0.42)' -draw 'rectangle 0,690 1080,840' \
  -stroke 'rgba(212,183,104,0.80)' -strokewidth 1 -fill none -draw 'rectangle 34,34 1046,1316' \
  "$TMP/01-bg.miff"
composite -geometry +62+55 "$TMP/logo-300.png" "$TMP/01-bg.miff" "$TMP/01-logo.miff"
convert "$TMP/01-logo.miff" \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 2.8 -gravity northwest -annotate +696+71 'REMODELACIONES RESIDENCIALES' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -annotate +61+777 'DISEÑO · TÉCNICA · EJECUCIÓN' \
  -fill "$INK" -font "$HEAD_BOLD" -pointsize 73 -kerning 0 -annotate +58+866 'El lujo no se improvisa.' \
  -fill '#2b3540' -font "$HEAD" -pointsize 41 -annotate +61+955 'Se planifica. Se ejecuta.' \
  -annotate +61+1002 'Se cuida hasta el último detalle.' \
  -fill "$INK" -draw 'rectangle 61,1074 1019,1192' \
  -fill "$GOLD2" -font "$BODY_BOLD" -pointsize 15 -kerning 1.8 -annotate +92+1094 'CONVERSEMOS SOBRE TU PROYECTO' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 28 -kerning 0 -annotate +92+1130 'WhatsApp 0422 799 7043' \
  -stroke "$GOLD" -strokewidth 3 -fill none -draw 'line 922,1134 976,1134 polyline 960,1118 976,1134 960,1150' \
  -stroke none -fill '#4b5560' -font "$BODY_MED" -pointsize 16 -kerning 1 -annotate +61+1247 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 16 -kerning 2 -annotate +840+1247 'REMODELAT.NET' \
  "$TMP/01-final.miff"
finish "$TMP/01-final.miff" "01-el-lujo-no-se-improvisa-1080x1350.jpg"

# 02 · Hook de alto impacto — aversión al retrabajo
cover "$ROOT/public/images/integrales-800.webp" 1080 1350 "$TMP/02-photo.miff" center
convert "$TMP/02-photo.miff" -modulate 84,86,100 \
  -fill 'rgba(7,17,31,0.22)' -draw 'rectangle 0,0 1080,580' \
  -fill 'rgba(7,17,31,0.93)' -draw 'polygon 0,515 1080,675 1080,1350 0,1350' \
  -stroke 'rgba(212,183,104,0.75)' -strokewidth 1 -fill none -draw 'rectangle 35,35 1045,1315' \
  "$TMP/02-bg.miff"
composite -geometry +60+56 "$TMP/logo-300.png" "$TMP/02-bg.miff" "$TMP/02-logo.miff"
convert "$TMP/02-logo.miff" \
  -fill 'rgba(7,17,31,0.66)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 809,63 1017,107 22,22' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 2 -gravity northwest -annotate +849+73 '23+ AÑOS' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 16 -kerning 3 -annotate +61+644 'HAZLO BIEN DESDE EL PRINCIPIO' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 93 -kerning 0 -annotate +57+723 'No remodeles' \
  -fill "$GOLD2" -annotate +57+824 'dos veces.' \
  -fill "$MUTED" -font "$BODY" -pointsize 23 -annotate +63+943 'Alcance claro, materiales correctos y supervisión' \
  -annotate +63+978 'técnica para proteger tu inversión desde el inicio.' \
  -fill "$CREAM" -draw 'roundrectangle 61,1068 733,1164 8,8' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 15 -kerning 1.5 -annotate +91+1083 'AGENDA UNA VALORACIÓN TÉCNICA' \
  -pointsize 26 -kerning 0 -annotate +91+1117 '0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 669,1117 700,1117 polyline 687,1104 700,1117 687,1130' \
  -stroke none -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.6 -annotate +62+1244 'REMODELAT.NET' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 15 -kerning 0.7 -annotate +674+1244 'CARACAS · VALENCIA · CARABOBO' \
  "$TMP/02-final.miff"
finish "$TMP/02-final.miff" "02-no-remodeles-dos-veces-1080x1350.jpg"

# 03 · Cocina — pieza aspiracional para publicación o anuncio
cover "$ROOT/public/images/cocina-terminada-final.webp" 1080 1350 "$TMP/03-photo.miff" center
convert "$TMP/03-photo.miff" \
  -fill 'rgba(7,17,31,0.90)' -draw 'polygon 0,0 620,0 790,1350 0,1350' \
  -fill 'rgba(7,17,31,0.22)' -draw 'rectangle 0,0 1080,190' \
  -stroke 'rgba(212,183,104,0.62)' -strokewidth 1 -fill none -draw 'rectangle 34,34 1046,1316' \
  "$TMP/03-bg.miff"
composite -geometry +61+54 "$TMP/logo-300.png" "$TMP/03-bg.miff" "$TMP/03-logo.miff"
convert "$TMP/03-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 16 -kerning 3 -gravity northwest -annotate +62+288 'COCINAS A MEDIDA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 73 -kerning 0 -annotate +58+357 'La cocina que' \
  -annotate +58+438 'cambia cómo vives' \
  -fill "$GOLD2" -annotate +58+519 'tu hogar.' \
  -fill "$MUTED" -font "$BODY" -pointsize 22 -annotate +63+635 'Pensada para tu espacio.' \
  -annotate +63+672 'Ejecutada para durar.' \
  -fill "$GOLD" -draw 'rectangle 63,753 95,755 rectangle 63,811 95,813 rectangle 63,869 95,871' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 19 -annotate +117+735 'Distribución inteligente' \
  -annotate +117+793 'Materiales bien especificados' \
  -annotate +117+851 'Acabados revisados al detalle' \
  -fill "$GOLD" -draw 'roundrectangle 61,1001 681,1099 8,8' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 15 -kerning 1.3 -annotate +91+1017 'HABLEMOS DE TU NUEVA COCINA' \
  -pointsize 26 -kerning 0 -annotate +91+1051 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 617,1051 647,1051 polyline 634,1038 647,1051 634,1064' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1 -annotate +62+1228 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -pointsize 15 -kerning 1.8 -annotate +62+1267 'REMODELAT.NET' \
  "$TMP/03-final.miff"
finish "$TMP/03-final.miff" "03-cocinas-a-medida-1080x1350.jpg"

# 04 · Baño — emocional, limpio y de lujo
cover "$ROOT/public/images/bano-terminado-final.webp" 1080 1350 "$TMP/04-photo.miff" center
convert "$TMP/04-photo.miff" -modulate 88,82,100 \
  -fill 'rgba(7,17,31,0.46)' -draw 'rectangle 0,0 1080,220' \
  -fill 'rgba(7,17,31,0.80)' -draw 'polygon 0,800 1080,675 1080,1350 0,1350' \
  -stroke 'rgba(212,183,104,0.68)' -strokewidth 1 -fill none -draw 'rectangle 35,35 1045,1315' \
  "$TMP/04-bg.miff"
composite -geometry +60+55 "$TMP/logo-300.png" "$TMP/04-bg.miff" "$TMP/04-logo.miff"
convert "$TMP/04-logo.miff" \
  -fill 'rgba(7,17,31,0.62)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 795,64 1016,108 22,22' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 1.8 -gravity northwest -annotate +832+74 'BAÑOS PREMIUM' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 16 -kerning 3 -annotate +62+836 'TU ESPACIO · TU RITUAL' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 81 -kerning 0 -annotate +57+905 'Todos los días' \
  -fill "$GOLD2" -annotate +57+993 'pueden empezar así.' \
  -fill "$MUTED" -font "$BODY" -pointsize 22 -annotate +63+1095 'Un baño diseñado para sentirse extraordinario,' \
  -annotate +63+1129 'con una ejecución técnica pensada para durar.' \
  -fill "$CREAM" -draw 'roundrectangle 61,1190 687,1278 8,8' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +91+1202 'VALOREMOS TU PROYECTO' \
  -pointsize 24 -kerning 0 -annotate +91+1233 'WhatsApp 0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 625,1233 652,1233 polyline 640,1221 652,1233 640,1245' \
  "$TMP/04-final.miff"
finish "$TMP/04-final.miff" "04-banos-premium-1080x1350.jpg"

# 05 · Cuadrado — diferenciación técnica / confianza
cover "$ROOT/public/images/integrales-instalaciones.webp" 510 1080 "$TMP/05-photo.miff" center
convert -size 1080x1080 "xc:$INK" "$TMP/05-base.miff"
composite -geometry +0+0 "$TMP/05-photo.miff" "$TMP/05-base.miff" "$TMP/05-a.miff"
convert "$TMP/05-a.miff" \
  -fill 'rgba(7,17,31,0.35)' -draw 'rectangle 0,0 510,1080' \
  -fill "$GOLD" -draw 'rectangle 509,0 512,1080' \
  -stroke 'rgba(212,183,104,0.55)' -strokewidth 1 -fill none -draw 'rectangle 31,31 1049,1049' \
  "$TMP/05-bg.miff"
composite -geometry +568+52 "$TMP/logo-300.png" "$TMP/05-bg.miff" "$TMP/05-logo.miff"
convert "$TMP/05-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 2.5 -gravity northwest -annotate +570+200 'MÉTODO REMODELAT' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 57 -kerning 0 -annotate +566+258 'Lo que no ves' \
  -annotate +566+322 'decide cuánto' \
  -fill "$GOLD2" -annotate +566+386 'dura.' \
  -fill "$MUTED" -font "$BODY" -pointsize 18 -annotate +570+481 'Una remodelación de alto estándar' \
  -annotate +570+510 'también se construye detrás del acabado.' \
  -fill "$GOLD" -draw 'circle 581,605 587,605 circle 581,665 587,665 circle 581,725 587,725' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 18 -annotate +610+587 'Instalaciones revisadas' \
  -annotate +610+647 'Materiales compatibles' \
  -annotate +610+707 'Garantía por escrito' \
  -fill "$GOLD" -draw 'roundrectangle 567,820 1015,918 8,8' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +595+834 'SOLICITA UNA VALORACIÓN' \
  -pointsize 23 -kerning 0 -annotate +595+868 '0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 962,870 987,870 polyline 975,858 987,870 975,882' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +569+981 'REMODELAT.NET' \
  "$TMP/05-final.miff"
finish "$TMP/05-final.miff" "05-lo-que-no-ves-1080x1080.jpg"

# 06 · Cuadrado — captación directa, premium y conversacional
cover "$ROOT/public/images/hero-lcp.webp" 1080 1080 "$TMP/06-photo.miff" center
convert "$TMP/06-photo.miff" -modulate 78,82,100 \
  -fill 'rgba(7,17,31,0.54)' -draw 'rectangle 0,0 1080,1080' \
  -fill 'rgba(7,17,31,0.84)' -draw 'rectangle 55,205 1025,936' \
  -stroke 'rgba(212,183,104,0.72)' -strokewidth 1 -fill none -draw 'rectangle 75,225 1005,916' \
  "$TMP/06-bg.miff"
composite -geometry +390+265 "$TMP/logo-300.png" "$TMP/06-bg.miff" "$TMP/06-logo.miff"
convert "$TMP/06-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 3 -gravity northwest -annotate +380+390 'TU PROYECTO EMPIEZA AQUÍ' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 61 -kerning 0 -gravity north -annotate +0+451 'Tu hogar merece un plan,' \
  -fill "$GOLD2" -annotate +0+518 'no improvisaciones.' \
  -gravity northwest -fill "$MUTED" -font "$BODY" -pointsize 19 -annotate +289+625 'Cuéntanos qué quieres transformar.' \
  -annotate +269+657 'Nosotros te ayudamos a definir el camino.' \
  -fill "$GREEN" -draw 'roundrectangle 257,744 823,836 46,46' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +303+758 'ESCRÍBENOS POR WHATSAPP' \
  -pointsize 24 -kerning 0 -annotate +303+790 '0422 799 7043' \
  -stroke "$WHITE" -strokewidth 3 -fill none -draw 'line 754,791 784,791 polyline 771,778 784,791 771,804' \
  -stroke none -fill "$WHITE" -font "$BODY_MED" -pointsize 14 -kerning 1 -annotate +178+979 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 1.8 -annotate +876+979 'REMODELAT.NET' \
  "$TMP/06-final.miff"
finish "$TMP/06-final.miff" "06-tu-hogar-merece-un-plan-1080x1080.jpg"

# 07 · Stories/Reels — pregunta que detiene el scroll
cover "$ROOT/public/images/integrales-proyecto-completo.webp" 1080 1920 "$TMP/07-photo.miff" center
convert "$TMP/07-photo.miff" -modulate 82,84,100 \
  -fill 'rgba(7,17,31,0.55)' -draw 'rectangle 0,0 1080,330' \
  -fill 'rgba(7,17,31,0.90)' -draw 'polygon 0,820 1080,1030 1080,1920 0,1920' \
  -stroke 'rgba(212,183,104,0.70)' -strokewidth 1 -fill none -draw 'rectangle 38,38 1042,1882' \
  "$TMP/07-bg.miff"
composite -geometry +65+100 "$TMP/logo-360.png" "$TMP/07-bg.miff" "$TMP/07-logo.miff"
convert "$TMP/07-logo.miff" \
  -fill 'rgba(7,17,31,0.68)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 770,118 1007,166 24,24' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 2 -gravity northwest -annotate +818+130 '23+ AÑOS' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 17 -kerning 3.2 -annotate +65+1040 'UNA PREGUNTA PARA TI' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 72 -kerning 0 -annotate +61+1113 '¿Qué cambiarías' \
  -annotate +61+1195 'de tu hogar si' \
  -fill "$GOLD2" -annotate +61+1277 'supieras que quedará bien?' \
  -fill "$MUTED" -font "$BODY" -pointsize 23 -annotate +67+1403 'Diseño, planificación y ejecución técnica' \
  -annotate +67+1438 'en un solo equipo.' \
  -fill "$GREEN" -draw 'roundrectangle 65,1535 831,1647 12,12' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 17 -kerning 1.4 -annotate +104+1555 'AGENDA TU VALORACIÓN' \
  -pointsize 28 -kerning 0 -annotate +104+1592 'WhatsApp 0422 799 7043' \
  -stroke "$WHITE" -strokewidth 4 -fill none -draw 'line 757,1594 793,1594 polyline 777,1578 793,1594 777,1610' \
  -stroke none -fill "$WHITE" -font "$BODY_MED" -pointsize 17 -kerning 1 -annotate +66+1751 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 17 -kerning 2 -annotate +66+1800 'REMODELAT.NET' \
  "$TMP/07-final.miff"
finish "$TMP/07-final.miff" "07-pregunta-stories-1080x1920.jpg"

# 08 · Horizontal — adaptación para ubicaciones anchas
cover "$ROOT/public/images/cocina-800.webp" 690 628 "$TMP/08-photo.miff" center
convert -size 1200x628 "xc:$CREAM" "$TMP/08-base.miff"
composite -geometry +0+0 "$TMP/08-photo.miff" "$TMP/08-base.miff" "$TMP/08-a.miff"
convert "$TMP/08-a.miff" \
  -fill 'rgba(7,17,31,0.18)' -draw 'rectangle 0,0 690,628' \
  -fill "$INK" -draw 'polygon 650,0 1200,0 1200,628 596,628' \
  -stroke "$GOLD" -strokewidth 2 -fill none -draw 'line 684,0 630,628' \
  "$TMP/08-bg.miff"
logo 280 "$TMP/logo-280.png"
composite -geometry +744+35 "$TMP/logo-280.png" "$TMP/08-bg.miff" "$TMP/08-logo.miff"
convert "$TMP/08-logo.miff" \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2.4 -gravity northwest -annotate +744+142 'DISEÑAMOS · EJECUTAMOS · ENTREGAMOS' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 40 -kerning 0 -annotate +741+195 'Tu proyecto merece' \
  -fill "$GOLD2" -annotate +741+241 'un resultado extraordinario.' \
  -fill "$MUTED" -font "$BODY" -pointsize 17 -annotate +745+319 'Cocinas, baños y remodelaciones integrales' \
  -annotate +745+345 'con supervisión técnica y garantía por escrito.' \
  -fill "$GOLD" -draw 'roundrectangle 744,412 1129,486 8,8' \
  -fill "$INK" -font "$BODY_BOLD" -pointsize 13 -kerning 1 -annotate +768+419 'AGENDA UNA VALORACIÓN' \
  -pointsize 21 -kerning 0 -annotate +768+446 '0422 799 7043' \
  -stroke "$INK" -strokewidth 3 -fill none -draw 'line 1082,449 1103,449 polyline 1092,439 1103,449 1092,459' \
  -stroke none -fill "$WHITE" -font "$BODY_MED" -pointsize 13 -kerning 0.5 -annotate +745+533 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 1.5 -annotate +745+566 'REMODELAT.NET' \
  "$TMP/08-final.miff"
finish "$TMP/08-final.miff" "08-anuncio-horizontal-premium-1200x628.jpg"

# Vista general de la tanda completa
montage "$OUT"/*.jpg \
  -thumbnail '360x450>' \
  -tile 4x2 \
  -geometry +14+14 \
  -background '#ede8dd' \
  -font "$BODY_BOLD" \
  -pointsize 14 \
  -label '%f' \
  "$HERE/preview-contact-sheet.jpg"
identify "$HERE/preview-contact-sheet.jpg"
