import { UserModel } from './user.model';
import { IUser } from './user.interface';

export const UserService = {
  async getUserById(id: string) {
    return await UserModel.findById(id);
  },

  async getAllUsers(filter: Partial<IUser> = {}) {
    return await UserModel.find(filter);
  },

  async updateUser(id: string, updates: Partial<IUser>) {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true });
  },

  async deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id);
  },

  async getUserByEmployeeId(employeeId: string) {
    return await UserModel.findOne({ employeeId });
  },
};
