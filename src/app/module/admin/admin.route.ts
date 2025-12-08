// admin.routes.ts
import { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();

router.get('/overview', AdminController.getOverview);

export default router;
