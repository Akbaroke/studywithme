"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHistoryQuestionValidation = exports.HistoryQuestionValidation = void 0;
const z = __importStar(require("zod"));
exports.HistoryQuestionValidation = z.object({
    id_detail_content: z.string().nonempty('Id Detail Content is required'),
    result_score: z
        .number()
        .min(0, 'Result score must be greater than or equal to 0')
        .optional(),
    target_score: z
        .number()
        .min(0, 'Target score must be greater than or equal to 0')
        .optional(),
});
exports.UpdateHistoryQuestionValidation = exports.HistoryQuestionValidation.partial();
