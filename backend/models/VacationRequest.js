import mongoose from 'mongoose';

const vacationRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        // No permitir fechas pasadas
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'La fecha de inicio no puede ser anterior a hoy'
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        // La fecha de fin debe ser mayor o igual a la fecha de inicio
        return value >= this.startDate;
      },
      message: 'La fecha de fin debe ser posterior a la fecha de inicio'
    }
  },
  days: {
    type: Number,
    required: true,
    min: [1, 'Debes solicitar al menos 1 día'],
    max: [30, 'No puedes solicitar más de 30 días consecutivos']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String,
    trim: true,
    maxlength: [500, 'El motivo no puede exceder 500 caracteres']
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  approvedAt: {
    type: Date
  },
  rejectedAt: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índice para evitar solapamientos de fechas para el mismo empleado
vacationRequestSchema.index({ employee: 1, startDate: 1, endDate: 1 });

const VacationRequest = mongoose.model('VacationRequest', vacationRequestSchema);

export default VacationRequest;