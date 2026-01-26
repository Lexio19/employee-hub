import mongoose from 'mongoose';

const shiftSwapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  rejectedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  acceptedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const ShiftSwapRequest = mongoose.model('ShiftSwapRequest', shiftSwapRequestSchema);

export default ShiftSwapRequest;