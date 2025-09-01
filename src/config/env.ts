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

    PROD_BASE_URL: z.string(),

    REDIS_USERNAME: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),

    EMAIL_FROM: z.string(),

    MT_HOST: z.string(),
    MT_PORT: z.coerce.number(),
    MT_USER: z.string(),
    MT_PASS: z.string(),

    SG_HOST: z.string(),
    SG_PORT: z.coerce.number(),
    SG_USER: z.string(),
    SG_PASS: z.string(),

    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    FB_PROJECT_ID: z.string(),
    FB_PRIVATE_KEY: z.string(),
    FB_CLIENT_EMAIL: z.string(),
  })
  .parse(process.env);

let BASE_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS;
if (envConfig.NODE_ENV === 'development') {
  BASE_URL = `http://localhost:${envConfig.PORT}/api/v1`;
  SMTP_HOST = envConfig.MT_HOST;
  SMTP_PORT = envConfig.MT_PORT;
  SMTP_USER = envConfig.MT_USER;
  SMTP_PASS = envConfig.MT_PASS;
} else {
  BASE_URL = `${envConfig.PROD_BASE_URL}/api/v1`;
  SMTP_HOST = envConfig.SG_HOST;
  SMTP_PORT = envConfig.SG_PORT;
  SMTP_USER = envConfig.SG_USER;
  SMTP_PASS = envConfig.SG_PASS;
}

export default {
  ...envConfig,
  BASE_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  GOOGLE_CALLBACK_URL: `${BASE_URL}/auth/callback/google`,
};
