import { z } from 'zod';

export const IdSchema = z.object({
  params: z
    .object({
      id: z.uuid('Provided id must be in valid UUID format'),
    })
    .strict(),
});
