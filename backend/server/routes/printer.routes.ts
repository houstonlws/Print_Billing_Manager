import { Router } from 'express';
import PrinterController from '../controllers/printer.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();
router.use(
  '/printer',
  router.get('/jobs', PrinterController.getJobHistory),
  router.get('/jobs/:id', PrinterController.getJobHistory),
  router.get('/metrics', PrinterController.getAllMetrics),
  router.get('/:id', PrinterController.getDepartmentPrinters),
  router.get('/metrics/:id', PrinterController.getDepartmentMetrics),
  router.get('/', PrinterController.getAllPrinters),
  router.put('/', PrinterController.updatePrinter),
  router.post('/', PrinterController.addPrinter)
);

export default router;
