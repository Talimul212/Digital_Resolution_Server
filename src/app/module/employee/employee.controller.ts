import { Request, Response } from 'express';
import { EmployeeService } from './employee.service';
import { UserModel } from "../user/user.model";
import { EmployeeModel } from "./employee.model";

export const EmployeeController = {
  async create(req: Request, res: Response) {
    try {
      // 1️⃣ Create Employee
      const employee = await EmployeeModel.create(req.body);

      // 2️⃣ Auto-create User for Login
      await UserModel.create({
        name: employee.name,
        email: employee.email,
        password: employee.companyID,   
        employeeId: employee._id,
        userType: employee.department,
        createdBy: "admin",
      });

      return res.status(201).json({
        success: true,
        message: "Employee & User created successfully",
        data: employee,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
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
