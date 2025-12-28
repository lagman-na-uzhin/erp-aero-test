import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import * as tokenService from './token.service';
import { authConfig } from '../config/auth';
import {RefreshToken} from "../models/refreshToken.model";

export const register = async (id: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);
    const user = await User.create({ id, password: hashedPassword });

    const tokens = tokenService.generatePair(user.id);
    await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
};

export const login = async (id: string, password: string) => {
    const user = await User.findByPk(id);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const tokens = tokenService.generatePair(user.id);
    await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
};

export const refreshTokens = async (oldRefreshToken: string) => {
    const payload = tokenService.verifyRefresh(oldRefreshToken);
    const savedToken = await RefreshToken.findOne({ where: { token: oldRefreshToken } });

    if (!savedToken) throw new Error('Refresh token not found or invalidated');

    await tokenService.removeRefreshToken(oldRefreshToken);

    const tokens = tokenService.generatePair(payload.id);
    await tokenService.saveRefreshToken(payload.id, tokens.refreshToken);
    return tokens;
};

export const logout = async (token: string) => {
    await tokenService.removeRefreshToken(token);
};
