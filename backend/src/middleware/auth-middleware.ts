import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../application/database';
import { UserRequest } from '../type/user-request';
import { ResponseError } from '../error/response-error';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new ResponseError(401, 'Unauthorized');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new ResponseError(401, 'Unauthorized');
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new ResponseError(401, 'Unauthorized');
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        errors: 'Unauthorized',
      })
      .end();
  }
};
