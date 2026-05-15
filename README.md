# 🎟️ Go Ticket

**Plataforma web de venta de entradas para eventos**, construida con Vue 3 y una arquitectura orientada a dominios (DDD). Permite a los clientes explorar el catálogo de eventos, seleccionar asientos de forma interactiva y completar la compra, mientras que los administradores gestionan eventos, tickets y visualizan métricas de ventas en tiempo real.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Variables de Entorno](#-variables-de-entorno)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)

---

## ✨ Características

### Vista del Cliente
- **Catálogo de eventos** con búsqueda por nombre y filtro por categoría.
- **Mapa de asientos interactivo** con estados visuales: disponible, vendido y seleccionado.
- Límite de 4 asientos por compra.
- **Checkout** con formulario de pago simulado y generación de código de operación.
- **Mis tickets**: historial de entradas compradas por el cliente.

### Vista del Administrador
- **Dashboard** con KPIs en tiempo real: total de eventos, ingresos y tickets vendidos.
- **Gestión de eventos**: creación de nuevos eventos con catálogos de venues y categorías.
- **Vista de tickets por evento**: mapa de asientos con control de estado.
- **Reporte de ventas** con listado de transacciones recientes.

### General
- Sistema de autenticación con roles (`admin` / `cliente`).
- Guardias de navegación en el router para proteger rutas por rol.
- Diseño responsivo con tema personalizado sobre PrimeVue (Aura).

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.5.32 | Framework frontend (Composition API) |
| [Vite](https://vitejs.dev/) | ^8.0.10 | Bundler y servidor de desarrollo |
| [Vue Router](https://router.vuejs.org/) | ^5.0.6 | Enrutamiento SPA con guardias de navegación |
| [PrimeVue](https://primevue.org/) | ^4.5.5 | Librería de componentes UI |
| [PrimeFlex](https://primeflex.org/) | ^4.0.0 | Utilidades CSS |
| [Axios](https://axios-http.com/) | ^1.15.2 | Cliente HTTP para consumo de API |
| [JSON Server](https://github.com/typicode/json-server) | ^1.0.0-beta | Backend simulado para desarrollo local |

---

## 🏗️ Arquitectura

El proyecto aplica los principios de **Domain-Driven Design (DDD)**, dividiendo la lógica en capas bien definidas dentro de cada contexto delimitado (*bounded context*):

```
Bounded Context
├── domain/
│   └── model/         → Entidades del dominio (Event, Ticket)
├── application/
│   └── *-store.js     → Stores reactivos que orquestan la capa de infraestructura
├── infrastructure/
│   ├── *-api.js       → Llamadas HTTP al backend
│   └── *-assembler.js → Conversión de respuestas HTTP a entidades del dominio
└── presentation/
    └── components/    → Componentes Vue que consumen los stores
```

**Bounded Contexts definidos:**

- `auth` — Login y panel de administrador.
- `event` — Gestión y creación de eventos.
- `tickets` — Entidad ticket, store, API y assembler.
- `customer` — Flujo de compra del cliente: cartelera, mapa de asientos, checkout y mis tickets.
- `sales` — Reporte de ventas para el administrador.
- `shared` — Layouts reutilizables (`AdminLayout`, `ClientLayout`).

---

## 📁 Estructura del Proyecto

```
go-ticket/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── server/
│   └── db.json              # Base de datos para JSON Server (dev local)
├── src/
│   ├── auth/
│   │   └── presentation/components/
│   │       ├── login-form.vue
│   │       └── admin-page.vue
│   ├── customer/
│   │   └── presentation/components/
│   │       ├── home-page.vue       # Catálogo público
│   │       ├── seat-map.vue        # Mapa de asientos interactivo
│   │       ├── checkout-page.vue   # Formulario de pago
│   │       └── my-tickets.vue      # Historial de compras
│   ├── event/
│   │   ├── application/event-store.js
│   │   ├── domain/model/event.entity.js
│   │   ├── infrastructure/services/event-api.js
│   │   └── presentation/components/event-page.vue
│   ├── tickets/
│   │   ├── application/ticket-store.js
│   │   ├── domain/model/ticket.entity.js
│   │   ├── infrastructure/
│   │   │   ├── ticket-api.js
│   │   │   └── ticket-assembler.js
│   │   └── presentation/components/ticket-item.vue
│   ├── sales/
│   │   └── presentation/components/sales-page.vue
│   ├── shared/
│   │   └── presentation/components/
│   │       ├── admin-layout.vue
│   │       └── client-layout.vue
│   ├── router/index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env.development
├── .env.production
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Andrewdmr/Go-Ticket-SO.git
cd Go-Ticket-SO

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

> La app estará disponible en `http://localhost:5173`

### Otros comandos

```bash
# Compilar para producción
npm run build

# Vista previa del build de producción
npm run preview
```

---

## ⚙️ Variables de Entorno

El proyecto usa dos archivos de entorno según el modo de ejecución:

| Variable | Descripción |
|---|---|
| `VITE_GO_TICKET_API_URL` | URL base de la API REST del backend |
| `VITE_TICKET_ENDPOINTS` | Nombre del endpoint de tickets |

**`.env.development`** → apunta al backend de desarrollo.  
**`.env.production`** → apunta al backend de producción.

---

## 🔑 Credenciales de Prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@test.com` | `1234` |
| Cliente | `cliente@test.com` | `1234` |

---

## 🗺️ Rutas de la Aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `HomePage` | Público |
| `/login` | `LoginForm` | Público |
| `/tickets` | `MyTicketsPage` | Cliente |
| `/tickets/buy/:id` | `SeatMapPage` | Cliente |
| `/checkout` | `CheckoutPage` | Cliente |
| `/admin` | `AdminPage` | Admin |
| `/events` | `EventPage` | Admin |
| `/admin/events/:id/tickets` | `TicketItem` | Admin |
| `/sales` | `SalesPage` | Admin |
