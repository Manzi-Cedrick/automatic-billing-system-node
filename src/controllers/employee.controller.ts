import { ReportEntity } from "../Ports/report";
import EmployeeService from "../services/employee.service";
import { Request, Response } from "express";

export const EmployeeController = {
  create_timesheet_data: async (req: Request, res: Response) => {
    const body: ReportEntity = req.body;

    const timesheet_create = await EmployeeService.create_info_data(body);

    res.status(201).json({
      timesheet_create,
    });
  },
  

  get_timesheet_data: async (req: Request, res: Response) => {
    const { id } = req.params;

    const timesheet_data = await EmployeeService.get_info_data(id);

    res.status(200).json({
      timesheet_data,
    });
  },
};
