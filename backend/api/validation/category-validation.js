"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
class CategoryValidation {
}
exports.CategoryValidation = CategoryValidation;
CategoryValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
});
CategoryValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
});
