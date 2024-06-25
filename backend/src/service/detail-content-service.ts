import { DetailContent } from '@prisma/client';
import {
  DetailContentValidation,
  ValidatedDetailContentData,
} from '../validation/detail-content-validation';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';

export class DetailContentService {
  static async create(
    data: ValidatedDetailContentData,
    userId: string
  ): Promise<DetailContent> {
    const validatedData = Validation.validate(
      DetailContentValidation.CREATE,
      data
    );

    // Extract categories from validatedData
    const { questions, ...dataWithoutQuestions } = validatedData;

    // Create content without categories
    const createdContent = await prismaClient.detailContent.create({
      data: {
        ...dataWithoutQuestions,
        created_by: userId,
        updated_by: userId,
        // Connect questions
        questions: {
          create: questions?.map((questionId: string) => ({
            question: {
              connect: { id: questionId },
            },
          })),
        },
      },
    });

    return createdContent;
  }

  static async getAllByContentId(id: string): Promise<DetailContent[]> {
    return prismaClient.detailContent.findMany({
      where: {
        id_content: id,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  static async getById(id: string): Promise<DetailContent | null> {
    return prismaClient.detailContent.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  static async update(
    id: string,
    data: ValidatedDetailContentData,
    userId: string
  ): Promise<DetailContent> {
    const validatedData = Validation.validate(
      DetailContentValidation.UPDATE,
      data
    );

    // Extract questions from validatedData
    const { questions, ...dataWithoutQuestions } = validatedData;

    // Prepare set object for updating content
    const setContent = {
      ...dataWithoutQuestions,
      updated_by: userId,
    };

    if (questions) {
      // Delete all existing questions for this content
      await prismaClient.detailContentQuestion.deleteMany({
        where: {
          id_detail_content: id,
        },
      });

      // Add new questions to the content
      const questionsIds = questions?.map((questionsId: string) => ({
        id_detail_content: id,
        id_question: questionsId,
      }));

      // Create new content questions
      await prismaClient.detailContentQuestion.createMany({
        data: questionsIds,
      });
    }

    return prismaClient.detailContent.update({
      where: { id },
      data: {
        ...setContent,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    // Check if the detail content exists
    const existingDetailContent = await prismaClient.detailContent.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingDetailContent) {
      throw new Error(`Detail Content with id ${id} not found.`);
    }

    await prismaClient.detailContent.delete({
      where: { id },
    });
  }
}
