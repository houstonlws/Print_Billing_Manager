import { Router } from 'express';
import validateToken from '../middleware/ValidateToken';
import BillingController from '../controllers/billing.controller';

const router = Router();

router.get(
  '/getDepartmentBillingHistory/:id',
  validateToken,
  BillingController.getDepartmentBillingHistory
);

export default router;
