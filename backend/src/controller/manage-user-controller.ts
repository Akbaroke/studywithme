import { Request, Response, NextFunction } from 'express';
import { ManageUserService } from '../service/manage-user-service';
import { ManageUserValidation } from '../validation/manage-user-validation';

export class ManageUserController {
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const request = ManageUserValidation.parse(req.body);

      const updatedUser = await ManageUserService.updateUser(id, request);

      res
        .status(200)
        .json({ message: 'User berhasil diperbarui', data: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ManageUserService.getAllUsers();

      res
        .status(200)
        .json({ message: 'Daftar pengguna berhasil diambil', data: users });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await ManageUserService.getUserById(id);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Daftar pengguna tidak ditemukan' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
