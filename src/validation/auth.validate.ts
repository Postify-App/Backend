import { z } from 'zod';

const authSharedSchema = z.object({
  name: z
    .string()
    .min(3, 'Name cannot be less than 3 characters')
    .max(30, 'Name cannot be more than 30 characters')
    .optional()
    .default('user'),
  email: z.email(),
});

export const loginSchema = z.object({
  body: authSharedSchema.strict(),
});

export const OTPSchema = z.object({
  body: z.union([
    authSharedSchema
      .extend({
        OTP: z.string().length(6, 'OTP must be of length 6'),
      })
      .strict(),
    z
      .object({
        idToken: z.string(),
      })
      .strict(),
  ]),
});

export const refreshTokenSchema = z.object({
  body: z
    .object({
      refreshToken: z.string(),
    })
    .strict(),
});
