#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
OUT="$HERE/export"
TMP="$HERE/.render-tmp"
rm -rf "$TMP"
mkdir -p "$OUT" "$TMP"
trap 'rm -rf "$TMP"' EXIT

NAVY="#081220"
GOLD="#d8b968"
GOLD_LIGHT="#e7cc7c"
WHITE="#ffffff"
SOFT="#edf0f2"
GREEN="#148447"
SANS="DejaVu-Sans"
SANS_BOLD="DejaVu-Sans-Bold"
SERIF_BOLD="DejaVu-Serif-Bold"
LOGO="$ROOT/public/images/logo-header.webp"

cover() {
  local input="$1" width="$2" height="$3" output="$4" gravity="${5:-center}"
  convert "$input" -auto-orient -resize "${width}x${height}^" -gravity "$gravity" -extent "${width}x${height}" "$output"
}

rounded_cover() {
  local input="$1" width="$2" height="$3" radius="$4" output="$5" gravity="${6:-center}"
  cover "$input" "$width" "$height" "$TMP/rounded-photo.miff" "$gravity"
  convert -size "${width}x${height}" xc:none -fill white -draw "roundrectangle 0,0 $((width-1)),$((height-1)) ${radius},${radius}" "$TMP/rounded-mask.png"
  convert "$TMP/rounded-photo.miff" "$TMP/rounded-mask.png" -alpha off -compose CopyOpacity -composite "$output"
}

logo() {
  local width="$1" output="$2"
  convert "$LOGO" -resize "${width}x" "$output"
}

finish() {
  local input="$1" output="$2"
  convert "$input" -colorspace sRGB -strip -interlace Plane -sampling-factor 4:2:0 -quality 92 "$OUT/$output"
  identify "$OUT/$output"
}

# ---------------------------------------------------------------------------
# 1) Publicación vertical — posicionamiento de marca
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/hero-lcp.webp" 1080 1350 "$TMP/p1-base.miff" center
convert "$TMP/p1-base.miff" \
  -fill 'rgba(7,16,30,0.82)' -draw 'polygon 0,0 555,0 825,1350 0,1350' \
  -fill 'rgba(7,16,30,0.80)' -draw 'rectangle 0,930 1080,1350' \
  -fill 'rgba(7,16,30,0.35)' -draw 'rectangle 0,0 1080,180' \
  -stroke 'rgba(216,185,104,0.28)' -strokewidth 2 -fill none \
  -draw 'polyline 0,214 208,76 397,76 polyline 0,235 220,92 397,92 line 925,1120 1080,1023 line 951,1151 1080,1070' \
  "$TMP/p1-bg.miff"
