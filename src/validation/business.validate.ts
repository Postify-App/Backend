import { z } from 'zod';

export const BusinessSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      email: z.email().optional(),
      description: z.string().optional(),
      size: z.string().optional(),
      longitude: z.coerce
        .number()
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180')
        .optional(),
      latitude: z.coerce
        .number()
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90')
        .optional(),
      mainTopicId: z.string().optional(),
      toneOfVoiceId: z.string().optional(),
      mainGoalId: z.string().optional(),
      targetAudienceId: z.string().optional(),
    })
    .strict(),
});
