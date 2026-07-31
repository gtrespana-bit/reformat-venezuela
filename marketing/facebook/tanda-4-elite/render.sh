#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
OUT="$HERE/export"
TMP="$HERE/.render-tmp"
rm -rf "$TMP"
mkdir -p "$OUT" "$TMP"
trap 'rm -rf "$TMP"' EXIT

# --- COLECCIÓN 1: SWISS ARCHITECTURAL WHITE ---
SWISS_BG="#FAF8F5"
SWISS_CARD="#ECE6DA"
SWISS_INK="#1E1C1A"
SWISS_GOLD="#B89658"
SWISS_GOLD_BRIGHT="#D8B56C"

# --- COLECCIÓN 2: OBSIDIAN & BRONZE FUTURIST ---
OBS_BG="#0B0C10"
OBS_CARD="rgba(23,25,34,0.88)"
OBS_GOLD="#D99B66"
OBS_CHAMP="#F4EBD9"

# --- COLECCIÓN 3: MEDITERRANEAN TERRACOTTA & OLIVE ---
MED_OLIVE="#1A281F"
MED_TERRA="#E6D7C8"
MED_GOLD="#CBA158"

# --- COLECCIÓN 4: CINEMA CASE STUDY ---
CIN_BG="#171412"
CIN_GOLD="#D1A145"

WHITE="#FFFFFF"
MUTED="#96999C"

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

logo 260 "$TMP/logo-260.png"
logo 300 "$TMP/logo-300.png"
logo 340 "$TMP/logo-340.png"

# ===========================================================================
# COLECCIÓN 1: SWISS ARCHITECTURAL WHITE (Minimalismo Arquitectónico de Lujo)
# ===========================================================================

# ---------------------------------------------------------------------------
# 01 · Swiss Lookbook 2026 (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$SWISS_BG" "$TMP/01-base.miff"
rounded_cover "$ROOT/public/images/hero-lcp.webp" 980 500 18 "$TMP/01-hero.png" center
composite -geometry +50+150 "$TMP/01-hero.png" "$TMP/01-base.miff" "$TMP/01-a.miff"
composite -geometry +50+52 "$TMP/logo-260.png" "$TMP/01-a.miff" "$TMP/01-b.miff"
convert "$TMP/01-b.miff" \
  -stroke "$SWISS_GOLD" -strokewidth 1 -fill none -draw 'roundrectangle 44,144 1036,656 20,20' \
  -stroke none -fill "$SWISS_INK" -font "$BODY_BOLD" -pointsize 13 -kerning 2.5 -gravity northwest -annotate +660+65 'LOOKBOOK RESIDENCIAL 2026' \
  -fill "$SWISS_GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2 -annotate +54+695 'ARQUITECTURA DE INTERIORES · CARACAS & VALENCIA' \
  -fill "$SWISS_INK" -font "$HEAD_BOLD" -pointsize 56 -kerning 0 -annotate +50+755 'Diseño sin improvisaciones.' \
  -annotate +50+818 'Ejecución de alto estándar.' \
  -fill "$SWISS_CARD" -stroke "$SWISS_GOLD" -strokewidth 1 -draw 'roundrectangle 50,880 275,1070 12,12 roundrectangle 295,880 520,1070 12,12 roundrectangle 540,880 765,1070 12,12 roundrectangle 785,880 1010,1070 12,12' \
  -stroke none -fill "$SWISS_GOLD" -font "$BODY_BOLD" -pointsize 16 -annotate +70+915 '01' -annotate +315+915 '02' -annotate +560+915 '03' -annotate +805+915 '04' \
  -fill "$SWISS_INK" -font "$BODY_BOLD" -pointsize 18 -annotate +70+955 'Reformas' -annotate +70+980 'integrales' \
  -annotate +315+955 'Cocinas' -annotate +315+980 'de autor' \
  -annotate +560+955 'Baños' -annotate +560+980 'tipo spa' \
  -annotate +805+955 'Acabados' -annotate +805+980 'y técnica' \
  -fill '#6B6863' -font "$BODY" -pointsize 13 -annotate +70+1025 'Supervisión directa' -annotate +315+1025 'Mobiliario a medida' -annotate +560+1025 'Confort & diseño' -annotate +805+1025 'Garantía escrita' \
  -fill "$SWISS_INK" -stroke none -draw 'roundrectangle 50,1140 1030,1275 16,16' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1.5 -annotate +90+1175 '👉 DESCARGAR LOOKBOOK 2026 Y COTIZAR TU PROYECTO' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 26 -kerning 0 -annotate +90+1215 'WhatsApp 0422 799 7043' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +780+1195 'REMODELAT.NET' \
  "$TMP/01-final.miff"
