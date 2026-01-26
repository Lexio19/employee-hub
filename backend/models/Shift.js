import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Mañana', 'Tarde', 'Noche'],
    required: true
  }
}, {
  timestamps: true
});

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;