import { Employee, User } from "@prisma/client";

export type RoleEntity = {
    value: string;
    fee: number;
};

export interface IRole {
    id: string;
    value: string;
    fee: number;
    User: User[];
    employee: Employee[];
}