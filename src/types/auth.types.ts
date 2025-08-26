import { z } from 'zod';
import { loginSchema } from '../validation/auth.validate';

export type LoginBody = z.output<typeof loginSchema>['body'];
