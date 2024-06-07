import { Router } from "express";
import DataController from "./data.controller";

const router = Router()

router.get('/data/departments', DataController.getDepartments)

export default router