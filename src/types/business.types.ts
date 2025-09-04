import { Business } from '@prisma/client';

export type CleanBusiness = Omit<
  Business,
  'redditAccessToken' | 'redditRefreshToken' | 'redditExpiresIn'
>;
