import { Schema, model } from 'mongoose';
import { IEmployee } from './employee.interface';

const TaskSchema = new Schema(
  {
    companyName: { type: String, required: true },
    details: { type: String, required: true },
    hour: { type: Number, required: true },
  },
  { _id: false },
);

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    task: { type: [TaskSchema], default: [] },
    joinDate: { type: Date, required: true },
    employeeType: {
      type: String,
      enum: [
        'marketer',
        'web_developer',
        'graphic_designer',
        'video_editor',
        'admin',
        'team_lead',
      ],
      required: true,
    },
  },
  { timestamps: true },
);

export const EmployeeModel = model<IEmployee>('Employee', EmployeeSchema);
