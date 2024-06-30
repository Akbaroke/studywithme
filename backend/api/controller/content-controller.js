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
exports.ContentController = void 0;
const content_service_1 = require("../service/content-service");
const content_validation_1 = require("../validation/content-validation");
class ContentController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = content_validation_1.ContentValidation.CREATE.parse(req.body); // Cast to ValidatedContentData
                const userId = req.user.id;
                yield content_service_1.ContentService.create(request, userId);
                res.status(201).json({ message: 'Konten berhasil ditambahkan' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contents = yield content_service_1.ContentService.getAll();
                res.status(200).json({ data: contents });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getFreeContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contents = yield content_service_1.ContentService.getFreeContent();
                res.status(200).json({ data: contents });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getMostClickedContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contents = yield content_service_1.ContentService.getMostClickedContent();
                res.status(200).json({ data: contents });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static clickedContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield content_service_1.ContentService.clickedContent(id);
                res.status(200).json({ message: 'Klik Konten berhasil diperbarui' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const content = yield content_service_1.ContentService.getById(id);
                res.status(200).json({ data: content });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const request = content_validation_1.ContentValidation.UPDATE.parse(req.body); // Cast to ValidatedContentData
                const userId = req.user.id;
                yield content_service_1.ContentService.update(id, request, userId);
                res.status(200).json({ message: 'Konten berhasil diperbarui' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield content_service_1.ContentService.delete(id);
                res.status(200).json({ message: 'Konten berhasil dihapus' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ContentController = ContentController;
