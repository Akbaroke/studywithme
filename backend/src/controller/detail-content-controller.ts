// src/controller/detail-content-controller.ts

import { Request, Response, NextFunction } from 'express';
import { DetailContentValidation } from '../validation/detail-content-validation';
import { DetailContentService } from '../service/detail-content-service';
import { UserRequest } from '../type/user-request';

export class DetailContentController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = DetailContentValidation.CREATE.parse(req.body);
      const userId = req.user!.id;
      await DetailContentService.create(request, userId);
      res.status(201).json({ message: 'Detail Konten berhasil ditambahkan' });
    } catch (e) {
      next(e);
    }
  }

  static async getAllByContentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const detailContents = await DetailContentService.getAllByContentId(id);
      res.status(200).json({ data: detailContents });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const detailContent = await DetailContentService.getById(id);
      res.status(200).json({ data: detailContent });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const request = DetailContentValidation.UPDATE.parse(req.body);
      const userId = req.user!.id;
      await DetailContentService.update(id, request, userId);
      res.status(200).json({ message: 'Detail Konten berhasil diperbarui' });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await DetailContentService.delete(id);
      res.status(200).json({ message: 'Detail Konten berhasil dihapus' });
    } catch (e) {
      next(e);
    }
  }
}
