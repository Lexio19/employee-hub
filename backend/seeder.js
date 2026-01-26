import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './models/Employee.js';
import Payslip from './models/Payslip.js';
import Shift from './models/Shift.js';
import VacationRequest from './models/VacationRequest.js';
import connectDB from './config/db.js';

dotenv.config();

const employees = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    password: '123456',
    position: 'Desarrollador Senior',
    department: 'IT',
    hireDate: new Date('2022-01-15'),
    vacationDays: 22,
    usedVacationDays: 8,
    role: 'employee'
  },
  {
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    password: '123456',
    position: 'Diseñadora UX',
    department: 'IT',
    hireDate: new Date('2021-06-10'),
    vacationDays: 22,
    usedVacationDays: 12,
    role: 'employee'
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@empresa.com',
    password: '123456',
    position: 'Desarrollador Junior',
    department: 'IT',
    hireDate: new Date('2023-03-20'),
    vacationDays: 22,
    usedVacationDays: 5,
    role: 'employee'
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@empresa.com',
    password: '123456',
    position: 'Manager IT',
    department: 'IT',
    hireDate: new Date('2019-02-01'),
    vacationDays: 25,
    usedVacationDays: 10,
    role: 'manager'
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Limpiar base de datos
    await Employee.deleteMany();
    await Payslip.deleteMany();
    await Shift.deleteMany();
    await VacationRequest.deleteMany();

    // Crear empleados
    const createdEmployees = await Employee.insertMany(employees);
    console.log('✅ Empleados creados');

    // Crear nóminas para cada empleado
    const payslips = [];
    const months = ['Diciembre 2025', 'Noviembre 2025', 'Octubre 2025'];
    
    createdEmployees.forEach((employee, index) => {
      const baseSalary = 2500 + (index * 500);
      
      months.forEach((month, monthIndex) => {
        payslips.push({
          employee: employee._id,
          month: month,
          year: 2025,
          grossSalary: baseSalary,
          netSalary: baseSalary - 850,
          deductions: 850,
          bonus: monthIndex === 1 ? 200 : 0
        });
      });
    });

    await Payslip.insertMany(payslips);
    console.log('✅ Nóminas creadas');

    // Crear turnos
    const shifts = [];
    const types = ['Mañana', 'Tarde', 'Noche'];
    const times = [
      { start: '09:00', end: '17:00' },
      { start: '14:00', end: '22:00' },
      { start: '22:00', end: '06:00' }
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      createdEmployees.forEach((employee, index) => {
        const typeIndex = index % 3;
        shifts.push({
          employee: employee._id,
          date: date,
          startTime: times[typeIndex].start,
          endTime: times[typeIndex].end,
          type: types[typeIndex]
        });
      });
    }

    await Shift.insertMany(shifts);
    console.log('✅ Turnos creados');

    // Crear solicitudes de vacaciones
    const vacations = [
      {
        employee: createdEmployees[0]._id,
        startDate: new Date('2026-02-10'),
        endDate: new Date('2026-02-14'),
        days: 5,
        status: 'approved',
        reason: 'Vacaciones familiares'
      },
      {
        employee: createdEmployees[0]._id,
        startDate: new Date('2026-03-20'),
        endDate: new Date('2026-03-22'),
        days: 3,
        status: 'pending',
        reason: 'Asuntos personales'
      }
    ];

    await VacationRequest.insertMany(vacations);
    console.log('✅ Solicitudes de vacaciones creadas');

    console.log('\n🎉 Datos de prueba importados exitosamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Employee.deleteMany();
    await Payslip.deleteMany();
    await Shift.deleteMany();
    await VacationRequest.deleteMany();

    console.log('✅ Datos eliminados');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}