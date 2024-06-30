"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(status = 500, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.status = status;
    }
}
exports.ResponseError = ResponseError;
