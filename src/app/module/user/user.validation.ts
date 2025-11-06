import { z } from 'zod';

export const UserTypeEnum = z.enum(['client', 'employee', 'admin']);

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
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

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
