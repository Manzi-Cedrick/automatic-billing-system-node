import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../services/error.service';
import AuthService from '../services/auth.service';
import { Privilege } from '@prisma/client';

export const AuthMiddleware = {
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    try {
      const headers = req.headers.authorization;

      if (!headers) {
        throw new UnauthorizedError(
          'You are not authorized to access this resource'
        );
      }

      const token = headers.split(' ')[1];

      if (!token) {
        throw new UnauthorizedError(
          'You are not authorized to access this resource'
        );
      }

      const decoded = AuthService.verifyToken(token); 

      const { privilege, status } = decoded;
      
      if (privilege !== Privilege.ADMIN || status !== 'ACTIVE') throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );

      next();
    } catch (error) {
      throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );
    }
  },
  isEmployee: (req: Request, res: Response, next: NextFunction) => {
    try {
      const headers = req.headers.authorization;

      if (!headers) {
        throw new UnauthorizedError(
          'You are not authorized to access this resource'
        );
      }

      const token = headers.split(' ')[1];

      if (!token) {
        throw new UnauthorizedError(
          'You are not authorized to access this resource'
        );
      }

      const decoded = AuthService.verifyToken(token); 

      const { privilege, status } = decoded;
      
      if (privilege !== Privilege.EMPLOYEE || status !== 'ACTIVE') throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );

      next();
    } catch (error) {
      throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );
    }
  }
};
