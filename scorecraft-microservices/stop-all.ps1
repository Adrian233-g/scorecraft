Write-Host "Deteniendo servicios en puertos 8080, 8081, 8082, 8083, 5173..." -ForegroundColor Cyan

$ports = @(8080, 8081, 8082, 8083, 5173)
foreach ($p in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($c in $connections) {
            Write-Host "Deteniendo proceso en puerto $p (PID: $($c.OwningProcess))..." -ForegroundColor Yellow
            Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "Todos los servicios han sido detenidos correctamente." -ForegroundColor Green
