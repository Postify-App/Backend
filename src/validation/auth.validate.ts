import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name cannot be less than 3 characters')
      .max(30, 'Name cannot be more than 30 characters')
      .optional()
      .default('user'),
    email: z.email(),
  }),
});
