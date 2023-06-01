import { IUser, UserEntity } from '../Ports/user';
import { PrismaClient, Privilege, Status, TaskStatus } from '@prisma/client';
import { passwordCheck, hashPassword } from '../utilities/passwordCheck';
import { NotFoundError, ValidationError } from './error.service';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../utilities/config';
import { LoginBody, TokenPayload } from '../Ports/auth.port';

const prisma = new PrismaClient({
  errorFormat: 'minimal'
});

export default class AuthService {
  constructor() { }

  public static generateToken(user: IUser) {
    const token = sign({ _id: user.id, privilege: user.privilege, status: user.status }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN
    });

    return token;
  }

  public static verifyToken(token: string) {
    const decoded = verify(token, config.JWT_SECRET) as TokenPayload;

    return decoded;
  }

  public static async register(body: UserEntity) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await hashPassword(body.password),
        privilege: body.privilege as Privilege,
        role: {
          connect: {
            id: body.role
          }
        },
        status: Status.ACTIVE
      },
      select: {
        id: true,
        name: true,
        email: true,
        privilege: true,
        role: {
          select: {
            value: true
          }
        },
        status: true
      }
    });

    if (body.privilege === Privilege.EMPLOYEE) {
      const employee = await prisma.employee.create({
        data: {
          id: user.id,
          name: body.name,
          email: body.email,
          status: TaskStatus.COMPLETED,
          role: {
            connect: {
              id: body.role
            }
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          role: true
        }
      });

      return employee;
    } else {
      return user;
    }
  }

  public static async login(body: LoginBody) {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        privilege: true,
        role: true,
        status: true
      }
    });

    if (!user) throw new NotFoundError('User not found');

    if (user.status === Status.INACTIVE) throw new ValidationError('User is inactive');

    const passwordMatch = await passwordCheck(user.password, body.password);

    if (!passwordMatch) throw new ValidationError('Invalid credentials');

    const { password, ...userWithoutPassword } = user;

    const token = this.generateToken(userWithoutPassword);

    return {
      ...userWithoutPassword,
      token
    };
  }

  public static async me(token: string) {
    const decoded = this.verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded._id
      },
      select: {
        id: true,
        name: true,
        email: true,
        privilege: true,
        role: true,
        status: true
      }
    });

    if (!user) throw new NotFoundError('User not found');

    return user;
  }

  public static async logout(token: string) {
    const decoded = this.verifyToken(token);
    return 'User successfully deleted'
  }
}
