import { Router } from 'express';
import { handleChat } from '../controllers/chatController.js';

export const chatRouter = Router();

chatRouter.post('/chat', handleChat);
