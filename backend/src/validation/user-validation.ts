import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().email().min(1).max(255),
    password: z
      .string()
      .min(8)
      .max(255)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    name: z.string().min(1).max(255),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(8).max(255).optional(),
    newPassword: z
      .string()
      .min(8)
      .max(255)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .optional(),
    name: z.string().min(1).max(255).optional(),
  });

  static readonly VERIFY_OTP: ZodType = z.object({
    email: z.string().email().min(1).max(255),
    otp: z.string().length(6),
  });

  static readonly FORGOT_PASSWORD: ZodType = z.object({
    email: z.string().email().min(1).max(255),
  });

  static readonly RESET_PASSWORD: ZodType = z.object({
    token: z.string().min(1),
    newPassword: z
      .string()
      .min(8)
      .max(255)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  });
}
