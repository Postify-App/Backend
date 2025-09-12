import { z } from 'zod';

export const CreatePostSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .min(3, 'Title cannot be less than 3 characters')
        .max(100, 'Title cannot be more than 100 characters'),
      description: z.string(),
      business_id: z.uuid({
        message: 'Provided id must be in valid UUID format',
      }),
      approximate_words: z.coerce
        .number({ message: 'Approximate words must be a number' })
        .min(1, `Approximate words cannot be less than 1 word`)
        .max(500, `Approximate words cannot be more than 500 word`),
      required_words: z.array(z.string()),
      forbidden_words: z.array(z.string()),
      has_emojis: z.boolean(),
    })
    .strict(),
});

export const PublishPostSchema = z.object({
  body: z
    .object({
      scheduledAt: z.coerce
        .date({
          message: 'Scheduled date must be in valid date format',
        })
        .refine((date) => date >= new Date(Date.now()), {
          message: 'Scheduled date must be in the future',
        }),
    })
    .strict(),
});

export const GetBusinessPostSchema = z.object({
  params: z
    .object({
      id: z.uuid('Provided id must be in valid UUID format'),
    })
    .strict(),
  query: z
    .object({
      status: z
        .enum(['scheduled', 'posted'], {
          message: 'Status must be either "scheduled" or "posted"',
        })
        .optional(),
    })
    .strict(),
});

export const OptionalPostSchema = z.object({
  body: CreatePostSchema.shape.body.partial(),
});
