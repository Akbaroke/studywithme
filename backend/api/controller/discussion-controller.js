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
exports.DiscussionController = void 0;
const discussion_service_1 = require("../service/discussion-service");
const discussion_validation_1 = require("../validation/discussion-validation");
class DiscussionController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = discussion_validation_1.DiscussionValidation.parse(req.body);
                const userId = req.user.id;
                const discussion = yield discussion_service_1.DiscussionService.create(validatedData, userId);
                res
                    .status(201)
                    .json({ data: discussion, message: 'Diskusi berhasil dibuat' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discussions = yield discussion_service_1.DiscussionService.getAll();
                res.status(200).json({ data: discussions });
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
                const discussion = yield discussion_service_1.DiscussionService.getById(id);
                res.status(200).json({ data: discussion });
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
                const validatedData = discussion_validation_1.DiscussionValidation.parse(req.body);
                const userId = req.user.id;
                const discussion = yield discussion_service_1.DiscussionService.update(id, validatedData, userId);
                res
                    .status(200)
                    .json({ data: discussion, message: 'Diskusi berhasil diperbarui' });
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
                yield discussion_service_1.DiscussionService.delete(id);
                res.status(200).json({ message: 'Diskusi berhasil dihapus' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DiscussionController = DiscussionController;
