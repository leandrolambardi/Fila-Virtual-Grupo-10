# Fila Virtual — Grupo 10

**Trabajo práctico integrador · Desarrollo de Sistemas Web**  
**Integrantes:** Leandro, Evelyn, Aylén y Eduardo.

## Descripción

Aplicación web para organizar la entrega de computadoras en una institución educativa mediante una fila virtual. Los alumnos o tutores pueden solicitar un turno indicando su nombre, DNI y curso; el personal consulta la fila y registra la entrega del equipo o la cancelación del turno.

## Funcionalidades

- **Sacar turno:** registrar nombre, DNI y curso; generar un número de turno.
- **Ver fila:** consultar los turnos y filtrarlos por estado.
- **Atención:** visualizar el siguiente turno en espera, marcarlo como retirado (indicando el equipo entregado) o cancelarlo.
- **Mi turno:** consultar el detalle de un turno por su identificador y eliminarlo cuando esté permitido.
- **Navegación:** acceder a las pantallas principales desde la aplicación.

Los estados disponibles son `en_espera`, `retirado` y `cancelado`.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | Angular 22, TypeScript, HTML, CSS, formularios reactivos y signals |
| Backend | Node.js, Express 5 |
| Base de datos | MongoDB, Mongoose |
| Comunicación | API REST con HTTP y JSON |
| Control de versiones | Git y GitHub |

## Estructura del proyecto

```text
Fila-Virtual-Grupo-10/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── services/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── pipes/
│   │   │   ├── services/
│   │   │   ├── app.routes.ts
│   │   │   └── configuracion.ts
│   │   └── styles.css
│   └── package.json
└── README.md
```

## Requisitos

- Node.js y npm compatibles con Angular 22.
- Acceso a una base de datos MongoDB (por ejemplo, MongoDB Atlas).
- Git, para clonar el repositorio.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/leandrolambardi/Fila-Virtual-Grupo-10.git
cd Fila-Virtual-Grupo-10
```

### 2. Configurar el backend

Desde `Backend/`:

```bash
cd Backend
npm install
```

Copiar `.env.example` como `.env` y completar la conexión real a MongoDB:

```env
MONGODB_URI=
HOST=
PORT=
```


Iniciar Express:

```bash
npm run dev
```

El servidor se inicia después de conectarse correctamente a MongoDB y expone la API en `http://127.0.0.1:3000/api/turnos`.

### 3. Configurar y ejecutar el frontend

En **otra terminal**, desde la raíz del repositorio:

```bash
cd Frontend
npm install
npm start
```

Abrir `http://localhost:4200` en el navegador.

El frontend utiliza la dirección del backend definida en `Frontend/src/app/configuracion.ts`. Si cambia el puerto o la dirección del servidor, actualizar esa constante.

## Pantallas

| Ruta | Función |
| --- | --- |
| `/sacar-turno` | Solicitar un turno |
| `/fila` | Ver la fila y filtrar por estado |
| `/atencion` | Registrar entregas o cancelaciones |
| `/mi-turno/:id` | Consultar y eliminar un turno específico |

## API REST

URL base: `http://127.0.0.1:3000/api/turnos`

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/turnos` | Listar todos los turnos |
| `GET` | `/api/turnos?estado=en_espera` | Filtrar por estado |
| `GET` | `/api/turnos/:id` | Obtener un turno por ID |
| `POST` | `/api/turnos` | Crear un turno |
| `PATCH` | `/api/turnos/:id/estado` | Actualizar el estado de un turno |
| `DELETE` | `/api/turnos/:id` | Eliminar un turno permitido |

### Ejemplo: crear turno

```http
POST /api/turnos
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "dni": "12345678",
  "curso": "3° B"
}
```

### Ejemplo: registrar entrega

```http
PATCH /api/turnos/ID_DEL_TURNO/estado
Content-Type: application/json

{
  "estado": "retirado",
  "equipo": "PC-12"
}
```

### Ejemplo: cancelar turno

```http
PATCH /api/turnos/ID_DEL_TURNO/estado
Content-Type: application/json

{
  "estado": "cancelado"
}
```

## Reglas principales

- Nombre, DNI y curso son obligatorios al crear un turno.
- El DNI debe contener **7 u 8 dígitos**, sin puntos ni espacios.
- Cada turno recibe un número y comienza con estado `en_espera`.
- Solo los turnos `en_espera` pueden cambiar de estado.
- Para marcar un turno como `retirado`, es obligatorio indicar el equipo entregado.
- No se puede eliminar un turno cuyo estado sea `retirado`.

## Organización del trabajo

| Integrante | Responsabilidad principal |
| --- | --- |
| **Leandro** | Estructura inicial del backend, GET de turnos y pantalla `VerFila` |
| **Evelyn** | Conexión a MongoDB, POST y pantalla `SacarTurno` |
| **Aylén** | PATCH de estados y pantalla `PanelAtencion` |
| **Eduardo** | GET por ID, DELETE, pantalla `MiTurno` y navegación |

El desarrollo se organiza mediante ramas individuales y la integración de funcionalidades en `develop`.

## Alcance

Proyecto académico orientado a demostrar integración frontend–backend, operaciones CRUD, validaciones, persistencia de datos y trabajo colaborativo con Git.
