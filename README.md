# ⚽ ScoreCraft — Plataforma de Gestión y Estadísticas Deportivas

> **Proyecto Integrador: Estudio Comparativo de Arquitecturas de Software**  
> **Tema:** Monolito en Capas (*N-Tier Architecture*) vs. Arquitectura Distribuida en Microservicios (*Microservices Architecture*).  
> **Área:** Arquitectura de Software / Microservicios — Ciclo VIII.

---

## 📋 1. Descripción General del Proyecto

**ScoreCraft** es una plataforma integral para el seguimiento y administración de campeonatos de fútbol. El sistema permite:
1. **Gestión de Clubes Deportivos:** Registro, edición y catálogo de equipos con sus colores oficiales y escudos de alta definición.
2. **Programación de Encuentros (Fixture):** Calendario oficial organizado por jornadas y fechas con validación de localía.
3. **Registro de Marcadores en Tiempo Real:** Actualización del resultado de partidos y transición de estados (`SCHEDULED` $\rightarrow$ `FINISHED`).
4. **Cálculo Matemático Dinámico de la Tabla de Posiciones:** Cómputo de estadísticas según las normas oficiales de la FIFA y ligas profesionales:
   * **Puntos:** Victoria (3 pts), Empate (1 pt), Derrota (0 pts).
   * **Criterios de desempate:** Puntos ($\text{PTS}$) $\rightarrow$ Diferencia de Goles ($\text{DG}$) $\rightarrow$ Goles a Favor ($\text{GF}$) $\rightarrow$ Orden Alfabético.

El repositorio alberga **dos implementaciones completas del mismo dominio funcional**, permitiendo analizar empíricamente las ventajas, desafíos de desacoplamiento, patrones de persistencia y comunicación entre ambos paradigmas arquitectónicos.

---

## 🏛️ 2. Estructura y Comparativa Arquitectónica

```text
scorecraft/
├── scorecraft-layers/               # FASE 1: Arquitectura Monolítica en Capas
│   ├── src/main/java/com/scorecraft/layers/
│   │   ├── config/                  # Inicialización y beans
│   │   ├── controller/              # Controladores MVC (Spring MVC)
│   │   ├── domain/                  # Entidades JPA (Team, Match)
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── repository/              # Repositorios Spring Data JPA
│   │   └── service/                 # Lógica de negocio y cálculo de tabla
│   ├── src/main/resources/
│   │   ├── templates/               # Vistas Server-Side Rendering (Thymeleaf)
│   │   └── application.properties   # Configuración y conexión JDBC
│   ├── mvnw.cmd / mvnw              # Maven Wrapper
│   ├── pom.xml                      # Dependencias Maven
│   └── run.bat                      # Script de ejecución rápida en Windows
│
├── scorecraft-microservices/        # FASE 2: Arquitectura Distribuida en Microservicios
│   ├── api-gateway/                 # Reverse Proxy y Punto Único de Entrada (Puerto 8080)
│   ├── team-service/                # Microservicio de Equipos (Puerto 8081 / BD: ScoreCraft_Teams)
│   ├── match-service/               # Microservicio de Encuentros (Puerto 8082 / BD: ScoreCraft_Matches)
│   ├── standing-service/            # Microservicio Agregador de Posiciones (Puerto 8083)
│   ├── frontend/                    # SPA desacoplada en React 19 + Vite (Puerto 5173)
│   │   ├── public/teams/            # Escudos vectoriales oficiales de los clubes (SVG)
│   │   ├── src/
│   │   │   ├── components/          # Navbar, Modales, ClubBadge inteligente
│   │   │   ├── views/               # Dashboard, Standings, Fixture, Teams
│   │   │   └── services/api.js      # Cliente Axios conectado al API Gateway
│   ├── start-all.ps1 / .bat         # Scripts de inicio unificado para Windows
│   ├── stop-all.ps1 / .bat          # Scripts de detención unificada para Windows
│   ├── start-all.sh / stop-all.sh   # Scripts para entornos Linux / MacOS / Git Bash
│
└── README.md                        # Documentación técnica del proyecto
```