logo 330 "$TMP/logo-330.png"
composite -geometry +70+54 "$TMP/logo-330.png" "$TMP/p1-bg.miff" "$TMP/p1-logo.miff"
convert "$TMP/p1-logo.miff" \
  -fill 'rgba(7,16,30,0.76)' -stroke 'rgba(216,185,104,0.85)' -strokewidth 1 -draw 'roundrectangle 780,62 1010,112 25,25' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 18 -kerning 1.5 -gravity northwest -annotate +831+77 '23+ AÑOS' \
  -fill "$GOLD" -font "$SANS_BOLD" -pointsize 21 -kerning 3.1 -annotate +72+304 'REMODELACIONES DE ALTO ESTÁNDAR' \
  -fill "$GOLD" -draw 'roundrectangle 72,340 144,344 2,2' \
  -font "$SERIF_BOLD" -pointsize 78 -fill "$WHITE" -kerning 0 -annotate +70+382 'Tu hogar,' \
  -annotate +70+475 'como siempre' \
  -fill "$GOLD_LIGHT" -annotate +70+568 'lo imaginaste.' \
  -font "$SANS" -pointsize 27 -fill '#f4f1e9' -annotate +74+676 'Planificamos y ejecutamos cada detalle' \
  -annotate +74+715 'para lograr un resultado pensado para durar.' \
  -fill 'rgba(7,16,30,0.88)' -stroke 'rgba(255,255,255,0.18)' -strokewidth 1 -draw 'roundrectangle 72,814 854,888 37,37' \
  -stroke none -fill "$GOLD" -draw 'circle 108,851 114,851 circle 314,851 318,851 circle 488,851 492,851' \
  -font "$SANS_BOLD" -pointsize 22 -fill "$WHITE" -annotate +131+831 'COCINAS' -annotate +336+831 'BAÑOS' -annotate +512+831 'REFORMAS INTEGRALES' \
  -fill "$GOLD" -draw 'circle 89,1005 106,1005 circle 469,1005 486,1005' \
  -stroke "$NAVY" -strokewidth 3 -fill none -draw 'polyline 80,1005 87,1012 99,995 polyline 460,1005 467,1012 479,995' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 22 -annotate +120+986 'Presupuesto por partidas' -annotate +500+986 'Garantía por escrito' \
  -fill "$GOLD" -draw 'roundrectangle 72,1082 682,1180 12,12' \
  -fill "$NAVY" -font "$SANS_BOLD" -pointsize 19 -kerning 1.2 -annotate +106+1102 'SOLICITA TU VALORACIÓN TÉCNICA' \
  -pointsize 26 -kerning 0 -annotate +106+1137 'WhatsApp 0422 799 7043' \
  -stroke "$NAVY" -strokewidth 4 -fill none -draw 'line 625,1131 651,1131 polyline 638,1118 651,1131 638,1144' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 19 -kerning 1 -annotate +72+1236 'CARACAS  ·  VALENCIA  ·  SAN DIEGO  ·  CARABOBO' \
  -fill "$GOLD" -pointsize 18 -kerning 2 -annotate +72+1274 'REMODELAT.NET' \
  "$TMP/p1-final.miff"
finish "$TMP/p1-final.miff" "publicacion-transforma-hogar-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 2) Publicación vertical — antes/después con proyecto real
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:#f3f0e9" \
  -fill "$NAVY" -draw 'rectangle 0,0 1080,326 rectangle 0,994 1080,1350' \
  -fill '#121f32' -draw 'polygon 0,285 220,326 430,298 650,319 820,326 1080,286 1080,326 0,326' \
  -stroke 'rgba(216,185,104,0.20)' -strokewidth 2 -fill none -draw 'line 774,0 1080,193 line 842,0 1080,150 polyline 0,202 174,75 337,75' \
  "$TMP/p2-base.miff"
rounded_cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-antes-1.webp" 469 584 22 "$TMP/p2-before.png" center
rounded_cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp" 469 584 22 "$TMP/p2-after.png" center
logo 306 "$TMP/logo-306.png"
composite -geometry +54+364 "$TMP/p2-before.png" "$TMP/p2-base.miff" "$TMP/p2-a.miff"
composite -geometry +557+364 "$TMP/p2-after.png" "$TMP/p2-a.miff" "$TMP/p2-b.miff"
composite -geometry +60+42 "$TMP/logo-306.png" "$TMP/p2-b.miff" "$TMP/p2-c.miff"
convert "$TMP/p2-c.miff" \
  -fill "$GOLD" -font "$SANS_BOLD" -pointsize 18 -kerning 2 -gravity northwest -annotate +749+61 'PROYECTO REAL · CARACAS' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 57 -kerning 0 -annotate +56+151 'De baño antiguo a un espacio' \
  -fill "$GOLD_LIGHT" -annotate +56+217 'hecho para disfrutar.' \
  -fill 'rgba(8,18,32,0.90)' -draw 'roundrectangle 76,388 204,436 24,24' \
  -fill "$WHITE" -font "$SANS_BOLD" -pointsize 19 -kerning 1.8 -annotate +103+401 'ANTES' \
  -fill "$GOLD" -draw 'roundrectangle 579,388 733,436 24,24' \
  -fill "$NAVY" -annotate +604+401 'DESPUÉS' \
  -fill '#f3f0e9' -stroke "$GOLD" -strokewidth 3 -draw 'circle 540,652 570,652' \
  -stroke "$NAVY" -strokewidth 4 -fill none -draw 'line 528,652 552,652 polyline 544,642 554,652 544,662' \
  -stroke none -fill "$GOLD" -draw 'rectangle 55,994 227,999' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 48 -annotate +56+1035 '¿Tu baño pide un cambio?' \
  -fill '#cfd5dc' -font "$SANS" -pointsize 23 -annotate +57+1092 'Evaluamos el espacio, planificamos cada partida' \
  -annotate +57+1126 'y ejecutamos con supervisión técnica.' \
  -fill "$GOLD" -draw 'roundrectangle 57,1210 627,1290 11,11' \
  -fill "$NAVY" -font "$SANS_BOLD" -pointsize 17 -kerning 1 -annotate +85+1222 'HABLEMOS DE TU PROYECTO' \
  -pointsize 24 -kerning 0 -annotate +85+1251 'WhatsApp 0422 799 7043' \
  -stroke "$NAVY" -strokewidth 4 -fill none -draw 'line 569,1250 593,1250 polyline 581,1238 593,1250 581,1262' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 18 -kerning 1 -annotate +778+1225 'CARACAS · VALENCIA' \
  -fill "$GOLD" -pointsize 17 -kerning 1.5 -annotate +853+1262 'REMODELAT.NET' \
  "$TMP/p2-final.miff"
