// Datos simulados para el sistema
export const employees = [
  {
    id: 1,
    email: "juan.perez@empresa.com",
    password: "123456",
    name: "Juan Pérez",
    position: "Desarrollador Senior",
    department: "IT",
    hireDate: "2022-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    vacationDays: 22,
    usedVacationDays: 8
  },
  {
    id: 2,
    email: "maria.garcia@empresa.com",
    password: "123456",
    name: "María García",
    position: "Diseñadora UX",
    department: "IT",
    hireDate: "2021-06-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    vacationDays: 22,
    usedVacationDays: 12
  },
  {
    id: 3,
    email: "carlos.lopez@empresa.com",
    password: "123456",
    name: "Carlos López",
    position: "Desarrollador Junior",
    department: "IT",
    hireDate: "2023-03-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    vacationDays: 22,
    usedVacationDays: 5
  }
];

export const payslips = [
  {
    id: 1,
    employeeId: 1,
    month: "Diciembre 2025",
    date: "2025-12-31",
    grossSalary: 3500,
    netSalary: 2650,
    deductions: 850,
    bonus: 0,
    pdfUrl: "#"
  },
  {
    id: 2,
    employeeId: 1,
    month: "Noviembre 2025",
    date: "2025-11-30",
    grossSalary: 3500,
    netSalary: 2650,
    deductions: 850,
    bonus: 200,
    pdfUrl: "#"
  },
  {
    id: 3,
    employeeId: 1,
    month: "Octubre 2025",
    date: "2025-10-31",
    grossSalary: 3500,
    netSalary: 2650,
    deductions: 850,
    bonus: 0,
    pdfUrl: "#"
  },
  {
    id: 4,
    employeeId: 2,
    month: "Diciembre 2025",
    date: "2025-12-31",
    grossSalary: 3200,
    netSalary: 2450,
    deductions: 750,
    bonus: 0,
    pdfUrl: "#"
  },
  {
    id: 5,
    employeeId: 3,
    month: "Diciembre 2025",
    date: "2025-12-31",
    grossSalary: 2500,
    netSalary: 2000,
    deductions: 500,
    bonus: 0,
    pdfUrl: "#"
  }
];

export const shifts = [
  {
    id: 1,
    employeeId: 1,
    date: "2026-01-20",
    startTime: "09:00",
    endTime: "17:00",
    type: "Mañana"
  },
  {
    id: 2,
    employeeId: 1,
    date: "2026-01-21",
    startTime: "09:00",
    endTime: "17:00",
    type: "Mañana"
  },
  {
    id: 3,
    employeeId: 1,
    date: "2026-01-22",
    startTime: "09:00",
    endTime: "17:00",
    type: "Mañana"
  },
  {
    id: 4,
    employeeId: 2,
    date: "2026-01-20",
    startTime: "14:00",
    endTime: "22:00",
    type: "Tarde"
  },
  {
    id: 5,
    employeeId: 2,
    date: "2026-01-21",
    startTime: "14:00",
    endTime: "22:00",
    type: "Tarde"
  },
  {
    id: 6,
    employeeId: 3,
    date: "2026-01-20",
    startTime: "22:00",
    endTime: "06:00",
    type: "Noche"
  },
  {
    id: 7,
    employeeId: 3,
    date: "2026-01-21",
    startTime: "22:00",
    endTime: "06:00",
    type: "Noche"
  }
];
export const shiftSwapRequests = [
  {
    id: 1,
    requesterId: 1,
    requesterName: "Juan Pérez",
    shiftId: 1,
    shiftDate: "2026-01-20",
    shiftTime: "09:00 - 17:00",
    shiftType: "Mañana",
    targetEmployeeId: null,
    targetEmployeeName: null,
    status: "pending",
    reason: "Asunto personal",
    createdAt: "2026-01-18",
    rejectedBy: [] // Añadir este campo
  }
];

export const vacationRequests = [
  {
    id: 1,
    employeeId: 1,
    startDate: "2026-02-10",
    endDate: "2026-02-14",
    days: 5,
    status: "approved",
    reason: "Vacaciones familiares",
    createdAt: "2026-01-10"
  },
  {
    id: 2,
    employeeId: 1,
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    days: 3,
    status: "pending",
    reason: "Asuntos personales",
    createdAt: "2026-01-15"
  }
];
