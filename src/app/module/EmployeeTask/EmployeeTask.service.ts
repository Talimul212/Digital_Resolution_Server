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
    const tasks = await TaskModel.find({ employeeId }).populate("employeeId");

    return tasks.map((task) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: any = task.toObject();

      // Safe check (in case createdAt is missing)
      if (obj?.createdAt) {
        const dayName = new Date(obj.createdAt).toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "Asia/Dhaka",
        });

        obj.day = dayName; // Add day field
      } else {
        obj.day = "Unknown";
      }

      return obj;
    });
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
