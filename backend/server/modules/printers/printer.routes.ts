import { Router } from "express";
import PrinterController from "./printer.controller";
import validateToken from "../../middleware/ValidateToken";

const router = Router()

router.get('/printers' ,validateToken , PrinterController.getDepartmentPrinters)

export default router