import { prismaClient } from '../application/database';
import {
  HistoryQuestionValidation,
  UpdateHistoryQuestionValidation,
  ValidatedHistoryQuestionData,
} from '../validation/history-question-validation';
import { HistoryQuestion } from '@prisma/client';

export class HistoryQuestionService {
  static async create(
    data: ValidatedHistoryQuestionData
  ): Promise<HistoryQuestion> {
    // Validate data
    const validatedData = HistoryQuestionValidation.parse(data);

    if (!validatedData.id_detail_content) {
      throw new Error('id_detail_content is required');
    }

    const historyQuestion = await prismaClient.historyQuestion.create({
      data: {
        id_detail_content: validatedData.id_detail_content,
        result_score: validatedData.result_score,
        target_score: validatedData.target_score,
      },
    });

    return historyQuestion;
  }

  static async getAll(): Promise<HistoryQuestion[]> {
    return prismaClient.historyQuestion.findMany({
      include: {
        detailContent: true,
      },
    });
  }

  static async getById(id: string): Promise<HistoryQuestion | null> {
    return prismaClient.historyQuestion.findUnique({
      where: { id },
      include: {
        detailContent: true,
      },
    });
  }

  static async update(
    id: string,
    data: ValidatedHistoryQuestionData
  ): Promise<HistoryQuestion> {
    // Validate data
    const validatedData = UpdateHistoryQuestionValidation.parse(data);

    if (!validatedData.id_detail_content) {
      throw new Error('id_detail_content is required');
    }

    return prismaClient.historyQuestion.update({
      where: { id },
      data: {
        id_detail_content: validatedData.id_detail_content,
        result_score: validatedData.result_score,
        target_score: validatedData.target_score,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    await prismaClient.historyQuestion.delete({
      where: { id },
    });
  }
}
