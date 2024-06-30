"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
function toUserResponse(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        is_verified: user.is_verified,
        is_email_verification: user.is_email_verification,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
}
exports.toUserResponse = toUserResponse;
