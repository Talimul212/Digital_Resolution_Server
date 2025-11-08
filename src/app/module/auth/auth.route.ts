// Optional: register route (if using same user service)
import { Router } from 'express';
import { UserController } from '../user/user.controller';
import { CreateUserSchema } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

router.post(
  '/register',
  validateRequest(CreateUserSchema),
  UserController.create,
);

export default router;