finish "$TMP/01-final.miff" "01-swiss-lookbook-2026-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 02 · Swiss Cocina de Autor Cuarzo (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$SWISS_BG" "$TMP/02-base.miff"
rounded_cover "$ROOT/public/images/cocina-encimera-cuarzo.webp" 610 540 18 "$TMP/02-img1.png" center
rounded_cover "$ROOT/public/images/cocina-almacenamiento-inteligente.webp" 350 540 18 "$TMP/02-img2.png" center
composite -geometry +50+150 "$TMP/02-img1.png" "$TMP/02-base.miff" "$TMP/02-a.miff"
composite -geometry +680+150 "$TMP/02-img2.png" "$TMP/02-a.miff" "$TMP/02-b.miff"
composite -geometry +50+52 "$TMP/logo-260.png" "$TMP/02-b.miff" "$TMP/02-c.miff"
convert "$TMP/02-c.miff" \
  -stroke none -fill "$SWISS_INK" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +630+65 '02 · ESPECIALIDAD COCINAS DE AUTOR' \
  -fill "$SWISS_GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2 -annotate +54+735 'MOBILIARIO A MEDIDA & DISTRIBUCIÓN ERGONÓMICA' \
  -fill "$SWISS_INK" -font "$HEAD_BOLD" -pointsize 55 -annotate +50+795 'Cocinas pensadas para ser' \
  -annotate +50+858 'el centro de tu hogar.' \
  -fill "$SWISS_CARD" -stroke "$SWISS_GOLD" -strokewidth 1 -draw 'roundrectangle 50,910 340,965 12,12 roundrectangle 360,910 670,965 12,12 roundrectangle 690,910 1030,965 12,12' \
  -stroke none -fill "$SWISS_INK" -font "$BODY_BOLD" -pointsize 14 -annotate +75+942 '✓ Encimeras Cuarzo & Neolith' -annotate +385+942 '✓ Herrajes Blum / Soft-Close' -annotate +715+942 '✓ Iluminación LED Capas' \
  -fill '#6B6863' -font "$BODY_MED" -pointsize 16 -annotate +54+1020 'Diseñamos cada cocina según tus hábitos, aprovechando cada milímetro' \
  -annotate +54+1046 'con materiales de alta durabilidad y supervisión arquitectónica directa.' \
  -fill "$SWISS_INK" -draw 'roundrectangle 50,1140 1030,1275 16,16' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1.5 -annotate +90+1175 '👉 VER PROYECTOS EJECUTADOS Y SOLICITAR PROPUESTA' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 26 -kerning 0 -annotate +90+1215 'WhatsApp 0422 799 7043' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +780+1195 'CARACAS · VALENCIA' \
  "$TMP/02-final.miff"
finish "$TMP/02-final.miff" "02-swiss-cocina-isla-cuarzo-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 03 · Swiss Baño Suite Tipo Spa (1080x1080)
# ---------------------------------------------------------------------------
convert -size 1080x1080 "xc:$SWISS_BG" "$TMP/03-base.miff"
rounded_cover "$ROOT/public/images/bano-lavabo-doble.webp" 500 680 18 "$TMP/03-left.png" center
rounded_cover "$ROOT/public/images/bano-espejo-led.webp" 460 300 18 "$TMP/03-right.png" center
composite -geometry +50+140 "$TMP/03-left.png" "$TMP/03-base.miff" "$TMP/03-a.miff"
composite -geometry +570+140 "$TMP/03-right.png" "$TMP/03-a.miff" "$TMP/03-b.miff"
composite -geometry +50+44 "$TMP/logo-260.png" "$TMP/03-b.miff" "$TMP/03-c.miff"
convert "$TMP/03-c.miff" \
  -fill "$SWISS_INK" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +760+56 'BAÑOS SUITE · TIPO SPA' \
  -fill "$SWISS_GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -annotate +570+475 'CONFORT, TÉCNICA Y ESTÉTICA' \
  -fill "$SWISS_INK" -font "$HEAD_BOLD" -pointsize 46 -annotate +570+530 'Convierte tu baño en' \
  -annotate +570+582 'un espacio para ti.' \
  -fill '#6B6863' -font "$BODY_MED" -pointsize 15 -annotate +570+635 '✓ Distribución y fontanería 100% renovada' \
  -annotate +570+665 '✓ Porcelanatos y microcemento premium' \
  -annotate +570+695 '✓ Espejos LED y sanitarios suspendidos' \
  -annotate +570+725 '✓ Presupuesto por partidas · Garantía' \
  -fill "$SWISS_INK" -draw 'roundrectangle 50,880 1030,1015 16,16' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +85+915 '👉 SOLICITAR COTIZACIÓN POR PARTIDAS EN TU PROPIEDAD' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 25 -kerning 0 -annotate +85+955 'WhatsApp 0422 799 7043' \
  -fill "$SWISS_GOLD_BRIGHT" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +780+935 'CARACAS & CARABOBO' \
  "$TMP/03-final.miff"
