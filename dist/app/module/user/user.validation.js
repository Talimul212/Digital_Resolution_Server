"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserTypeEnum = void 0;
const zod_1 = require("zod");
exports.UserTypeEnum = zod_1.z.enum(['client', 'employee', 'admin']);
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    userType: exports.UserTypeEnum,
    createdBy: zod_1.z.string().optional(),
});
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    userType: exports.UserTypeEnum.optional(),
    createdBy: zod_1.z.string().optional(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
