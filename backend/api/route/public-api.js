"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const category_controller_1 = require("../controller/category-controller");
const content_controller_1 = require("../controller/content-controller");
const discussion_controller_1 = require("../controller/discussion-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server up and running',
        version: '1.0.0',
        status: 200,
        route: '/api',
    });
});
// USER ROUTES
exports.publicRouter.post('/api/users', user_controller_1.UserController.register);
exports.publicRouter.post('/api/users/login', user_controller_1.UserController.login);
exports.publicRouter.post('/api/users/verify-otp', user_controller_1.UserController.verifyOTP);
exports.publicRouter.post('/api/users/resend-otp', user_controller_1.UserController.resendOTP);
exports.publicRouter.post('/api/users/forgot-password', user_controller_1.UserController.forgotPassword);
exports.publicRouter.post('/api/users/reset-password', user_controller_1.UserController.resetPassword);
exports.publicRouter.get('/api/categories', category_controller_1.CategoryController.getAll);
exports.publicRouter.get('/api/categories/:id', category_controller_1.CategoryController.getById);
exports.publicRouter.patch('/api/contents/klik/:id', content_controller_1.ContentController.clickedContent);
exports.publicRouter.get('/api/contents', content_controller_1.ContentController.getAll);
exports.publicRouter.get('/api/contents/free', content_controller_1.ContentController.getFreeContent);
exports.publicRouter.get('/api/contents/most-click', content_controller_1.ContentController.getMostClickedContent);
exports.publicRouter.get('/api/discussions', discussion_controller_1.DiscussionController.getAll);
