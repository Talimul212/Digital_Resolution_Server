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
      enum: ['web_developer', 'graphic_designer', 'video_editor', 'marketor'],
      required: true,
    },
    attendance: {
      type: String,
      enum: ['present', 'absent', 'leave'],
      default: 'present',
    },

    // Developer
    companyName: String,
    projectDetails: String,
    numberOfWebsites: Number,
    hours: Number,

    // Graphic Designer
    date: Date,
    workDetails: String,
    companies: [String],
    numberOfDesigns: Number,

    // Video Editor
    numberOfVideos: Number,

    // Marketor
    adsPlatform: String,
    numberOfPlatforms: Number,
  },
  { timestamps: true },
);

export const TaskModel = model('EmployeeTask', TaskSchema);
