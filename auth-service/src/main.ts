import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './database/mongodb';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(cors());

//Db connetion
const url = process.env.MOGODB_URL || '';

const serverStart = async () => {
  //establish db connection
  await connectDB(url);

  // root
  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  // health
  app.get('/api/auth/health', (req, res) => {
    res.json({
      status: 'ok',
      db:
        mongoose.connection.readyState === 1
          ? 'Conneted successsfully'
          : 'connection failed',
      service: 'auth-service',
      uptime: process.uptime(),
    });
  });

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
};

serverStart();
