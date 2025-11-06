"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
/* eslint-disable prettier/prettier */
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_controller_1 = require("./student.controller");
const student_Zod_Validation_1 = require("./student.Zod.Validation");
const router = express_1.default.Router();
router.get('/', student_controller_1.StudentControllers.getAllStudents);
router.get('/:id', (0, auth_1.default)('admin', 'faculty'), student_controller_1.StudentControllers.getSingleStudent);
router.patch('/:id', (0, validateRequest_1.default)(student_Zod_Validation_1.updateStudentValidationSchema), student_controller_1.StudentControllers.updateStudent);
router.delete('/:id', student_controller_1.StudentControllers.deleteStudent);
exports.StudentRoutes = router;
