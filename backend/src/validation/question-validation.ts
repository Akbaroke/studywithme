import { z } from 'zod';

export const OptionSchema = z.object({
  option: z.string().min(1),
  is_answer: z.boolean().optional(),
});

export const QuestionSchema = z.object({
  question: z.string().min(1),
  score: z.number().int().positive().optional(),
  options: z.array(OptionSchema),
});

export const UpdateQuestionSchema = z.object({
  question: z.string().min(1).optional(),
  score: z.number().int().positive().optional(),
  options: z.array(OptionSchema).optional(),
});
