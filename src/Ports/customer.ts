import { Role, Status } from "@prisma/client";

export type CustomerEntity = {
  name: string;
  email: string;
  password: string;
  hourly_rate: number;
};

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  status: Status;
  hourly_rate: number;
}