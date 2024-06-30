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
exports.ManageUserController = void 0;
const manage_user_service_1 = require("../service/manage-user-service");
const manage_user_validation_1 = require("../validation/manage-user-validation");
class ManageUserController {
    static updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const request = manage_user_validation_1.ManageUserValidation.parse(req.body);
                const updatedUser = yield manage_user_service_1.ManageUserService.updateUser(id, request);
                res
                    .status(200)
                    .json({ message: 'User berhasil diperbarui', data: updatedUser });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield manage_user_service_1.ManageUserService.getAllUsers();
                res
                    .status(200)
                    .json({ message: 'Daftar pengguna berhasil diambil', data: users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield manage_user_service_1.ManageUserService.getUserById(id);
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: 'Daftar pengguna tidak ditemukan' });
                }
                res.status(200).json({ data: user });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ManageUserController = ManageUserController;
