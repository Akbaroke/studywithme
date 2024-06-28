import { Request, Response, NextFunction } from 'express';
import { HistoryQuestionService } from '../service/history-question-service';
import {
  HistoryQuestionValidation,
  UpdateHistoryQuestionValidation,
  ValidatedHistoryQuestionData,
} from '../validation/history-question-validation';

export class HistoryQuestionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = HistoryQuestionValidation.parse(req.body);
      const historyQuestion = await HistoryQuestionService.create(
        validatedData
      );
      res.status(201).json({
        data: historyQuestion,
        message: 'History Question berhasil dibuat',
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const historyQuestions = await HistoryQuestionService.getAll();
      res.status(200).json({ data: historyQuestions });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const historyQuestion = await HistoryQuestionService.getById(id);
      res.status(200).json({ data: historyQuestion });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = UpdateHistoryQuestionValidation.parse(req.body);
      const historyQuestion = await HistoryQuestionService.update(
        id,
        validatedData as ValidatedHistoryQuestionData
      );
      res.status(200).json({
        data: historyQuestion,
        message: 'History Question berhasil diperbarui',
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await HistoryQuestionService.delete(id);
      res.status(200).json({ message: 'History Question berhasil dihapus' });
    } catch (e) {
      next(e);
    }
  }
}