---

### 📊 Cuadro Comparativo de Paradigmas

| Criterio Técnico | Fase 1: Monolito en Capas (`scorecraft-layers`) | Fase 2: Microservicios (`scorecraft-microservices`) |
| :--- | :--- | :--- |
| **Estilo Arquitectónico** | Monolito clásico en 3 capas (*Presentation, Business, Data*). | Arquitectura Orientada a Microservicios distribuida. |
| **Frontend** | *Server-Side Rendering* (SSR) con Spring MVC + Thymeleaf. | *Single Page Application* (SPA) reactiva con React 19 + Vite. |
| **Formato de Comunicación** | Llamadas internas a métodos Java en memoria (In-Process). | Protocolo HTTP/REST con payloads en formato **JSON**. |
| **Punto de Entrada** | Controlador web directo en puerto `8080`. | **API Gateway** centralizado en puerto `8080` (enrutador y CORS). |
| **Estrategia de Persistencia** | Base de datos única compartida (`ScoreCraftLayers`). | **Database-per-Service**: BD independiente para Equipos y Partidos. |
| **Cálculo de Posiciones** | En memoria mediante consulta unificada a la misma BD. | **Servicio Agregador** (`standing-service`) que orquesta llamadas vía `RestClient` a `team-service` y `match-service`. |
| **Escalabilidad** | Escalado vertical o replicación del monolito completo. | Escalado horizontal granular e independiente por microservicio. |
| **Tolerancia a Fallos** | Una caída en la aplicación detiene todo el sistema. | Aislamiento de fallos: la caída de un servicio no detiene al resto. |

---

## 🛠️ 3. Stack Tecnológico

### Backend (Ambas Fases)
* **Lenguaje:** Java 21 LTS (OpenJDK).
* **Framework:** Spring Boot 4.1.1.
* **Módulos Spring:**
  * `Spring Boot Starter Web / WebMVC` (APIs REST y Servidor Tomcat embebido).
  * `Spring Boot Starter Data JPA` (Persistencia declarativa con Hibernate).
  * `Spring Boot Starter Validation` (Bean Validation de DTOs y reglas de negocio).
  * `Spring DevTools` (Hot reloading en desarrollo).
* **Driver JDBC:** Microsoft SQL Server JDBC Driver (`com.microsoft.sqlserver:mssql-jdbc`).
* **Gestor de Construcción:** Maven Wrapper (`./mvnw.cmd` / `./mvnw`).

### Frontend Desacoplado (Fase 2)
* **Librería UI:** React 19 (Hooks, componentes funcionales).
* **Herramienta de Build:** Vite 8.2 (Compilación instantánea con Rolldown/ESModules).
* **Estilos y Diseño:** Tailwind CSS 4 + Lucide React (iconografía deportiva).
* **Consumo HTTP:** Axios (Cliente configurado con base URL hacia el API Gateway).
* **Gestor de Paquetes:** `pnpm` (soporta también `npm`).

### Base de Datos
* **Motor:** Microsoft SQL Server 2022 (Soporta instalación nativa en Windows o contenedor Docker).
* **Modo de Conexión:** TCP/IP en puerto `1433`.

---

## 🔌 4. Catálogo de Microservicios y Contrato de APIs (JSON)

Todos los servicios del backend se comunican mediante contratos REST estrictos. A continuación se detallan los puertos y los endpoints consumidos a través del **API Gateway** (`http://localhost:8080/api`):

```text
                       ┌───────────────────────────────┐
                       │     React 19 SPA (Port 5173)   │
                       └───────────────┬───────────────┘
                                       │ HTTP / JSON
                                       ▼
                       ┌───────────────────────────────┐
                       │     API GATEWAY (Port 8080)   │
                       └───────┬───────┬───────┬───────┘
                               │       │       │
              ┌────────────────┘       │       └────────────────┐
              ▼                        ▼                        ▼
     ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
     │   TEAM SERVICE   │    │  MATCH SERVICE   │    │ STANDING SERVICE │
     │   (Port 8081)    │    │   (Port 8082)    │    │   (Port 8083)    │
     └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘
              │                       │                       │
              │ (JDBC)                │ (JDBC)                │ (RestClient HTTP)
              ▼                       ▼                       ▼
     ┌──────────────────┐    ┌──────────────────┐    Consiste en la
     │ ScoreCraft_Teams │    │ScoreCraft_Matches│    agregación de
     │   (SQL Server)   │    │   (SQL Server)   │    Team y Match Service
     └──────────────────┘    └──────────────────┘
```

