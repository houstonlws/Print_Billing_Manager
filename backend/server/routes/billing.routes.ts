import { Router } from 'express';
import BillingController from '../controllers/billing.controller';

const router = Router();

router.get('/:id', BillingController.getDepartmentBillingHistory);

export default router;
