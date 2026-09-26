@echo off
echo ==================================================
echo Iniciando ScoreCraft - Microservicios (Windows)
echo ==================================================

set ROOT_DIR=%~dp0

echo [1/5] Iniciando Team Service (Puerto 8081)...
start "ScoreCraft - Team Service (8081)" cmd /k "cd /d %ROOT_DIR%team-service && .\mvnw.cmd spring-boot:run"

echo [2/5] Iniciando Match Service (Puerto 8082)...
start "ScoreCraft - Match Service (8082)" cmd /k "cd /d %ROOT_DIR%match-service && .\mvnw.cmd spring-boot:run"

echo [3/5] Iniciando Standing Service (Puerto 8083)...
start "ScoreCraft - Standing Service (8083)" cmd /k "cd /d %ROOT_DIR%standing-service && .\mvnw.cmd spring-boot:run"

echo [4/5] Iniciando API Gateway (Puerto 8080)...
start "ScoreCraft - API Gateway (8080)" cmd /k "cd /d %ROOT_DIR%api-gateway && .\mvnw.cmd spring-boot:run"

echo [5/5] Iniciando Frontend React (Puerto 5173)...
start "ScoreCraft - Frontend React (5173)" cmd /k "cd /d %ROOT_DIR%frontend && pnpm dev"

echo.
echo Todos los microservicios y el Frontend han sido lanzados.
echo Frontend: http://localhost:5173
echo API Gateway: http://localhost:8080
echo Para detener todos los servicios ejecuta: stop-all.bat
echo ==================================================