### 1. `team-service` (Puerto 8081 — Proxy en `/api/teams`)
* **`GET /api/teams`**: Retorna el listado completo de clubes registrados en JSON.
* **`GET /api/teams/{id}`**: Obtiene el detalle de un club por su identificador.
* **`POST /api/teams`**: Registra un nuevo club deportivo.
* **`PUT /api/teams/{id}`**: Actualiza los datos institucionales, estadio o escudo de un club.
* **`DELETE /api/teams/{id}`**: Elimina un club de la base de datos.

### 2. `match-service` (Puerto 8082 — Proxy en `/api/matches`)
* **`GET /api/matches`**: Retorna la lista de encuentros (soporta filtros por `?status=FINISHED|SCHEDULED` y `?matchDay=N`).
* **`GET /api/matches/finished`**: Lista exclusivamente los partidos finalizados que alimentan la tabla.
* **`GET /api/matches/matchdays`**: Devuelve un arreglo JSON con las jornadas programadas (`[1, 2, 3, ...]`).
* **`GET /api/matches/stats`**: Retorna métricas en JSON (`{"total": 6, "finished": 4}`).
* **`POST /api/matches`**: Programa un nuevo encuentro entre dos clubes.
* **`PUT /api/matches/{id}/score`**: Registra el marcador de un partido (`homeScore`, `awayScore`), cambia su estado a `FINISHED` y desencadena el recálculo de puntos.
* **`DELETE /api/matches/{id}`**: Elimina un partido programado.

### 3. `standing-service` (Puerto 8083 — Proxy en `/api/standings`)
* **`GET /api/standings`**: Retorna la **tabla de posiciones completa en formato JSON**, con el cálculo oficial en tiempo real:
  ```json
  [
    {
      "position": 1,
      "teamId": 3,
      "teamName": "Sporting Cristal",
      "shortName": "CRI",
      "logoUrl": "/teams/cristal.svg",
      "primaryColor": "#00A3E0",
      "played": 2,
      "won": 1,
      "drawn": 1,
      "lost": 0,
      "goalsFor": 8,
      "goalsAgainst": 5,
      "goalDifference": 3,
      "points": 4,
      "recentForm": ["W", "D"]
    }
  ]
  ```
* **`GET /api/standings/dashboard`**: Retorna un resumen en JSON para la pantalla principal (Líder del torneo, Top 5, métricas globales, últimos resultados y próximos encuentros).

---

## ⚙️ 5. Requisitos del Sistema

Para ejecutar el proyecto en tu entorno local se requiere:

1. **Java Development Kit (JDK):** Versión **21 LTS** o superior instalada y configurada en las variables de entorno (`JAVA_HOME`).
2. **Node.js:** Versión **18.x** o **20.x+ LTS** con gestor **`pnpm`** (o `npm`).
3. **Microsoft SQL Server:**
   * Puede ser **SQL Server nativo** en Windows (Developer o Express Edition) accesible en el puerto `1433`.
   * O **Docker Desktop** con la imagen oficial de SQL Server 2022.

---

## 🗄️ 6. Configuración de la Base de Datos

Las aplicaciones están configuradas con las credenciales estándares del proyecto:
* **Host:** `localhost:1433`
* **Usuario:** `sa`
* **Contraseña:** `SmartFill2024!`

### Creación de los Catálogos en SQL Server
Hibernate crea automáticamente las tablas y restricciones (`ddl-auto=update`), pero las bases de datos deben crearse previamente. Abre **SQL Server Management Studio (SSMS)** o tu terminal de base de datos y ejecuta:

