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

  async getTasksByEmployeeId(employeeId: string) {
    const tasks = await TaskModel.find({ employeeId }).populate("employeeId");

    return tasks.map((task) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: any = task.toObject();

      if (obj.employeeId && obj.employeeId._id) {
        obj.employeeId = obj.employeeId._id.toString();
      }

      if (obj?.createdAt) {
        const createdAtBD = new Date(
          new Date(obj.createdAt).toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
          })
        );


        const nowBD = new Date(
          new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
        );

        const cutoffBD = new Date(createdAtBD);
        cutoffBD.setHours(23, 59, 59, 999);

        obj.editable = nowBD <= cutoffBD;

        // Day name
        obj.day = createdAtBD.toLocaleDateString("en-US", {
          weekday: "long",
        });
      } else {
        obj.day = "Unknown";
        obj.editable = false;
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
