import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: [
        'client',
        'marketer',
        'web_developer',
        'graphic_designer',
        'video_editor',
        'admin',
      ],
      required: true,
    },
    createdBy: { type: String, default: null },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
