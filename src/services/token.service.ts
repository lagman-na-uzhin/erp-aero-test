import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { authConfig } from '../config/auth';
import { RefreshToken } from '../models/refreshToken.model';

export const generatePair = (userId: string) => {
    // Явно указываем опции для типизации
    const accessOptions: SignOptions = {
        expiresIn: authConfig.accessTokenExpiresIn as jwt.SignOptions['expiresIn']
    };

    const refreshOptions: SignOptions = {
        expiresIn: authConfig.refreshTokenExpiresIn as jwt.SignOptions['expiresIn']
    };

    const accessToken = jwt.sign(
        { id: userId },
        authConfig.accessSecret as Secret,
        accessOptions
    );

    const refreshToken = jwt.sign(
        { id: userId },
        authConfig.refreshSecret as Secret,
        refreshOptions
    );

    return { accessToken, refreshToken };
};

export const saveRefreshToken = async (userId: string, token: string) => {
    return await RefreshToken.create({ token, userId });
};

export const removeRefreshToken = async (token: string) => {
    return await RefreshToken.destroy({ where: { token } });
};

export const verifyRefresh = (token: string) => {
    return jwt.verify(token, authConfig.refreshSecret as Secret) as { id: string };
};
