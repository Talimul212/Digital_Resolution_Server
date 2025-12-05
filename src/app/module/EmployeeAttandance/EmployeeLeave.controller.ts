/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { LeaveModel } from "./EmployeeLeave.model";

export const LeaveController = {
  async create(req: Request, res: Response) {
    try {
      const { employeeId, fromDate, toDate } = req.body;

      const newFrom = new Date(fromDate);
      const newTo = new Date(toDate);

 
      const overlap = await LeaveModel.findOne({
        employeeId,
        fromDate: { $lte: newTo },
        toDate: { $gte: newFrom }
      });

      if (overlap) {
        return res.status(400).json({
          success: false,
          message: "Leave already exists or overlaps with an existing leave period."
        });
      }

      const leave = await LeaveModel.create(req.body);
      res.json({ success: true, data: leave });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  ,

  async getByEmployee(req: Request, res: Response) {
    try {
      const leaves = await LeaveModel.find({
        employeeId: req.params.employeeId,
      });

      res.json({ success: true, data: leaves });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const leave = await LeaveModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!leave)
        return res
          .status(404)
          .json({ success: false, message: "Leave not found" });

      res.json({ success: true, data: leave });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const leave = await LeaveModel.findByIdAndDelete(req.params.id);

      if (!leave)
        return res
          .status(404)
          .json({ success: false, message: "Leave not found" });

      res.json({ success: true, message: "Leave removed" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
