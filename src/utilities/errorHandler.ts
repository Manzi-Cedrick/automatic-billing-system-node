import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError, ValidationError } from '../services/error.service';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

export default (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await callback(req, res);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(400).send({ error: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).send({ error: error.message });
      } else if (error instanceof UnauthorizedError) {
        res.status(401).send({ error: error.message });
      } else if (error instanceof PrismaClientUnknownRequestError) {
          
      } else {
        res.status(500).send({ error: 'Something went wrong! It\'s us not you!' + error });
      }
    }
  };
