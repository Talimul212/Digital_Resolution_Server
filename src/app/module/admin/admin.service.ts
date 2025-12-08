import { ClientModel } from '../client/client.model';
import { EmployeeModel } from '../employee/employee.model';
import { TaskModel } from '../EmployeeTask/EmployeeTask.model';

export class AdminService {
  static async getOverview() {
    // 🔹 Counts
    const totalClients = await ClientModel.countDocuments();
    const employees = await EmployeeModel.countDocuments();
    const departments = 5;

    // 🔹 Get start & end of current week (Monday–Sunday)
    const getWeekRange = () => {
      const now = new Date();
      const day = now.getDay(); // Sunday=0, Monday=1, ...
      const diffToMonday = day === 0 ? -6 : 1 - day; // adjust if Sunday
      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { start: monday, end: sunday };
    };

    const { start, end } = getWeekRange();

    // 🔹 Fetch weekly tasks (based on bdDate field)
    const weeklyTasks = await TaskModel.find({
      bdDate: {
        $gte: start.toISOString().split('T')[0],
        $lte: end.toISOString().split('T')[0],
      },
    });

    // 🔹 Weekly summary (skip Friday)
    let weeklyHours = 0;
    const weekMap: Record<string, number> = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    weeklyTasks.forEach((task) => {
      const d = new Date(task.bdDate);
      const day = weekDays[d.getDay()];

      // Skip Friday
      if (day === 'Friday') return;

      weekMap[day] += task.hours;
      weeklyHours += task.hours;
    });

    // 🔹 Convert mapped data for frontend format
    const workingHoursArr = Object.entries(weekMap).map(([day, hours]) => ({
      day,
      hours,
    }));

    // 🔹 Average weekly hours per employee
    const averageWeeklyHours =
      employees > 0 ? +(weeklyHours / employees).toFixed(2) : 0;

    // 🔹 Top 3 departments by hours (daily, weekly, monthly)
    const topDepartmentsDaily = await TaskModel.aggregate([
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { department: '$role', day: '$bdDateObj' },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    const topDepartmentsWeekly = await TaskModel.aggregate([
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { department: '$role', week: { $isoWeek: '$bdDateObj' } },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    const topDepartmentsMonthly = await TaskModel.aggregate([
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { department: '$role', month: { $month: '$bdDateObj' } },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    // 🔹 Top 3 employees by hours (daily, weekly, monthly)
    const topEmployeesDaily = await TaskModel.aggregate([
      { $match: { employeeId: { $ne: null } } },
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { employee: '$employeeId', day: '$bdDateObj' },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    const topEmployeesWeekly = await TaskModel.aggregate([
      { $match: { employeeId: { $ne: null } } },
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { employee: '$employeeId', week: { $isoWeek: '$bdDateObj' } },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    const topEmployeesMonthly = await TaskModel.aggregate([
      { $match: { employeeId: { $ne: null } } },
      { $addFields: { bdDateObj: { $toDate: '$bdDate' } } },
      {
        $group: {
          _id: { employee: '$employeeId', month: { $month: '$bdDateObj' } },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { totalHours: -1 } },
      { $limit: 3 },
    ]);

    return {
      success: true,
      data: {
        metrics: {
          totalClients,
          employees,
          departments,
          weeklyHours,
        },
        workingHours: {
          averageWeeklyHours,
          data: workingHoursArr,
        },
        topDepartments: {
          daily: topDepartmentsDaily,
          weekly: topDepartmentsWeekly,
          monthly: topDepartmentsMonthly,
        },
        topEmployees: {
          daily: topEmployeesDaily,
          weekly: topEmployeesWeekly,
          monthly: topEmployeesMonthly,
        },
      },
    };
  }
}
