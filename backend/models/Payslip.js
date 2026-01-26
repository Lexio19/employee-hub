import mongoose from 'mongoose';

const payslipSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  grossSalary: {
    type: Number,
    required: true
  },
  netSalary: {
    type: Number,
    required: true
  },
  deductions: {
    type: Number,
    required: true
  },
  bonus: {
    type: Number,
    default: 0
  },
  pdfUrl: {
    type: String
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar duplicados
payslipSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

const Payslip = mongoose.model('Payslip', payslipSchema);

export default Payslip;