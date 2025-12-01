import { Router } from 'express';
import { UserController } from './user.controller';
import { UpdateUserSchema } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { verifyToken } from '../../middlewares/auth';
import { authorize } from '../../middlewares/role';

const router = Router();

router.get('/', verifyToken,
    authorize('graphic_designer'), UserController.getAll);
router.get('/:id', UserController.getById);
router.get('/by-employee/:employeeId', UserController.getByEmployeeId);

router.put('/:id', validateRequest(UpdateUserSchema), UserController.update);
router.delete('/:id', UserController.delete);

export default router;
