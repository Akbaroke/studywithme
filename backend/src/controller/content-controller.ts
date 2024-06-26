import { Request, Response, NextFunction } from 'express';
import { ContentService } from '../service/content-service';
import {
  ContentValidation,
  ValidatedContentData,
} from '../validation/content-validation';
import { UserRequest } from '../type/user-request';

export class ContentController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = ContentValidation.CREATE.parse(
        req.body
      ) as ValidatedContentData; // Cast to ValidatedContentData
      const userId = req.user!.id;
      await ContentService.create(request, userId);
      res.status(201).json({ message: 'Konten berhasil ditambahkan' });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const contents = await ContentService.getAll();
      res.status(200).json({ data: contents });
    } catch (e) {
      next(e);
    }
  }

  static async getFreeContent(req: Request, res: Response, next: NextFunction) {
    try {
      const contents = await ContentService.getFreeContent();
      res.status(200).json({ data: contents });
    } catch (e) {
      next(e);
    }
  }

  static async getMostClickedContent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contents = await ContentService.getMostClickedContent();
      res.status(200).json({ data: contents });
    } catch (e) {
      next(e);
    }
  }

  static async clickedContent(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await ContentService.clickedContent(id);
      res.status(200).json({ message: 'Klik Konten berhasil diperbarui' });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const content = await ContentService.getById(id);
      res.status(200).json({ data: content });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const request = ContentValidation.UPDATE.parse(
        req.body
      ) as ValidatedContentData; // Cast to ValidatedContentData
      const userId = req.user!.id;
      await ContentService.update(id, request, userId);
      res.status(200).json({ message: 'Konten berhasil diperbarui' });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ContentService.delete(id);
      res.status(200).json({ message: 'Konten berhasil dihapus' });
    } catch (e) {
      next(e);
    }
  }
}
