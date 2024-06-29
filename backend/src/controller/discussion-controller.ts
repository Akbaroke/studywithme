import { Request, Response, NextFunction } from 'express';
import { DiscussionService } from '../service/discussion-service';
import { DiscussionValidation } from '../validation/discussion-validation';
import { UserRequest } from '../type/user-request';

export class DiscussionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = DiscussionValidation.parse(req.body);
      const userId = req.user!.id;
      const discussion = await DiscussionService.create(validatedData, userId);
      res
        .status(201)
        .json({ data: discussion, message: 'Diskusi berhasil dibuat' });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const discussions = await DiscussionService.getAll();
      res.status(200).json({ data: discussions });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const discussion = await DiscussionService.getById(id);
      res.status(200).json({ data: discussion });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = DiscussionValidation.parse(req.body);
      const userId = req.user!.id;
      const discussion = await DiscussionService.update(
        id,
        validatedData,
        userId
      );
      res
        .status(200)
        .json({ data: discussion, message: 'Diskusi berhasil diperbarui' });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await DiscussionService.delete(id);
      res.status(200).json({ message: 'Diskusi berhasil dihapus' });
    } catch (e) {
      next(e);
    }
  }
}
