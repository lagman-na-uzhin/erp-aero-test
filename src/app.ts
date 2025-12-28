import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import fileRoutes from './routes/file.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Application = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

app.get('/info', (req: Request, res: Response) => {
});

app.use(errorMiddleware);

export default app;
