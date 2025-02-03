import { prismaClient } from "../application/database";
// import { Question } from '@prisma/client';

export class QuestionService {
  static async create(data: any): Promise<any> {
    const { question, score, options } = data;

    return prismaClient.question.create({
      data: {
        question,
        options: {
          create: options,
        },
      },
      include: {
        options: true,
      },
    });
  }

  static async getAll(): Promise<any[]> {
    return prismaClient.question.findMany({
      include: {
        options: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });
  }

  static async getById(id: string): Promise<any | null> {
    return prismaClient.question.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });
  }

  static async update(id: string, data: any): Promise<any> {
    const { question, score, options } = data;

    await prismaClient.option.deleteMany({
      where: { id_question: id },
    });

    return prismaClient.question.update({
      where: { id },
      data: {
        question,
        options: {
          create: options,
        },
      },
      include: {
        options: true,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    await prismaClient.$transaction(async (prisma: any) => {
      await prisma.option.deleteMany({
        where: { id_question: id },
      });

      await prisma.question.delete({
        where: { id },
      });
    });
  }
}
