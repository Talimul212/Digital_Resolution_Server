import { Router } from 'express';
import UserRoutes from '../module/user/user.route';
import AuthRoutes from '../module/auth/auth.route';
import DepartmentRoutes from '../module/Department/department.route';

interface IModuleRoute {
  path: string;
  route: Router;
}

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
