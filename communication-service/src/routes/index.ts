import { Express } from 'express';
import { emailRoutes } from './email.routes';

export const communicationRoutes = (app: Express) => {
  app.use('/api/email', emailRoutes);
};
