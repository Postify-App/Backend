import { z } from 'zod';

import { loginSchema, OTPSchema } from '../validation/auth.validate';

export type OTPBody = z.output<typeof OTPSchema>['body'];
export type LoginBody = z.output<typeof loginSchema>['body'];
