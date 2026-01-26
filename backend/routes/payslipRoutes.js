import express from 'express';
import { 
  getPayslips, 
  getPayslip, 
  createPayslip 
} from '../controllers/payslipController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getPayslips)
  .post(protect, authorize('admin'), createPayslip);

router.route('/:id')
  .get(protect, getPayslip);

export default router;