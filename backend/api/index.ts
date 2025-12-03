import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from '../src/routes/chat.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Configure this for your specific domain in production
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

// Export the Express API for Vercel serverless function
export default app;
