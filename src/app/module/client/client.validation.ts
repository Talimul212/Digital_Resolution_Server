import { z } from 'zod';

export const ClientValidation = {
  create: z.object({
    // Existing fields
    contractCount: z.number().min(0),
    designCount: z.number().min(0),
    videoCount: z.number().min(0),
    ads: z.object({
      youtube: z.boolean(),
      facebook: z.boolean(),
      instagram: z.boolean(),
      tiktok: z.boolean(),
    }),
    contractAmount: z.number().min(0),
    payAmount: z.number().min(0),
    dueAmount: z.number().min(0),

    // New fields
    name: z.string().min(1, 'Client name is required'),
    location: z.string().min(1, 'Location is required'),
    number: z.string().min(1, 'Phone number is required'),
    gmail: z.string().email('Valid Gmail is required'),
    projectDetails: z.string().min(1, 'Project details are required'),
    status: z.enum(['ongoing', 'completed']),
    logo: z.string().min(1, 'Logo is required'),
  }),
};
