# EmployeeHub Backend API

Backend completo con Node.js, Express y MongoDB para el sistema EmployeeHub.

## 🚀 Inicio Rápido
```bash
npm install
cp .env.example .env  # Configurar variables
npm run data:import   # Importar datos de prueba
npm run dev           # Iniciar servidor
```

## 📚 Documentación de API

Visita http://localhost:5000 para ver la documentación completa de endpoints.

## 🔧 Configuración

Variables de entorno requeridas:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employeehub
JWT_SECRET=clave_secreta_segura
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🧪 Testing
```bash
npm test
```

## 📦 Despliegue
```bash
npm run build
npm start
```