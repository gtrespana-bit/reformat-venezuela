# optimize-fonts.ps1 (v5 - Con User-Agent moderno para obtener woff2)
$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Descargando fuentes desde Google Fonts..." -ForegroundColor Cyan

$fontsDir = "public/fonts"
$cssFile = "src/styles/global.css"
$layoutFile = "src/layouts/BaseLayout.astro"

if (!(Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null
}

# URL con User-Agent moderno para obtener woff2
$googleCssUrl = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap"
$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

Write-Host "Conectando a Google Fonts (con User-Agent moderno)..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $googleCssUrl -UseBasicParsing -UserAgent $userAgent
    $cssRaw = $response.Content
} catch {
    Write-Host ("ERROR de conexion: " + $_.Exception.Message) -ForegroundColor Red
    exit 1
}

# Verificar que devuelve woff2
if ($cssRaw -notmatch 'woff2') {
    Write-Host "ERROR: Google Fonts no devolvio woff2. Verifica tu conexion." -ForegroundColor Red
    Write-Host "Contenido recibido (primeros 500 chars):" -ForegroundColor Yellow
    Write-Host $cssRaw.Substring(0, [Math]::Min(500, $cssRaw.Length))
    exit 1
}

Write-Host "Analizando bloques @font-face..." -ForegroundColor Cyan
$downloadedCount = 0
$blocks = $cssRaw -split '@font-face'

foreach ($block in $blocks) {
    if ($block -notmatch 'font-family') { continue }

    $family = 'unknown'
    if ($block -match 'font-family:\s*["'']([^"''"]+)["'']') { 
        $family = $Matches[1].ToLower().Replace(' ', '-') 
    }

    $weight = '400'
    if ($block -match 'font-weight:\s*(\d+)') { 
        $weight = $Matches[1] 
    }

    $url = $null
    if ($block -match 'url\(\s*([^)]+\.woff2)') { 
        $url = $Matches[1].Trim()
        if ($url.StartsWith('//')) { 
            $url = 'https:' + $url 
        }
    }

    if ($url -and $family -ne 'unknown') {
        $ver = if ($family -like '*cormorant*') { 'v21' } else { 'v15' }
        $fileName = "$family-$ver-latin-$weight.woff2"
        $dest = Join-Path $fontsDir $fileName

        if (Test-Path $dest) {
            Write-Host ("[Salto] " + $fileName) -ForegroundColor DarkYellow
            $downloadedCount++
            continue
        }

        Write-Host ("Descargando: " + $fileName) -ForegroundColor Yellow
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -UserAgent $userAgent
            $size = [math]::Round((Get-Item $dest).Length / 1KB, 1)
            Write-Host ("OK: " + $fileName + " (" + $size + " KB)") -ForegroundColor Green
            $downloadedCount++
        } catch {
            Write-Host ("ERROR: " + $_.Exception.Message) -ForegroundColor Red
        }
    }
}

if ($downloadedCount -eq 0) {
    Write-Host "No se descargaron fuentes." -ForegroundColor Yellow
    exit 1
}

# Generar global.css
Write-Host ("Actualizando " + $cssFile) -ForegroundColor Cyan
$cssContent = @'
@font-face { font-family: 'Cormorant Garamond'; font-weight: 400; font-display: swap; src: url('/fonts/cormorant-garamond-v21-latin-400.woff2') format('woff2'); }
@font-face { font-family: 'Cormorant Garamond'; font-weight: 500; font-display: swap; src: url('/fonts/cormorant-garamond-v21-latin-500.woff2') format('woff2'); }
@font-face { font-family: 'Cormorant Garamond'; font-weight: 600; font-display: swap; src: url('/fonts/cormorant-garamond-v21-latin-600.woff2') format('woff2'); }
@font-face { font-family: 'Cormorant Garamond'; font-weight: 700; font-display: swap; src: url('/fonts/cormorant-garamond-v21-latin-700.woff2') format('woff2'); }

@font-face { font-family: 'Manrope'; font-weight: 400; font-display: swap; src: url('/fonts/manrope-v15-latin-400.woff2') format('woff2'); }
@font-face { font-family: 'Manrope'; font-weight: 500; font-display: swap; src: url('/fonts/manrope-v15-latin-500.woff2') format('woff2'); }
@font-face { font-family: 'Manrope'; font-weight: 600; font-display: swap; src: url('/fonts/manrope-v15-latin-600.woff2') format('woff2'); }

:root {
  --bg: #0a0a0a; --white: #ffffff; --gray: #f8f9fa; --gray-text: #4a4a4a;
  --gold: #C9A961; --gold-light: #E5C98E;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-sans); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
img, video { max-width: 100%; height: auto; display: block; }
a { text-decoration: none; color: inherit; }
button { font: inherit; cursor: pointer; border: none; background: none; }
ul { list-style: none; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
'@

Set-Content -Path $cssFile -Value $cssContent -Encoding UTF8
Write-Host ("OK: " + $cssFile) -ForegroundColor Green

# Actualizar BaseLayout.astro
Write-Host ("Actualizando " + $layoutFile) -ForegroundColor Cyan
$layoutContent = Get-Content -Path $layoutFile -Raw
$layoutContent = $layoutContent -replace '<link[^>]*fonts\.googleapis\.com[^>]*>', ''
$layoutContent = $layoutContent -replace '<link[^>]*fonts\.gstatic\.com[^>]*>', ''
$layoutContent = $layoutContent -replace '<link[^>]*rel="preconnect"[^>]*fonts\.[^>]*>', ''

$preloadLinks = @"
  <link rel="preload" href="/fonts/cormorant-garamond-v21-latin-400.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/cormorant-garamond-v21-latin-500.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/cormorant-garamond-v21-latin-600.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/cormorant-garamond-v21-latin-700.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/manrope-v15-latin-400.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/manrope-v15-latin-500.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/manrope-v15-latin-600.woff2" as="font" type="font/woff2" crossorigin />
"@

$replacement = '<Analytics />' + "`n" + $preloadLinks
if ($layoutContent -match '<Analytics\s*/>') {
    $layoutContent = $layoutContent -replace '<Analytics\s*/>', $replacement
    Write-Host "OK: Preloads inyectados." -ForegroundColor Green
}

Set-Content -Path $layoutFile -Value $layoutContent -Encoding UTF8
Write-Host ("OK: " + $layoutFile) -ForegroundColor Green

Write-Host ""
Write-Host "PROCESO COMPLETADO" -ForegroundColor Green
Write-Host ""
Write-Host "Ejecuta ahora:" -ForegroundColor Yellow
Write-Host " git add ." -ForegroundColor White
Write-Host " git commit -m 'perf: self-host Google Fonts to eliminate render-blocking requests' " -ForegroundColor White
Write-Host " git push origin main" -ForegroundColor White