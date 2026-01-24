# 🏢 EmployeeHub - Portal del Empleado

![EmployeeHub](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=for-the-badge&logo=vite)

> Sistema completo de gestión para empleados con autenticación, gestión de nóminas, vacaciones y cambio de turnos automatizado.

## 🎯 Descripción del Proyecto

**EmployeeHub** es una aplicación web moderna diseñada para centralizar toda la gestión del empleado en una única plataforma intuitiva. Permite a los trabajadores consultar sus nóminas, solicitar vacaciones y gestionar cambios de turno **sin necesidad de intervención de RRHH**, optimizando el tiempo y mejorando la experiencia del empleado.

### 🌟 Características Principales

- ✅ **Autenticación Segura** - Sistema de login con JWT y persistencia de sesión
- 💰 **Gestión de Nóminas** - Visualización y descarga de recibos salariales
- 🏖️ **Sistema de Vacaciones** - Solicitud y seguimiento de días libres con cálculo automático
- 🔄 **Cambio de Turnos Inteligente** - Solicitudes automáticas sin coordinación manual entre empleados
- 📊 **Dashboard Informativo** - Vista general de métricas importantes del empleado
- 👤 **Perfil Personalizado** - Gestión de información personal y laboral
- 🎨 **Diseño Responsive** - Interfaz moderna con Tailwind CSS

## 🚀 Demo

### Capturas de Pantalla

#### Login
![Login](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Login+Screen)

#### Dashboard
![Dashboard](https://via.placeholder.com/800x450/10B981/FFFFFF?text=Dashboard)

#### Gestión de Turnos
![Turnos](https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Shift+Management)

### 🎥 [Ver Demo en Vivo](https://tu-proyecto.vercel.app) *(Próximamente)*

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3** - Biblioteca de JavaScript para interfaces de usuario
- **React Router DOM** - Navegación y enrutamiento
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Iconos modernos y ligeros
- **date-fns** - Manipulación de fechas

### Build Tools
- **Vite** - Build tool ultrarrápido
- **PostCSS** - Transformación de CSS
- **Autoprefixer** - Compatibilidad cross-browser

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/employee-hub.git
cd employee-hub
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🔐 Usuarios de Prueba

Para probar la aplicación, usa estas credenciales:

| Email | Contraseña | Rol |
|-------|------------|-----|
| juan.perez@empresa.com | 123456 | Desarrollador Senior |
| maria.garcia@empresa.com | 123456 | Diseñadora UX |
| carlos.lopez@empresa.com | 123456 | Desarrollador Junior |

## 📁 Estructura del Proyecto
```
employee-hub/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx          # Barra lateral de navegación
│   │   │   └── Layout.jsx           # Layout principal
│   │   ├── dashboard/
│   │   ├── payslips/
│   │   ├── vacations/
│   │   └── shifts/
│   ├── contexts/
│   │   └── AuthContext.jsx          # Contexto de autenticación
│   ├── data/
│   │   └── mockData.js              # Datos de prueba
│   ├── pages/
│   │   ├── Login.jsx                # Página de login
│   │   ├── Dashboard.jsx            # Dashboard principal
│   │   ├── Payslips.jsx             # Gestión de nóminas
│   │   ├── Vacations.jsx            # Solicitud de vacaciones
│   │   ├── Shifts.jsx               # Cambio de turnos
│   │   └── Profile.jsx              # Perfil del usuario
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## 🎓 Características Técnicas Destacadas

### 1. Arquitectura Escalable
- Separación de responsabilidades con contextos de React
- Componentes reutilizables y modulares
- Rutas protegidas con autenticación

### 2. Gestión de Estado
- Context API para estado global
- LocalStorage para persistencia de sesión
- Estados locales optimizados

### 3. UX/UI Moderna
- Diseño limpio y profesional
- Animaciones y transiciones suaves
- Feedback visual en todas las acciones
- Sistema de colores coherente

### 4. Sistema de Turnos Innovador
El algoritmo de cambio de turnos permite:
- Solicitudes sin coordinación manual
- Notificación automática a empleados compatibles
- Primer compañero en aceptar confirma el cambio
- Historial completo de solicitudes

## 🚧 Próximas Funcionalidades

- [ ] Backend con Node.js + Express
- [ ] Base de datos MongoDB
- [ ] Sistema de notificaciones en tiempo real
- [ ] Exportación de nóminas en PDF
- [ ] Gráficos de evolución salarial
- [ ] App móvil con React Native
- [ ] Sistema de mensajería entre empleados
- [ ] Integración con APIs de RRHH externas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Portfolio: [tu-portfolio.com](https://tu-portfolio.com)

## 🙏 Agradecimientos

- Iconos por [Lucide](https://lucide.dev/)
- Avatares por [DiceBear](https://dicebear.com/)
- Inspiración de diseño de sistemas empresariales modernos

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub
```

## Paso 24: Crear archivo .gitignore (si no existe)

Verifica que tengas `.gitignore` en la raíz con este contenido:
```
# Dependencias
node_modules/

# Build
dist/
dist-ssr/
*.local

# Editor
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.production

# Sistema
.DS_Store
Thumbs.db
```

## Paso 25: Crear LICENSE

Crea el archivo `LICENSE` en la raíz:
```
MIT License

Copyright (c) 2026 Alejandro Miras Andújar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.