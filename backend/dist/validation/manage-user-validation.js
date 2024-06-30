"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageUserValidation = void 0;
const zod_1 = require("zod");
exports.ManageUserValidation = zod_1.z.object({
    is_banned: zod_1.z.boolean().optional(),
    role: zod_1.z.enum(['ADMIN', 'STUDENT', 'TEACHER']).optional(),
    name: zod_1.z.string().min(1).max(255).optional(),
});
