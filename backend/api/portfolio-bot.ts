import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface Message {
  role: string;
  content: string;
}

interface RequestBody {
  messages: Message[];
}

// System prompt - 可以根据需要修改
const systemPrompt = `You are a helpful AI assistant for a portfolio website. 
You help visitors learn about the portfolio owner's skills, projects, and experience.
Be friendly, professional, and concise in your responses.`;

// Resume context placeholder - 替换为实际的简历信息
const resumeContext = `
Portfolio Owner Information:
- Name: [Your Name]
- Role: Full-stack Developer
- Skills: TypeScript, React, Node.js, Python
- Experience: [Add your experience details]
- Projects: [Add your project details]
- Education: [Add your education details]
- Contact: [Add your contact information]

Please customize this section with actual portfolio information.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // 可以修改为具体的 github.io 域名
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Parse request body
    const { messages } = req.body as RequestBody;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build the conversation history with system prompt and context
    const conversationHistory = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I will assist visitors with information about the portfolio.' }] },
      { role: 'user', parts: [{ text: `Here is the context about the portfolio owner:\n${resumeContext}` }] },
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
      return res.status(400).json({ error: 'Last message must be from user' });
    }

    // Start chat session
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), // All messages except the last one
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send the last message and get response
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const reply = response.text();

    // Return the response
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
