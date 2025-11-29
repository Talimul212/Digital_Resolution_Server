import { z } from 'zod';

export const EmployeeValidation = {
  create: z.object({
    companyID: z.string().min(1, 'Employee ID is required'),
    name: z.string().min(1, 'Name is required'),
    number: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    department: z.enum([
      'marketer',
      'web_developer',
      'graphic_designer',
      'video_editor',
      'admin',
      'team_lead',
    ]),
    designation: z.string().min(1, 'Designation is required'),
    address: z.string().min(1, 'Address is required'),
    nid: z.string().min(1, 'NID number is required'),
    joiningDate: z.string().date('Joining date must be in YYYY-MM-DD format'),
    salary: z.string().min(1, 'Salary is required'),
    photo: z.string(),
  }),
};
