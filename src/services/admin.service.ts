/* eslint-disable prettier/prettier */
import {
  PrismaClient,
  Privilege,
  Status,
  TaskStatus,
} from "@prisma/client";
import { hashPassword } from "../utilities/passwordCheck";
import { NotFoundError } from "./error.service";
import { CustomerEntity } from "../Ports/customer";
import { TaskEntity } from "../Ports/task";
import { RoleEntity } from "../Ports/role";

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

export default class AdminService {
  public static async resetEmployeePassword(_id: string, password: string) {
    const user = await prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        password: await hashPassword(password),
      },
    });

    if (!user) throw new NotFoundError("User not found");

    return true;
  }

  public static async listEmployees() {
    const employees = await prisma.user.findMany({
      where: {
        privilege: Privilege.EMPLOYEE,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!employees) throw new NotFoundError("No employees found");

    return employees;
  }

  public static async changeStatus(_id: string) {
    const cred = await prisma.user.findUnique({
      where: {
        id: _id,
      },
      select: {
        status: true,
        privilege: true,
      },
    });

    if (cred?.privilege !== Privilege.EMPLOYEE)
      throw new Error("User is admin!");

    const user = await prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        status:
          cred?.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
    });

    if (!user) throw new NotFoundError("User not found");

    return true;
  }

  // public static async changeRole(_id: string, role: string) {
  //   if (role !== 'ADMIN' && role !== 'SrDESIGNER' && role !== 'JrDESIGNER')
  //     throw new ValidationError('Invalid role');

  //   const user = await prisma.user.update({
  //     where: {
  //       id: _id
  //     },
  //     data: {
  //       role: role
  //     }
  //   });

  //   if (!user) throw new NotFoundError('User not found');

  //   return true;
  // }

  public static async createRole(body: RoleEntity) {
    const role = await prisma.role.create({
      data: {
        value: body.value,
        fee: body.fee
      },
    });
    if (!role) {
      throw new Error("Role not created");
    }
    return role;
  }

  public static async getRoles() {
    const roles = await prisma.role.findMany();
    if (!roles) throw new NotFoundError("No roles found");
    return roles;
  }

  public static async deleteRole(_id: string) {
    const delete_role = await prisma.role.delete({
      where: {
        id: _id,
      },
    });

    if (!delete_role) throw new NotFoundError("Role not found");

    return true;
  }

  public static async updateRole(_id: string, partialBody: any) {
    const role_update = await prisma.role.update({
      where: {
        id: _id,
      },
      data: {
        ...partialBody,
      },
    });

    if (!role_update) throw new NotFoundError("Role not found");

    return role_update;
  }

  public static async createCustomer(body: CustomerEntity) {
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        status: Status.ACTIVE,
      },
    });

    if (!customer) throw new Error("Customer not created");

    return customer;
  }

  public static async listCustomers() {
    const customers = await prisma.customer.findMany();

    if (!customers) throw new NotFoundError("No customers found");

    return customers;
  }

  public static async getCustomer(_id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id: _id,
      },
    });

    if (!customer) throw new NotFoundError("Customer not found");

    return customer;
  }

  public static async updateCustomer(
    _id: string,
    partialBody: Partial<CustomerEntity>
  ) {
    const customer = await prisma.customer.update({
      where: {
        id: _id,
      },
      data: {
        ...partialBody,
      },
    });

    if (!customer) throw new NotFoundError("Customer not found");

    return customer;
  }

  public static async deleteCustomer(_id: string) {
    const customer = await prisma.customer.delete({
      where: {
        id: _id,
      },
    });

    if (!customer) throw new NotFoundError("Customer not found");

    return true;
  }

  public static async listTasks() {
    const tasks = await prisma.task.findMany();

    if (!tasks) throw new NotFoundError("No tasks found");

    return tasks;
  }

  public static async getTask(_id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: _id,
      },
    });

    if (!task) throw new NotFoundError("Task not found");

    return task;
  }

  public static async createTask(body: TaskEntity) {
    const task = await prisma.task.create({
      data: {
        task: body.task,
        sub_task: body.sub_task,
        status: TaskStatus.PENDING,
      },
    });

    if (!task) throw new Error("Task not created");

    return task;
  }

  public static async updateTask(
    _id: string,
    partialBody: Partial<TaskEntity>
  ) {
    const task = await prisma.task.update({
      where: {
        id: _id,
      },
      data: {
        ...partialBody,
      },
    });

    if (!task) throw new NotFoundError("Task not found");

    return task;
  }

  public static async deleteTask(_id: string) {
    const task = await prisma.task.delete({
      where: {
        id: _id,
      },
    });

    if (!task) throw new NotFoundError("Task not found");

    return true;
  }

  public static async customer_billing_report(_id: string) {
    const reports = await prisma.report.findMany({
      where: {
        customer: {
          id: _id
        },
      },
      select: {
        task_detail: true,
        customer: {
          select: {
            name: true
          }
        },
        employee: {
          select: {
            name: true,
            role: {
              select: {
                fee: true,
                value: true
              }
            }
          }
        },
        task: {
          select: {
            task: true,
            sub_task: true,
            status: true
          }
        }
      }
    });

    if (reports.length === 0) {
      throw new NotFoundError("No reports found");
    }

    return reports;
  }

  public static async employee_timesheet_billing(_id: string) {
    const timesheet_data = await prisma.report.findMany({
      where: {
        employee: {
          id: _id
        }
      },
      select: {
        no_hours: true,
        travel: true,
        expense: true,
        task_detail: true,
        customer: {
          select: {
            name: true
          }
        },
        employee: true,
        task: {
          select: {
            task: true,
            sub_task: true,
            status: true
          }
        }
      }
    });
    if (timesheet_data.length === 0) {
      return {
        totalHoursDaily: 0,
        totalMileage: 0,
        totalExpense: 0
      };
    }
    const totalHoursDaily = timesheet_data.reduce((acc, report) => acc + report.no_hours, 0);
    const totalMilleage = timesheet_data.reduce((acc, report) => acc + (report.travel ?? 0), 0);
    const totalExpense = timesheet_data.reduce((acc, report) => acc + (report.expense ?? 0), 0);

    return { timesheet_data, totalHoursDaily, totalMilleage, totalExpense };
  }
}