finish "$TMP/03-final.miff" "03-swiss-bano-suite-1080x1080.jpg"

# ===========================================================================
# COLECCIÓN 2: OBSIDIAN & BRONZE FUTURIST (Lujo Tecnológico / Interactivo)
# ===========================================================================

# ---------------------------------------------------------------------------
# 04 · Obsidian VIP Concierge — Invitación Cupos de Obra (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$OBS_BG" "$TMP/04-base.miff"
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado.webp" 960 560 20 "$TMP/04-hero.png" center
composite -geometry +60+160 "$TMP/04-hero.png" "$TMP/04-base.miff" "$TMP/04-a.miff"
composite -geometry +60+50 "$TMP/logo-260.png" "$TMP/04-a.miff" "$TMP/04-b.miff"
convert "$TMP/04-b.miff" \
  -stroke "$OBS_GOLD" -strokewidth 1 -fill none -draw 'roundrectangle 26,26 1054,1324 24,24' \
  -stroke none -fill "$OBS_GOLD" -draw 'roundrectangle 670,180 990,224 18,18' \
  -fill "$OBS_BG" -font "$BODY_BOLD" -pointsize 12 -kerning 1.2 -gravity northwest -annotate +695+194 '★ OBRA VERIFICADA · LA LAGUNITA' \
  -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2.5 -annotate +580+64 'CUPOS DE OBRA — CUARTO TRIMESTRE' \
  -fill "$OBS_CHAMP" -font "$HEAD_BOLD" -pointsize 54 -annotate +60+790 'Servicio Concierge de' \
  -annotate +60+850 'Remodelación Residencial.' \
  -fill '#B4B8C0' -font "$BODY_MED" -pointsize 17 -annotate +60+915 'Coordinación completa de principio a fin: diseño arquitectónico, demolición,' \
  -annotate +60+945 'instalaciones técnicas, carpintería a medida y acabados de estándar superior.' \
  -fill 'rgba(217,155,102,0.12)' -stroke "$OBS_GOLD" -strokewidth 1 -draw 'roundrectangle 60,985 350,1065 14,14 roundrectangle 365,985 655,1065 14,14 roundrectangle 670,985 1020,1065 14,14' \
  -stroke none -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 15 -annotate +85+1015 'Garantía por escrito' -annotate +390+1015 'Supervisión de obra' -annotate +695+1015 'Presupuesto transparente' \
  -fill '#8C929E' -font "$BODY" -pointsize 13 -annotate +85+1040 '100% verificado' -annotate +390+1040 'Arquitectos en sitio' -annotate +695+1040 'Por partidas detalladas' \
  -fill "$OBS_GOLD" -draw 'roundrectangle 60,1130 1020,1270 18,18' \
  -fill "$OBS_BG" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +100+1165 '👉 SOLICITAR VISITA TÉCNICA VIP EN TU PROPIEDAD' \
  -pointsize 26 -kerning 0 -annotate +100+1208 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +780+1188 'CARACAS & VALENCIA' \
  "$TMP/04-final.miff"
