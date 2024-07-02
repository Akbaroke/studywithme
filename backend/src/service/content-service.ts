import { prismaClient } from '../application/database';
import { Content } from '@prisma/client';
import { Validation } from '../validation/validation';
import {
  ContentValidation,
  ValidatedContentData,
} from '../validation/content-validation';

export class ContentService {
  static async create(
    contentData: ValidatedContentData,
    userId: string
  ): Promise<Content> {
    const validatedData = Validation.validate(
      ContentValidation.CREATE,
      contentData
    );

    // Extract categories from validatedData
    const { categories, ...dataWithoutCategories } = validatedData;

    // Create content without categories
    const createdContent = await prismaClient.content.create({
      data: {
        ...dataWithoutCategories,
        created_by: userId,
        updated_by: userId,
        // Connect categories
        categories: {
          create: categories.map((categoryId: string) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });

    return createdContent;
  }

  static async getAll(): Promise<Content[]> {
    const contents = await prismaClient.content.findMany({
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        detailContentContentId: true,
        categories: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return contents.map((content) => {
      let total_duration = 0;
      content.detailContentContentId.forEach((detail) => {
        total_duration += detail.duration ?? 0;
      });
      return {
        id: content.id,
        title: content.title,
        description: content.description,
        thumbnail: content.thumbnail,
        is_premium: content.is_premium,
        total_duration,
        total_klik: content.total_klik,
        created_by: content.createdBy.name,
        updated_by: content.updatedBy.name,
        created_at: content.created_at,
        updated_at: content.updated_at,
        total_content: content.detailContentContentId.length,
        categories: content.categories.map(({ category }) => ({
          id: category.id,
          name: category.name,
          created_by: category.created_by,
          updated_by: category.updated_by,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })),
      };
    });
  }

  static async getNewContent(): Promise<Content[]> {
    const contents = await prismaClient.content.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        detailContentContentId: true,
        categories: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return contents.map((content) => {
      let total_duration = 0;
      content.detailContentContentId.forEach((detail) => {
        total_duration += detail.duration ?? 0;
      });
      return {
        id: content.id,
        title: content.title,
        description: content.description,
        thumbnail: content.thumbnail,
        is_premium: content.is_premium,
        total_duration,
        total_klik: content.total_klik,
        created_by: content.createdBy.name,
        updated_by: content.updatedBy.name,
        created_at: content.created_at,
        updated_at: content.updated_at,
        total_content: content.detailContentContentId.length,
        categories: content.categories.map(({ category }) => ({
          id: category.id,
          name: category.name,
          created_by: category.created_by,
          updated_by: category.updated_by,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })),
      };
    });
  }

  static async getFreeContent(): Promise<Content[]> {
    const contents = await prismaClient.content.findMany({
      where: {
        is_premium: false,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        detailContentContentId: true,
        categories: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return contents.map((content) => {
      let total_duration = 0;
      content.detailContentContentId.forEach((detail) => {
        total_duration += detail.duration ?? 0;
      });

      return {
        id: content.id,
        title: content.title,
        description: content.description,
        thumbnail: content.thumbnail,
        is_premium: content.is_premium,
        total_duration,
        total_klik: content.total_klik,
        created_by: content.createdBy.name,
        updated_by: content.updatedBy.name,
        created_at: content.created_at,
        updated_at: content.updated_at,
        total_content: content.detailContentContentId.length,
        categories: content.categories.map(({ category }) => ({
          id: category.id,
          name: category.name,
          created_by: category.created_by,
          updated_by: category.updated_by,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })),
      };
    });
  }

  static async getMostClickedContent(): Promise<Content[]> {
    const contents = await prismaClient.content.findMany({
      orderBy: {
        total_klik: 'desc',
      },
      include: {
        detailContentContentId: true,
        categories: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return contents.map((content) => {
      let total_duration = 0;
      content.detailContentContentId.forEach((detail) => {
        total_duration += detail.duration ?? 0;
      });

      return {
        id: content.id,
        title: content.title,
        description: content.description,
        thumbnail: content.thumbnail,
        is_premium: content.is_premium,
        total_duration,
        total_klik: content.total_klik,
        created_by: content.createdBy.name,
        updated_by: content.updatedBy.name,
        created_at: content.created_at,
        updated_at: content.updated_at,
        total_content: content.detailContentContentId.length,
        detail_content: content.detailContentContentId,
        categories: content.categories.map(({ category }) => ({
          id: category.id,
          name: category.name,
          created_by: category.created_by,
          updated_by: category.updated_by,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })),
      };
    });
  }

  static async getById(contentId: string): Promise<any> {
    const content = await prismaClient.content.findUnique({
      where: {
        id: contentId,
      },
      include: {
        detailContentContentId: {
          orderBy: {
            serial_number: 'asc',
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!content) {
      throw new Error(`Content with id ${contentId} not found.`);
    }

    let total_duration = 0;
    content.detailContentContentId.forEach((detail) => {
      total_duration += detail.duration ?? 0;
    });

    return {
      id: content.id,
      title: content.title,
      description: content.description,
      thumbnail: content.thumbnail,
      is_premium: content.is_premium,
      total_duration,
      total_klik: content.total_klik,
      created_by: content.createdBy.name,
      updated_by: content.updatedBy.name,
      created_at: content.created_at,
      updated_at: content.updated_at,
      total_content: content.detailContentContentId.length,
      detail_content: content.detailContentContentId,
      categories: content.categories.map(({ category }) => ({
        id: category.id,
        name: category.name,
        created_by: category.created_by,
        updated_by: category.updated_by,
        created_at: category.created_at,
        updated_at: category.updated_at,
      })),
    };
  }

  static async clickedContent(contentId: string): Promise<Content> {
    const currentContent = await prismaClient.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!currentContent) {
      throw new Error('Konten tidak ditemukan');
    }

    const previousTotalKlik = currentContent.total_klik
      ? currentContent.total_klik
      : 0;

    // Perbarui total_klik
    const updatedContent = await prismaClient.content.update({
      where: {
        id: contentId,
      },
      data: {
        total_klik: previousTotalKlik + 1,
      },
    });

    return updatedContent;
  }

  static async update(
    contentId: string,
    contentData: ValidatedContentData,
    userId: string
  ): Promise<Content> {
    const validatedData = Validation.validate(
      ContentValidation.UPDATE,
      contentData
    );

    // Extract categories and other data
    const { categories, ...dataWithoutCategories } = validatedData;

    // Prepare set object for updating content
    const setContent = {
      ...dataWithoutCategories,
      updated_by: userId,
    };

    if (categories) {
      // Delete all existing categories for this content
      await prismaClient.contentCategory.deleteMany({
        where: {
          id_content: contentId,
        },
      });

      // Add new categories to the content
      const categoryIds = categories?.map((categoryId: string) => ({
        id_category: categoryId,
        id_content: contentId,
      }));

      // Create new content categories
      await prismaClient.contentCategory.createMany({
        data: categoryIds,
      });
    }

    // Create new content data
    const updatedContent = await prismaClient.content.update({
      where: {
        id: contentId,
      },
      data: {
        ...setContent,
      },
    });

    return updatedContent;
  }

  static async delete(contentId: string): Promise<void> {
    // Check if the content exists
    const existingContent = await prismaClient.content.findUnique({
      where: {
        id: contentId,
      },
    });

    if (!existingContent) {
      throw new Error(`Content with id ${contentId} not found.`);
    }

    await prismaClient.content.delete({
      where: {
        id: contentId,
      },
    });
  }
}
