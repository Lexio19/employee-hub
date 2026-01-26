import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import payslipRoutes from './routes/payslipRoutes.js';
import vacationRoutes from './routes/vacationRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/payslips', payslipRoutes);
app.use('/api/vacations', vacationRoutes);
app.use('/api/shifts', shiftRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API EmployeeHub funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      payslips: '/api/payslips',
      vacations: '/api/vacations',
      shifts: '/api/shifts'
    }
  });
});

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});