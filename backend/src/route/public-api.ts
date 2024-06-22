import express from 'express';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';

export const publicRouter = express.Router();

// USER ROUTES
publicRouter.post('/api/users', UserController.register);
publicRouter.post('/api/users/login', UserController.login);
publicRouter.post('/api/users/verify-otp', UserController.verifyOTP);
publicRouter.post('/api/users/resend-otp', UserController.resendOTP);
publicRouter.post('/api/users/forgot-password', UserController.forgotPassword);
publicRouter.post('/api/users/reset-password', UserController.resetPassword);

publicRouter.get('/api/categories', CategoryController.getAll);
publicRouter.get('/api/categories/:id', CategoryController.getById);
