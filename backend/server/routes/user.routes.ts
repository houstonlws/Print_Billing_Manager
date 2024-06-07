import { Router } from "express";
import validateToken from "../middleware/ValidateToken";
import UserController from "../controllers/user.controller";

const accountRoutes = Router()

accountRoutes.post('/getUserData', validateToken, UserController.getUserData)

export default accountRoutes