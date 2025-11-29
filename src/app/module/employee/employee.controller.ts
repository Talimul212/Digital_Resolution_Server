import { Request, Response } from 'express';
import { EmployeeService } from './employee.service';

export const EmployeeController = {
  async create(req: Request, res: Response) {
    console.log(req.body);

    const employee = await EmployeeService.create(req.body);
    res.status(201).json({ success: true, data: employee });
  },

  async getAll(req: Request, res: Response) {
    const employees = await EmployeeService.getAll();
    res.status(200).json({ success: true, data: employees });
  },

  async getById(req: Request, res: Response) {
    const employee = await EmployeeService.getById(req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, data: employee });
  },

  async update(req: Request, res: Response) {
    const updated = await EmployeeService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  },

  async delete(req: Request, res: Response) {
    await EmployeeService.delete(req.params.id);
    res.status(204).send();
  },
};
