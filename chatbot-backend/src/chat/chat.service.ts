import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ChatRequestDto, ChatResponseDto } from './dto';

@Injectable()
export class ChatService {
  private genAI: GoogleGenAI;
  private readonly systemPrompt = `You are a helpful AI assistant for a portfolio website. 
You help visitors learn about the portfolio owner's skills, projects, and experience.
Be friendly, professional, and concise in your responses.`;

  private readonly resumeContext = `
Portfolio Owner Information:
- Name: KOH WEI ZHEN
- Role: Full-stack Developer
- Skills: TypeScript, React, Node.js, Python
- Experience: [Add your experience details]
- Projects: [Add your project details]
- Education: [Add your education details]
- Contact: [Add your contact information]

Please customize this section with actual portfolio information.
`;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async processChat(chatRequest: ChatRequestDto): Promise<ChatResponseDto> {
    try {
      const { messages } = chatRequest;

      if (!messages || !Array.isArray(messages)) {
        throw new BadRequestException('Invalid request: messages array required');
      }

      // Build the conversation history with system prompt and context
      const conversationHistory: any[] = [
        { role: 'user', parts: [{ text: this.systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. I will assist visitors with information about the portfolio.' }] },
        { role: 'user', parts: [{ text: `Here is the context about the portfolio owner:\n${this.resumeContext}` }] },
        { role: 'model', parts: [{ text: 'I have noted the portfolio information and will use it to answer questions.' }] },
      ];

      // Add user messages to conversation history
      for (const msg of messages) {
        const role = msg.role === 'user' ? 'user' : 'model';
        conversationHistory.push({
          role,
          parts: [{ text: msg.content }],
        });
      }

      // Get the last user message
      const lastUserMessage = messages[messages.length - 1];
      if (!lastUserMessage || lastUserMessage.role !== 'user') {
        throw new BadRequestException('Last message must be from user');
      }

      // Use the models.generateContent API with chat history
      const result = await this.genAI.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: conversationHistory,
        config: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      const reply = result.text || 'No response generated';

      return { reply };
    } catch (error) {
      console.error('Error processing chat request:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
}
