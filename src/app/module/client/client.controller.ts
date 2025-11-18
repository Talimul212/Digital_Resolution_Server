import { Request, Response } from 'express';
import { ClientService } from './client.service';

export const ClientController = {
  async create(req: Request, res: Response) {
    const client = await ClientService.create(req.body);
    res.status(201).json({ success: true, data: client });
  },

  async getAll(req: Request, res: Response) {
    const clients = await ClientService.getAll();
    res.status(200).json({ success: true, data: clients });
  },

  async getById(req: Request, res: Response) {
    const client = await ClientService.getById(req.params.id);
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: 'Client not found' });
    res.status(200).json({ success: true, data: client });
  },

  async update(req: Request, res: Response) {
    const updated = await ClientService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  },

  async delete(req: Request, res: Response) {
    await ClientService.delete(req.params.id);
    res.status(204).send();
  },
};
