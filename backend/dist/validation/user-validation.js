"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
    password: zod_1.z
        .string()
        .min(8)
        .max(255)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    name: zod_1.z.string().min(1).max(255),
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
    password: zod_1.z.string().min(1).max(255),
});
UserValidation.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(8).max(255).optional(),
    newPassword: zod_1.z
        .string()
        .min(8)
        .max(255)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .optional(),
    name: zod_1.z.string().min(1).max(255).optional(),
});
UserValidation.VERIFY_OTP = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
    otp: zod_1.z.string().length(6),
});
UserValidation.FORGOT_PASSWORD = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
});
UserValidation.RESET_PASSWORD = zod_1.z.object({
    token: zod_1.z.string().min(1),
    newPassword: zod_1.z
        .string()
        .min(8)
        .max(255)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
