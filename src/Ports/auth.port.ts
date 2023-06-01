import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user';

export type LoginBody = {
  email: string;
  password: string;
};

export interface TokenPayload {
  _id: string;
  privilege: string;
  status: string;
}
