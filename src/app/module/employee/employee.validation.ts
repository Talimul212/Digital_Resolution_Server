import { z } from 'zod';

export const EmployeeValidation = {
  create: z.object({
    name: z.string().min(1),
    designation: z.string().min(1),
    task: z
      .array(
        z.object({
          companyName: z.string().min(1),
          details: z.string().min(1),
          hour: z.number().min(0),
        }),
      )
      .optional(),
    joinDate: z.string().datetime(),
    employeeType: z.enum([
      'marketer',
      'web_developer',
      'graphic_designer',
      'video_editor',
      'admin',
      'team_lead',
    ]),
  }),
};
