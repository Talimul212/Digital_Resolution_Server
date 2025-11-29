import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeValidation } from './employee.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(EmployeeValidation.create),
  EmployeeController.create,
);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

export default router;
