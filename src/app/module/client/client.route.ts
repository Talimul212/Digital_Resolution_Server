import { Router } from 'express';
import { ClientController } from './client.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ClientValidation } from './client.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(ClientValidation.create),
  ClientController.create,
);
router.get('/', ClientController.getAll);
router.put('/:id/update', ClientController.update);
router.delete('/:id/delete', ClientController.delete);
router.get('/:id', ClientController.getById);

export default router;
