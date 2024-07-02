import { Router } from "express";
import validateToken from "../middleware/ValidateToken";
import BillingController from "../controllers/billing.controller";

const router = Router()

router.get('/getDepartmentBillingHistory',validateToken, BillingController.getDepartmentBillingHistory)

export default router