import { Router } from 'express';
import authRoutes from './auth.routes';
import fileRoutes from './file.routes';

const router = Router();

// Подключаем модули
router.use('/', authRoutes); // Здесь будут /signup, /signin, /info, /logout
router.use('/file', fileRoutes);

export default router;
