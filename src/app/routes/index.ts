/* eslint-disable prettier/prettier */
import { Router } from 'express';
import UserRoutes from '../module/user/user.route';

interface IModuleRoute {
  path: string;
  route: Router;
}

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
