import { Role, Privilege, Status } from "@prisma/client";

export type UserEntity = {
    name: string;
    email: string;
    password: string;
    role: string;
    privilege: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    privilege: Privilege;
}
