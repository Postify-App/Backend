import { User } from '@prisma/client';

export type UpdatedUserData = Partial<
  Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
>;
