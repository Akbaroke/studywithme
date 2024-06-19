import { Request, Response, NextFunction } from 'express';
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from '../model/user-model';
import { UserService } from '../service/user-service';
import { UserRequest } from '../type/user-request';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const { user, token } = await UserService.login(request);
      res.status(200).json({
        data: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      await UserService.verifyOTP(email, otp);
      res.status(200).json({
        message: 'Email verified successfully',
      });
    } catch (e) {
      next(e);
    }
  }

  static async resendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await UserService.resendOTP(email);
      res.status(200).json({
        message: 'OTP resent successfully',
      });
    } catch (e) {
      next(e);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await UserService.forgotPassword(email);
      res.status(200).json({
        message: 'Password reset email sent',
      });
    } catch (e) {
      next(e);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;
      await UserService.resetPassword(token, newPassword);
      res.status(200).json({
        message: 'Password reset successfully',
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.logout(req.user!);
      res.status(200).json({
        data: 'OK',
      });
    } catch (e) {
      next(e);
    }
  }

  static async verifyToken(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const decoded = UserService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
}
