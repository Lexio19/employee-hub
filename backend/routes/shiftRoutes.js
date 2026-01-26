import express from 'express';
import { 
  getShifts,
  getAllShifts,
  createShift,
  getMySwapRequests,
  getAvailableSwapRequests,
  createSwapRequest,
  acceptSwapRequest,
  rejectSwapRequest,
  cancelSwapRequest
} from '../controllers/shiftController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rutas de turnos
router.route('/')
  .get(protect, getShifts)
  .post(protect, authorize('admin', 'manager'), createShift);

router.get('/all', protect, authorize('admin', 'manager'), getAllShifts);

// Rutas de solicitudes de cambio
router.get('/swap-requests/my', protect, getMySwapRequests);
router.get('/swap-requests/available', protect, getAvailableSwapRequests);

router.route('/swap-requests')
  .post(protect, createSwapRequest);

router.put('/swap-requests/:id/accept', protect, acceptSwapRequest);
router.put('/swap-requests/:id/reject', protect, rejectSwapRequest);
router.put('/swap-requests/:id/cancel', protect, cancelSwapRequest);

export default router;