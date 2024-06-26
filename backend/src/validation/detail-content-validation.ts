import { DetailContent } from '@prisma/client';
import { z, ZodType } from 'zod';

export interface ValidatedDetailContentData
  extends Omit<
    DetailContent,
    'id' | 'created_at' | 'updated_at' | 'created_by'
  > {
  questions: string[];
}

export class DetailContentValidation {
  static readonly CREATE: ZodType = z.object({
    id_content: z.string().uuid(),
    serial_number: z.number().int().positive(),
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
    is_premium: z.boolean(),
    duration: z.number().int().positive().optional(),
    video_url: z.string().max(255).optional(),
    questions: z.array(z.string()).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id_content: z.string().uuid().optional(),
    serial_number: z.number().int().positive().optional(),
    title: z.string().min(1).max(255).optional(),
    description: z.string().max(255).optional(),
    is_premium: z.boolean().optional(),
    duration: z.number().int().positive().optional(),
    video_url: z.string().max(255).optional(),
    questions: z.array(z.string()).optional(),
  });
}
