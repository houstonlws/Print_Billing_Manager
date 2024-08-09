import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/refreshToken', AuthController.refreshToken);
router.get('/getUserData/:id', validateToken, AuthController.getUserData);
router.put('/updateUserData', validateToken, AuthController.updateUserData);
router.get(
  '/notifications/:id',
  validateToken,
  AuthController.getNotifications
);
router.get('/getAllUsers', validateToken, AuthController.getAllUsers);
router.put('/userType', validateToken, AuthController.updateUserType);
router.get('/getAllData', validateToken, AuthController.getAllData);
router.get('/getAllData/:id', validateToken, AuthController.getAllData);

export default router;