```sql
CREATE DATABASE ScoreCraftLayers;
CREATE DATABASE ScoreCraft_Teams;
CREATE DATABASE ScoreCraft_Matches;
GO
```

> **Nota:** Si utilizas Docker, puedes levantar el contenedor con:
> ```bash
> docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=SmartFill2024!" -p 1433:1433 --name sql-server-local -d mcr.microsoft.com/mssql/server:2022-latest
> ```

---

## 🚀 7. Guía de Ejecución Paso a Paso

### 🌟 Opción A: Ejecución de la Fase 2 (Microservicios + React SPA)

#### En Windows (Recomendado):
El proyecto incluye scripts automatizados que abren cada microservicio en una consola independiente para monitorear sus logs:

1. **Iniciar todos los microservicios y el Frontend:**
   Desde una terminal PowerShell en la raíz del proyecto ejecuta:
   ```powershell
   .\scorecraft-microservices\start-all.ps1
   ```
   *(o ejecutando `.\scorecraft-microservices\start-all.bat` desde CMD).*

2. **Acceso al aplicativo:**
   * 🌐 **Frontend (React + Vite):** [http://localhost:5173](http://localhost:5173)
   * 🚪 **API Gateway:** [http://localhost:8080/api](http://localhost:8080/api)
   * 🛡️ **Team Service:** `http://localhost:8081`
   * ⚔️ **Match Service:** `http://localhost:8082`
   * 🏆 **Standing Service:** `http://localhost:8083`

3. **Detener todos los servicios:**
   ```powershell
   .\scorecraft-microservices\stop-all.ps1
   ```

#### En Linux / MacOS / Git Bash:
```bash
# Iniciar servicios en segundo plano
./scorecraft-microservices/start-all.sh

# Iniciar frontend
cd scorecraft-microservices/frontend
pnpm dev

# Para detener los servicios
./scorecraft-microservices/stop-all.sh
```

---

### 🏛️ Opción B: Ejecución de la Fase 1 (Monolito en Capas)

> **Advertencia de Puertos:** Asegúrate de detener los microservicios antes de iniciar el monolito, ya que ambos utilizan el puerto **8080**.

1. Dirígete al directorio del monolito:
   ```cmd
   cd scorecraft-layers
   ```
2. Ejecuta el aplicativo:
   ```cmd
   .\mvnw.cmd spring-boot:run
   ```
   *(o en Linux: `./mvnw spring-boot:run`).*
3. Abrir en el navegador:
   * 🌐 [http://localhost:8080](http://localhost:8080) (Renderizado por Thymeleaf con Tailwind CSS).

---

## 🛡️ 8. Gestión de Escudos Oficiales de los Clubes

Para garantizar máxima calidad visual e independencia de servidores externos, los escudos oficiales de los clubes iniciales se encuentran vectorizados en formato **SVG** dentro del frontend:
* Ruta local: `scorecraft-microservices/frontend/public/teams/`
* El componente inteligente `ClubBadge.jsx` detecta automáticamente el nombre del club y carga su escudo vectorial oficial local.
* Además, la plataforma permite editar cualquier club o registrar uno nuevo desde la interfaz web, soportando enlaces externos directos de internet (`https://...png`).

---

## 👥 9. Patrones de Diseño de Microservicios Demostrados

1. **API Gateway Pattern:** Centralización de rutas, aislamiento de los servicios internos y resolución transparente de CORS para el cliente.
2. **Database-per-Service Pattern:** Aislamiento estricto de los esquemas de datos de Equipos y Partidos, garantizando la independencia de despliegue y persistencia.
3. **Aggregator Pattern:** `standing-service` actúa como servicio agregador componiendo la información de dos dominios externos vía HTTP REST (`RestClient`) sin acoplamiento a base de datos.
4. **Data Seeding Automatizado:** Cada microservicio inicializa datos por defecto mediante `CommandLineRunner` si la base de datos se encuentra vacía.
5. **Decoupled Client-Side UI:** Frontend moderno basado en estados reactivos desacoplado totalmente de las tecnologías de renderizado del servidor.
