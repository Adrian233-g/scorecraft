$root = $PSScriptRoot

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Iniciando ScoreCraft - Microservicios (PowerShell)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

Write-Host "[1/5] Iniciando Team Service (8081)..."
Start-Process cmd -ArgumentList "/k cd /d `"$root\team-service`" && .\mvnw.cmd spring-boot:run"

Write-Host "[2/5] Iniciando Match Service (8082)..."
Start-Process cmd -ArgumentList "/k cd /d `"$root\match-service`" && .\mvnw.cmd spring-boot:run"

Write-Host "[3/5] Iniciando Standing Service (8083)..."
Start-Process cmd -ArgumentList "/k cd /d `"$root\standing-service`" && .\mvnw.cmd spring-boot:run"

Write-Host "[4/5] Iniciando API Gateway (8080)..."
Start-Process cmd -ArgumentList "/k cd /d `"$root\api-gateway`" && .\mvnw.cmd spring-boot:run"

Write-Host "[5/5] Iniciando Frontend React (5173)..."
Start-Process cmd -ArgumentList "/k cd /d `"$root\frontend`" && pnpm dev"

Write-Host ""
Write-Host "Todos los servicios fueron iniciados en ventanas independientes." -ForegroundColor Green
Write-Host "Frontend:    http://localhost:5173" -ForegroundColor Yellow
Write-Host "API Gateway: http://localhost:8080" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan
