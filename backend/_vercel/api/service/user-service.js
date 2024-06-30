"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../model/user-model");
const validation_1 = require("../validation/validation");
const user_validation_1 = require("../validation/user-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = require("../helper/email");
const otp_1 = require("../helper/otp");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const totalUserWithSameEmail = yield database_1.prismaClient.user.count({
                where: {
                    email: registerRequest.email,
                },
            });
            if (totalUserWithSameEmail != 0) {
                throw new response_error_1.ResponseError(400, 'Email already exists');
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const otp = (0, otp_1.generateOTP)();
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP valid for 10 minutes
            const user = yield database_1.prismaClient.user.create({
                data: Object.assign(Object.assign({}, registerRequest), { otp, otp_expiration: otpExpiration }),
            });
            yield (0, email_1.sendEmail)(registerRequest.email, 'Verify your email', `Your OTP is ${otp}`);
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static verifyOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findUnique({
                where: { email },
            });
            if (!user || !(0, otp_1.isOTPValid)(user.otp, user.otp_expiration, otp)) {
                throw new response_error_1.ResponseError(400, 'Invalid or expired OTP');
            }
            yield database_1.prismaClient.user.update({
                where: { email },
                data: { is_email_verification: true, otp: null, otp_expiration: null },
            });
        });
    }
    static resendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findUnique({ where: { email } });
            if (!user) {
                throw new response_error_1.ResponseError(404, 'User not found');
            }
            const otp = (0, otp_1.generateOTP)();
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP valid for 10 minutes
            yield database_1.prismaClient.user.update({
                where: { email },
                data: { otp, otp_expiration: otpExpiration },
            });
            yield (0, email_1.sendEmail)(email, 'Verify your email', `Your OTP is ${otp}`);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, 'Email or password is wrong');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, 'Email or password is wrong');
            }
            if (!user.is_email_verification) {
                throw new response_error_1.ResponseError(402, 'Email is not verified');
            }
            // Create JWT token
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });
            return {
                user: (0, user_model_1.toUserResponse)(user),
                token,
            };
        });
    }
    static forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, 'Email not found');
            }
            const resetToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            yield database_1.prismaClient.user.update({
                where: { email },
                data: {
                    reset_password_token: resetToken,
                    reset_password_expiration: new Date(Date.now() + 3600000),
                }, // 1 hour expiration
            });
            yield (0, email_1.sendEmail)(email, 'Reset your password', `Your reset token is ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`);
        });
    }
    static resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield database_1.prismaClient.user.findUnique({
                where: { id: payload.id },
            });
            if (!user ||
                user.reset_password_token !== token ||
                user.reset_password_expiration < new Date()) {
                throw new response_error_1.ResponseError(400, 'Invalid or expired reset token');
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield database_1.prismaClient.user.update({
                where: { id: payload.id },
                data: {
                    password: hashedPassword,
                    reset_password_token: null,
                    reset_password_expiration: null,
                },
            });
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            if (updateRequest.newPassword) {
                // Validate old password if provided
                if (updateRequest.password) {
                    const isOldPasswordValid = yield bcrypt_1.default.compare(updateRequest.password, user.password);
                    if (!isOldPasswordValid) {
                        throw new response_error_1.ResponseError(401, 'Old password is incorrect');
                    }
                }
                else {
                    throw new response_error_1.ResponseError(400, 'Old password is required to change the password');
                }
                user.password = yield bcrypt_1.default.hash(updateRequest.newPassword, 10);
            }
            if (updateRequest.name) {
                user.name = updateRequest.name;
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email,
                },
                data: user,
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
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
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
}
exports.UserService = UserService;
