import { Router } from "express";
import DataController from "../controllers/data.controller";

const router = Router()

router.get('/data/departments', DataController.getDepartments)

export default router