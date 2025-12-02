$path = "c:\Users\Adri\html curso\tutorial"
$files = Get-ChildItem -Path $path -Filter "*.html"

foreach($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if($content -notmatch 'js/efectos\.js') {
        $newContent = $content -replace '</body>', "    <script src=`"js/efectos.js`"></script>`r`n</body>"
        Set-Content $file.FullName $newContent -Encoding UTF8 -NoNewline
        Write-Host "Actualizado: $($file.Name)"
    } else {
        Write-Host "Ya tiene script: $($file.Name)"
    }
}

Write-Host "`nProceso completado!"
