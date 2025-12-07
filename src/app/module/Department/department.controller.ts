import { Request, Response } from 'express';
import { DepartmentService } from './department.service';

export const DepartmentController = {
  async create(req: Request, res: Response) {
    const result = await DepartmentService.create(req.body);
    res.status(201).json({ success: true, data: result });
  },

  async getAll(req: Request, res: Response) {
    const departments = await DepartmentService.getAll();
    res.status(200).json({ success: true, data: departments });
  },

  async getById(req: Request, res: Response) {
    const department = await DepartmentService.getById(req.params.id);
    res.status(200).json({ success: true, data: department });
  },

  async update(req: Request, res: Response) {
    const updated = await DepartmentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  },

  async delete(req: Request, res: Response) {
    const deleted = await DepartmentService.delete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: 'Department not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Department deleted successfully' });
  },

  async getEmployees(req: Request, res: Response) {
    console.log(req.params);

    try {
      const employees = await DepartmentService.getEmployeesByDepartmentName(
        req.params.id,
      );
      if (!employees) {
        return res
          .status(404)
          .json({ success: false, message: 'Department not found' });
      }
      res.status(200).json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal server error: ${(error as Error).message}`,
      });
    }
  },
  async getOverview(req: Request, res: Response) {
    try {
      const overview = await DepartmentService.getOverviewByDepartmentId(
        req.params.id,
      );
      res.status(200).json({ success: true, data: overview });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal server error: ${(error as Error).message}`,
      });
    }
  },
};
