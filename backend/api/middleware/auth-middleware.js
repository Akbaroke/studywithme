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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new response_error_1.ResponseError(401, 'Unauthorized');
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new response_error_1.ResponseError(401, 'Unauthorized');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield database_1.prismaClient.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!user) {
            throw new response_error_1.ResponseError(401, 'Unauthorized');
        }
        if (user.is_banned) {
            throw new response_error_1.ResponseError(403, 'User is banned');
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error) {
            res
                .status(error.statusCode || 401)
                .json({
                errors: error.message,
            })
                .end();
        }
        else {
            res.status(401).json({
                errors: 'Unauthorized',
            }).end();
        }
    }
});
exports.authMiddleware = authMiddleware;
