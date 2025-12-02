# Arreglo definitivo de palabras corruptas
$tutorialPath = "c:\Users\Adri\temp_repo\tutorial"

$fixes = @(
    @('pgina', 'pagina'),
    @('Pgina', 'Pagina'),
    @('imgenes', 'imagenes'),
    @('Imgenes', 'Imagenes'),
    @('despus', 'despues'),
    @('Despus', 'Despues'),
    @('AQue', 'Aqui'),
    @('Ubicacin', 'Ubicacion'),
    @('ubicacin', 'ubicacion'),
    @('semntica', 'semantica'),
    @('Semntica', 'Semantica'),
    @('semntico', 'semantico'),
    @('Semntico', 'Semantico'),
    @('ttulo', 'titulo'),
    @('Ttulo', 'Titulo'),
    @('atrs', 'atras'),
    @('Atrs', 'Atras'),
    @('rpido', 'rapido'),
    @('Rpido', 'Rapido'),
    @('fcil', 'facil'),
    @('Fcil', 'Facil'),
    @('difcil', 'dificil'),
    @('Difcil', 'Dificil'),
    @('pblico', 'publico'),
    @('Pblico', 'Publico'),
    @('tcnico', 'tecnico'),
    @('Tcnico', 'Tecnico'),
    @('prtico', 'practico'),
    @('Prtico', 'Practico'),
    @('nmeros', 'numeros'),
    @('Nmeros', 'Numeros'),
    @('prrafos', 'parrafos'),
    @('Prrafos', 'Parrafos'),
    @('lnea', 'linea'),
    @('Lnea', 'Linea'),
    @('lneas', 'lineas'),
    @('Lneas', 'Lineas'),
    @('vdeo', 'video'),
    @('Vdeo', 'Video'),
    @('vdeos', 'videos'),
    @('Vdeos', 'Videos'),
    @('mquina', 'maquina'),
    @('Mquina', 'Maquina'),
    @('cdigos', 'codigos'),
    @('Cdigos', 'Codigos'),
    @('electrnico', 'electronico'),
    @('Electrnico', 'Electronico'),
    @('automtico', 'automatico'),
    @('Automtico', 'Automatico'),
    @('dinmico', 'dinamico'),
    @('Dinmico', 'Dinamico'),
    @('esttico', 'estatico'),
    @('Esttico', 'Estatico'),
    @('grfico', 'grafico'),
    @('Grfico', 'Grafico'),
    @('grficos', 'graficos'),
    @('Grficos', 'Graficos'),
    @('clculo', 'calculo'),
    @('Clculo', 'Calculo'),
    @('mtodo', 'metodo'),
    @('Mtodo', 'Metodo'),
    @('mtodos', 'metodos'),
    @('Mtodos', 'Metodos'),
    @('vrtica', 'vertical'),
    @('Vrtica', 'Vertical'),
    @('prrfos', 'parrafos'),
    @('Slo', 'Solo'),
    @('slo', 'solo'),
    @('cunto', 'cuanto'),
    @('Cunto', 'Cuanto'),
    @('dnde', 'donde'),
    @('Dnde', 'Donde'),
    @('cul', 'cual'),
    @('Cul', 'Cual'),
    @('quin', 'quien'),
    @('Quin', 'Quien')
)

$files = Get-ChildItem -Path $tutorialPath -Filter "nivel*.html"

foreach ($file in $files) {
    Write-Host "Procesando $($file.Name)..." -ForegroundColor Cyan
    $content = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    
    foreach ($fix in $fixes) {
        $content = $content.Replace($fix[0], $fix[1])
    }
    
    [IO.File]::WriteAllText($file.FullName, $content, [Text.UTF8Encoding]::new($false))
    Write-Host "  OK" -ForegroundColor Green
}

Write-Host "`nCompletado!" -ForegroundColor Yellow
