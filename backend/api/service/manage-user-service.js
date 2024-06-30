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
exports.ManageUserService = void 0;
const database_1 = require("../application/database");
class ManageUserService {
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.user.update({
                where: { id },
                data,
            });
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.prismaClient.user.findMany();
            return users.map((value) => ({
                id: value.id,
                email: value.email,
                name: value.name,
                avatar: value.avatar,
                is_verified: value.is_verified,
                is_premium: value.is_premium,
                is_banned: value.is_banned,
                pemium_start_at: value.pemium_start_at,
                pemium_expired_at: value.pemium_expired_at,
                role: value.role,
                created_at: value.created_at,
                updated_at: value.updated_at,
            }));
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.user.findUnique({
                where: { id },
            });
        });
    }
}
exports.ManageUserService = ManageUserService;
