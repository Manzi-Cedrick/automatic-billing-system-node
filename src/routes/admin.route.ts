/* eslint-disable prettier/prettier */
import { Request, Response, Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import errorHandler from '../utilities/errorHandler';
import { AdminController } from '../controllers/admin.controller';
import { Admin } from 'mongodb';

const router = Router();
router.post('/role/create', errorHandler(AdminController.create_role));

router.use(AuthMiddleware.isAdmin);

router.get('/employee/list-all', errorHandler(AdminController.list_Employees));
router.patch(
  '/employee/:id/reset-password',
  errorHandler(AdminController.reset_Employee_Password)
);
router.patch(
  '/employee/:id/change-status',
  errorHandler(AdminController.change_Status)
);

router.post('/customer/create', errorHandler(AdminController.create_Customer));
router.get('/customer/list-all', errorHandler(AdminController.list_Customers));
router.get('/customer/:id', errorHandler(AdminController.get_Customer));
router.patch('/customer/:id', errorHandler(AdminController.update_Customer));
router.delete('/customer/:id', errorHandler(AdminController.delete_Customer));

router.get('/role/list-all', errorHandler(AdminController.get_roles));
router.patch('/role/:id', errorHandler(AdminController.update_role));
router.delete('/role/:id', errorHandler(AdminController.delete_role));

router.get('/task/list-all', errorHandler(AdminController.list_Tasks));
router.get('/task/:id', errorHandler(AdminController.get_Task));
router.post('/task/create', errorHandler(AdminController.create_Task));
router.patch('/task/:id', errorHandler(AdminController.update_Task));
router.delete('/task/:id', errorHandler(AdminController.delete_Task));

router.get('/customer/billing/report/:id',errorHandler(AdminController.customer_billing_report))
router.get('/employee/timesheet/report/:id',errorHandler(AdminController.employee_billing_report))

export { router as AdminRouter };