finish "$TMP/p2-final.miff" "publicacion-antes-despues-bano-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 3) Anuncio cuadrado — captación general
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/hero-lcp.webp" 1080 1080 "$TMP/a1-base.miff" center
convert "$TMP/a1-base.miff" \
  -fill 'rgba(8,18,32,0.94)' -draw 'polygon 0,0 475,0 760,1080 0,1080' \
  -fill 'rgba(8,18,32,0.86)' -draw 'rectangle 0,960 1080,1080' \
  "$TMP/a1-bg.miff"
logo 300 "$TMP/logo-300.png"
composite -geometry +62+49 "$TMP/logo-300.png" "$TMP/a1-bg.miff" "$TMP/a1-logo.miff"
convert "$TMP/a1-logo.miff" \
  -fill "$GOLD" -font "$SANS_BOLD" -pointsize 19 -kerning 2.5 -gravity northwest -annotate +62+202 'HAZLO BIEN DESDE EL PRINCIPIO' \
  -fill "$GOLD" -draw 'roundrectangle 62,246 130,250 2,2' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 77 -kerning 0 -annotate +58+306 '¿Vas a' \
  -fill "$GOLD_LIGHT" -annotate +58+391 'remodelar?' \
  -fill "$SOFT" -font "$SANS" -pointsize 24 -annotate +62+478 'Diseño, obra y acabados' -annotate +62+513 'coordinados por un solo equipo.' \
  -fill "$GOLD" -draw 'circle 78,626 94,626 circle 78,683 94,683 circle 78,740 94,740' \
  -stroke "$NAVY" -strokewidth 3 -fill none -draw 'polyline 70,626 77,633 88,616 polyline 70,683 77,690 88,673 polyline 70,740 77,747 88,730' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 21 -annotate +105+607 'Presupuesto por partidas' -annotate +105+664 'Supervisión técnica' -annotate +105+721 'Garantía por escrito' \
  -fill "$GREEN" -draw 'roundrectangle 60,829 650,921 12,12' \
  -fill 'rgba(255,255,255,0.16)' -draw 'circle 108,875 133,875' \
  -fill "$WHITE" -font "$SANS_BOLD" -pointsize 24 -annotate +94+850 '☎' \
  -fill "$WHITE" -font "$SANS_BOLD" -pointsize 17 -kerning 1 -annotate +147+844 'SOLICITA TU VALORACIÓN' \
  -pointsize 25 -kerning 0 -annotate +147+875 'WhatsApp 0422 799 7043' \
  -stroke "$WHITE" -strokewidth 4 -fill none -draw 'line 592,875 616,875 polyline 604,863 616,875 604,887' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 17 -kerning 0.7 -annotate +60+986 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -pointsize 17 -kerning 1.2 -annotate +836+986 'REMODELAT.NET' \
  "$TMP/a1-final.miff"
