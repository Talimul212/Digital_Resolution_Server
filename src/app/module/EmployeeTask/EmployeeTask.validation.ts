import { z } from 'zod';

export const TaskZodSchema = z.object({
  employeeId: z.string(),
  role: z.enum([
    'web_developer',
    'graphic_designer',
    'video_editor',
    'marketor',
  ]),
  attendance: z.enum(['present', 'absent', 'leave']).default('present'),

  // Developer
  companyName: z.string().optional(),
  projectDetails: z.string().optional(),
  numberOfWebsites: z.number().optional(),
  hours: z.number().optional(),

  // Graphic Designer
  date: z.string().optional(),
  workDetails: z.string().optional(),
  companies: z.array(z.string()).optional(),
  numberOfDesigns: z.number().optional(),

  // Video Editor
  numberOfVideos: z.number().optional(),

  // Marketor
  adsPlatform: z.string().optional(),
  numberOfPlatforms: z.number().optional(),
});