finish "$TMP/04-final.miff" "04-obsidian-vip-concierge-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 05 · Obsidian Calculadora Interactiva de Reforma (1080x1080)
# ---------------------------------------------------------------------------
convert -size 1080x1080 "xc:$OBS_BG" "$TMP/05-base.miff"
cover "$ROOT/public/images/cocina-terminada-final.webp" 1080 500 "$TMP/05-top.miff" center
composite -geometry +0+0 "$TMP/05-top.miff" "$TMP/05-base.miff" "$TMP/05-a.miff"
convert "$TMP/05-a.miff" \
  -fill 'rgba(11,12,16,0.35)' -draw 'rectangle 0,0 1080,240' \
  -fill 'rgba(11,12,16,0.88)' -draw 'rectangle 0,240 1080,500' \
  "$TMP/05-b.miff"
composite -geometry +50+44 "$TMP/logo-260.png" "$TMP/05-b.miff" "$TMP/05-c.miff"
convert "$TMP/05-c.miff" \
  -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +650+56 'HERRAMIENTA DE ESTIMACIÓN 2026' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 48 -annotate +60+310 '¿Cuánto cuesta remodelar' \
  -fill "$OBS_CHAMP" -annotate +60+368 'tu hogar en 2026?' \
  -fill '#B4B8C0' -font "$BODY_MED" -pointsize 16 -annotate +60+420 'Presupuesto por partidas. Sin costos ocultos. Garantía por escrito.' \
  -fill '#171922' -stroke "$OBS_GOLD" -strokewidth 2 -draw 'roundrectangle 50,470 1030,1030 22,22' \
  -stroke none -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1 -annotate +90+515 'PASO 1: SELECCIONA EL ESPACIO A TRANSFORMAR' \
  -fill "$OBS_GOLD" -draw 'roundrectangle 90,550 360,625 14,14' \
  -fill 'rgba(217,155,102,0.15)' -stroke "$OBS_GOLD" -strokewidth 1 -draw 'roundrectangle 380,550 650,625 14,14 roundrectangle 670,550 990,625 14,14' \
  -stroke none -fill "$OBS_BG" -font "$BODY_BOLD" -pointsize 16 -annotate +135+593 '✓ COCINA DE AUTOR' \
  -fill "$WHITE" -annotate +430+593 'BAÑO TIPO SPA' -annotate +725+593 'REFORMA INTEGRAL' \
  -fill '#9EA3AD' -font "$BODY" -pointsize 15 -annotate +90+685 'Incluye: Diseño de distribución · Demolición · Instalaciones · Acabados de élite' \
  -fill "$OBS_GOLD" -draw 'roundrectangle 90,750 990,900 16,16' \
  -fill "$OBS_BG" -font "$BODY_BOLD" -pointsize 17 -kerning 1.3 -annotate +130+795 '👉 CALCULAR MI PRESUPUESTO EN 1 CLIC' \
  -pointsize 28 -kerning 0 -annotate +130+845 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +740+820 'ATENCIÓN INMEDIATA' \
  -fill "$WHITE" -font "$BODY_MED" -pointsize 14 -annotate +290+965 '⭐ Más de 23 años creando hogares extraordinarios en Venezuela' \
  "$TMP/05-final.miff"
finish "$TMP/05-final.miff" "05-obsidian-calculadora-interactiva-1080x1080.jpg"

# ---------------------------------------------------------------------------
# 06 · Obsidian Story Quizz Selector (1080x1920)
# ---------------------------------------------------------------------------
convert -size 1080x1920 "xc:$OBS_BG" "$TMP/06-base.miff"
rounded_cover "$ROOT/public/images/arquitectura-600.webp" 960 480 20 "$TMP/06-opt1.png" center
rounded_cover "$ROOT/public/images/bano-terminado-final.webp" 960 480 20 "$TMP/06-opt2.png" center
composite -geometry +60+380 "$TMP/06-opt1.png" "$TMP/06-base.miff" "$TMP/06-a.miff"
composite -geometry +60+930 "$TMP/06-opt2.png" "$TMP/06-a.miff" "$TMP/06-b.miff"
composite -geometry +60+100 "$TMP/logo-300.png" "$TMP/06-b.miff" "$TMP/06-c.miff"
convert "$TMP/06-c.miff" \
  -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2.5 -gravity northwest -annotate +60+220 'ASESORÍA ARQUITECTÓNICA VIP' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 58 -annotate +60+285 '¿Qué espacio vas a transformar?' \
  -fill 'rgba(11,12,16,0.85)' -draw 'roundrectangle 90,410 650,470 12,12 roundrectangle 90,960 650,1020 12,12' \
  -fill "$OBS_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +120+447 'OPCIÓN A · REFORMA INTEGRAL 360°' \
  -annotate +120+997 'OPCIÓN B · BAÑO O COCINA DE LUJO' \
  -fill "$OBS_GOLD" -draw 'roundrectangle 60,1490 1020,1660 22,22' \
  -fill "$OBS_BG" -font "$BODY_BOLD" -pointsize 17 -kerning 1.2 -annotate +110+1545 '👆 TOCA AQUÍ PARA ELEGIR TU OPCIÓN Y COTIZAR' \
  -pointsize 32 -kerning 0 -annotate +110+1605 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 15 -kerning 1 -annotate +740+1580 'REMODELAT.NET' \
  -fill '#9EA3AD' -font "$BODY_MED" -pointsize 16 -annotate +155+1720 'Supervisión técnica de arquitectos · Garantía por escrito en cada partida' \
  "$TMP/06-final.miff"
