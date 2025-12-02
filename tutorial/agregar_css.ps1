# Script para agregar el CSS universal a todos los niveles
# Ejecutar desde la carpeta tutorial

$archivos = Get-ChildItem -Path "." -Filter "*.html"

foreach ($archivo in $archivos) {
    $contenido = Get-Content $archivo.FullName -Raw -Encoding UTF8
    
    # Verificar si ya tiene el CSS universal
    if ($contenido -match 'estilos-universales\.css') {
        Write-Host "Ya tiene CSS: $($archivo.Name)" -ForegroundColor Yellow
        continue
    }
    
    # Agregar el link al CSS antes del </head>
    $linkCSS = '    <link rel="stylesheet" href="css/estilos-universales.css">'
    
    if ($contenido -match '</head>') {
        $nuevoContenido = $contenido -replace '</head>', "$linkCSS`n</head>"
        Set-Content -Path $archivo.FullName -Value $nuevoContenido -Encoding UTF8 -NoNewline
        Write-Host "CSS agregado a: $($archivo.Name)" -ForegroundColor Green
    } else {
        Write-Host "No se encontro </head> en: $($archivo.Name)" -ForegroundColor Red
    }
}

Write-Host "`n¡Proceso completado!" -ForegroundColor Cyan
