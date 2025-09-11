import { z } from 'zod';

export const PostSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .max(100, 'Title cannot be more than 100 characters')
        .min(3, 'Title cannot be less than 3 characters')
        .optional(),
      description: z.string(),
      businessId: z.uuid(),
      hashtags: z.array(z.string()).optional(),
    })
    .strict(),
});

export const OptionalPostSchema = z.object({
  body: PostSchema.shape.body.partial(),
});