finish "$TMP/06-final.miff" "06-obsidian-story-quizz-1080x1920.jpg"

# ===========================================================================
# COLECCIÓN 3: MEDITERRANEAN TERRACOTTA & OLIVE (Lujo Orgánico & Resort)
# ===========================================================================

# ---------------------------------------------------------------------------
# 07 · Mediterranean Villa Integral (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$MED_OLIVE" "$TMP/07-base.miff"
rounded_cover "$ROOT/public/images/revestimiento-piedra.webp" 580 580 24 "$TMP/07-left.png" center
rounded_cover "$ROOT/public/images/cocina-terminada-final.webp" 380 580 24 "$TMP/07-right.png" center
composite -geometry +50+150 "$TMP/07-left.png" "$TMP/07-base.miff" "$TMP/07-a.miff"
composite -geometry +650+150 "$TMP/07-right.png" "$TMP/07-a.miff" "$TMP/07-b.miff"
composite -geometry +50+52 "$TMP/logo-260.png" "$TMP/07-b.miff" "$TMP/07-c.miff"
convert "$TMP/07-c.miff" \
  -fill "$MED_GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2.5 -gravity northwest -annotate +580+64 'COLECCIÓN ORGÁNICA · ALTO ESTÁNDAR' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 58 -annotate +50+800 'Materiales nobles.' \
  -fill "$MED_TERRA" -annotate +50+865 'Acabados eternos.' \
  -fill '#C6CDCA' -font "$BODY_MED" -pointsize 17 -annotate +50+925 'Transformamos tu vivienda combinando piedra natural, microcemento, maderas' \
  -annotate +50+955 'arquitectónicas e iluminación cálida con perfecta coordinación técnica.' \
  -fill 'rgba(230,215,200,0.12)' -stroke "$MED_GOLD" -strokewidth 1 -draw 'roundrectangle 50,1000 270,1065 14,14 roundrectangle 290,1000 510,1065 14,14 roundrectangle 530,1000 750,1065 14,14 roundrectangle 770,1000 1030,1065 14,14' \
  -stroke none -fill "$MED_TERRA" -font "$BODY_BOLD" -pointsize 15 -annotate +85+1040 '✓ Microcemento' -annotate +325+1040 '✓ Piedra Natural' -annotate +565+1040 '✓ Carpintería' -annotate +805+1040 '✓ Iluminación LED' \
  -fill "$MED_TERRA" -draw 'roundrectangle 50,1130 1030,1275 18,18' \
  -fill "$MED_OLIVE" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +95+1168 '👉 EXPLORA LA COLECCIÓN ORGÁNICA Y COTIZA TU HOGAR' \
  -pointsize 26 -kerning 0 -annotate +95+1210 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +770+1190 'ARQUITECTOS VIP' \
  "$TMP/07-final.miff"
