import dotenv from 'dotenv';

dotenv.config();

type Environment = {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
}

export const config: Environment = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: String(process.env.MONGO_URI),
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRES_IN: process.env.JWT_SECRET_EXPIRES_IN || '7d',
};
