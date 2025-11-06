import { UserModel } from './user.model';
import { IUser } from './user.interface';

export const UserService = {
  async createUser(data: IUser) {
    return await UserModel.create(data);
  },

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
};
