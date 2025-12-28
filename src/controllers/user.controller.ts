import { Request, Response, NextFunction } from 'express';

export const info = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({ id: req.user.id });
    } catch (error) {
        next(error);
    }
};
