import { Request, Response, NextFunction } from 'express';
import * as fileService from '../services/file.service';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) throw new Error('File is required');
        const fileData = await fileService.saveFile(req.file);
        res.status(201).json(fileData);
    } catch (error) {
        next(error);
    }
};

export const listFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listSize = parseInt(req.query.list_size as string) || 10;
        const page = parseInt(req.query.page as string) || 1;
        const files = await fileService.getFilesList(listSize, page);
        res.json(files);
    } catch (error) {
        next(error);
    }
};

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fileService.removeFile(req.params.id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await fileService.getFileInfo(req.params.id);
        res.json(file);
    } catch (error) {
        next(error);
    }
};

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await fileService.getFileInfo(req.params.id);
        res.download(file.path, file.name);
    } catch (error) {
        next(error);
    }
};

export const updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) throw new Error('New file is required');
        const updatedFile = await fileService.updateFile(req.params.id, req.file);
        res.json(updatedFile);
    } catch (error) {
        next(error);
    }
};
