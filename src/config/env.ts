import { z } from 'zod';
import { config } from 'dotenv';

config({ quiet: true });

const envConfig = z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
      .default('info'),

    REDIS_USERNAME: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),

    EMAIL_FROM: z.string(),

    MT_HOST: z.string(),
    MT_PORT: z.coerce.number(),
    MT_USER: z.string(),
    MT_PASS: z.string(),

    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
  })
  .parse(process.env);

const BASE_URL =
  envConfig.NODE_ENV === 'development'
    ? `http://localhost:${envConfig.PORT}/api/v1`
    : 'sample.production.url';

export default {
  ...envConfig,
  BASE_URL,
};
