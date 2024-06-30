import { z } from 'zod';

export const ManageUserValidation = z.object({
  is_banned: z.boolean().optional(),
  role: z.enum(['ADMIN', 'STUDENT', 'TEACHER']).optional(),
  name: z.string().min(1).max(255).optional(),
});

export type ValidatedManageUserData = z.infer<typeof ManageUserValidation>;
