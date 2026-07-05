Add-Type -AssemblyName System.Drawing
$base = "C:\Users\kr-im\.openclaw\workspace\reformat-venezuela\public"
$files = Get-ChildItem -Path $base -Recurse -Include *.webp,*.jpg,*.png | Where-Object { $_.Name -notmatch "400|600|favicon" }
foreach ($f in $files) {
    try {
        $bmp = [System.Drawing.Image]::FromFile($f.FullName)
        $rel = $f.FullName.Replace($base + "\", "")
        Write-Output "$rel|$($bmp.Width)|$($bmp.Height)"
        $bmp.Dispose()
    } catch {
        $rel = $f.FullName.Replace($base + "\", "")
        Write-Output "$rel|error|error"
    }
}
