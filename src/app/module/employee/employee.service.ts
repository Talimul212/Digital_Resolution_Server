import { EmployeeModel } from './employee.model';
import { IEmployee } from './employee.interface';

export const EmployeeService = {
  async create(data: IEmployee) {
    return await EmployeeModel.create(data);
  },

  async getAll() {
    return await EmployeeModel.find();
  },

  async getById(id: string) {
    return await EmployeeModel.findById(id);
  },

  async update(id: string, data: Partial<IEmployee>) {
    return await EmployeeModel.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string) {
    return await EmployeeModel.findByIdAndDelete(id);
  },
};
