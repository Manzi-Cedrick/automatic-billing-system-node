/* eslint-disable prettier/prettier */
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import errorHandler from "../utilities/errorHandler";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();

router.use(AuthMiddleware.isEmployee);

// employee timesheet routes
router.post('/timesheet/create',errorHandler(EmployeeController.create_timesheet_data));

router.get('/timesheet/list-all/:id', errorHandler(EmployeeController.get_timesheet_data));

export { router as EmployeeRouter };
