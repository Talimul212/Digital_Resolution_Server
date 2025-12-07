/* eslint-disable prefer-const */
import { EmployeeModel } from '../employee/employee.model';
import { LeaveModel } from '../EmployeeAttandance/EmployeeLeave.model';
import { ITask } from './EmployeeTask.interface';
import { TaskModel } from './EmployeeTask.model';

const toBDDate = (date: Date) =>
  new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))
    .toISOString()
    .split('T')[0];

export const TaskService = {
  async createTask(payload: ITask) {
    const bdDate = toBDDate(new Date());

    const exists = await TaskModel.findOne({
      employeeId: payload.employeeId,
      bdDate,
    });

    if (exists)
      throw new Error("This employee already submitted today's task.");

    return TaskModel.create({ ...payload, bdDate });
  },

  async getTasks() {
    return TaskModel.find().populate('employeeId');
  },

  async getTaskById(id: string) {
    return TaskModel.findById(id).populate('employeeId');
  },

  async getTasksByEmployeeId(employeeId: string) {
    const tasks = await TaskModel.find({ employeeId }).populate('employeeId');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tasks.map((task: any) => {
      const obj = task.toObject();

      if (obj.employeeId?._id) obj.employeeId = obj.employeeId._id.toString();

      const createdBD = toBDDate(new Date(obj.createdAt));
      const nowBD = toBDDate(new Date());

      obj.editable = createdBD === nowBD;

      obj.day = new Date(obj.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
      });

      return obj;
    });
  },

  async updateTask(id: string, payload: Partial<ITask>) {
    return await TaskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  },

  async deleteTask(id: string) {
    return TaskModel.findByIdAndDelete(id);
  },

  async getEmployeeOverview(employeeId: string, start: string, end: string) {
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) throw new Error('Employee not found');

    const joiningDate = new Date(employee.joiningDate);
    const startDate = new Date(start);
    const endDate = new Date(end);

    const effectiveStart = startDate < joiningDate ? joiningDate : startDate;

    const startBD = toBDDate(effectiveStart);
    const endBD = toBDDate(endDate);

    const tasks = await TaskModel.find({
      employeeId,
      bdDate: { $gte: startBD, $lte: endBD },
    });

    const presentDays = new Set(tasks.map((t) => t.bdDate));

    const leaveRanges = await LeaveModel.find({
      employeeId,
      fromDate: { $lte: endBD },
      toDate: { $gte: startBD },
    });

    const leaveDays = new Set<string>();

    leaveRanges.forEach((range) => {
      let dayPointer = new Date(range.fromDate);
      const last = new Date(range.toDate);

      while (dayPointer <= last) {
        const bd = toBDDate(dayPointer);

        if (bd >= startBD && bd <= endBD && new Date(bd) >= joiningDate) {
          leaveDays.add(bd);
        }

        dayPointer.setDate(dayPointer.getDate() + 1);
      }
    });

    const allDays: string[] = [];
    const cursor = new Date(effectiveStart);

    while (cursor <= endDate) {
      allDays.push(toBDDate(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    let present = 0,
      leave = 0,
      absent = 0;

    const totalHours = tasks.reduce((sum, t) => sum + (t.hours || 0), 0);

    allDays.forEach((day) => {
      if (presentDays.has(day)) present++;
      else if (leaveDays.has(day)) leave++;
      else absent++;
    });

    // Role-specific totals
    let roleSummary: Record<string, number> = {};
    if (employee.department === 'web_developer') {
      const totalWebsites = tasks.reduce(
        (sum, t) => sum + (t.numberOfWebsites || 0),
        0,
      );
      roleSummary = { totalWebsites };
    } else if (employee.department === 'graphic_designer') {
      const totalDesigns = tasks.reduce(
        (sum, t) => sum + (t.numberOfDesigns || 0),
        0,
      );
      roleSummary = { totalDesigns };
    } else if (employee.department === 'video_editor') {
      const totalVideos = tasks.reduce(
        (sum, t) => sum + (t.numberOfVideos || 0),
        0,
      );
      roleSummary = { totalVideos };
    } else if (employee.department === 'marketer') {
      const totalAds = tasks.reduce(
        (sum, t) => sum + (t.numberOfPlatforms || 0),
        0,
      );
      roleSummary = { totalAds };
    }

    return {
      employee: {
        id: employee._id,
        name: employee.name,
        designation: employee.designation,
        joiningDate: toBDDate(joiningDate),
      },
      range: { start: startBD, end: endBD },
      summary: {
        totalDays: allDays.length,
        totalHours,
        present,
        leave,
        absent,
        ...roleSummary,
      },
      detailed: {
        presentDays: Array.from(presentDays),
        leaveDays: Array.from(leaveDays),
        absentDays: allDays.filter(
          (d) => !presentDays.has(d) && !leaveDays.has(d),
        ),
      },
    };
  },

  async getEmployeeFullAttendance(employeeId: string) {
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) throw new Error('Employee not found');

    const joining = new Date(employee.joiningDate);
    const today = new Date();

    const start = toBDDate(joining);
    const end = toBDDate(today);

    const tasks = await TaskModel.find({
      employeeId,
      bdDate: { $gte: start, $lte: end },
    });

    const presentDays = new Set(tasks.map((t) => t.bdDate));

    const leaveRanges = await LeaveModel.find({
      employeeId,
      fromDate: { $lte: end },
      toDate: { $gte: start },
    });

    const leaveDays = new Set<string>();

    leaveRanges.forEach((range) => {
      const current = new Date(range.fromDate);
      const last = new Date(range.toDate);

      while (current <= last) {
        const bd = toBDDate(current);
        if (new Date(bd) >= joining) leaveDays.add(bd);
        current.setDate(current.getDate() + 1);
      }
    });

    const allDays: string[] = [];
    const cursor = new Date(joining);

    while (cursor <= today) {
      allDays.push(toBDDate(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    let present = 0,
      leave = 0,
      absent = 0;

    for (const day of allDays) {
      if (presentDays.has(day)) present++;
      else if (leaveDays.has(day)) leave++;
      else absent++;
    }

    return {
      employee: {
        id: employee._id,
        name: employee.name,
        designation: employee.designation,
        department: employee.department,
        joiningDate: start,
      },
      attendanceSummary: {
        totalDays: allDays.length,
        present,
        leave,
        absent,
      },
      detailedDays: {
        presentDays: Array.from(presentDays),
        leaveDays: Array.from(leaveDays),
        absentDays: allDays.filter(
          (d) => !presentDays.has(d) && !leaveDays.has(d),
        ),
      },
    };
  },
};
