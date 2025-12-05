// EmployeeLeave.model.ts
import { Schema, model } from "mongoose";

const LeaveSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String, default: "" },
  },
  { timestamps: true }
);

export const LeaveModel = model("EmployeeLeave", LeaveSchema);
