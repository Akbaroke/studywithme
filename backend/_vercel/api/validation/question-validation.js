"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionSchema = exports.QuestionSchema = exports.OptionSchema = void 0;
const zod_1 = require("zod");
exports.OptionSchema = zod_1.z.object({
    option: zod_1.z.string().min(1),
    is_answer: zod_1.z.boolean().optional(),
});
exports.QuestionSchema = zod_1.z.object({
    question: zod_1.z.string().min(1),
    score: zod_1.z.number().int().positive().optional(),
    options: zod_1.z.array(exports.OptionSchema),
});
exports.UpdateQuestionSchema = zod_1.z.object({
    question: zod_1.z.string().min(1).optional(),
    score: zod_1.z.number().int().positive().optional(),
    options: zod_1.z.array(exports.OptionSchema).optional(),
});
