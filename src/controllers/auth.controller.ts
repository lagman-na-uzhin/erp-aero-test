import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, password } = req.body;
        const tokens = await authService.register(id, password);
        res.status(201).json(tokens);
    } catch (error) {
        next(error);
    }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, password } = req.body;
        const tokens = await authService.login(id, password);
        res.json(tokens);
    } catch (error) {
        next(error);
    }
};

export const newToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refreshTokens(refreshToken);
        res.json(tokens);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.body.refreshToken;
        await authService.logout(refreshToken);
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        next(error);
    }
};
