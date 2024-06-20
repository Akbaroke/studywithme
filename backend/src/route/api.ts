import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { CategoryController } from '../controller/category-controller';

const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

apiRouter.post('/api/users/categories', CategoryController.create);
apiRouter.get('/api/users/categories', CategoryController.getAll);
apiRouter.get('/api/users/categories/:id', CategoryController.getById);
apiRouter.patch('/api/users/categories/:id', CategoryController.update);
apiRouter.delete('/api/users/categories/:id', CategoryController.delete);

export default apiRouter;
