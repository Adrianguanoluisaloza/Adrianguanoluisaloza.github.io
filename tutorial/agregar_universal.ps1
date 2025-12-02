# Script para agregar CSS y JS universales correctamente
# Solo agrega al </head> real y </body> real del documento principal

$archivos = Get-ChildItem -Path "c:\Users\Adri\html curso\tutorial" -Filter "*.html"

foreach ($archivo in $archivos) {
    Write-Host "Procesando: $($archivo.Name)" -ForegroundColor Cyan
    
    $contenido = Get-Content $archivo.FullName -Raw -Encoding UTF8
    
    # Verificar si ya tiene CSS (solo contar en el head real, no en scripts)
    $tieneCSS = $contenido -match '^\s*<link rel="stylesheet" href="css/estilos-universales\.css">'
    
    # Contar cuantas veces aparece </head> - debería ser solo 1
    $headsCount = ([regex]::Matches($contenido, '</head>')).Count
    
    if ($headsCount -eq 1) {
        # Solo hay un </head>, agregar CSS antes si no existe
        if (-not ($contenido -match '<link rel="stylesheet" href="css/estilos-universales\.css">\s*</head>')) {
            $contenido = $contenido -replace '</head>', '    <link rel="stylesheet" href="css/estilos-universales.css">' + "`n" + '</head>'
            Write-Host "  + CSS agregado" -ForegroundColor Green
        }
    }
    
    # Para el script, solo agregar al final del archivo real
    if (-not ($contenido -match '<script src="js/efectos\.js"></script>\s*</body>\s*</html>\s*$')) {
        $contenido = $contenido -replace '</body>\s*</html>\s*$', '    <script src="js/efectos.js"></script>' + "`n" + '</body>' + "`n" + '</html>' + "`n"
        Write-Host "  + Script agregado" -ForegroundColor Green
    }
    
    Set-Content -Path $archivo.FullName -Value $contenido -Encoding UTF8 -NoNewline
}

Write-Host "`n¡Completado!" -ForegroundColor Yellow
