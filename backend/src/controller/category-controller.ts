import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../service/category-service';
import { UserRequest } from '../type/user-request';
export class CategoryController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await CategoryService.create(req.body, req.user!.id);
      res.status(201).json({ message: 'Kategori berhasil ditambahkan' });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json({ data: categories });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await CategoryService.update(
        req.params.id,
        req.body,
        req.user!.id
      );
      res.status(200).json({ message: 'Kategori berhasil diperbarui' });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.delete(req.params.id);
      res.status(200).json({
        message: 'Kategori berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}
