import { z } from 'zod';

export const UserTypeEnum = z.enum([
  'client',
  'marketer',
  'web_developer',
  'graphic_designer',
  'video_editor',
  'admin',
  'team_lead',
]);

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: UserTypeEnum,
  createdBy: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  userType: UserTypeEnum.optional(),
  createdBy: z.string().optional(),
});
