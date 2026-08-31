#!/usr/bin/env bash

echo "Deteniendo microservicios de ScoreCraft..."

# Kill processes listening on ports 8080, 8081, 8082, 8083, 5173
for PORT in 8080 8081 8082 8083 5173; do
    PID=$(lsof -ti tcp:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        echo "Cerrando proceso en puerto $PORT (PID: $PID)..."
        kill -9 $PID 2>/dev/null || true
    fi
done

echo "✅ Todos los servicios detenidos correctamente."
