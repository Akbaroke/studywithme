import express from 'express';
import cors from 'cors';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import apiRouter from '../route/api';
import '../config/env-config';

export const web = express();
web.use(express.json());
web.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
