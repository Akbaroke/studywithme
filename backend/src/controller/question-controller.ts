import { Request, Response, NextFunction } from 'express';
import { QuestionService } from '../service/question-service';
import {
  QuestionSchema,
  UpdateQuestionSchema,
} from '../validation/question-validation';

export class QuestionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = QuestionSchema.parse(req.body);
      const question = await QuestionService.create(validatedData);
      res.status(201).json({ data: question, message: 'Soal berhasil dibuat' });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await QuestionService.getAll();
      res.status(200).json({ data: questions });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const question = await QuestionService.getById(id);
      res.status(200).json({ data: question });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = UpdateQuestionSchema.parse(req.body);
      const question = await QuestionService.update(id, validatedData);
      res
        .status(200)
        .json({ data: question, message: 'Soal berhasil diperbarui' });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await QuestionService.delete(id);
      res.status(200).json({ message: 'Soal berhasil dihapus' });
    } catch (e) {
      next(e);
    }
  }
}
