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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.register(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const { user, token } = yield user_service_1.UserService.login(request);
                res.status(200).json({
                    data: user,
                    token,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                yield user_service_1.UserService.verifyOTP(email, otp);
                res.status(200).json({
                    message: 'Email verified successfully',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield user_service_1.UserService.resendOTP(email);
                res.status(200).json({
                    message: 'OTP resent successfully',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield user_service_1.UserService.forgotPassword(email);
                res.status(200).json({
                    message: 'Password reset email sent',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                yield user_service_1.UserService.resetPassword(token, newPassword);
                res.status(200).json({
                    message: 'Password reset successfully',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.get(req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.update(req.user, request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_service_1.UserService.logout(req.user);
                res.status(200).json({
                    data: 'OK',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                const decoded = user_service_1.UserService.verifyToken(token);
                req.user = decoded;
                next();
            }
            catch (e) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
}
exports.UserController = UserController;
