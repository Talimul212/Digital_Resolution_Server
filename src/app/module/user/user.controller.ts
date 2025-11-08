import { Request, Response } from 'express';
import { UserService } from './user.service';

export const UserController = {
  async getById(req: Request, res: Response) {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  },

  async getAll(req: Request, res: Response) {
    const users = await UserService.getAllUsers(req.query);
    res.json(users);
  },

  async update(req: Request, res: Response) {
    const updated = await UserService.updateUser(req.params.id, req.body);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  },
};
