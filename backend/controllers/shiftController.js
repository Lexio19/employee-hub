import Shift from '../models/Shift.js';
import ShiftSwapRequest from '../models/ShiftSwapRequest.js';

// @desc    Obtener turnos del empleado
// @route   GET /api/shifts
// @access  Private
export const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({ employee: req.user.id })
      .sort({ date: 1 });

    res.json({
      success: true,
      count: shifts.length,
      data: shifts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener todos los turnos (para admin/manager)
// @route   GET /api/shifts/all
// @access  Private/Admin/Manager
export const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate('employee', 'name email position avatar')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: shifts.length,
      data: shifts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear nuevo turno (solo admin/manager)
// @route   POST /api/shifts
// @access  Private/Admin/Manager
export const createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);

    res.status(201).json({
      success: true,
      data: shift
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener solicitudes de cambio del empleado
// @route   GET /api/shifts/swap-requests/my
// @access  Private
export const getMySwapRequests = async (req, res) => {
  try {
    const requests = await ShiftSwapRequest.find({ requester: req.user.id })
      .populate('shift')
      .populate('acceptedBy', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener solicitudes disponibles (excluyendo las propias y rechazadas)
// @route   GET /api/shifts/swap-requests/available
// @access  Private
export const getAvailableSwapRequests = async (req, res) => {
  try {
    const requests = await ShiftSwapRequest.find({
      requester: { $ne: req.user.id },
      status: 'pending',
      rejectedBy: { $ne: req.user.id }
    })
      .populate('requester', 'name email position avatar')
      .populate('shift')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear solicitud de cambio de turno
// @route   POST /api/shifts/swap-requests
// @access  Private
export const createSwapRequest = async (req, res) => {
  try {
    const { shiftId, reason } = req.body;

    // Verificar que el turno existe y pertenece al usuario
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Turno no encontrado'
      });
    }

    if (shift.employee.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'No puedes solicitar cambio de un turno que no es tuyo'
      });
    }

    // Verificar que no exista una solicitud pendiente para este turno
    const existingRequest = await ShiftSwapRequest.findOne({
      shift: shiftId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una solicitud pendiente para este turno'
      });
    }

    const swapRequest = await ShiftSwapRequest.create({
      requester: req.user.id,
      shift: shiftId,
      reason
    });

    // Poblar datos para respuesta
    await swapRequest.populate('shift');
    await swapRequest.populate('requester', 'name email avatar');

    res.status(201).json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Aceptar solicitud de cambio de turno
// @route   PUT /api/shifts/swap-requests/:id/accept
// @access  Private
export const acceptSwapRequest = async (req, res) => {
  try {
    const swapRequest = await ShiftSwapRequest.findById(req.params.id)
      .populate('shift')
      .populate('requester', 'name');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Esta solicitud ya no está disponible'
      });
    }

    // No puedes aceptar tu propia solicitud
    if (swapRequest.requester._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'No puedes aceptar tu propia solicitud'
      });
    }

    // Buscar un turno del aceptador para intercambiar
    const acceptorShift = await Shift.findOne({
      employee: req.user.id,
      date: { $gte: new Date() }
    });

    // Actualizar la solicitud
    swapRequest.status = 'accepted';
    swapRequest.acceptedBy = req.user.id;
    swapRequest.acceptedAt = Date.now();
    await swapRequest.save();

    // Intercambiar turnos
    const requesterShift = await Shift.findById(swapRequest.shift._id);
    requesterShift.employee = req.user.id;
    await requesterShift.save();

    if (acceptorShift) {
      acceptorShift.employee = swapRequest.requester._id;
      await acceptorShift.save();
    }

    res.json({
      success: true,
      message: `Cambio de turno confirmado con ${swapRequest.requester.name}`,
      data: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Rechazar solicitud de cambio de turno
// @route   PUT /api/shifts/swap-requests/:id/reject
// @access  Private
export const rejectSwapRequest = async (req, res) => {
  try {
    const swapRequest = await ShiftSwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Esta solicitud ya no está disponible'
      });
    }

    // Añadir al array de rechazados
    swapRequest.rejectedBy.push(req.user.id);
    await swapRequest.save();

    res.json({
      success: true,
      message: 'Solicitud rechazada',
      data: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancelar solicitud de cambio de turno
// @route   PUT /api/shifts/swap-requests/:id/cancel
// @access  Private
export const cancelSwapRequest = async (req, res) => {
  try {
    const swapRequest = await ShiftSwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    // Verificar que es el creador de la solicitud
    if (swapRequest.requester.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'No puedes cancelar esta solicitud'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solo puedes cancelar solicitudes pendientes'
      });
    }

    swapRequest.status = 'cancelled';
    await swapRequest.save();

    res.json({
      success: true,
      message: 'Solicitud cancelada correctamente',
      data: swapRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};