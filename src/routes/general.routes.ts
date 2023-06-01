/* eslint-disable prettier/prettier */
import { Router, Response, Request } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Billing-System API!'
  });
});

export { router as generalRoutes };
