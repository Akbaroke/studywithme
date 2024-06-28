import * as z from 'zod';

export const HistoryQuestionValidation = z.object({
  id_detail_content: z.string().nonempty('Id Detail Content is required'),
  result_score: z
    .number()
    .min(0, 'Result score must be greater than or equal to 0')
    .optional(),
  target_score: z
    .number()
    .min(0, 'Target score must be greater than or equal to 0')
    .optional(),
});

export const UpdateHistoryQuestionValidation =
  HistoryQuestionValidation.partial();

export type ValidatedHistoryQuestionData = z.infer<
  typeof HistoryQuestionValidation
>;
