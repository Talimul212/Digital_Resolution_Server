import { ITask } from './EmployeeTask.interface';
import { TaskModel } from './EmployeeTask.model';

export const TaskService = {
  async createTask(payload: ITask) {

    const nowBD = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    const bdDate = nowBD.toISOString().split("T")[0]; // "2025-12-02"


    const exists = await TaskModel.findOne({
      employeeId: payload.employeeId,
      bdDate: bdDate,
    });

    if (exists) {
      throw new Error("This employee already submitted today's task.");
    }

    // Save task with BD date
    return await TaskModel.create({
      ...payload,
      bdDate,
    });
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

  async getEmployeeOverview(employeeId: string, start: string, end: string) {
    const tasks = await TaskModel.find({
      employeeId,
      bdDate: { $gte: start, $lte: end } 
    });

    let present = 0;
    let absent = 0;
    let leave = 0;

    let totalHours = 0;
    let hoursCount = 0;

    let totalDesigns = 0;
    let totalVideos = 0;
    let totalAds = 0;

    tasks.forEach(task => {
      if (task.attendance === "present") present++;
      if (task.attendance === "absent") absent++;
      if (task.attendance === "leave") leave++;

      if (typeof task.hours === "number") {
        totalHours += task.hours;
        hoursCount++;
      }

      if (task.role === "graphic_designer" && task.numberOfDesigns) {
        totalDesigns += task.numberOfDesigns;
      }

      if (task.role === "video_editor" && task.numberOfVideos) {
        totalVideos += task.numberOfVideos;
      }

      if (task.role === "marketer" && task.numberOfPlatforms) {
        totalAds += task.numberOfPlatforms;
      }
    });

    return {
      range: { start, end },
      summary: {
        present,
        absent,
        leave,
        averageHours: hoursCount > 0 ? totalHours / hoursCount : 0,
        totalDesigns,
        totalVideos,
        totalAds
      }
    };
  }





};
