import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email);

    const result = await AuthService.login({ email, password });
    res.status(200).json({ success: true, data: result });
  },

  async validate(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.status(401).json({ success: false, message: 'Token missing' });

    const decoded = await AuthService.validate(token);
    res.status(200).json({ success: true, data: decoded });
  },
};
