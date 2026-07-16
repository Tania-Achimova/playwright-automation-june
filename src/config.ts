import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

const ENV = process.env.ENV ?? 'develop';
dotenvConfig({ path: resolve(__dirname, `../env/.env.${ENV}`) });
dotenvConfig({ path: resolve(__dirname, '../env/.env') });

const API_BASE_URL = process.env.API_BASE_URL;

export const config = {
    API_BASE_URL: API_BASE_URL,
    TEST_CLEANUP_SECRET: process.env.TEST_CLEANUP_SECRET,
} as const;