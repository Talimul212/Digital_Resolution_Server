import { Schema, model } from 'mongoose';
import { IClient } from './client.interface';

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
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
  },
  { timestamps: true },
);

export const ClientModel = model<IClient>('Client', ClientSchema);
