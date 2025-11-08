import { z } from 'zod';

const createDepartmentSchema = z.object({
  name: z.enum([
    'Graphic Design',
    'Video Editing',
    'Marketing',
    'Web Development',
  ]),
  clientIds: z.array(z.string().min(1)).optional(),
  employeeIds: z.array(z.string().min(1)).optional(),
});

export const DepartmentValidation = {
  createDepartmentSchema,
};
