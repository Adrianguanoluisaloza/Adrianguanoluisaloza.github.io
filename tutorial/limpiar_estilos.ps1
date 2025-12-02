# Script para limpiar todos los archivos HTML de estilos locales
# y aplicar el CSS/JS universal

$tutorialPath = "c:\Users\Adri\temp_repo\tutorial"

# Procesar cada nivel
for ($i = 1; $i -le 23; $i++) {
    $num = $i.ToString("00")
    $file = "$tutorialPath\nivel$num.html"
    
    if (Test-Path $file) {
        Write-Host "Procesando nivel$num.html..." -ForegroundColor Cyan
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # 1. Eliminar todo el bloque <style>...</style>
        $content = $content -replace '(?s)<style>.*?</style>\s*', ''
        
        # 2. Eliminar links a CSS antiguos
        $content = $content -replace '<link[^>]*estilos-universales\.css[^>]*>\s*', ''
        $content = $content -replace '<link[^>]*href="css/[^"]*"[^>]*>\s*', ''
        
        # 3. Eliminar scripts antiguos
        $content = $content -replace '<script[^>]*efectos\.js[^>]*></script>\s*', ''
        $content = $content -replace '<script[^>]*src="js/[^"]*"[^>]*></script>\s*', ''
        
        # 4. Agregar data-nivel al body
        $content = $content -replace '<body>', "<body data-nivel=`"$i`">"
        $content = $content -replace '<body data-nivel="[^"]*" data-nivel', '<body data-nivel'
        
        # 5. Agregar los nuevos CSS y JS despues de </title>
        $cssJs = @"
    <link rel="stylesheet" href="css/codequest.css">
    <script src="js/codequest.js" defer></script>
"@
        
        # Verificar si ya tiene los nuevos archivos
        if ($content -notmatch 'codequest\.css') {
            $content = $content -replace '(</title>)', "`$1`n$cssJs"
        }
        
        # 6. Limpiar multiples saltos de linea
        $content = $content -replace '(\r?\n){3,}', "`n`n"
        
        # Guardar
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
        
        Write-Host "  Completado!" -ForegroundColor Green
    }
}

Write-Host "`nTodos los niveles procesados!" -ForegroundColor Yellow
