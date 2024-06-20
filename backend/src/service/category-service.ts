import { prismaClient } from '../application/database';
import { Category } from '@prisma/client';
import { Validation } from '../validation/validation';
import { CategoryValidation } from '../validation/category-validation';

export class CategoryService {
  static async create(
    data: Omit<Category, 'id' | 'created_at' | 'updated_at'>,
    userId: string
  ): Promise<Category> {
    const validatedData = Validation.validate(CategoryValidation.CREATE, data);
    return await prismaClient.category.create({
      data: {
        ...validatedData,
        created_by: userId,
        updated_by: userId,
      },
    });
  }

  static async getAll(): Promise<Category[]> {
    return await prismaClient.category.findMany();
  }

  static async getById(id: string): Promise<Category | null> {
    return await prismaClient.category.findUnique({ where: { id } });
  }

  static async update(
    id: string,
    data: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'created_by'>,
    userId: string
  ): Promise<Category> {
    const validatedData = Validation.validate(CategoryValidation.UPDATE, data);
    return await prismaClient.category.update({
      where: { id },
      data: {
        ...validatedData,
        updated_by: userId,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    await prismaClient.category.delete({ where: { id } });
  }
}
