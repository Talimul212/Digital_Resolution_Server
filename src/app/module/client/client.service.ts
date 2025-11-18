import { ClientModel } from './client.model';
import { IClient } from './client.interface';

export const ClientService = {
  async create(data: IClient) {
    return await ClientModel.create(data);
  },

  async getAll() {
    return await ClientModel.find();
  },

  async getById(id: string) {
    return await ClientModel.findById(id);
  },

  async update(id: string, data: Partial<IClient>) {
    return await ClientModel.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string) {
    return await ClientModel.findByIdAndDelete(id);
  },
};
