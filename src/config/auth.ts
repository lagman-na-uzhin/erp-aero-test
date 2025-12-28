import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
    accessSecret: process.env.JWT_SECRET || 'default_access_secret_12345',
    refreshSecret: process.env.REFRESH_SECRET || 'default_refresh_secret_67890',

    accessTokenExpiresIn: '10m',

    refreshTokenExpiresIn: '7d',

    saltRounds: 10
};
