import { z } from 'zod';

export const ClientValidation = {
  create: z.object({
    name: z.string().min(1),
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
  }),
};