finish "$TMP/07-final.miff" "07-mediterranean-villa-integral-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 08 · Mediterranean Baño Spa Travertino (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$MED_TERRA" "$TMP/08-base.miff"
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-piso-microcemento-mas-lavabo-sobrepuesto.webp" 980 600 24 "$TMP/08-hero.png" center
composite -geometry +50+150 "$TMP/08-hero.png" "$TMP/08-base.miff" "$TMP/08-a.miff"
composite -geometry +50+52 "$TMP/logo-260.png" "$TMP/08-a.miff" "$TMP/08-b.miff"
convert "$TMP/08-b.miff" \
  -fill "$MED_OLIVE" -font "$BODY_BOLD" -pointsize 13 -kerning 2.5 -gravity northwest -annotate +560+64 'SANTUARIOS PRIVADOS RESIDENCIALES' \
  -fill "$MED_OLIVE" -font "$HEAD_BOLD" -pointsize 56 -annotate +50+815 'Tu baño convertido en' \
  -annotate +50+880 'una suite de descanso.' \
  -fill '#3E4D42' -font "$BODY_MED" -pointsize 17 -annotate +50+945 '✓ Lavabos escultóricos sobrepuestos & encimeras de hormigón y piedra' \
  -annotate +50+975 '✓ Duchas walk-in antideslizantes con griferías empotradas y mamparas' \
  -annotate +50+1005 '✓ Presupuesto detallado por partidas con garantía por escrito' \
  -fill "$MED_OLIVE" -draw 'roundrectangle 50,1130 1030,1275 18,18' \
  -fill "$MED_GOLD" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +95+1168 '👉 CONSULTAR CON NUESTRO EQUIPO DE ARQUITECTURA' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 26 -kerning 0 -annotate +95+1210 'WhatsApp 0422 799 7043' \
  -fill "$MED_GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +770+1190 'CARACAS · VALENCIA' \
  "$TMP/08-final.miff"
finish "$TMP/08-final.miff" "08-mediterranean-bano-spa-organico-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 09 · Mediterranean Horizontal Mosaico (1200x628)
# ---------------------------------------------------------------------------
convert -size 1200x628 "xc:$MED_OLIVE" "$TMP/09-base.miff"
rounded_cover "$ROOT/public/images/cocina-isla-central.webp" 200 500 16 "$TMP/09-card1.png" center
rounded_cover "$ROOT/public/images/bano-terminado-final.webp" 200 500 16 "$TMP/09-card2.png" center
rounded_cover "$ROOT/public/images/piscinas-800.webp" 200 500 16 "$TMP/09-card3.png" center
composite -geometry +520+64 "$TMP/09-card1.png" "$TMP/09-base.miff" "$TMP/09-a.miff"
composite -geometry +740+64 "$TMP/09-card2.png" "$TMP/09-a.miff" "$TMP/09-b.miff"
composite -geometry +960+64 "$TMP/09-card3.png" "$TMP/09-b.miff" "$TMP/09-c.miff"
composite -geometry +50+45 "$TMP/logo-260.png" "$TMP/09-c.miff" "$TMP/09-d.miff"
convert "$TMP/09-d.miff" \
  -fill "$MED_GOLD" -font "$BODY_BOLD" -pointsize 12 -kerning 2 -gravity northwest -annotate +50+120 'ARQUITECTURA & RESIDENCIAL DE LUJO' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 44 -annotate +50+175 'Diseño integral.' \
  -fill "$MED_TERRA" -annotate +50+225 'Ejecución perfecta.' \
  -fill '#C6CDCA' -font "$BODY_MED" -pointsize 15 -annotate +50+280 'Cocinas, baños, piscinas y viviendas' \
  -annotate +50+305 'con supervisión técnica en sitio.' \
  -fill 'rgba(26,40,31,0.88)' -draw 'roundrectangle 535,490 705,545 10,10 roundrectangle 755,490 925,545 10,10 roundrectangle 975,490 1145,545 10,10' \
  -fill "$MED_GOLD" -font "$BODY_BOLD" -pointsize 12 -annotate +550+518 '01 · COCINAS' -annotate +770+518 '02 · BAÑOS SPA' -annotate +990+518 '03 · EXTERIORES' \
  -fill "$MED_TERRA" -draw 'roundrectangle 50,450 470,550 16,16' \
  -fill "$MED_OLIVE" -font "$BODY_BOLD" -pointsize 13 -kerning 1 -annotate +80+482 '👉 SOLICITAR PROPUESTA TÉCNICA' \
  -pointsize 23 -kerning 0 -annotate +80+518 'WhatsApp 0422 799 7043' \
  "$TMP/09-final.miff"
finish "$TMP/09-final.miff" "09-mediterranean-carousel-mosaico-1200x628.jpg"

