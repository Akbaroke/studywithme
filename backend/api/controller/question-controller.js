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
exports.QuestionController = void 0;
const question_service_1 = require("../service/question-service");
const question_validation_1 = require("../validation/question-validation");
class QuestionController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = question_validation_1.QuestionSchema.parse(req.body);
                const question = yield question_service_1.QuestionService.create(validatedData);
                res.status(201).json({ data: question, message: 'Soal berhasil dibuat' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield question_service_1.QuestionService.getAll();
                res.status(200).json({ data: questions });
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
                const question = yield question_service_1.QuestionService.getById(id);
                res.status(200).json({ data: question });
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
                const validatedData = question_validation_1.UpdateQuestionSchema.parse(req.body);
                const question = yield question_service_1.QuestionService.update(id, validatedData);
                res
                    .status(200)
                    .json({ data: question, message: 'Soal berhasil diperbarui' });
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
                yield question_service_1.QuestionService.delete(id);
                res.status(200).json({ message: 'Soal berhasil dihapus' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.QuestionController = QuestionController;
