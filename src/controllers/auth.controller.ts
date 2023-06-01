import { Request, Response } from "express";
import { UserEntity } from "../Ports/user";
import AuthService from "../services/auth.service";

export const AuthController = {
    register: async (req: Request, res: Response) => {
        const body: UserEntity = req.body;

        const user = await AuthService.register(body);

        res.status(201).json({ user });
    },

    login: async (req: Request, res: Response) => {
        const body: { password: string, email: string } = req.body;

        const user = await AuthService.login(body);

        res.status(200).json({ user });
    },

    logout: async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1] as string;
        await AuthService.logout(token)
        res.status(200).json({ message: "Sign Out Successful" })
    },

    me: async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1] as string;

        const user = await AuthService.me(token);

        res.status(200).json({ user });
    }

};