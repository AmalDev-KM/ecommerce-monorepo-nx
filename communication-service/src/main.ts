import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { communicationRoutes } from './routes';

dotenv.config();

const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.PORT) || 4000;

const app = express();

app.use(cors());
app.use(express.json());

//communication routes
communicationRoutes(app);



// Health Check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'communication-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});


app.listen(port, host, () => {
  console.log(
    `Communication-service ready and running at http://${host}:${port}`
  );
});
