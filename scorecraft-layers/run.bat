@echo off
echo ==================================================
echo Iniciando ScoreCraft - Arquitectura en Capas (Monolito)
echo ==================================================
set ROOT_DIR=%~dp0
cd /d %ROOT_DIR%
.\mvnw.cmd spring-boot:run
