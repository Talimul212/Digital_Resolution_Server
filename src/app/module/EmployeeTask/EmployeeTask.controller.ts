/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TaskService } from './EmployeeTask.service';

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      console.log(req.body);

      const task = await TaskService.createTask(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getTasks();
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: 'Task not found' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  // 🔑 NEW: Get tasks by employeeId
  async getByEmployee(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const tasks = await TaskService.getTasksByEmployeeId(employeeId);
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: 'Task not found' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await TaskService.deleteTask(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: 'Task not found' });
      }
      res.json({ success: true, message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },

  async getEmployeeOverview(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const { days, from, to } = req.query;

      let startDate: Date;
      let endDate = new Date();

      if (from && to) {
        startDate = new Date(from as string);
        endDate = new Date(to as string);
      } else if (days) {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - Number(days));
      } else {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
      }

      // Convert BD dates to YYYY-MM-DD strings
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const data = await TaskService.getEmployeeOverview(
        employeeId,
        start,
        end,
      );

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  },
};
