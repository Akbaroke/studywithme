"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionValidation = void 0;
const zod_1 = require("zod");
exports.DiscussionValidation = zod_1.z.object({
    message: zod_1.z.string().min(1).max(5000).optional(),
    id_detail_content: zod_1.z.string(),
    id_replies_discussion: zod_1.z.string().optional(),
});
