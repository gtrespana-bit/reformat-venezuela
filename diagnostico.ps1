# diagnostico.ps1
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$url = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
Write-Host "=== PRIMEROS 1000 CARACTERES DEL CSS ===" -ForegroundColor Cyan
Write-Host $response.Content.Substring(0, [Math]::Min(1000, $response.Content.Length))
Write-Host ""
Write-Host "=== TOTAL DE CARACTERES: $($response.Content.Length) ===" -ForegroundColor Yellow