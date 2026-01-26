import Payslip from '../models/Payslip.js';

// @desc    Obtener todas las nóminas del empleado
// @route   GET /api/payslips
// @access  Private
export const getPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find({ employee: req.user.id })
      .sort({ year: -1, createdAt: -1 });

    res.json({
      success: true,
      count: payslips.length,
      data: payslips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener una nómina específica
// @route   GET /api/payslips/:id
// @access  Private
export const getPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id);

    if (!payslip) {
      return res.status(404).json({
        success: false,
        message: 'Nómina no encontrada'
      });
    }

    // Verificar que la nómina pertenece al usuario
    if (payslip.employee.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }

    res.json({
      success: true,
      data: payslip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear nueva nómina (solo admin)
// @route   POST /api/payslips
// @access  Private/Admin
export const createPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.create(req.body);

    res.status(201).json({
      success: true,
      data: payslip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};