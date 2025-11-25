import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // 可以修改为你的 github.io 域名
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api', chatRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio chatbot API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
