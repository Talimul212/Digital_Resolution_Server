import { Router } from 'express';
import { DepartmentController } from './department.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './department.validation';

const router = Router();

router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);

router.get('/employees/:id', DepartmentController.getEmployees);

router.post(
  '/create',
  validateRequest(DepartmentValidation.createDepartmentSchema),
  DepartmentController.create,
);
router.put(
  '/:id',
  validateRequest(DepartmentValidation.createDepartmentSchema),
  DepartmentController.update,
);
router.delete('/:id', DepartmentController.delete);

export default router;
