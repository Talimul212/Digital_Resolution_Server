// Optional: register route (if using same user service)
import { Router } from 'express';
import { CreateUserSchema } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(CreateUserSchema),
  AuthController.register,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

export default router;
