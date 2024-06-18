import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from '../model/user-model';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, 'Email already exists');
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: {
        ...registerRequest,
        is_verified: false,
        role: 'STUDENT',
      },
    });

    return toUserResponse(user);
  }

  static async login(
    request: LoginUserRequest
  ): Promise<{ user: UserResponse; token: string }> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, 'Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Email or password is wrong');
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return {
      user: toUserResponse(user),
      token,
    };
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.newPassword) {
      // Validate old password if provided
      if (updateRequest.password) {
        const isOldPasswordValid = await bcrypt.compare(
          updateRequest.password,
          user.password
        );
        if (!isOldPasswordValid) {
          throw new ResponseError(401, 'Old password is incorrect');
        }
      } else {
        throw new ResponseError(
          400,
          'Old password is required to change the password'
        );
      }
      user.password = await bcrypt.hash(updateRequest.newPassword, 10);
    }

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    const result = await prismaClient.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        email: user.email,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(result);
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
