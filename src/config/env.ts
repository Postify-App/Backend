import { z } from 'zod';
import { config } from 'dotenv';

config({ quiet: true });

export default z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
      .default('info'),

    MT_HOST: z.string(),
    MT_PORT: z.coerce.number(),
    MT_USER: z.string(),
    MT_PASS: z.string(),
  })
  .parse(process.env);
