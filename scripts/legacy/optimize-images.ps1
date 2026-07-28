# optimize-images.ps1
# Script completo para generar imágenes WebP optimizadas con srcset (400px y 800px)
# Requiere: ImageMagick instalado

$ErrorActionPreference = "Stop"

# Configuración
$imagesDir = "public/images"
$quality = 85

# Buscar automáticamente ImageMagick
$magickPath = $null
$possiblePaths = @(
    "C:\Program Files\ImageMagick-*\magick.exe",
    "C:\Program Files (x86)\ImageMagick-*\magick.exe"
)

foreach ($pattern in $possiblePaths) {
    $found = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
    if ($found) {
        $magickPath = $found
        break
    }
}

if (!$magickPath) {
    Write-Host "ERROR: No se encontro ImageMagick (magick.exe)" -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUCION: Usa la version de Node.js:" -ForegroundColor Yellow
    Write-Host "   npm install sharp" -ForegroundColor White
    Write-Host "   node optimize-images.js" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "OK: ImageMagick encontrado: $magickPath" -ForegroundColor Green
Write-Host ""

# Lista de imagenes
$sliderImages = @(
    "cocina",
    "bano",
    "electricidad",
    "fontaneria",
    "revestimientos",
    "suelo-porcelanato",
    "piscinas"
)

# Logos
$logos = @{
    "logo" = @("200:logo-header", "500:logo-footer")
}

function Convert-Image {
    param(
        [string]$inputFile,
        [string]$outputFile,
        [int]$width
    )

    if (!(Test-Path $inputFile)) {
        Write-Host "ERROR: No encontrado: $inputFile" -ForegroundColor Red
        return $false
    }

    Write-Host "Procesando: $inputFile -> $outputFile ($width px)" -ForegroundColor Yellow

    & $magickPath $inputFile -resize "${width}x>" -quality $quality $outputFile

    if ($LASTEXITCODE -eq 0) {
        $originalSize = (Get-Item $inputFile).Length / 1KB
        $newSize = (Get-Item $outputFile).Length / 1KB
        $savings = ((1 - $newSize / $originalSize) * 100).ToString("0.0")
        Write-Host "OK: $($originalSize.ToString('0.0')) KB -> $($newSize.ToString('0.0')) KB (ahorro: ${savings}%)" -ForegroundColor Green
        return $true
    } else {
        Write-Host "ERROR al procesar $inputFile" -ForegroundColor Red
        return $false
    }
}

Write-Host "Optimizando imagenes para srcset..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$errorCount = 0

Write-Host "Procesando imagenes del slider..." -ForegroundColor Cyan
foreach ($name in $sliderImages) {
    $original = Join-Path $imagesDir "$name.webp"

    if (!(Test-Path $original)) {
        Write-Host "ADVERTENCIA: Saltando $name.webp (no existe)" -ForegroundColor DarkYellow
        continue
    }

    if (Convert-Image -inputFile $original -outputFile (Join-Path $imagesDir "$name-400.webp") -width 400) {
        $successCount++
    } else {
        $errorCount++
    }

    if (Convert-Image -inputFile $original -outputFile (Join-Path $imagesDir "$name-800.webp") -width 800) {
        $successCount++
    } else {
        $errorCount++
    }
}

Write-Host ""
Write-Host "Procesando logos..." -ForegroundColor Cyan
foreach ($entry in $logos.GetEnumerator()) {
    $baseName = $entry.Key
    $original = Join-Path $imagesDir "$baseName.webp"

    if (!(Test-Path $original)) {
        Write-Host "ADVERTENCIA: Saltando $baseName.webp (no existe)" -ForegroundColor DarkYellow
        continue
    }

    foreach ($spec in $entry.Value) {
        $parts = $spec -split ":"
        $width = [int]$parts[0]
        $outputName = $parts[1]

        if (Convert-Image -inputFile $original -outputFile (Join-Path $imagesDir "$outputName.webp") -width $width) {
            $successCount++
        } else {
            $errorCount++
        }
    }
}

Write-Host ""
Write-Host "Proceso completado!" -ForegroundColor Green
Write-Host "Exitos: $successCount" -ForegroundColor Green
if ($errorCount -gt 0) {
    Write-Host "Errores: $errorCount" -ForegroundColor Red
} else {
    Write-Host "Errores: $errorCount" -ForegroundColor Green
}
Write-Host "Imagenes generadas en: $imagesDir" -ForegroundColor Cyan

if ($errorCount -eq 0) {
    Write-Host ""
    Write-Host "Archivos creados:" -ForegroundColor Cyan
    Write-Host "   - *-400.webp (para movil)" -ForegroundColor White
    Write-Host "   - *-800.webp (para desktop)" -ForegroundColor White
    Write-Host "   - logo-header.webp, logo-footer.webp" -ForegroundColor White
    Write-Host ""
    Write-Host "Ahora ejecuta:" -ForegroundColor Yellow
    Write-Host "   git add public/images/" -ForegroundColor White
    Write-Host "   git commit -m 'perf: add responsive image variants for srcset'" -ForegroundColor White
    Write-Host "   git push origin main" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "ADVERTENCIA: Algunos archivos fallaron. Revisa los errores arriba." -ForegroundColor Yellow
}