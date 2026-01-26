import VacationRequest from '../models/VacationRequest.js';
import Employee from '../models/Employee.js';

// @desc    Obtener solicitudes de vacaciones del empleado
// @route   GET /api/vacations
// @access  Private
export const getVacations = async (req, res) => {
  try {
    const vacations = await VacationRequest.find({ employee: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: vacations.length,
      data: vacations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear solicitud de vacaciones
// @route   POST /api/vacations
// @access  Private
export const createVacation = async (req, res) => {
  try {
    const { startDate, endDate, days, reason } = req.body;

    // Verificar que el empleado tenga días disponibles
    const employee = await Employee.findById(req.user.id);
    const availableDays = employee.vacationDays - employee.usedVacationDays;

    if (days > availableDays) {
      return res.status(400).json({
        success: false,
        message: `No tienes suficientes días disponibles. Disponibles: ${availableDays}`
      });
    }

    const vacation = await VacationRequest.create({
      employee: req.user.id,
      startDate,
      endDate,
      days,
      reason
    });

    res.status(201).json({
      success: true,
      data: vacation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Aprobar/Rechazar solicitud de vacaciones (solo managers/admin)
// @route   PUT /api/vacations/:id/status
// @access  Private/Manager/Admin
export const updateVacationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const vacation = await VacationRequest.findById(req.params.id);

    if (!vacation) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    vacation.status = status;
    vacation.approvedBy = req.user.id;
    vacation.approvedAt = Date.now();

    await vacation.save();

    // Si se aprueba, actualizar días usados del empleado
    if (status === 'approved') {
      await Employee.findByIdAndUpdate(vacation.employee, {
        $inc: { usedVacationDays: vacation.days }
      });
    }

    res.json({
      success: true,
      data: vacation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};