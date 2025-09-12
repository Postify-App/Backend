import { z } from 'zod';
import { Post } from '@prisma/client';
import {
  CreatePostSchema,
  GetBusinessPostSchema,
  PublishPostSchema,
} from '../validation/post.validate';

export type TPost = Omit<
  Post,
  'id' | 'createdAt' | 'files' | 'updatedAt' | 'scheduledAt' | 'file'
>;

export type CreatePostBody = z.output<typeof CreatePostSchema>['body'];
export type PublishPostBody = z.output<typeof PublishPostSchema>['body'] & {
  file: string;
};

export type GetBusinessPostParams = z.output<
  typeof GetBusinessPostSchema
>['params'];

export type GetBusinessPostQuery = z.output<
  typeof GetBusinessPostSchema
>['query'];
