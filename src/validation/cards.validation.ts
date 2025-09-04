import { z } from 'zod';

export const TitleSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .max(30, 'Title cannot be more than 30 characters')
        .min(3, 'Title cannot be less than 3 characters'),
    })
    .strict(),
});

export const OptionalTitleSchema = z.object({
  body: TitleSchema.shape.body.partial(),
});
