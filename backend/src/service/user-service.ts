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
import { sendEmail } from '../helper/email';
import { generateOTP, isOTPValid } from '../helper/otp';

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

    const otp = generateOTP();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP valid for 10 minutes

    const user = await prismaClient.user.create({
      data: {
        ...registerRequest,
        otp,
        otp_expiration: otpExpiration,
      },
    });

    await sendEmail(
      registerRequest.email,
      'Verify your email',
      `Your OTP is ${otp}`
    );

    return toUserResponse(user);
  }

  static async verifyOTP(email: string, otp: string): Promise<void> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user || !isOTPValid(user.otp!, user.otp_expiration!, otp)) {
      throw new ResponseError(400, 'Invalid or expired OTP');
    }

    await prismaClient.user.update({
      where: { email },
      data: { is_email_verification: true, otp: null, otp_expiration: null },
    });
  }

  static async resendOTP(email: string): Promise<void> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    const otp = generateOTP();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP valid for 10 minutes

    await prismaClient.user.update({
      where: { email },
      data: { otp, otp_expiration: otpExpiration },
    });

    await sendEmail(email, 'Verify your email', `Your OTP is ${otp}`);
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

    if (!user.is_email_verification) {
      throw new ResponseError(402, 'Email is not verified');
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Email or password is wrong');
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    return {
      user: toUserResponse(user),
      token,
    };
  }

  static async forgotPassword(email: string): Promise<void> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ResponseError(400, 'Email not found');
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    await prismaClient.user.update({
      where: { email },
      data: {
        reset_password_token: resetToken,
        reset_password_expiration: new Date(Date.now() + 3600000),
      }, // 1 hour expiration
    });

    await sendEmail(
      email,
      'Reset your password',
      `Your reset token is ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
    );
  }

  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await prismaClient.user.findUnique({
      where: { id: payload.id },
    });

    if (
      !user ||
      user.reset_password_token !== token ||
      user.reset_password_expiration! < new Date()
    ) {
      throw new ResponseError(400, 'Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prismaClient.user.update({
      where: { id: payload.id },
      data: {
        password: hashedPassword,
        reset_password_token: null,
        reset_password_expiration: null,
      },
    });
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
        otp: null,
        otp_expiration: null,
        reset_password_token: null,
        reset_password_expiration: null,
      },
    });

    return toUserResponse(result);
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
