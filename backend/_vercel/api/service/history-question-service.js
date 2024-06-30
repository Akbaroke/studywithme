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
exports.HistoryQuestionService = void 0;
const database_1 = require("../application/database");
const history_question_validation_1 = require("../validation/history-question-validation");
class HistoryQuestionService {
    static create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = history_question_validation_1.HistoryQuestionValidation.parse(data);
            if (!validatedData.id_detail_content) {
                throw new Error('id_detail_content is required');
            }
            const historyQuestion = yield database_1.prismaClient.historyQuestion.create({
                data: {
                    id_user: userId,
                    id_detail_content: validatedData.id_detail_content,
                    result_score: validatedData.result_score,
                    target_score: validatedData.target_score,
                },
            });
            return historyQuestion;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.historyQuestion.findMany({
                include: {
                    detailContent: true,
                },
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.historyQuestion.findUnique({
                where: { id },
                include: {
                    detailContent: true,
                },
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = history_question_validation_1.UpdateHistoryQuestionValidation.parse(data);
            if (!validatedData.id_detail_content) {
                throw new Error('id_detail_content is required');
            }
            return database_1.prismaClient.historyQuestion.update({
                where: { id },
                data: {
                    id_detail_content: validatedData.id_detail_content,
                    result_score: validatedData.result_score,
                    target_score: validatedData.target_score,
                },
                include: {
                    detailContent: true,
                },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.historyQuestion.delete({
                where: { id },
            });
        });
    }
}
exports.HistoryQuestionService = HistoryQuestionService;