# ===========================================================================
# COLECCIÓN 4: CINEMA CASE STUDY & PRUEBA SOCIAL VERIFICADA (Editorial)
# ===========================================================================

# ---------------------------------------------------------------------------
# 10 · Cinema Case Study Antes/Después — Quinta La Lagunita (1080x1350)
# ---------------------------------------------------------------------------
convert -size 1080x1350 "xc:$CIN_BG" "$TMP/10-base.miff"
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-antes-1.webp" 480 620 18 "$TMP/10-before.png" center
rounded_cover "$ROOT/public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado-2.webp" 480 620 18 "$TMP/10-after.png" center
composite -geometry +50+150 "$TMP/10-before.png" "$TMP/10-base.miff" "$TMP/10-a.miff"
composite -geometry +550+150 "$TMP/10-after.png" "$TMP/10-a.miff" "$TMP/10-b.miff"
composite -geometry +50+52 "$TMP/logo-260.png" "$TMP/10-b.miff" "$TMP/10-c.miff"
convert "$TMP/10-c.miff" \
  -fill "$CIN_GOLD" -draw 'roundrectangle 560,60 1030,105 14,14' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 13 -kerning 1.5 -gravity northwest -annotate +595+75 '★ PROYECTO VERIFICADO · LA LAGUNITA' \
  -fill 'rgba(23,20,18,0.85)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 70,170 210,215 10,10 roundrectangle 570,170 820,215 10,10' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -annotate +95+186 'ANTES' -fill "$CIN_GOLD" -annotate +595+186 'DESPUÉS · OBRA TERMINADA' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 52 -annotate +50+830 'De un baño tradicional a' \
  -fill "$CIN_GOLD" -annotate +50+890 'una suite arquitectónica.' \
  -fill '#B8B2AC' -font "$BODY_MED" -pointsize 16 -annotate +50+950 '✓ Demolición completa e instalación de ventanales panorámicos de aluminio' \
  -annotate +50+980 '✓ Revestimiento continuo en microcemento mineral impermeable en suelos y muros' \
  -annotate +50+1010 '✓ Encimeras de hormigón arquitectónico con lavabos sobrepuestos' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 50,1130 1030,1270 18,18' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 15 -kerning 1.2 -annotate +95+1168 '👉 HAZ CLIC PARA VER EL RECORRIDO Y COTIZAR TU OBRA' \
  -pointsize 26 -kerning 0 -annotate +95+1210 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +760+1190 'GARANTÍA ESCRITA' \
  "$TMP/10-final.miff"
finish "$TMP/10-final.miff" "10-cinema-before-after-lagunita-1080x1350.jpg"

# ---------------------------------------------------------------------------
# 11 · Cinema Before/After Baño Caracas Square (1080x1080)
# ---------------------------------------------------------------------------
convert -size 1080x1080 "xc:$CIN_BG" "$TMP/11-base.miff"
cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp" 1080 620 "$TMP/11-hero.miff" center
rounded_cover "$ROOT/public/images/proyectos/bano-caracas/bano-principal-antes-1.webp" 320 260 16 "$TMP/11-thumb.png" center
composite -geometry +0+0 "$TMP/11-hero.miff" "$TMP/11-base.miff" "$TMP/11-a.miff"
composite -geometry +50+320 "$TMP/11-thumb.png" "$TMP/11-a.miff" "$TMP/11-b.miff"
convert "$TMP/11-b.miff" \
  -fill 'rgba(23,20,18,0.45)' -draw 'rectangle 0,0 1080,180' \
  -fill 'rgba(23,20,18,0.92)' -draw 'roundrectangle 65,335 220,380 10,10' \
  -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 1.5 -gravity northwest -annotate +90+350 'ANTES' \
  "$TMP/11-c.miff"
