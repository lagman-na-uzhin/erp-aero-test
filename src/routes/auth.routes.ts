import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signin/new_token', authController.newToken);

router.get('/info', authMiddleware, userController.info);
router.get('/logout', authMiddleware, authController.logout);

export default router;
