import { DepartmentModel } from './department.model';
import { TDepartment } from './department.interface';

export const DepartmentService = {
  async create(data: TDepartment) {
    return await DepartmentModel.create(data);
  },

  async getAll() {
    return await DepartmentModel.find()
      .populate('clientIds')
      .populate('employeeIds');
  },

  async getById(id: string) {
    return await DepartmentModel.findById(id)
      .populate('clientIds')
      .populate('employeeIds');
  },

  async update(id: string, data: Partial<TDepartment>) {
    return await DepartmentModel.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id: string) {
    return await DepartmentModel.findByIdAndDelete(id);
  },
};
