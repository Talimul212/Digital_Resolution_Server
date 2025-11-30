import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TaskZodSchema } from './EmployeeTask.validation';
import { TaskController } from './EmployeeTask.controller';

const router = Router();

router.post('/create', validateRequest(TaskZodSchema), TaskController.create);
router.get('/', TaskController.getAll);
router.get('/employee/:employeeId', TaskController.getByEmployee);

router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
