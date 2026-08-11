# -*- coding: utf-8 -*-
"""Flyer de reclutamiento – RemodelaT Venezuela (A4 retrato, 1654x2339 @200dpi)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import os

A = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(A)
F = os.path.join(A, "fonts")

W, H = 1654, 2339
M = 96
CW = W - 2 * M

BG      = (12, 12, 13)
BG2     = (22, 22, 24)
CARD    = (26, 26, 29)
GOLD    = (201, 162, 78)
GOLD_H  = (232, 197, 122)
GOLD_D  = (152, 118, 46)
WHITE   = (246, 244, 238)
MUTED   = (190, 187, 178)
INK     = (20, 17, 10)
LINE    = (58, 54, 44)

def font(name, size):
    return ImageFont.truetype(os.path.join(F, name), size)

SERIF_B = lambda s: font("CormorantGaramond-Bold.ttf", s)
SANS_R  = lambda s: font("Manrope-Regular.ttf", s)
SANS_M  = lambda s: font("Manrope-Medium.ttf", s)
SANS_SB = lambda s: font("Manrope-SemiBold.ttf", s)
SANS_B  = lambda s: font("Manrope-Bold.ttf", s)

img = Image.new("RGB", (W, H), BG)
dr = ImageDraw.Draw(img)

def text_w(fnt, s):
    return dr.textbbox((0, 0), s, font=fnt)[2]

def tracked(cx, y, s, fnt, fill, track=10):
    widths = [text_w(fnt, ch) for ch in s]
    total = sum(widths) + track * (len(s) - 1)
    x = cx - total / 2
    for ch, w in zip(s, widths):
        dr.text((x, y), ch, font=fnt, fill=fill)
        x += w + track
    return total

def wrap(s, fnt, max_w):
    words, lines, cur = s.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if text_w(fnt, t) <= max_w:
            cur = t
        else:
            lines.append(cur); cur = w_
    if cur: lines.append(cur)
    return lines

def gold_gradient(x0, y0, x1, y1, r=0):
    for i in range(x1 - x0):
        t = i / max(1, x1 - x0 - 1)
        c = tuple(int(GOLD_H[k] + (GOLD_D[k] - GOLD_H[k]) * (t ** 1.15)) for k in range(3))
        dr.line([(x0 + i, y0), (x0 + i, y1)], fill=c)
    if r:
        mask = Image.new("L", (W, H), 0)
        ImageDraw.Draw(mask).rounded_rectangle([x0, y0, x1, y1], radius=r, fill=255)
        band = img.crop((x0, y0, x1 + 1, y1 + 1))
        img.paste(band, (x0, y0), mask.crop((x0, y0, x1 + 1, y1 + 1)))

def cover(im, w, h, ax=0.5, ay=0.42):
    sw, sh = im.size
    k = max(w / sw, h / sh)
    im2 = im.resize((int(sw * k) + 1, int(sh * k) + 1), Image.LANCZOS)
    dx = int((im2.width - w) * ax)
    dy = int((im2.height - h) * ay)
    return im2.crop((dx, dy, dx + w, dy + h))

def rounded_paste(im2, box, rad):
    x, y = box
    mask = Image.new("L", im2.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im2.width - 1, im2.height - 1], radius=rad, fill=255)
    img.paste(im2, (x, y), mask)

def bullet(x, y, color=GOLD, s=12):
    dr.polygon([(x, y), (x + s, y + s // 2 + 2), (x, y + s + 4), (x - s, y + s // 2 + 2)], fill=color)

def chip(cx, y, s, fnt, fg, padx=36, pady=13):
    w = text_w(fnt, s) + padx * 2
    h = fnt.size + pady * 2
    dr.rounded_rectangle([cx - w / 2, y, cx + w / 2, y + h], radius=h / 2, outline=GOLD, width=3)
    dr.text((cx - text_w(fnt, s) / 2, y + pady - 2), s, font=fnt, fill=fg)
    return y + h

# viñeta sutil
vign = Image.new("L", (W, H), 0)
ImageDraw.Draw(vign).rounded_rectangle([M - 56, M - 56, W - M + 56, H - M + 56], radius=60, fill=26)
vign = vign.filter(ImageFilter.GaussianBlur(120))
img.paste(BG2, (0, 0), vign)

y = 48

# logo
logo = Image.open(os.path.join(REPO, "public/images/logo-footer.webp")).convert("RGBA")
lw = 520
lh = int(logo.height * lw / logo.width)
logo = logo.resize((lw, lh), Image.LANCZOS)
img.paste(logo, ((W - lw) // 2, y), logo)
y += lh + 26

# encabezado
tracked(W / 2, y, "EMPRESA DE REMODELACIONES DE ALTO ESTÁNDAR", SANS_SB(28), GOLD, track=11)
y += 28 + 18
t = "ESTAMOS CONTRATANDO"
f = SERIF_B(100)
dr.text(((W - text_w(f, t)) / 2, y), t, font=f, fill=WHITE)
y += f.size + 14
t2 = "OFICIALES DE ALBAÑILERÍA  ·  AYUDANTES DE ALBAÑIL"
f2 = SANS_SB(35)
dr.text(((W - text_w(f2, t2)) / 2, y), t2, font=f2, fill=MUTED)
y += 35 + 20
y = chip(W / 2, y, "TRABAJOS EXTRA · POR TEMPORADAS", SANS_B(27), GOLD) + 28

# foto héroe
hero = Image.open(os.path.join(A, "hero_porcelanato.jpg")).convert("RGB")
hh = 360
rounded_paste(cover(hero, CW, hh, ay=0.5), (M, y), 32)
ov = Image.new("L", (CW, 160), 0)
for i in range(160):
    ImageDraw.Draw(ov).line([(0, i), (CW, i)], fill=int(225 * (i / 160) ** 1.4))
dark = Image.new("RGB", (CW, 160), (10, 10, 11))
inc = Image.new("L", (CW, 160), 0)
ImageDraw.Draw(inc).rounded_rectangle([0, -80, CW, 159], radius=32, fill=255)
img.paste(dark, (M, y + hh - 160), ImageChops.multiply(ov, inc))
cap = "Colocación de porcelanato con sistema de nivelación por cuñas"
fc = SANS_M(26)
dr.text(((W - text_w(fc, cap)) / 2, y + hh - 72), cap, font=fc, fill=(240, 236, 226))
dr.rounded_rectangle([M, y, M + CW, y + hh], radius=32, outline=GOLD, width=3)
y += hh + 30

# tarjetas
def card(x, title, salario, nota, items, warn=None, accent=True):
    w = (CW - 40) // 2
    fI, fN_ = SANS_M(26), SANS_M(24)
    pad, gap = 38, 10
    lh_ = 40
    est = 138
    for it in items:
        est += len(wrap(it, fI, w - pad * 2 - 34)) * lh_ + gap + 6
    if warn:
        est += len(wrap(warn, fN_, w - pad * 2 - 110)) * 32 + 62
    h = est + pad - 6
    fill = (30, 28, 24) if accent else CARD
    dr.rounded_rectangle([x, y, x + w, y + h], radius=28, fill=fill,
                         outline=GOLD if accent else (70, 66, 56), width=3)
    ty = y + 32
    fT = SERIF_B(44)
    dr.text((x + pad, ty), title, font=fT, fill=GOLD_H if accent else GOLD)
    ty += 44 + 8
    fs = SANS_B(32)
    dr.text((x + pad, ty), salario, font=fs, fill=WHITE)
    fn_ = SANS_R(24)
    dr.text((x + pad + text_w(fs, salario) + 10, ty + 6), nota, font=fn_, fill=MUTED)
    ty += 32 + 2
    dr.line([(x + pad, ty + 10), (x + w - pad, ty + 10)], fill=LINE, width=2)
    ty += 32
    for it in items:
        for j, line in enumerate(wrap(it, fI, w - pad * 2 - 34)):
            if j == 0:
                bullet(x + pad + 12, ty + 9)
            dr.text((x + pad + 34, ty), line, font=fI, fill=(232, 229, 221))
            ty += lh_
        ty += gap
    if warn:
        ty += 12
        bx0, bx1 = x + pad, x + w - pad
        lines = wrap(warn, fN_, bx1 - bx0 - 110)
        bh = len(lines) * 32 + 30
        dr.rounded_rectangle([bx0, ty, bx1, ty + bh], radius=14, fill=(84, 26, 22))
        tx, tyc = bx0 + 44, ty + bh / 2
        dr.polygon([(tx, tyc - 20), (tx + 18, tyc + 14), (tx - 18, tyc + 14)], fill=GOLD_H)
        dr.line([(tx, tyc - 8), (tx, tyc + 3)], fill=(84, 26, 22), width=5)
        dr.line([(tx, tyc + 8), (tx, tyc + 10)], fill=(84, 26, 22), width=5)
        for k, line in enumerate(lines):
            dr.text((bx0 + 86, ty + 13 + k * 32), line, font=fN_, fill=(255, 216, 200))
    return h

items_of = [
    "Amplia experiencia comprobable en remodelación de viviendas.",
    "Porcelanato en pisos y paredes con sistema de nivelación por cuñas.",
    "Tabiquería interior y exterior; frisos.",
    "Trabajo muy fino: acabados de lujo, alto estándar.",
]
items_ay = [
    "No exigimos la misma trayectoria; se valora experiencia previa.",
    "Manejo de herramientas eléctricas (taladro, amoladora, mezcladora).",
    "Preparación de mezclas y apoyo al oficial en obra.",
    "Puntualidad, orden y ganas de aprender el oficio.",
]
warn_txt = "REQUISITOS EXCLUYENTES · Absténgase si no cumple TODOS los puntos: no haremos perder su tiempo ni el nuestro."

hA = card(M, "OFICIAL DE ALBAÑILERÍA", "600 – 800 USD", "/ mes", items_of, warn=warn_txt, accent=True)
hB = card(M + (CW - 40) // 2 + 40, "AYUDANTE DE ALBAÑIL", "400 – 600 USD", "/ mes", items_ay, warn=None, accent=False)
y += max(hA, hB) + 30

# banda PLUS
gold_gradient(M, y, M + CW - 1, y + 88, r=28)
fP = SANS_B(40)
tp = "PLUS EXTRA POR PRODUCTIVIDAD"
fsub = SANS_M(28)
sub = "¡Gana más según tu rendimiento!"
tot = text_w(fP, tp) + 40 + text_w(fsub, sub)
sx = (W - tot) / 2
dr.text((sx, y + 16), tp, font=fP, fill=INK)
dr.text((sx + text_w(fP, tp) + 40, y + 24), sub, font=fsub, fill=(58, 44, 18))
dr.text((M + 48, y + 2), "$", font=SERIF_B(66), fill=(58, 44, 18))
dr.text((M + CW - 112, y + 2), "$", font=SERIF_B(66), fill=(58, 44, 18))
y += 88 + 30

# horario + foto redonda
fh_b = SANS_R(26)
info_h = 302
bx_w = CW - 430
dr.rounded_rectangle([M, y, M + bx_w, y + info_h], radius=28, fill=CARD, outline=(70, 66, 56), width=3)
ty = y + 28
dr.text((M + 38, ty), "ZONA, HORARIO Y MODALIDAD", font=SANS_B(29), fill=GOLD)
ty += 29 + 16
info = [
    ("Zona de trabajo: San Diego, Carabobo.", True),
    ("Lunes a Viernes · Jornada de 8 horas.", True),
    ("Horario generalmente corrido: 8:00 am – 5:00 pm o 9:00 am – 5:00 pm.", False),
    ("Algunos trabajos exigen descanso al mediodía de 1 a 2 horas, según el sitio de obra.", False),
]
for txt, strong in info:
    ff = SANS_SB(27) if strong else fh_b
    first = True
    for line in wrap(txt, ff, bx_w - 76 - 34):
        if first:
            bullet(M + 38 + 12, ty + 8)
            first = False
        dr.text((M + 38 + 34, ty), line, font=ff, fill=WHITE if strong else (224, 221, 213))
        ty += 38
    ty += 8

bx2x = M + bx_w + 40
bw2 = CW - bx_w - 40
d = 240
bath = Image.open(os.path.join(A, "acabado_lujo.jpg")).convert("RGB")
circ = cover(bath, d, d)
maskc = Image.new("L", (d, d), 0)
ImageDraw.Draw(maskc).ellipse([0, 0, d - 1, d - 1], fill=255)
cx2 = bx2x + bw2 // 2
img.paste(circ, (cx2 - d // 2, y + 4), maskc)
dr.ellipse([cx2 - d / 2 - 8, y - 4, cx2 + d / 2 + 8, y + d + 12], outline=GOLD, width=5)
fcap = SANS_SB(23)
cap2 = "Nuestro estándar: acabados de lujo"
dr.text((cx2 - text_w(fcap, cap2) / 2, y + d + 22), cap2, font=fcap, fill=GOLD_H)
y += info_h + 34

# pie: contacto
gold_gradient(M, y, M + CW - 1, y + 180, r=32)
midy = y + 90
fz1 = SANS_B(32)
t_a = "POSTÚLATE HOY"
dr.text((M + 60, midy - 76), t_a, font=fz1, fill=(58, 44, 18))
dr.line([(M + 60, midy - 34), (M + 60 + text_w(fz1, t_a), midy - 34)], fill=(58, 44, 18), width=3)
fz2 = SANS_B(54)
dr.text((M + 60, midy - 20), "WhatsApp: +58 422-799.70.43", font=fz2, fill=INK)
fz3 = SANS_B(38)
t_c = "remodelat.net"
dr.text((M + CW - 60 - text_w(fz3, t_c), midy - 12), t_c, font=fz3, fill=INK)
fz4 = SANS_M(24)
t_d = "Remodelación · Cocinas · Baños · Obras civiles y acabados"
dr.text((M + CW - 60 - text_w(fz4, t_d), midy + 44), t_d, font=fz4, fill=(58, 44, 18))
y += 180 + 24

# nota final
fN = SANS_R(24)
nota = "Buscamos personal totalmente apto, con experiencia real y comprobable — ¡queremos conocerte!"
for line in wrap(nota, fN, CW - 160):
    dr.text(((W - text_w(fN, line)) / 2, y), line, font=fN, fill=(150, 147, 140))
    y += 34

# marco fino
dr.rounded_rectangle([26, 26, W - 26, H - 26], radius=40, outline=(84, 76, 56), width=2)

print("alto usado:", y, "de", H)
img.save(os.path.join(REPO, "flyer_empleo_remodelat.png"))
img.save(os.path.join(REPO, "flyer_empleo_remodelat.pdf"), resolution=200.0)
print("OK")
