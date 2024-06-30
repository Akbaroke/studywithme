"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const response_error_1 = require("../error/response-error");
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new response_error_1.ResponseError(401, 'Unauthorized');
            }
            if (!roles.includes(req.user.role)) {
                throw new response_error_1.ResponseError(403, 'Forbidden');
            }
            next();
        }
        catch (error) {
            res
                .status(error.status || 500)
                .json({
                errors: error.message,
            })
                .end();
        }
    };
};
exports.roleMiddleware = roleMiddleware;
