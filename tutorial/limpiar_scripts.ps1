$path = "c:\Users\Adri\html curso\tutorial"
$files = Get-ChildItem -Path $path -Filter "*.html"

foreach($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Contar cuantas veces aparece el script
    $count = ([regex]::Matches($content, 'js/efectos\.js')).Count
    
    if($count -gt 1) {
        Write-Host "Limpiando duplicados en: $($file.Name) ($count encontrados)"
        
        # Quitar todas las referencias
        $content = $content -replace '    <script src="js/efectos.js"></script>\r?\n', ''
        
        # Agregar solo una vez antes de </body>
        $content = $content -replace '</body>', "    <script src=`"js/efectos.js`"></script>`r`n</body>"
        
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "  -> Corregido"
    }
    elseif($count -eq 0) {
        Write-Host "Agregando script a: $($file.Name)"
        $content = $content -replace '</body>', "    <script src=`"js/efectos.js`"></script>`r`n</body>"
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
    }
    else {
        Write-Host "OK: $($file.Name)"
    }
}

Write-Host "`nLimpieza completada!"
