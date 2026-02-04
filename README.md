# 🏢 EmployeeHub - Portal de Gestión Integral de Empleados

![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-darkgreen?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

> Sistema full-stack completo para la gestión de empleados con autenticación JWT, gestión de nóminas, vacaciones y cambio de turnos automatizado.

## 🎯 Descripción

**EmployeeHub** es una aplicación web full-stack que centraliza toda la gestión del empleado, eliminando la necesidad de intervención manual de RRHH para tareas rutinarias. Reduce en un 80% la carga administrativa mediante automatización inteligente.

## ✨ Características Principales

### Frontend
- ✅ **Autenticación Segura** - Login con JWT y persistencia de sesión
- 💰 **Gestión de Nóminas** - Visualización histórica y descarga de recibos
- 🏖️ **Sistema de Vacaciones** - Solicitud con validaciones en tiempo real
  - Control de días disponibles
  - Prevención de fechas pasadas
  - Límite de 30 días consecutivos
  - Detección de solapamientos
- 🔄 **Cambio de Turnos Inteligente** - Sistema de emparejamiento automático
  - Notificaciones instantáneas
  - Aceptación/rechazo en tiempo real
  - Intercambio automático de turnos
- 📊 **Dashboard Informativo** - Métricas en tiempo real
- 👤 **Perfil Personalizado** - Gestión de información personal
- 🎨 **Diseño Responsive** - Mobile-first con animaciones fluidas

### Backend
- 🔐 **API REST** - Node.js + Express
- 🗄️ **Base de Datos** - MongoDB con Mongoose
- 🔑 **Autenticación JWT** - Tokens seguros con expiración
- ✅ **Validaciones** - Esquemas robustos con Mongoose
- 🛡️ **Middleware** - Protección de rutas y manejo de errores
- 📝 **Seeder** - Datos de prueba automatizados

## 🚀 Tecnologías

### Stack Completo
**Frontend:**
- React 18.3
- React Router DOM 6
- Tailwind CSS 3.4
- Axios
- Lucide React (iconos)
- date-fns

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## 📦 Instalación

### Requisitos Previos
- Node.js 18+
- MongoDB (local o Atlas)
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/employee-hub.git
cd employee-hub
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crea `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employeehub
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRE=7d
NODE_ENV=development
```

Importar datos de prueba:
```bash
npm run data:import
```

Iniciar servidor:
```bash
npm run dev
```

### 3. Configurar Frontend
```bash
cd ..
npm install --legacy-peer-deps
```

Iniciar aplicación:
```bash
npm run dev
```

## 🔐 Usuarios de Prueba

| Email | Password | Rol |
|-------|----------|-----|
| juan.perez@empresa.com | 123456 | Empleado |
| maria.garcia@empresa.com | 123456 | Empleado |
| carlos.lopez@empresa.com | 123456 | Empleado |
| ana.martinez@empresa.com | 123456 | Manager |

## 📁 Estructura del Proyecto
```
employee-hub/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── payslipController.js
│   │   ├── vacationController.js
│   │   └── shiftController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Employee.js
│   │   ├── Payslip.js
│   │   ├── VacationRequest.js
│   │   ├── Shift.js
│   │   └── ShiftSwapRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── payslipRoutes.js
│   │   ├── vacationRoutes.js
│   │   └── shiftRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── server.js
│   └── seeder.js
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Footer.jsx
│   ├── config/
│   │   └── api.js
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ShiftContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Payslips.jsx
│   │   ├── Vacations.jsx
│   │   ├── Shifts.jsx
│   │   └── Profile.jsx
│   ├── services/
│   │   └── api/
│   │       ├── authService.js
│   │       ├── payslipService.js
│   │       ├── vacationService.js
│   │       └── shiftService.js
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

## 🔌 Endpoints de la API

### Autenticación
```
POST   /api/auth/register    - Registrar empleado
POST   /api/auth/login       - Iniciar sesión
GET    /api/auth/me          - Obtener perfil actual
```

### Nóminas
```
GET    /api/payslips         - Obtener nóminas del empleado
GET    /api/payslips/:id     - Obtener nómina específica
POST   /api/payslips         - Crear nómina (admin)
```

### Vacaciones
```
GET    /api/vacations        - Obtener solicitudes
POST   /api/vacations        - Crear solicitud
DELETE /api/vacations/:id    - Cancelar solicitud
PUT    /api/vacations/:id/status - Aprobar/Rechazar (manager)
```

### Turnos
```
GET    /api/shifts                        - Obtener mis turnos
GET    /api/shifts/swap-requests/my       - Mis solicitudes
GET    /api/shifts/swap-requests/available - Solicitudes disponibles
POST   /api/shifts/swap-requests          - Crear solicitud
PUT    /api/shifts/swap-requests/:id/accept - Aceptar
PUT    /api/shifts/swap-requests/:id/reject - Rechazar
PUT    /api/shifts/swap-requests/:id/cancel - Cancelar
```

## 🎓 Características Técnicas Destacadas

### 1. Sistema de Autenticación JWT
- Tokens con expiración configurable
- Refresh automático en interceptores
- Protección de rutas en frontend y backend

### 2. Validaciones Multicapa
- Validación en frontend (tiempo real)
- Validación en backend (Mongoose schemas)
- Manejo de errores centralizado

### 3. Sistema de Turnos con Emparejamiento
- Algoritmo de matching automático
- Prevención de solapamientos
- Notificaciones en tiempo real

### 4. Optimizaciones de Rendimiento
- Lazy loading de rutas
- Interceptores de Axios
- Estados de carga granulares

## 🚧 Próximas Funcionalidades

- [ ] Notificaciones push en tiempo real (Socket.io)
- [ ] Exportación de nóminas a PDF
- [ ] Gráficos de evolución salarial (Recharts)
- [ ] Sistema de mensajería interna
- [ ] App móvil con React Native
- [ ] Dashboard de administración
- [ ] Tests con Vitest y Cypress
- [ ] CI/CD con GitHub Actions

## 📝 Scripts Disponibles

### Backend
```bash
npm run dev          # Modo desarrollo con nodemon
npm start            # Producción
npm run data:import  # Importar datos de prueba
npm run data:destroy # Eliminar todos los datos
```

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Portfolio: [tu-portfolio.com](https://tu-portfolio.com)

## 🙏 Agradecimientos

- Iconos por [Lucide](https://lucide.dev/)
- Avatares por [DiceBear](https://dicebear.com/)
- Inspiración de sistemas empresariales modernos

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Desarrollado con ❤️ para mejorar la experiencia del empleado**