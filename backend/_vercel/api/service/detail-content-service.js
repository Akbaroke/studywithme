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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailContentService = void 0;
const detail_content_validation_1 = require("../validation/detail-content-validation");
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const user_model_1 = require("../model/user-model");
class DetailContentService {
    static create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(detail_content_validation_1.DetailContentValidation.CREATE, data);
            // Extract questions from validatedData
            const { questions } = validatedData, dataWithoutQuestions = __rest(validatedData, ["questions"]);
            // Create content without questions
            const createdContent = yield database_1.prismaClient.detailContent.create({
                data: Object.assign(Object.assign({}, dataWithoutQuestions), { created_by: userId, updated_by: userId }),
            });
            // Connect questions to the created content
            if (questions && questions.length > 0) {
                yield database_1.prismaClient.detailContentQuestion.createMany({
                    data: questions.map((question) => ({
                        id_detail_content: createdContent.id,
                        id_question: question.id_question,
                        score: question.score,
                    })),
                });
            }
            return createdContent;
        });
    }
    static getAllByContentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.detailContent.findMany({
                where: {
                    id_content: id,
                },
                orderBy: {
                    updated_at: 'desc',
                },
            });
        });
    }
    static getById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = yield database_1.prismaClient.detailContent.findUnique({
                where: { id },
                include: {
                    questions: {
                        include: {
                            question: {
                                include: {
                                    options: true,
                                },
                            },
                        },
                    },
                    historyQuestion: {
                        where: {
                            id_user: userId,
                        },
                    },
                    discussionDetailContentId: {
                        include: {
                            replies: {
                                include: {
                                    user: true,
                                },
                                orderBy: {
                                    created_at: 'asc',
                                },
                            },
                            user: true,
                            parentDiscussion: true,
                        },
                    },
                },
            });
            return Object.assign(Object.assign({}, query), { questions: (_a = query === null || query === void 0 ? void 0 : query.questions) === null || _a === void 0 ? void 0 : _a.map((question) => ({
                    id_question: question.question.id,
                    score: question.score,
                    question: question.question.question,
                    created_at: question.question.created_at,
                    updated_at: question.question.updated_at,
                    options: question.question.options.map((option) => ({
                        id: option.id,
                        option: option.option,
                        is_answer: option.is_answer,
                    })),
                })), discussionDetailContentId: null, historyQuestion: query === null || query === void 0 ? void 0 : query.historyQuestion[0], discussions: query === null || query === void 0 ? void 0 : query.discussionDetailContentId.filter((discussion) => !discussion.parentDiscussion).map((discussion) => (Object.assign(Object.assign({}, discussion), { replies: discussion.replies.map((reply) => (Object.assign(Object.assign({}, reply), { user: (0, user_model_1.toUserResponse)(reply.user) }))), user: (0, user_model_1.toUserResponse)(discussion.user) }))) });
        });
    }
    static update(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(detail_content_validation_1.DetailContentValidation.UPDATE, data);
            // Extract questions from validatedData
            const { questions } = validatedData, dataWithoutQuestions = __rest(validatedData, ["questions"]);
            // Prepare set object for updating content
            const setContent = questions
                ? Object.assign(Object.assign({}, dataWithoutQuestions), { duration: 0, video_url: null, updated_by: userId }) : Object.assign(Object.assign({}, dataWithoutQuestions), { updated_by: userId });
            if (questions) {
                // Delete all existing questions for this content
                yield database_1.prismaClient.detailContentQuestion.deleteMany({
                    where: {
                        id_detail_content: id,
                    },
                });
                // Add new questions to the content
                const questionsIds = questions === null || questions === void 0 ? void 0 : questions.map((questions) => ({
                    id_detail_content: id,
                    id_question: questions.id_question,
                    score: questions.score,
                }));
                // Create new content questions
                yield database_1.prismaClient.detailContentQuestion.createMany({
                    data: questionsIds,
                });
            }
            else {
                yield database_1.prismaClient.detailContentQuestion.deleteMany({
                    where: {
                        id_detail_content: id,
                    },
                });
                yield database_1.prismaClient.historyQuestion.deleteMany({
                    where: {
                        id_detail_content: id,
                    },
                });
            }
            return database_1.prismaClient.detailContent.update({
                where: { id },
                data: Object.assign({}, setContent),
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the detail content exists
            const existingDetailContent = yield database_1.prismaClient.detailContent.findUnique({
                where: {
                    id: id,
                },
            });
            if (!existingDetailContent) {
                throw new Error(`Detail Content with id ${id} not found.`);
            }
            yield database_1.prismaClient.detailContent.delete({
                where: { id },
            });
        });
    }
}
exports.DetailContentService = DetailContentService;
