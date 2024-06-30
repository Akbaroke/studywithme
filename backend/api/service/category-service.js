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
exports.CategoryService = void 0;
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const category_validation_1 = require("../validation/category-validation");
class CategoryService {
    static create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(category_validation_1.CategoryValidation.CREATE, data);
            return yield database_1.prismaClient.category.create({
                data: Object.assign(Object.assign({}, validatedData), { created_by: userId, updated_by: userId }),
            });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.category.findMany({
                orderBy: {
                    updated_at: 'desc',
                },
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prismaClient.category.findUnique({ where: { id } });
        });
    }
    static update(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(category_validation_1.CategoryValidation.UPDATE, data);
            return yield database_1.prismaClient.category.update({
                where: { id },
                data: Object.assign(Object.assign({}, validatedData), { updated_by: userId }),
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.category.delete({ where: { id } });
        });
    }
}
exports.CategoryService = CategoryService;
