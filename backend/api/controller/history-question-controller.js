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
exports.HistoryQuestionController = void 0;
const history_question_service_1 = require("../service/history-question-service");
const history_question_validation_1 = require("../validation/history-question-validation");
class HistoryQuestionController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const validatedData = history_question_validation_1.HistoryQuestionValidation.parse(req.body);
                const historyQuestion = yield history_question_service_1.HistoryQuestionService.create(validatedData, userId);
                res.status(201).json({
                    data: historyQuestion,
                    message: 'History Question berhasil dibuat',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const historyQuestions = yield history_question_service_1.HistoryQuestionService.getAll();
                res.status(200).json({ data: historyQuestions });
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
                const historyQuestion = yield history_question_service_1.HistoryQuestionService.getById(id);
                res.status(200).json({ data: historyQuestion });
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
                const validatedData = history_question_validation_1.UpdateHistoryQuestionValidation.parse(req.body);
                const historyQuestion = yield history_question_service_1.HistoryQuestionService.update(id, validatedData);
                res.status(200).json({
                    data: historyQuestion,
                    message: 'History Question berhasil diperbarui',
                });
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
                yield history_question_service_1.HistoryQuestionService.delete(id);
                res.status(200).json({ message: 'History Question berhasil dihapus' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.HistoryQuestionController = HistoryQuestionController;
