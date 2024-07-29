import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validateToken from '../middleware/ValidateToken';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/refreshToken', AuthController.refreshToken);
router.post('/getUserData', validateToken, AuthController.getUserData);
router.put('/updateUserData', validateToken, AuthController.updateUserData);
router.get(
  '/notifications/:id',
  validateToken,
  AuthController.getNotifications
);

export default router;
