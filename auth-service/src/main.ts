import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './database/mongodb';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { redis } from './database/redis';
import { setupRoutes } from './routes';

dotenv.config();
const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Db connetion
const url = process.env.MOGODB_URL || '';

//routes
setupRoutes(app);

const serverStart = async () => {
  //establish db connection
  await connectDB(url);
  // 🔥 Test Redis connection
  const pong = await redis.ping();
  console.log('Redis connection:', pong === 'PONG' ? 'OK' : 'FAILED');

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
    console.log(`auth-service ready and running at http://${host}:${port}`);
  });
};

serverStart();
