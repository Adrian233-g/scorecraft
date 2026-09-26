@echo off
echo Deteniendo microservicios de ScoreCraft (puertos 8080, 8081, 8082, 8083, 5173)...

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop-all.ps1"

pause
