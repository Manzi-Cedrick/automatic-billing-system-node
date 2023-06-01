import { PrismaClient } from "@prisma/client";
import { ReportEntity } from "../Ports/report";

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

export default class EmployeeService {
  public static async create_info_data(body: ReportEntity) {
    const employee = await prisma.employee.findUnique({
      where: {
        id: body.employee,
      },
    });

    if (!employee) {
      throw new Error(`Employee with id ${body.employee} not found`);
    }

    const timesheet_create = await prisma.report.create({
      data: {
        customer: {
          connect: {
            id: body.customer,
          },
        },
        no_hours: body.no_hours,
        task_detail: body.task_detail,
        employee: {
          connect: {
            id: body.employee,
          },
        },
        expense: body.expense,
        task: {
          connect: {
            id: body.task,
          },
        },
        travel: body.travel,
      },
    });

    return timesheet_create;
  }

  public static async get_info_data(_id: string) {
    const timesheet_data_grouped_by_date = await prisma.report.groupBy({
      by: ["createdAt"],
      where: {
        employee: {
          id: _id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      _sum: {
        no_hours: true,
        travel: true,
        expense: true,
      },
    });

    if (timesheet_data_grouped_by_date.length === 0) {
      return {
        timesheet_data: null,
        totalHoursDaily: 0,
        totalMileage: 0,
        totalExpense: 0,
      };
    }

    return {
      timesheet_data: timesheet_data_grouped_by_date,
    };
  }
}
