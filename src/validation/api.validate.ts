import { z } from 'zod';

export const IdSchema = z.object({
  params: z
    .object({
      id: z.uuid('Invalid ID format'),
    })
    .strict(),
});
