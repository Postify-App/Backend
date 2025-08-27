import { z } from 'zod';

import {
  loginSchema,
  OTPSchema,
  refreshTokenSchema,
} from '../validation/auth.validate';

export type OTPBody = z.output<typeof OTPSchema>['body'];
export type LoginBody = z.output<typeof loginSchema>['body'];
export type RefreshTokenBody = z.output<typeof refreshTokenSchema>['body'];

export type AccessTokenPayload = {
  id: string;
  name: string;
  email: string;
};

export type RefreshTokenPayload = {
  id: string;
};