finish "$TMP/a1-final.miff" "anuncio-captacion-general-1080x1080.jpg"

# ---------------------------------------------------------------------------
# 4) Anuncio cuadrado — baños
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/bano-800.webp" 1080 1080 "$TMP/a2-base.miff" center
convert "$TMP/a2-base.miff" \
  -fill 'rgba(8,18,32,0.50)' -draw 'rectangle 0,0 1080,190' \
  -fill 'rgba(8,18,32,0.82)' -draw 'polygon 0,560 1080,470 1080,1080 0,1080' \
  "$TMP/a2-bg.miff"
logo 302 "$TMP/logo-302.png"
composite -geometry +58+48 "$TMP/logo-302.png" "$TMP/a2-bg.miff" "$TMP/a2-logo.miff"
convert "$TMP/a2-logo.miff" \
  -fill 'rgba(8,18,32,0.72)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 779,59 1021,105 23,23' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 17 -kerning 1.2 -gravity northwest -annotate +815+70 'BAÑOS A MEDIDA' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 67 -kerning 0 -annotate +60+570 'Convierte tu baño' \
  -fill "$GOLD_LIGHT" -annotate +60+646 'en un espacio para ti.' \
  -fill "$SOFT" -font "$SANS" -pointsize 23 -annotate +62+727 'Distribución · Instalaciones · Revestimientos · Acabados' \
  -fill "$GOLD" -draw 'roundrectangle 60,804 657,895 12,12' \
  -fill "$NAVY" -font "$SANS_BOLD" -pointsize 17 -kerning 1 -annotate +91+817 'HABLEMOS DE TU NUEVO BAÑO' \
  -pointsize 24 -kerning 0 -annotate +91+849 'WhatsApp 0422 799 7043' \
  -stroke "$NAVY" -strokewidth 4 -fill none -draw 'line 599,849 623,849 polyline 611,837 623,849 611,861' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 18 -annotate +61+922 '✓ 23+ años de experiencia' -annotate +374+922 '✓ Supervisión técnica' -annotate +694+922 '✓ Garantía escrita' \
  -fill '#cfd5dc' -pointsize 17 -kerning 0.7 -annotate +60+997 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -pointsize 17 -kerning 1.2 -annotate +836+997 'REMODELAT.NET' \
  "$TMP/a2-final.miff"
finish "$TMP/a2-final.miff" "anuncio-banos-1080x1080.jpg"

# ---------------------------------------------------------------------------
# 5) Anuncio horizontal — Facebook Feed / Audience Network
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/hero-lcp.webp" 710 628 "$TMP/h-photo.miff" center
convert -size 1200x628 "xc:$NAVY" "$TMP/h-base.miff"
composite -geometry +0+0 "$TMP/h-photo.miff" "$TMP/h-base.miff" "$TMP/h-a.miff"
convert "$TMP/h-a.miff" \
  -fill 'rgba(8,18,32,0.22)' -draw 'rectangle 0,0 710,628' \
  -fill "$NAVY" -draw 'rectangle 690,0 1200,628 polygon 650,0 730,0 650,628 570,628' \
  -stroke 'rgba(216,185,104,0.70)' -strokewidth 3 -fill none -draw 'line 697,0 621,628' \
  "$TMP/h-bg.miff"
logo 300 "$TMP/logo-h.png"
composite -geometry +737+38 "$TMP/logo-h.png" "$TMP/h-bg.miff" "$TMP/h-logo.miff"
convert "$TMP/h-logo.miff" \
  -fill "$GOLD" -font "$SANS_BOLD" -pointsize 16 -kerning 2 -gravity northwest -annotate +737+150 'REMODELACIONES DE ALTO ESTÁNDAR' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 35 -kerning 0 -annotate +725+207 'Remodela con método.' \
  -fill "$GOLD_LIGHT" -annotate +725+255 'Disfruta el resultado.' \
  -fill '#e7eaed' -font "$SANS" -pointsize 18 -annotate +738+319 'Cocinas, baños y reformas integrales con' \
  -annotate +738+346 'supervisión técnica y garantía por escrito.' \
  -fill "$GOLD" -draw 'roundrectangle 737,411 1135,487 10,10' \
  -fill "$NAVY" -font "$SANS_BOLD" -pointsize 14 -kerning 0.8 -annotate +761+420 'SOLICITA TU VALORACIÓN' \
  -pointsize 22 -kerning 0 -annotate +761+447 '0422 799 7043' \
  -stroke "$NAVY" -strokewidth 3 -fill none -draw 'line 1089,449 1110,449 polyline 1099,438 1110,449 1099,460' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 14 -kerning 0.4 -annotate +738+520 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  -fill "$GOLD" -pointsize 14 -kerning 1.3 -annotate +738+553 'REMODELAT.NET' \
  "$TMP/h-final.miff"
