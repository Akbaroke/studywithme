import { Response, NextFunction } from 'express';
import { UserRequest } from '../type/user-request';
import { ResponseError } from '../error/response-error';
import { Role } from '@prisma/client';

export const roleMiddleware = (roles: Role[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ResponseError(401, 'Unauthorized');
      }

      if (!roles.includes(req.user.role)) {
        throw new ResponseError(403, 'Forbidden');
      }

      next();
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({
          errors: error.message,
        })
        .end();
    }
  };
};
