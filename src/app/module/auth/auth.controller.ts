import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { DepartmentModel } from '../Department/department.model';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.createUser(req.body);
      // Auto-assign to department if userType matches
      const departmentMap: Record<string, string> = {
        marketer: 'Marketing',
        web_developer: 'Web Development',
        graphic_designer: 'Graphic Design',
        video_editor: 'Video Editing',
      };

      const departmentName = departmentMap[req.body.userType];
      if (departmentName) {
        await DepartmentModel.findOneAndUpdate(
          { name: departmentName },
          { $addToSet: { employeeIds: user._id } },
          { new: true },
        );
      }

      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'User registration failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const result = await AuthService.login({ email, password });
      console.log(result);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  },

  async validate(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'Token missing' });
      }

      const decoded = await AuthService.validate(token);
      res.status(200).json({ success: true, data: decoded });
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Token validation failed',
      });
    }
  },
};
