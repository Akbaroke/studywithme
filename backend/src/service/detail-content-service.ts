import { DetailContent } from '@prisma/client';
import {
  DetailContentValidation,
  QuestionType,
  ValidatedDetailContentData,
} from '../validation/detail-content-validation';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';
import { toUserResponse } from '../model/user-model';

export class DetailContentService {
  static async create(
    data: ValidatedDetailContentData,
    userId: string
  ): Promise<DetailContent> {
    const validatedData = Validation.validate(
      DetailContentValidation.CREATE,
      data
    );

    // Extract questions from validatedData
    const { questions, ...dataWithoutQuestions } = validatedData;

    // Create content without questions
    const createdContent = await prismaClient.detailContent.create({
      data: {
        ...dataWithoutQuestions,
        created_by: userId,
        updated_by: userId,
      },
    });

    // Connect questions to the created content
    if (questions && questions.length > 0) {
      await prismaClient.detailContentQuestion.createMany({
        data: questions.map((question: QuestionType) => ({
          id_detail_content: createdContent.id,
          id_question: question.id_question,
          score: question.score,
        })),
      });
    }

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

  static async getById(id: string): Promise<any> {
    const query = await prismaClient.detailContent.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
        historyQuestion: true,
        discussionDetailContentId: {
          include: {
            replies: {
              include: {
                user: true,
              },
              orderBy: {
                created_at: 'asc',
              },
            },
            user: true,
            parentDiscussion: true,
          },
        },
      },
    });
    return {
      ...query,
      questions: query?.questions?.map((question) => ({
        id_question: question.question.id,
        score: question.score,
        question: question.question.question,
        created_at: question.question.created_at,
        updated_at: question.question.updated_at,
        options: question.question.options.map((option) => ({
          id: option.id,
          option: option.option,
          is_answer: option.is_answer,
        })),
      })),
      discussionDetailContentId: null,
      discussions: query?.discussionDetailContentId
        .filter((discussion) => !discussion.parentDiscussion)
        .map((discussion) => ({
          ...discussion,
          replies: discussion.replies.map((reply) => ({
            ...reply,
            user: toUserResponse(reply.user),
          })),
          user: toUserResponse(discussion.user),
        })),
    };
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
    const setContent = questions
      ? {
          ...dataWithoutQuestions,
          duration: 0,
          video_url: null,
          updated_by: userId,
        }
      : {
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
      const questionsIds = questions?.map((questions: QuestionType) => ({
        id_detail_content: id,
        id_question: questions.id_question,
        score: questions.score,
      }));

      // Create new content questions
      await prismaClient.detailContentQuestion.createMany({
        data: questionsIds,
      });
    } else {
      await prismaClient.detailContentQuestion.deleteMany({
        where: {
          id_detail_content: id,
        },
      });
      await prismaClient.historyQuestion.delete({
        where: {
          id_detail_content: id,
        },
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
