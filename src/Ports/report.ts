import { Customer, Employee, Task } from "@prisma/client";

export type ReportEntity = {
    customer: string;
    task: string;
    task_detail: string;
    no_hours: number;
    employee: string;
    travel?: number;
    expense?: number;
};

export interface IReport {
    id: string;
    customer: Customer;
    task: Task;
    task_detail: string;
    no_hours: number;
    employee: Employee;
    travel?: number;
    expense?: number;
}