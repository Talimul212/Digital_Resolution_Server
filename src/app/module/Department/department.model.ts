import { Schema, model } from 'mongoose';
import { TDepartment } from './department.interface';
const DepartmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      enum: ['Graphic Design', 'Video Editing', 'Marketing', 'Web Development'],
      required: true,
    },
    clientIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    employeeIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const DepartmentModel = model<TDepartment>(
  'Department',
  DepartmentSchema,
);
