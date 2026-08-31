# ⚽ ScoreCraft - Plataforma de Estadísticas Deportivas

ScoreCraft es una plataforma web para el seguimiento de torneos deportivos, programación de encuentros, registro de marcadores y cálculo automático de tablas de posiciones.

Este repositorio contiene la comparativa de desarrollo entre dos paradigmas de arquitectura de software para el curso de **Microservicios (Ciclo VIII)**:

---

## 🏛️ Estructura del Repositorio

```text
proyecto-integrador/
├── scorecraft-layers/           # Fase 1: Arquitectura Monolítica en Capas (N-Tier)
├── scorecraft-microservices/    # Fase 2: Arquitectura Distribuida en Microservicios
├── .gitignore                   # Exclusiones de build, IDEs y dependencias
└── README.md                    # Documentación general
```

---

## 🚀 Fase 1: `scorecraft-layers` (Arquitectura en Capas)

### Stack Tecnológico
* **Lenguaje:** Java 25
* **Framework:** Spring Boot 4.1 (Spring MVC, Spring Data JPA, Hibernate, Bean Validation)
* **Base de Datos:** Microsoft SQL Server 2022 (Docker)
* **Frontend:** Thymeleaf (SSR) + Tailwind CSS (Diseño responsivo y tema oscuro deportivo)
* **Build Tool:** Maven Wrapper (`./mvnw`)

### Requisitos Previos
1. **Contenedor Docker de SQL Server activo:**
   ```bash
   docker start sql-server-local
   ```
2. **Base de Datos creada en SQL Server:**
   * Nombre de BD: `ScoreCraftLayers`
   * Puerto: `1433`
   * Usuario: `sa`
   * Contraseña: `SmartFill2024!`

### Ejecución Local
```bash
cd scorecraft-layers
./mvnw spring-boot:run
```
Abrir en el navegador: `http://localhost:8080`

### Módulos Implementados
* **Dashboard:** Resumen en vivo de estadísticas, líder del torneo, top 5 y últimos resultados.
* **Equipos (`/teams`):** Directorio de clubes, logos y gestión CRUD.
* **Encuentros (`/matches`):** Fixture, filtros por jornada/estado y registro de marcadores.
* **Tabla de Posiciones (`/standings`):** Cómputo dinámico oficial de puntos (PG: 3, PE: 1, PP: 0) y criterios de desempate ($PTS \rightarrow DG \rightarrow GF$).

---

## 🔮 Fase 2: `scorecraft-microservices` (Arquitectura en Microservicios)

### Stack Tecnológico
* **Microservicios Backend:** Java 25 + Spring Boot 4.1
  * **`api-gateway` (Puerto 8080):** Reverse Proxy y CORS centralizado.
  * **`team-service` (Puerto 8081):** CRUD de equipos y persistencia en `ScoreCraft_Teams`.
  * **`match-service` (Puerto 8082):** Fixture, resultados y persistencia en `ScoreCraft_Matches`.
  * **`standing-service` (Puerto 8083):** Servicio agregador que calcula la tabla de posiciones en tiempo real comunicándose con `match-service` y `team-service` vía `RestClient`.
* **Frontend Desacoplado:** React 19 + Vite + Tailwind CSS + Lucide Icons (Gestionado con **`pnpm`**, Puerto 5173).
* **Persistencia:** Microsoft SQL Server 2022 (*Database-per-Service Pattern*).

### Ejecución de los Microservicios

1. **Iniciar todos los microservicios backend:**
   ```bash
   ./scorecraft-microservices/start-all.sh
   ```

2. **Iniciar la SPA en React (Frontend):**
   ```bash
   cd scorecraft-microservices/frontend
   pnpm dev
   ```
   Abrir en el navegador: `http://localhost:5173`

3. **Para detener los microservicios:**
   ```bash
   ./scorecraft-microservices/stop-all.sh
   ```

---

## 📊 Comparativa de Arquitecturas

| Característica | Fase 1: Monolito en Capas (`scorecraft-layers`) | Fase 2: Microservicios (`scorecraft-microservices`) |
| :--- | :--- | :--- |
| **Despliegue** | 1 unidad monolítica (`.jar`) | 4 servicios independientes + 1 SPA |
| **Frontend** | SSR con Thymeleaf | SPA desacoplada con React + Vite (`pnpm`) |
| **Base de Datos** | Base de datos única (`ScoreCraftLayers`) | Base de datos por servicio (`ScoreCraft_Teams`, `ScoreCraft_Matches`) |
| **Comunicación** | Llamadas internas en memoria (Java Services) | REST APIs sobre HTTP vía API Gateway y `RestClient` |
| **Escalabilidad** | Escalado vertical / Monolito completo | Escalado horizontal granular por microservicio |

