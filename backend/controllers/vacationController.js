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

    // Verificar que las fechas no sean pasadas
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        success: false,
        message: 'No puedes solicitar vacaciones en fechas pasadas'
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de fin debe ser posterior a la fecha de inicio'
      });
    }

    // Verificar que el empleado tenga días disponibles
    const employee = await Employee.findById(req.user.id);
    const availableDays = employee.vacationDays - employee.usedVacationDays;

    if (days > availableDays) {
      return res.status(400).json({
        success: false,
        message: `No tienes suficientes días disponibles. Disponibles: ${availableDays}, Solicitados: ${days}`
      });
    }

    // Verificar que no haya solapamiento de fechas con otras solicitudes aprobadas o pendientes
    const overlappingVacations = await VacationRequest.find({
      employee: req.user.id,
      status: { $in: ['pending', 'approved'] },
      $or: [
        // La nueva solicitud empieza durante unas vacaciones existentes
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });

    if (overlappingVacations.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya tienes vacaciones solicitadas o aprobadas en estas fechas'
      });
    }

    // Validar que no solicite más de 30 días consecutivos
    if (days > 30) {
      return res.status(400).json({
        success: false,
        message: 'No puedes solicitar más de 30 días consecutivos de vacaciones'
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
      data: vacation,
      message: 'Solicitud de vacaciones creada exitosamente'
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
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Debe ser "approved" o "rejected"'
      });
    }

    const vacation = await VacationRequest.findById(req.params.id);

    if (!vacation) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    if (vacation.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Esta solicitud ya ha sido procesada'
      });
    }

    vacation.status = status;
    vacation.approvedBy = req.user.id;

    if (status === 'approved') {
      vacation.approvedAt = Date.now();
      // Actualizar días usados del empleado
      await Employee.findByIdAndUpdate(vacation.employee, {
        $inc: { usedVacationDays: vacation.days }
      });
    } else if (status === 'rejected') {
      vacation.rejectedAt = Date.now();
      vacation.rejectionReason = rejectionReason || 'No especificado';
    }

    await vacation.save();

    res.json({
      success: true,
      data: vacation,
      message: status === 'approved' ? 'Solicitud aprobada' : 'Solicitud rechazada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancelar solicitud de vacaciones pendiente
// @route   DELETE /api/vacations/:id
// @access  Private
export const cancelVacation = async (req, res) => {
  try {
    const vacation = await VacationRequest.findById(req.params.id);

    if (!vacation) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    // Verificar que la solicitud pertenezca al usuario
    if (vacation.employee.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado para cancelar esta solicitud'
      });
    }

    // Solo se pueden cancelar solicitudes pendientes
    if (vacation.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solo puedes cancelar solicitudes pendientes'
      });
    }

    await vacation.deleteOne();

    res.json({
      success: true,
      message: 'Solicitud cancelada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener todas las solicitudes pendientes (solo managers/admin)
// @route   GET /api/vacations/management/pending
// @access  Private/Manager/Admin
export const getAllPendingVacations = async (req, res) => {
  try {
    const vacations = await VacationRequest.find({ status: 'pending' })
      .populate('employee', 'name email position department avatar vacationDays usedVacationDays')
      .sort({ createdAt: 1 }); // Más antiguas primero

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