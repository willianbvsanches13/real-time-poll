import express, { Express, json } from 'express';
import { cors } from '@/main/middlewares/cors';
import { createContext, softDeleteMiddleware } from '@/infra';
import setupRoutes from '@/main/config/routes';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  app.set('trust proxy', true);
  app.use(json());
  app.use(cors);
  const prismaContext = createContext();
  softDeleteMiddleware(prismaContext);
  setupRoutes(app, prismaContext)
  return app;
}
