import { z } from 'zod';

export const MainTopicSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .max(30, 'Title cannot be more than 30 characters')
        .min(3, 'Title cannot be less than 3 characters'),
      description: z.string(),
    })
    .strict(),
});

export const OptionalTopicSchema = z.object({
  body: MainTopicSchema.shape.body.partial(),
});
