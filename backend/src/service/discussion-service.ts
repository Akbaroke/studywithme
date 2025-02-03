import { prismaClient } from "../application/database";
import { ValidatedDiscussionData } from "../validation/discussion-validation";
// import { Discussion } from '@prisma/client';

export class DiscussionService {
  static async create(
    data: ValidatedDiscussionData,
    userId: string
  ): Promise<any> {
    const discussion = await prismaClient.discussion.create({
      data: {
        message: data.message,
        id_user: userId,
        id_detail_content: data.id_detail_content,
        id_replies_discussion: data.id_replies_discussion,
      },
    });
    return discussion;
  }

  static async getAll(): Promise<any[]> {
    return prismaClient.discussion.findMany({
      include: {
        user: true,
        detailContent: true,
        parentDiscussion: true,
        replies: true,
      },
    });
  }

  static async getById(id: string): Promise<any | null> {
    return prismaClient.discussion.findUnique({
      where: { id },
      include: {
        user: true,
        detailContent: true,
        parentDiscussion: true,
        replies: true,
      },
    });
  }

  static async update(
    id: string,
    data: ValidatedDiscussionData,
    userId: string
  ): Promise<any> {
    return prismaClient.discussion.update({
      where: { id },
      data: {
        message: data.message,
        id_user: userId,
        id_detail_content: data.id_detail_content,
        id_replies_discussion: data.id_replies_discussion,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    await prismaClient.discussion.delete({
      where: { id },
    });
  }
}
