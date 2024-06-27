import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { CategoryController } from '../controller/category-controller';
import { ContentController } from '../controller/content-controller';
import { DetailContentController } from '../controller/detail-content-controller';
import { QuestionController } from '../controller/question-controller';

const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

apiRouter.post('/api/categories', CategoryController.create);
apiRouter.patch('/api/categories/:id', CategoryController.update);
apiRouter.delete('/api/categories/:id', CategoryController.delete);

apiRouter.post('/api/contents', ContentController.create);
apiRouter.get('/api/contents/:id', ContentController.getById);
apiRouter.patch('/api/contents/:id', ContentController.update);
apiRouter.delete('/api/contents/:id', ContentController.delete);

apiRouter.post('/api/detail-contents', DetailContentController.create);
apiRouter.get(
  '/api/contents/detail-contents/:id',
  DetailContentController.getAllByContentId
);
apiRouter.get('/api/detail-contents/:id', DetailContentController.getById);
apiRouter.patch('/api/detail-contents/:id', DetailContentController.update);
apiRouter.delete('/api/detail-contents/:id', DetailContentController.delete);

apiRouter.post('/api/questions', QuestionController.create);
apiRouter.get('/api/questions', QuestionController.getAll);
apiRouter.get('/api/questions/:id', QuestionController.getById);
apiRouter.patch('/api/questions/:id', QuestionController.update);
apiRouter.delete('/api/questions/:id', QuestionController.delete);

export default apiRouter;
