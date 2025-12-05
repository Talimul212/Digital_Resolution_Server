import { Router } from "express";
import { LeaveController } from "./EmployeeLeave.controller";

const router = Router();

router.post("/create", LeaveController.create);
router.get("/employee/:employeeId", LeaveController.getByEmployee);
router.put("/:id", LeaveController.update);
router.delete("/:id", LeaveController.delete);

export default router;
