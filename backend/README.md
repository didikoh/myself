# Portfolio Chatbot Backend

Express + TypeScript backend using Gemini 2.5 Flash for portfolio website chatbot.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Gemini API key and port to `.env`:
```
GEMINI_API_KEY=your_actual_api_key
PORT=3000
```

## Development

Run locally:
```bash
npm run dev
```

## Build & Production

Build the project:
```bash
npm run build
```

Run production build:
```bash
npm start
```

## API Usage

**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help you?" },
    { "role": "user", "content": "Tell me about your skills" }
  ]
}
```

**Response:**
```json
{
  "reply": "I have skills in TypeScript, React, Node.js..."
}
```

## Customization

Edit the following in `src/controllers/chatController.ts`:
- `systemPrompt`: Modify the AI assistant's behavior
- `resumeContext`: Add your actual resume/portfolio information

Edit CORS settings in `src/index.ts` to restrict origins if needed.

## Deployment to Vercel

完成开发后，直接在 Vercel 网页上：
1. 导入此 GitHub 仓库
2. 设置环境变量 `GEMINI_API_KEY`
3. Vercel 会自动检测并部署

## Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Express app entry
│   ├── routes/
│   │   └── chat.ts             # Chat routes
│   └── controllers/
│       └── chatController.ts   # Chat logic & Gemini integration
├── package.json
├── tsconfig.json
└── .env
```

## Notes

- Uses Gemini 2.0 Flash Exp model
- CORS configured to allow all origins (modify for production)
- API key read from environment variables
