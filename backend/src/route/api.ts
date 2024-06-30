import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { roleMiddleware } from '../middleware/role-middleware';
import { Role } from '@prisma/client';
import { CategoryController } from '../controller/category-controller';
import { ContentController } from '../controller/content-controller';
import { DetailContentController } from '../controller/detail-content-controller';
import { QuestionController } from '../controller/question-controller';
import { HistoryQuestionController } from '../controller/history-question-controller';
import { DiscussionController } from '../controller/discussion-controller';
import { ManageUserController } from '../controller/manage-user-controller';

const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

apiRouter.post(
  '/api/categories',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  CategoryController.create
);
apiRouter.patch(
  '/api/categories/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  CategoryController.update
);
apiRouter.delete(
  '/api/categories/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  CategoryController.delete
);

apiRouter.post(
  '/api/contents',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  ContentController.create
);
apiRouter.get('/api/contents/:id', ContentController.getById);
apiRouter.patch(
  '/api/contents/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  ContentController.update
);
apiRouter.delete(
  '/api/contents/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  ContentController.delete
);

apiRouter.post('/api/detail-contents', DetailContentController.create);
apiRouter.get(
  '/api/contents/detail-contents/:id',
  DetailContentController.getAllByContentId
);
apiRouter.get('/api/detail-contents/:id', DetailContentController.getById);
apiRouter.patch('/api/detail-contents/:id', DetailContentController.update);
apiRouter.delete('/api/detail-contents/:id', DetailContentController.delete);

apiRouter.post(
  '/api/questions',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  QuestionController.create
);
apiRouter.get('/api/questions', QuestionController.getAll);
apiRouter.get('/api/questions/:id', QuestionController.getById);
apiRouter.patch(
  '/api/questions/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  QuestionController.update
);
apiRouter.delete(
  '/api/questions/:id',
  roleMiddleware([Role.ADMIN, Role.TEACHER]),
  QuestionController.delete
);

apiRouter.post('/api/history-question', HistoryQuestionController.create);
apiRouter.get('/api/history-question', HistoryQuestionController.getAll);
apiRouter.get('/api/history-question/:id', HistoryQuestionController.getById);
apiRouter.put('/api/history-question/:id', HistoryQuestionController.update);
apiRouter.delete('/api/history-question/:id', HistoryQuestionController.delete);

apiRouter.post('/api/discussions', DiscussionController.create);
apiRouter.get('/api/discussions/:id', DiscussionController.getById);
apiRouter.put('/api/discussions/:id', DiscussionController.update);
apiRouter.delete('/api/discussions/:id', DiscussionController.delete);

apiRouter.patch(
  '/api/manage-users/:id',
  roleMiddleware([Role.ADMIN]),
  ManageUserController.updateUser
);
apiRouter.get(
  '/api/manage-users',
  roleMiddleware([Role.ADMIN]),
  ManageUserController.getAllUsers
);
apiRouter.get(
  '/api/manage-users/:id',
  roleMiddleware([Role.ADMIN]),
  ManageUserController.getUserById
);

export default apiRouter;
