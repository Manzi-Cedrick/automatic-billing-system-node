import { Request, Response } from "express";
import AdminService from "../services/admin.service";
import { CustomerEntity } from "../Ports/customer";
import { TaskEntity } from "../Ports/task";
import { RoleEntity } from "../Ports/role";

export const AdminController = {
  reset_Employee_Password: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    await AdminService.resetEmployeePassword(id, password);

    res.status(201).json({
      message: "Password reset successful",
    });
  },
  list_Employees: async (req: Request, res: Response) => {
    const employees = await AdminService.listEmployees();

    res.status(200).json({
      employees,
    });
  },
  change_Status: async (req: Request, res: Response) => {
    const { id } = req.params;

    await AdminService.changeStatus(id);

    res.status(201).json({
      message: "Status changed successfully",
    });
  },

  // change_Role: async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const { role } = req.body;

  //   await AdminService.changeRole(id, role);

  //   res.status(201).json({
  //     message: "Role changed successfully",
  //   });
  // },

  create_Customer: async (req: Request, res: Response) => {
    const body: CustomerEntity = req.body;

    const customer = await AdminService.createCustomer(body);

    res.status(201).json({ customer });
  },
  list_Customers: async (req: Request, res: Response) => {
    const customers = await AdminService.listCustomers();

    res.status(200).json({
      customers,
    });
  },
  get_Customer: async (req: Request, res: Response) => {
    const { id } = req.params;

    const customer = await AdminService.getCustomer(id);

    res.status(200).json({
      customer,
    });
  },
  update_Customer: async (req: Request, res: Response) => {
    const partialBody: Partial<CustomerEntity> = req.body;
    const { id } = req.params;

    const customer = await AdminService.updateCustomer(id, partialBody);

    res.status(201).json({ customer });
  },
  delete_Customer: async (req: Request, res: Response) => {
    const { id } = req.params;

    await AdminService.deleteCustomer(id);

    res.status(201).json({
      message: "Customer deleted successfully",
    });
  },

  list_Tasks: async (req: Request, res: Response) => {
    const tasks = await AdminService.listTasks();

    res.status(200).json({
      tasks,
    });
  },
  get_Task: async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await AdminService.getTask(id);

    res.status(200).json({
      task,
    });
  },
  create_Task: async (req: Request, res: Response) => {
    const body: TaskEntity = req.body;

    const task = await AdminService.createTask(body);

    res.status(201).json({ task });
  },
  update_Task: async (req: Request, res: Response) => {
    const partialBody: Partial<TaskEntity> = req.body;
    const { id } = req.params;

    const task = await AdminService.updateTask(id, partialBody);

    res.status(201).json({ task });
  },
  delete_Task: async (req: Request, res: Response) => {
    const { id } = req.params;

    await AdminService.deleteTask(id);

    res.status(201).json({
      message: "Task deleted successfully",
    });
  },
  create_role: async (req: Request, res: Response) => {
    const body: RoleEntity = req.body;

    const role = await AdminService.createRole(body);
    res.status(201).json({ role });
  },
  update_role: async (req: Request, res: Response) => {
    const partialBody: Partial<RoleEntity> = req.body;

    const { id } = req.params;

    const role = await AdminService.updateRole(id, partialBody);
    res.status(200).json({ role });
  },
  delete_role: async (req: Request, res: Response) => {
    const { id } = req.params;

    await AdminService.deleteRole(id);
    res.status(200).json({
      message: "Role deleted successfully",
    });
  },
  get_roles: async (req: Request, res: Response) => {
    const roles = await AdminService.getRoles();

    res.status(200).json({
      roles,
    });
  },
  customer_billing_report: async (req: Request, res: Response) => {
    const { id } = req.params;

    const reports = await AdminService.customer_billing_report(id);

    res.status(200).json({
      reports,
    });
  },
  employee_billing_report: async (req: Request, res: Response) => {
    const { id } = req.params;

    const reports = await AdminService.employee_timesheet_billing(id);

    res.status(200).json({
      reports,
    });
  },
};
