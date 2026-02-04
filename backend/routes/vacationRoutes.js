import express from 'express';
import { 
  getVacations, 
  createVacation,
  updateVacationStatus,
  cancelVacation
} from '../controllers/vacationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getVacations)
  .post(protect, createVacation);

router.route('/:id')
  .delete(protect, cancelVacation);

router.route('/:id/status')
  .put(protect, authorize('manager', 'admin'), updateVacationStatus);

export default router;