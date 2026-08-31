#!/usr/bin/env bash

echo "=================================================="
echo "⚽ Iniciando ScoreCraft - Arquitectura Microservicios"
echo "=================================================="

# 1. Start SQL Server container
echo "[1/5] Verificando base de datos SQL Server..."
docker start sql-server-local 2>/dev/null || true

# 2. Start team-service (Port 8081)
echo "[2/5] Levantando Team Service (Puerto 8081)..."
(cd "$(dirname "$0")/team-service" && ./mvnw spring-boot:run > ../team-service.log 2>&1) &
TEAM_PID=$!
echo "  -> Team Service PID: $TEAM_PID"

# 3. Start match-service (Port 8082)
echo "[3/5] Levantando Match Service (Puerto 8082)..."
(cd "$(dirname "$0")/match-service" && ./mvnw spring-boot:run > ../match-service.log 2>&1) &
MATCH_PID=$!
echo "  -> Match Service PID: $MATCH_PID"

# 4. Start standing-service (Port 8083)
echo "[4/5] Levantando Standing Service (Puerto 8083)..."
(cd "$(dirname "$0")/standing-service" && ./mvnw spring-boot:run > ../standing-service.log 2>&1) &
STANDING_PID=$!
echo "  -> Standing Service PID: $STANDING_PID"

# 5. Start api-gateway (Port 8080)
echo "[5/5] Levantando API Gateway (Puerto 8080)..."
(cd "$(dirname "$0")/api-gateway" && ./mvnw spring-boot:run > ../api-gateway.log 2>&1) &
GATEWAY_PID=$!
echo "  -> API Gateway PID: $GATEWAY_PID"

echo ""
echo "✅ Microservicios iniciados en segundo plano."
echo "Para ver logs en tiempo real: tail -f scorecraft-microservices/*.log"
echo "Para detener todos los servicios: ./scorecraft-microservices/stop-all.sh"
echo ""
echo "🚀 Para iniciar el Frontend (React + Vite):"
echo "   cd scorecraft-microservices/frontend"
echo "   pnpm dev"
echo "=================================================="