finish "$TMP/h-final.miff" "anuncio-horizontal-1200x628.jpg"

# ---------------------------------------------------------------------------
# 6) Anuncio vertical — Stories / Reels
# ---------------------------------------------------------------------------
cover "$ROOT/public/images/hero-lcp.webp" 1080 1920 "$TMP/s-base.miff" center
convert "$TMP/s-base.miff" \
  -fill 'rgba(7,16,30,0.54)' -draw 'rectangle 0,0 1080,310' \
  -fill 'rgba(7,16,30,0.86)' -draw 'polygon 0,900 1080,730 1080,1920 0,1920' \
  "$TMP/s-bg.miff"
logo 360 "$TMP/logo-s.png"
composite -geometry +70+105 "$TMP/logo-s.png" "$TMP/s-bg.miff" "$TMP/s-logo.miff"
convert "$TMP/s-logo.miff" \
  -fill 'rgba(7,16,30,0.72)' -stroke "$GOLD" -strokewidth 1 -draw 'roundrectangle 738,121 1008,171 25,25' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 17 -kerning 1.5 -gravity northwest -annotate +823+135 '23+ AÑOS' \
  -fill "$GOLD" -font "$SANS_BOLD" -pointsize 21 -kerning 3 -annotate +68+944 'TU PROYECTO, SIN IMPROVISACIONES' \
  -fill "$GOLD" -draw 'rectangle 68,997 143,1002' \
  -fill "$WHITE" -font "$SERIF_BOLD" -pointsize 78 -kerning 0 -annotate +64+1057 '¿Listo para' \
  -annotate +64+1149 'transformar' \
  -fill "$GOLD_LIGHT" -annotate +64+1241 'tu hogar?' \
  -fill '#f0f2f3' -font "$SANS" -pointsize 26 -annotate +69+1345 'De la valoración técnica a la entrega,' \
  -annotate +69+1384 'con un solo equipo y garantía por escrito.' \
  -fill "$GREEN" -draw 'roundrectangle 68,1492 788,1600 14,14' \
  -fill 'rgba(255,255,255,0.16)' -draw 'circle 125,1546 155,1546' \
  -fill "$WHITE" -font "$SANS_BOLD" -pointsize 29 -annotate +108+1515 '☎' \
  -fill "$WHITE" -font "$SANS_BOLD" -pointsize 18 -kerning 1.2 -annotate +173+1510 'SOLICITA TU VALORACIÓN' \
  -pointsize 28 -kerning 0 -annotate +173+1546 'WhatsApp 0422 799 7043' \
  -stroke "$WHITE" -strokewidth 5 -fill none -draw 'line 718,1546 748,1546 polyline 734,1530 750,1546 734,1562' \
  -stroke none -fill "$WHITE" -font "$SANS_BOLD" -pointsize 21 -annotate +69+1648 '✓ Presupuesto por partidas' \
  -annotate +69+1700 '✓ Supervisión técnica' \
  -annotate +69+1752 '✓ Acabados de alto estándar' \
  -fill "$GOLD" -pointsize 18 -kerning 1.3 -annotate +69+1824 'CARACAS · VALENCIA · SAN DIEGO · CARABOBO' \
  "$TMP/s-final.miff"
finish "$TMP/s-final.miff" "anuncio-stories-1080x1920.jpg"
