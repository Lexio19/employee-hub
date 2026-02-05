import express from 'express';
import { 
  getVacations, 
  createVacation,
  updateVacationStatus,
  cancelVacation,
  getAllPendingVacations
} from '../controllers/vacationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Ruta de gestión para managers DEBE ir antes de las rutas con :id
router.get('/management/pending', protect, authorize('manager', 'admin'), getAllPendingVacations);

router.route('/')
  .get(protect, getVacations)
  .post(protect, createVacation);

router.route('/:id')
  .delete(protect, cancelVacation);

router.route('/:id/status')
  .put(protect, authorize('manager', 'admin'), updateVacationStatus);

export default router;