import { DepartmentModel } from './department.model';
import { TDepartment } from './department.interface';
import { EmployeeModel } from '../employee/employee.model';
import { TaskModel } from '../EmployeeTask/EmployeeTask.model';

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

  async getEmployeesByDepartmentName(departmentName: string) {
    return await EmployeeModel.find({ department: departmentName });
  },

  async getOverviewByDepartmentId(departmentId: string) {
    const role = departmentId;

    // Count employees (unique employeeIds for this role)
    const employees = await EmployeeModel.distinct('_id', { department: role });
    const totalEmployees = employees.filter((e) => e !== null).length;

    //  Aggregate daily working hours (group by bdDate)
    const dailyStatsRaw = await TaskModel.aggregate([
      { $match: { role } },
      {
        $group: {
          _id: '$bdDate', // group by bdDate
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dailyStats = dailyStatsRaw.map((d) => ({
      day: d._id,
      hours: d.totalHours,
    }));

    //  Aggregate weekly working hours (group by ISO week number)
    const weeklyStatsRaw = await TaskModel.aggregate([
      { $match: { role } },
      {
        $group: {
          _id: { $week: '$createdAt' },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const weeklyStats = weeklyStatsRaw.map((w) => ({
      week: `Week ${w._id}`,
      hours: w.totalHours,
    }));

    //  Aggregate monthly working hours (already in your code)
    const monthlyStatsRaw = await TaskModel.aggregate([
      { $match: { role } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthlyStats = monthlyStatsRaw.map((m) => ({
      month: monthNames[m._id - 1],
      totalHours: m.totalHours,
    }));

    // 🔹 Role-specific totals
    const roleFieldMap: Record<string, { field: string; key: string }> = {
      web_developer: { field: 'numberOfWebsites', key: 'totalWebsites' },
      graphic_designer: { field: 'numberOfDesigns', key: 'totalDesigns' },
      video_editor: { field: 'numberOfVideos', key: 'totalVideos' },
      marketer: { field: 'numberOfPlatforms', key: 'totalAds' },
    };

    let roleSummary: Record<string, number> = {};
    const roleConfig = roleFieldMap[role];

    if (roleConfig) {
      const roleTotalAgg = await TaskModel.aggregate([
        { $match: { role } },
        {
          $group: {
            _id: null,
            total: { $sum: `$${roleConfig.field}` },
          },
        },
      ]);
      roleSummary = {
        [roleConfig.key]: roleTotalAgg[0]?.total || 0,
      };
    }

    return {
      departmentId: role,
      totalEmployees,
      dailyStats, // real daily totals by bdDate
      weeklyStats, // weekly totals
      monthlyStats, //  monthly totals
      roleSummary,
    };
  },
};
