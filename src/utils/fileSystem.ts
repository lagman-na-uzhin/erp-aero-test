import fs from 'fs/promises';
import path from 'path';

export const exists = async (filePath: string): Promise<boolean> => {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
};

export const deleteFile = async (filePath: string): Promise<void> => {
    try {
        if (await exists(filePath)) {
            await fs.unlink(filePath);
        }
    } catch (error) {
        console.error(`Ошибка при удалении файла ${filePath}:`, error);
    }
};

export const getFileExtension = (filename: string): string => {
    return path.extname(filename).toLowerCase();
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
