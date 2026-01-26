export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      statusCode: 400,
      message: message
    };
  }

  // Error de duplicado de Mongoose
  if (err.code === 11000) {
    const message = 'Registro duplicado';
    error = {
      statusCode: 400,
      message: message
    };
  }

  // Error de cast de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = {
      statusCode: 404,
      message: message
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error del servidor'
  });
};