// import { Content } from '@prisma/client';
import { z, ZodType } from "zod";

interface Content {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  is_premium: boolean;
  total_klik?: number;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}

interface ContentData {
  title: string;
  description?: string;
  thumbnail?: string;
  is_premium: boolean;
  total_duration?: number;
  total_klik?: number;
  categories: string[];
}

export interface ValidatedContentData
  extends Omit<Content, "id" | "created_at" | "updated_at" | "created_by"> {
  categories: string[]; // Add categories here if it's not defined in Content already
}

export class ContentValidation {
  static readonly CREATE: ZodType<ContentData> = z.object({
    title: z.string().min(1).max(255),
    description: z.string().max(10000).optional(),
    thumbnail: z.string().max(255).optional(),
    is_premium: z.boolean(),
    total_klik: z.number().int().positive().optional(),
    categories: z.array(z.string()),
  });

  static readonly UPDATE: ZodType<Partial<ContentData>> = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().max(10000).optional(),
    thumbnail: z.string().max(255).optional(),
    is_premium: z.boolean().optional(),
    total_klik: z.number().int().positive().optional(),
    categories: z.array(z.string()).optional(),
  });
}
