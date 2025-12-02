import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    role: {
      type: String,
      enum: ['web_developer', 'graphic_designer', 'video_editor', 'marketer'],
      required: true,
    },
    attendance: {
      type: String,
      enum: ['present', 'absent', 'leave'],
      default: 'present',
    },
    hours:{ type: Number, required: true },
    bdDate: { type: String, required: true },
    companies:  {type: String, required: true },
    projectDetails: String,
    
    // Developer
    numberOfWebsites: Number,

    // Graphic Designer
    numberOfDesigns: Number,

    // Video Editor
    numberOfVideos: Number,

    // marketer
    adsPlatform: String,
    numberOfPlatforms: Number,
  },
  { timestamps: true },
);

export const TaskModel = model('EmployeeTask', TaskSchema);
