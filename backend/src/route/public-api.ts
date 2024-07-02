import express from 'express';
import { UserController } from '../controller/user-controller';
import { CategoryController } from '../controller/category-controller';
import { ContentController } from '../controller/content-controller';
import { DiscussionController } from '../controller/discussion-controller';

export const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server up and running',
    version: '1.0.0',
    status: 200,
    route: '/api',
  });
});

// USER ROUTES
publicRouter.post('/api/users', UserController.register);
publicRouter.post('/api/users/login', UserController.login);
publicRouter.post('/api/users/verify-otp', UserController.verifyOTP);
publicRouter.post('/api/users/resend-otp', UserController.resendOTP);
publicRouter.post('/api/users/forgot-password', UserController.forgotPassword);
publicRouter.post('/api/users/reset-password', UserController.resetPassword);

publicRouter.get('/api/categories', CategoryController.getAll);
publicRouter.get('/api/categories/:id', CategoryController.getById);

publicRouter.patch('/api/contents/klik/:id', ContentController.clickedContent);
publicRouter.get('/api/contents', ContentController.getAll);
publicRouter.get('/api/contents/free', ContentController.getFreeContent);
publicRouter.get(
  '/api/contents/most-click',
  ContentController.getMostClickedContent
);
publicRouter.get('/api/contents/new', ContentController.getNewContent);

publicRouter.get('/api/discussions', DiscussionController.getAll);