import Employee from '../models/Employee.js';
import generateToken from '../utils/generateToken.js';

// @desc    Registrar nuevo empleado
// @route   POST /api/auth/register
// @access  Public (en producción debería ser privado/admin)
export const register = async (req, res) => {
  try {
    const { name, email, password, position, department } = req.body;

    // Verificar si el empleado ya existe
    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: 'El empleado ya existe'
      });
    }

    // Crear empleado
    const employee = await Employee.create({
      name,
      email,
      password,
      position,
      department
    });

    if (employee) {
      res.status(201).json({
        success: true,
        data: {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          position: employee.position,
          department: employee.department,
          avatar: employee.avatar,
          vacationDays: employee.vacationDays,
          usedVacationDays: employee.usedVacationDays,
          role: employee.role,
          token: generateToken(employee._id)
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login de empleado
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Intento de login:');
    console.log('  Email:', email);
    console.log('  Password recibido:', password ? 'Sí' : 'No');

    // Validar email y password
    if (!email || !password) {
      console.log('❌ Falta email o contraseña');
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona email y contraseña'
      });
    }

    // Buscar empleado con contraseña
    const employee = await Employee.findOne({ email }).select('+password');

    console.log('  Empleado encontrado:', employee ? 'Sí' : 'No');

    if (!employee) {
      console.log('❌ Empleado no existe');
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isMatch = await employee.matchPassword(password);

    console.log('  Contraseña coincide:', isMatch ? 'Sí' : 'No');

    if (!isMatch) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    console.log('✅ Login exitoso');

    res.json({
      success: true,
      data: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        hireDate: employee.hireDate,
        avatar: employee.avatar,
        vacationDays: employee.vacationDays,
        usedVacationDays: employee.usedVacationDays,
        role: employee.role,
        token: generateToken(employee._id)
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener perfil del empleado actual
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};