composite -geometry +50+44 "$TMP/logo-260.png" "$TMP/11-c.miff" "$TMP/11-d.miff"
convert "$TMP/11-d.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 13 -kerning 2 -gravity northwest -annotate +670+56 'TRANSFORMACIÓN REAL · CARACAS' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 46 -annotate +50+670 'El valor de la técnica en' \
  -fill "$CIN_GOLD" -annotate +50+722 'cada detalle residencial.' \
  -fill '#B8B2AC' -font "$BODY_MED" -pointsize 16 -annotate +50+780 '✓ Sanitarios suspendidos, espejos LED e instalaciones hidráulicas verificadas' \
  -annotate +50+810 '✓ Presupuesto por partidas detalladas y garantía por escrito de 100%' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 50,880 1030,1015 16,16' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +95+915 '👉 VER PRESUPUESTO DE ESTE PROYECTO Y COTIZAR TU HOGAR' \
  -pointsize 25 -kerning 0 -annotate +95+955 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 14 -kerning 1 -annotate +780+935 'CARACAS & VALENCIA' \
  "$TMP/11-final.miff"
finish "$TMP/11-final.miff" "11-cinema-before-after-caracas-1080x1080.jpg"

# ---------------------------------------------------------------------------
# 12 · Cinema Story Recorrido VIP San Diego (1080x1920)
# ---------------------------------------------------------------------------
convert -size 1080x1920 "xc:$CIN_BG" "$TMP/12-base.miff"
rounded_cover "$ROOT/public/images/proyectos/bano-san-diego/bano-en-proceso.webp" 960 480 20 "$TMP/12-proc.png" center
rounded_cover "$ROOT/public/images/proyectos/bano-san-diego/bano-finalizado-2.webp" 960 560 20 "$TMP/12-fin.png" center
composite -geometry +60+340 "$TMP/12-proc.png" "$TMP/12-base.miff" "$TMP/12-a.miff"
composite -geometry +60+860 "$TMP/12-fin.png" "$TMP/12-a.miff" "$TMP/12-b.miff"
composite -geometry +60+100 "$TMP/logo-300.png" "$TMP/12-b.miff" "$TMP/12-c.miff"
convert "$TMP/12-c.miff" \
  -fill "$CIN_GOLD" -font "$BODY_BOLD" -pointsize 14 -kerning 2.5 -gravity northwest -annotate +60+220 'CASE STUDY · SAN DIEGO, CARABOBO' \
  -fill "$WHITE" -font "$HEAD_BOLD" -pointsize 54 -annotate +60+275 'Del proceso al lujo terminado.' \
  -fill 'rgba(23,20,18,0.88)' -stroke "$CIN_GOLD" -strokewidth 1 -draw 'roundrectangle 90,370 660,425 12,12 roundrectangle 90,890 660,945 12,12' \
  -stroke none -fill "$WHITE" -font "$BODY_BOLD" -pointsize 14 -kerning 1.2 -annotate +120+390 '01 · EN OBRA: INSTALACIONES Y TÉCNICA' \
  -fill "$CIN_GOLD" -annotate +120+910 '02 · TERMINADO: SUITE TIPO SPA DE LUJO' \
  -fill "$CIN_GOLD" -draw 'roundrectangle 60,1500 1020,1670 22,22' \
  -fill "$CIN_BG" -font "$BODY_BOLD" -pointsize 17 -kerning 1.2 -annotate +110+1555 '👉 TOCA AQUÍ PARA AGENDAR VISITA TÉCNICA EN TU HOGAR' \
  -pointsize 32 -kerning 0 -annotate +110+1610 'WhatsApp 0422 799 7043' \
  -font "$BODY_BOLD" -pointsize 15 -kerning 1 -annotate +740+1585 'GARANTÍA ESCRITA' \
  -fill '#B8B2AC' -font "$BODY_MED" -pointsize 16 -annotate +130+1740 '¿Imaginas esta transformación en tu hogar? Cotiza hoy con RemodelaT.' \
  "$TMP/12-final.miff"
finish "$TMP/12-final.miff" "12-cinema-story-recorrido-vip-1080x1920.jpg"

# ===========================================================================
# VISTA GENERAL DE LA COLECCIÓN ÉLITE (Contact Sheet)
# ===========================================================================
echo "Generando preview-contact-sheet.jpg..."
montage "$OUT"/*.jpg \
  -thumbnail '360x450>' \
  -tile 4x3 \
  -geometry +16+16 \
  -background '#1A1C22' \
  -fill '#F4EBD9' \
  -font "$BODY_BOLD" \
  -pointsize 13 \
  -label '%f' \
  "$HERE/preview-contact-sheet.jpg"
identify "$HERE/preview-contact-sheet.jpg"
echo "¡Tanda 4 Élite generada exitosamente en $OUT!"
