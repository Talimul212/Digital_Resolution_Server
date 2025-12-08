/* eslint-disable @typescript-eslint/no-explicit-any */
// admin.controller.ts
import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  static async getOverview(req: Request, res: Response) {
    try {
      const result = await AdminService.getOverview();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
