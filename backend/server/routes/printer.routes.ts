import { Router } from 'express';
import PrinterController from '../controllers/printer.controller';
import validateToken from '../middleware/validate-token.middleware';

const router = Router();
router.use(
  '/printer',
  validateToken,
  router.get('/metrics', PrinterController.getAllMetrics),
  router.get('/:id', PrinterController.getDepartmentPrinters),
  router.get('/metrics/:id', PrinterController.getDepartmentMetrics),
  router.get('/', PrinterController.getAllPrinters),
  router.put('/', PrinterController.updatePrinter),
  router.post('/', PrinterController.addPrinter)
);

export default router;
