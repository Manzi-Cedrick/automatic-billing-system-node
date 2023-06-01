/* eslint-disable prettier/prettier */
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import errorHandler from "../utilities/errorHandler";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', AuthMiddleware.isAdmin, errorHandler(AuthController.register));
router.post('/login', errorHandler(AuthController.login));
router.post('/logout', errorHandler(AuthController.logout));

router.get('/me', errorHandler(AuthController.me));

export { router as AuthRouter };
