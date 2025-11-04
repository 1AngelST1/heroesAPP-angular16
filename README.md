# HeroesAPP - Angular 16

Aplicación web para la gestión de superhéroes desarrollada con Angular 16. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un catálogo de héroes, con sistema de autenticación y búsqueda avanzada.

## 📋 Descripción del Proyecto

HeroesAPP es una aplicación SPA (Single Page Application) que permite administrar información de superhéroes de DC Comics y Marvel Comics. El proyecto incluye funcionalidades como:

- ✅ Listado de héroes con tarjetas personalizadas
- ✅ Búsqueda y filtrado de héroes
- ✅ Visualización de detalles de cada héroe
- ✅ Creación, edición y eliminación de héroes
- ✅ Sistema de autenticación con guards
- ✅ Navegación protegida por rutas
- ✅ Diseño responsive con Angular Material

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular**: 16.2.0
- **Angular Material**: 16.2.14
- **Angular CDK**: 16.2.14
- **TypeScript**: 5.1.3
- **RxJS**: 7.8.0

### Backend (Simulado)
- **JSON-Server**: Servidor REST API simulado con archivo JSON

### Otras Herramientas
- **Angular CLI**: 16.2.16
- **Node.js**: (Requerido para ejecutar el proyecto)

## 📦 Estructura del Proyecto

```
heroesAPP/
├── src/
│   ├── app/
│   │   ├── auth/              # Módulo de autenticación
│   │   │   ├── guards/        # Guards de protección de rutas
│   │   │   ├── pages/         # Páginas de login y registro
│   │   │   └── services/      # Servicios de autenticación
│   │   ├── heroes/            # Módulo de héroes
│   │   │   ├── components/    # Componentes reutilizables
│   │   │   ├── pages/         # Páginas del módulo
│   │   │   ├── pipes/         # Pipes personalizados
│   │   │   └── services/      # Servicios HTTP
│   │   ├── material/          # Módulo de Angular Material
│   │   └── shared/            # Componentes compartidos
│   └── assets/                # Recursos estáticos
├── angular.json               # Configuración de Angular
└── package.json              # Dependencias del proyecto

heroesAPP-server/
└── db.json                   # Base de datos simulada
```

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (versión 8 o superior)
- **Angular CLI** (versión 16.2.16)

Para instalar Angular CLI globalmente:
```bash
npm install -g @angular/cli@16.2.16
```

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/1AngelST1/heroesAPP-angular16.git
cd heroesAPP-angular16
```

### 2. Instalar dependencias del Frontend
```bash
cd heroesAPP
npm install
```

### 3. Instalar JSON-Server (Backend simulado)
```bash
# Instalar JSON-Server globalmente
npm install -g json-server
```

## 🎮 Ejecución del Proyecto

Para ejecutar la aplicación completa necesitas levantar **dos servidores**: el backend simulado y el frontend de Angular.

### Opción 1: Ejecutar en terminales separadas (Recomendado)

**Terminal 1 - Backend (JSON-Server):**
```bash
cd heroesAPP-server
json-server --watch db.json
```
El servidor correrá en: `http://localhost:3000`

**Terminal 2 - Frontend (Angular):**
```bash
cd heroesAPP
npm start
# o
ng serve
```
La aplicación correrá en: `http://localhost:4200`

### Opción 2: Usando comandos combinados (PowerShell)

Puedes ejecutar ambos servicios usando PowerShell en una sola terminal:
```powershell
# Desde la raíz del proyecto
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd heroesAPP-server; json-server --watch db.json"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd heroesAPP; npm start"
```

## 🌐 Acceso a la Aplicación

Una vez iniciados ambos servidores:

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **API (JSON-Server)**: [http://localhost:3000](http://localhost:3000)

### Endpoints disponibles:
- `GET /heroes` - Obtener todos los héroes
- `GET /heroes/:id` - Obtener un héroe por ID
- `POST /heroes` - Crear un nuevo héroe
- `PUT /heroes/:id` - Actualizar un héroe
- `DELETE /heroes/:id` - Eliminar un héroe
- `GET /usuarios` - Obtener usuarios

## 👤 Credenciales de Acceso

Para acceder a la aplicación, puedes usar cualquier credencial (el sistema de autenticación es simulado):

- **Usuario**: Cualquier texto
- **Contraseña**: Cualquier texto

## 🏗️ Compilación para Producción

Para compilar el proyecto para producción:

```bash
cd heroesAPP
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## 📚 Funcionalidades Principales

### Módulo de Héroes
- **Listado**: Visualiza todos los héroes en tarjetas con imagen y datos básicos
- **Búsqueda**: Busca héroes por nombre con autocompletado
- **Detalle**: Visualiza información completa de cada héroe
- **Agregar**: Crea nuevos héroes con formulario reactivo
- **Editar**: Modifica información de héroes existentes
- **Eliminar**: Elimina héroes con confirmación mediante diálogo

### Módulo de Autenticación
- **Login**: Página de inicio de sesión
- **Registro**: Página de registro de usuarios
- **Guards**: Protección de rutas privadas
- **Persistencia**: Manejo de sesión con localStorage

## 🛠️ Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Compila el proyecto para producción
npm run watch      # Compila en modo watch
npm test           # Ejecuta las pruebas unitarias
```

## 📝 Notas Importantes

- El backend con JSON-Server es solo para desarrollo y pruebas
- Los datos se almacenan en `heroesAPP-server/db.json`
- Las imágenes de los héroes deben estar en `src/assets/heroes/`
- El sistema de autenticación es simulado (no usar en producción)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Angel ST** - [1AngelST1](https://github.com/1AngelST1)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
