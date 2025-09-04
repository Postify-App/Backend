import { z } from 'zod';
import { IdSchema } from '../validation/api.validate';

export type APIResponse = {
  status: string;
  statusCode: number;
  data?: object;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  timestamp?: string;
  size?: number;
};

export type Id = z.output<typeof IdSchema>['params'];
