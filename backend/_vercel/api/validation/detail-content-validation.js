"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailContentValidation = void 0;
const zod_1 = require("zod");
const QuestionSchema = zod_1.z.object({
    id_question: zod_1.z.string().uuid(),
    score: zod_1.z.number().int().positive().optional(),
});
class DetailContentValidation {
}
exports.DetailContentValidation = DetailContentValidation;
DetailContentValidation.CREATE = zod_1.z.object({
    id_content: zod_1.z.string().uuid(),
    serial_number: zod_1.z.number().int().positive(),
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(255).optional(),
    is_premium: zod_1.z.boolean(),
    duration: zod_1.z.number().int().positive().optional(),
    video_url: zod_1.z.string().max(255).optional(),
    questions: zod_1.z.array(QuestionSchema).optional(),
});
DetailContentValidation.UPDATE = zod_1.z.object({
    id_content: zod_1.z.string().uuid().optional(),
    serial_number: zod_1.z.number().int().positive().optional(),
    title: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().max(255).optional(),
    is_premium: zod_1.z.boolean().optional(),
    duration: zod_1.z.number().int().positive().optional(),
    video_url: zod_1.z.string().max(255).optional(),
    questions: zod_1.z.array(QuestionSchema).optional(),
});
