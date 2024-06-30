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
exports.DiscussionService = void 0;
const database_1 = require("../application/database");
class DiscussionService {
    static create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield database_1.prismaClient.discussion.create({
                data: {
                    message: data.message,
                    id_user: userId,
                    id_detail_content: data.id_detail_content,
                    id_replies_discussion: data.id_replies_discussion,
                },
            });
            return discussion;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.discussion.findMany({
                include: {
                    user: true,
                    detailContent: true,
                    parentDiscussion: true,
                    replies: true,
                },
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.discussion.findUnique({
                where: { id },
                include: {
                    user: true,
                    detailContent: true,
                    parentDiscussion: true,
                    replies: true,
                },
            });
        });
    }
    static update(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prismaClient.discussion.update({
                where: { id },
                data: {
                    message: data.message,
                    id_user: userId,
                    id_detail_content: data.id_detail_content,
                    id_replies_discussion: data.id_replies_discussion,
                },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.discussion.delete({
                where: { id },
            });
        });
    }
}
exports.DiscussionService = DiscussionService;
