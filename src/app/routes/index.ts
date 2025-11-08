import { Router } from 'express';
import UserRoutes from '../module/user/user.route';
import AuthRoutes from '../module/auth/auth.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
