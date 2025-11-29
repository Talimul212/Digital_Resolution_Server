import { Schema, model } from 'mongoose';
import { IEmployee } from './employee.interface';

const EmployeeSchema = new Schema(
  {
    companyID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    nid: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    salary: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },

    joiningDate: { type: Date, required: true },
    department: {
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
