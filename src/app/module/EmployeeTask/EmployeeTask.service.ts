import { ITask } from './EmployeeTask.interface';
import { TaskModel } from './EmployeeTask.model';

export const TaskService = {
  async createTask(payload: ITask) {
    return await TaskModel.create(payload);
  },

  async getTasks() {
    return await TaskModel.find().populate('employeeId');
  },

  async getTaskById(id: string) {
    return await TaskModel.findById(id).populate('employeeId');
  },

  // 🔑 NEW: find tasks by employeeId
  async getTasksByEmployeeId(employeeId: string) {
    return await TaskModel.find({ employeeId }).populate('employeeId');
  },

  async updateTask(id: string, payload: Partial<ITask>) {
    return await TaskModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).populate('employeeId');
  },

  async deleteTask(id: string) {
    return await TaskModel.findByIdAndDelete(id);
  },
};
