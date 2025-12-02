# Script DEFINITIVO para limpiar TODOS los estilos locales
# y arreglar la codificacion de caracteres

$tutorialPath = "c:\Users\Adri\temp_repo\tutorial"

# Mapeo de caracteres corruptos a correctos
$replacements = @{
    '�' = ''
    '??' = ''
    '?Qu' = 'Que'
    'Qu�' = 'Que'
    'Analog�as' = 'Analogias'
    'navegaci�n' = 'navegacion'
    'p�gina' = 'pagina'
    'sem�ntico' = 'semantico'
    'men�s' = 'menus'
    'men�' = 'menu'
    'dise�o' = 'diseno'
    't�pica' = 'tipica'
    'Ubicaci�n' = 'Ubicacion'
    'secci�n' = 'seccion'
    'Secci�n' = 'Seccion'
    'c�digo' = 'codigo'
    'C�digo' = 'Codigo'
    'est�' = 'esta'
    'Est�' = 'Esta'
    'tambi�n' = 'tambien'
    'Tambi�n' = 'Tambien'
    'm�s' = 'mas'
    'M�s' = 'Mas'
    'informaci�n' = 'informacion'
    'Informaci�n' = 'Informacion'
    'direcci�n' = 'direccion'
    'b�sico' = 'basico'
    'B�sico' = 'Basico'
    'b�sica' = 'basica'
    'pr�ctica' = 'practica'
    'Pr�ctica' = 'Practica'
    'espec�fica' = 'especifica'
    'n�mero' = 'numero'
    'p�rrafo' = 'parrafo'
    'versi�n' = 'version'
    'instrucci�n' = 'instruccion'
    'funci�n' = 'funcion'
    'aplicaci�n' = 'aplicacion'
    'configuraci�n' = 'configuracion'
    'descripci�n' = 'descripcion'
    'explicaci�n' = 'explicacion'
    'soluci�n' = 'solucion'
    'atenci�n' = 'atencion'
    'conexi�n' = 'conexion'
    'acci�n' = 'accion'
    'creaci�n' = 'creacion'
    'definici�n' = 'definicion'
    'introducci�n' = 'introduccion'
    'posici�n' = 'posicion'
    'animaci�n' = 'animacion'
    'transici�n' = 'transicion'
    'opci�n' = 'opcion'
    'extensi�n' = 'extension'
    'dimensi�n' = 'dimension'
    'resoluci�n' = 'resolucion'
    'validaci�n' = 'validacion'
    'organizaci�n' = 'organizacion'
    'comunicaci�n' = 'comunicacion'
    'navegador' = 'navegador'
    '�nico' = 'unico'
    '�ltimo' = 'ultimo'
    'a�adir' = 'anadir'
    'peque�o' = 'pequeno'
    'peque�a' = 'pequena'
    'compa��a' = 'compania'
    'espa�ol' = 'espanol'
    'a�o' = 'ano'
    '�' = 'i'
    '�' = 'o'
    '�' = 'a'
    '�' = 'e'
    '�' = 'u'
    '�' = 'n'
    '�' = 'I'
    '�' = 'O'
    '�' = 'A'
    '�' = 'E'
    '�' = 'U'
    '�' = 'N'
}

for ($i = 1; $i -le 23; $i++) {
    $num = $i.ToString("00")
    $file = "$tutorialPath\nivel$num.html"
    
    if (Test-Path $file) {
        Write-Host "Procesando nivel$num.html..." -ForegroundColor Cyan
        
        # Leer con encoding UTF8
        $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        
        # 1. Eliminar todo el bloque <style>...</style> (incluyendo multilinea)
        $content = [regex]::Replace($content, '<style[\s\S]*?</style>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        
        # 2. Eliminar links CSS existentes
        $content = [regex]::Replace($content, '<link[^>]*\.css[^>]*>', '')
        
        # 3. Eliminar scripts existentes con src
        $content = [regex]::Replace($content, '<script[^>]*src=[^>]*></script>', '')
        
        # 4. Arreglar caracteres corruptos
        foreach ($key in $replacements.Keys) {
            $content = $content.Replace($key, $replacements[$key])
        }
        
        # 5. Asegurar que tiene el CSS y JS universal despues de </title>
        if ($content -notmatch 'codequest\.css') {
            $cssJs = "`n    <link rel=`"stylesheet`" href=`"css/codequest.css`">`n    <script src=`"js/codequest.js`" defer></script>"
            $content = $content -replace '(</title>)', "`$1$cssJs"
        }
        
        # 6. Asegurar data-nivel en body
        if ($content -match '<body[^>]*>') {
            $bodyTag = $matches[0]
            if ($bodyTag -notmatch 'data-nivel') {
                $newBodyTag = $bodyTag -replace '<body', "<body data-nivel=`"$i`""
                $content = $content.Replace($bodyTag, $newBodyTag)
            }
        }
        
        # 7. Limpiar lineas vacias multiples
        $content = [regex]::Replace($content, '(\r?\n){3,}', "`n`n")
        
        # 8. Limpiar espacios al inicio
        $content = $content.TrimStart()
        
        # Guardar con UTF8 sin BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file, $content, $utf8NoBom)
        
        Write-Host "  OK - Limpiado y corregido" -ForegroundColor Green
    }
}

Write-Host "`nProceso completado!" -ForegroundColor Yellow
