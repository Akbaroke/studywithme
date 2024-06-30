"use strict";
// src/controller/detail-content-controller.ts
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
exports.DetailContentController = void 0;
const detail_content_validation_1 = require("../validation/detail-content-validation");
const detail_content_service_1 = require("../service/detail-content-service");
class DetailContentController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = detail_content_validation_1.DetailContentValidation.CREATE.parse(req.body);
                const userId = req.user.id;
                yield detail_content_service_1.DetailContentService.create(request, userId);
                res.status(201).json({ message: 'Detail Konten berhasil ditambahkan' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllByContentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const detailContents = yield detail_content_service_1.DetailContentService.getAllByContentId(id);
                res.status(200).json({ data: detailContents });
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
                const userId = req.user.id;
                const detailContent = yield detail_content_service_1.DetailContentService.getById(id, userId);
                res.status(200).json({ data: detailContent });
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
                const request = detail_content_validation_1.DetailContentValidation.UPDATE.parse(req.body);
                const userId = req.user.id;
                yield detail_content_service_1.DetailContentService.update(id, request, userId);
                res.status(200).json({ message: 'Detail Konten berhasil diperbarui' });
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
                yield detail_content_service_1.DetailContentService.delete(id);
                res.status(200).json({ message: 'Detail Konten berhasil dihapus' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DetailContentController = DetailContentController;
