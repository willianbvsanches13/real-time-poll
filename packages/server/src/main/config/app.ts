import express, { Express, json } from 'express';
import { Server } from 'socket.io';
import { cors } from '@/main/middlewares/cors';
import { createContext, softDeleteMiddleware } from '@/infra';
import setupRoutes from '@/main/config/routes';
import { createServer, Server as HttpServer } from 'http';

type App = {
  app: Express;
  io: Server;
  httpServer: HttpServer;
}

export const setupApp = async (): Promise<App> => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  app.set('trust proxy', true);
  app.use(json());
  app.use(cors);
  const prismaContext = createContext();
  softDeleteMiddleware(prismaContext);
  setupRoutes(app, prismaContext, io)
  return { app, io, httpServer };
}
