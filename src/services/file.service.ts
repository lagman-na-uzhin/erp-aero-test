import fs from 'fs/promises';
import path from 'path';
import { File } from '../models/file.model';

export const saveFile = async (multerFile: Express.Multer.File) => {
    return await File.create({
        name: multerFile.originalname,
        extension: path.extname(multerFile.originalname),
        mimeType: multerFile.mimetype,
        size: multerFile.size,
        uploadDate: new Date(),
        path: multerFile.path
    });
};

export const getFilesList = async (listSize: number, page: number) => {
    return await File.findAndCountAll({
        limit: listSize,
        offset: (page - 1) * listSize,
        order: [['uploadDate', 'DESC']]
    });
};

export const getFileInfo = async (id: string) => {
    const file = await File.findByPk(id);
    if (!file) throw new Error('File not found');
    return file;
};

export const removeFile = async (id: string) => {
    const file = await getFileInfo(id);
    // Удаляем из хранилища
    await fs.unlink(file.path).catch(() => console.error("File not found on disk"));
    // Удаляем из базы
    await file.destroy();
};

export const updateFile = async (id: string, newMulterFile: Express.Multer.File) => {
    const oldFile = await getFileInfo(id);

    // Удаляем старый физический файл
    await fs.unlink(oldFile.path).catch(() => {});

    // Обновляем данные в БД
    return await oldFile.update({
        name: newMulterFile.originalname,
        extension: path.extname(newMulterFile.originalname),
        mimeType: newMulterFile.mimetype,
        size: newMulterFile.size,
        path: newMulterFile.path
    });
};
