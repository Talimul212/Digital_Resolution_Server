/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TaskService } from './EmployeeTask.service';

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async getAll(req: Request, res: Response) {
    const tasks = await TaskService.getTasks();
    res.json({ success: true, data: tasks });
  },

  async getOne(req: Request, res: Response) {
    const task = await TaskService.getTaskById(req.params.id);
    res.json({ success: true, data: task });
  },

  async update(req: Request, res: Response) {
    const task = await TaskService.updateTask(req.params.id, req.body);
    res.json({ success: true, data: task });
  },

  async delete(req: Request, res: Response) {
    await TaskService.deleteTask(req.params.id);
    res.json({ success: true, message: 'Task deleted' });
  },
};
