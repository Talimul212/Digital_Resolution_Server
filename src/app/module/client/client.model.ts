import { Schema, model } from 'mongoose';
import { IClient } from './client.interface';

const ClientSchema = new Schema<IClient>(
  {
    // Existing fields
    contractCount: { type: Number, default: 0 },
    designCount: { type: Number, default: 0 },
    videoCount: { type: Number, default: 0 },
    ads: {
      youtube: { type: Boolean, default: false },
      facebook: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
      tiktok: { type: Boolean, default: false },
    },
    contractAmount: { type: Number, default: 0 },
    payAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },

    // New fields
    name: { type: String, required: true },
    location: { type: String, required: true },
    number: { type: String, required: true },
    gmail: { type: String, required: true },
    projectDetails: { type: String, required: true },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
    logo: { type: String, required: true },
  },
  { timestamps: true },
);

export const ClientModel = model<IClient>('Client', ClientSchema);
