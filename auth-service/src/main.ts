import express from 'express';
import cors from 'cors';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(cors());

// root
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// health
app.get('/api/auth/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service',
    uptime: process.uptime()
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
