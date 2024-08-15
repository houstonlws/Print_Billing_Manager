import { Router } from 'express';
import BillingController from '../controllers/billing.controller';
import validateToken from '../middleware/validate-token.middleware';

const router = Router();

router.use(
  '/billing',
  validateToken,
  router.get('/:id', BillingController.getDepartmentBillingHistory)
);

export default router;
