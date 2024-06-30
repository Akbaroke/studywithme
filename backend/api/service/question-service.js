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
exports.QuestionService = void 0;
const database_1 = require("../application/database");
class QuestionService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { question, score, options } = data;
            return database_1.prismaClient.question.create({
                data: {
                    question,
                    options: {
                        create: options,
                    },
                },
                include: {
                    options: true,
                },
            });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.question.findMany({
                include: {
                    options: true,
                },
                orderBy: {
                    updated_at: 'desc',
                },
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.question.findUnique({
                where: { id },
                include: {
                    options: true,
                },
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { question, score, options } = data;
            yield database_1.prismaClient.option.deleteMany({
                where: { id_question: id },
            });
            return database_1.prismaClient.question.update({
                where: { id },
                data: {
                    question,
                    options: {
                        create: options,
                    },
                },
                include: {
                    options: true,
                },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.option.deleteMany({
                    where: { id_question: id },
                });
                yield prisma.question.delete({
                    where: { id },
                });
            }));
        });
    }
}
exports.QuestionService = QuestionService;
