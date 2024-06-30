"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentValidation = void 0;
const zod_1 = require("zod");
class ContentValidation {
}
exports.ContentValidation = ContentValidation;
ContentValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(255).optional(),
    thumbnail: zod_1.z.string().max(255).optional(),
    is_premium: zod_1.z.boolean(),
    total_klik: zod_1.z.number().int().positive().optional(),
    categories: zod_1.z.array(zod_1.z.string()),
});
ContentValidation.UPDATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().max(255).optional(),
    thumbnail: zod_1.z.string().max(255).optional(),
    is_premium: zod_1.z.boolean().optional(),
    total_klik: zod_1.z.number().int().positive().optional(),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
});
