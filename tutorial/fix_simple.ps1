# Script SIMPLE para limpiar estilos y agregar CSS/JS universal
$tutorialPath = "c:\Users\Adri\temp_repo\tutorial"

for ($i = 1; $i -le 23; $i++) {
    $num = $i.ToString("00")
    $file = "$tutorialPath\nivel$num.html"
    
    if (Test-Path $file) {
        Write-Host "Procesando nivel$num.html..." -ForegroundColor Cyan
        
        $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        
        # Eliminar bloque style
        $content = [regex]::Replace($content, '<style[\s\S]*?</style>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        
        # Eliminar links CSS
        $content = [regex]::Replace($content, '<link[^>]*\.css[^>]*>', '')
        
        # Eliminar scripts con src
        $content = [regex]::Replace($content, '<script[^>]*src=[^>]*></script>', '')
        
        # Agregar CSS/JS si no existe
        if ($content -notmatch 'codequest\.css') {
            $cssJs = "`n    <link rel=`"stylesheet`" href=`"css/codequest.css`">`n    <script src=`"js/codequest.js`" defer></script>"
            $content = $content -replace '(</title>)', "`$1$cssJs"
        }
        
        # Data-nivel en body
        if ($content -match '<body[^>]*>' -and $content -notmatch 'data-nivel') {
            $content = $content -replace '<body', "<body data-nivel=`"$i`""
        }
        
        # Limpiar lineas vacias
        $content = [regex]::Replace($content, '(\r?\n){3,}', "`n`n")
        $content = $content.TrimStart()
        
        $utf8 = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file, $content, $utf8)
        
        Write-Host "  OK" -ForegroundColor Green
    }
}
Write-Host "Completado!" -ForegroundColor Yellow
