import { z } from 'zod';

export const DiscussionValidation = z.object({
  message: z.string().min(1).max(5000).optional(),
  id_detail_content: z.string(),
  id_replies_discussion: z.string().optional(),
});

export type ValidatedDiscussionData = z.infer<typeof DiscussionValidation>;
