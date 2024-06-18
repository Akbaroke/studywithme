import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

export default apiRouter;
