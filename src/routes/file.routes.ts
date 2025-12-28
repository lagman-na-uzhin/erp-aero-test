import { Router } from 'express';
import * as fileController from '../controllers/file.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Применяем проверку токена ко всем роутам файлов
router.use(authMiddleware);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.delete('/delete/:id', fileController.deleteFile);
router.get('/:id', fileController.getFile);
router.get('/download/:id', fileController.downloadFile);
router.put('/update/:id', upload.single('file'), fileController.updateFile);

export default router;
