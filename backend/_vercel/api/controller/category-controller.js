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
exports.CategoryController = void 0;
const category_service_1 = require("../service/category-service");
class CategoryController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield category_service_1.CategoryService.create(req.body, req.user.id);
                res.status(201).json({ message: 'Kategori berhasil ditambahkan' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_service_1.CategoryService.getAll();
                res.status(200).json({ data: categories });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_service_1.CategoryService.getById(req.params.id);
                if (!category) {
                    return res.status(404).json({ error: 'Category not found' });
                }
                res.status(200).json({ data: category });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield category_service_1.CategoryService.update(req.params.id, req.body, req.user.id);
                res.status(200).json({ message: 'Kategori berhasil diperbarui' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield category_service_1.CategoryService.delete(req.params.id);
                res.status(200).json({
                    message: 'Kategori berhasil dihapus',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
