import { Report, TaskStatus } from '@prisma/client';

export type TaskEntity = {
  task: string;
  sub_task: string;
  status: TaskStatus;
  reports: string[];
};

export interface ITask {
  id: string;
  task: string;
  sub_task: string;
  status: TaskStatus;
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
}
