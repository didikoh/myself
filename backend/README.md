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

Run the retrieval tests:

```bash
npm test
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
  "reply": "I have skills in TypeScript, React, Node.js...",
  "contextInfo": {
    "dataUpdatedAt": "2026-07-28",
    "retrievedSections": ["skills-2024-2025"]
  }
}
```

## Customization

Portfolio facts are stored as small, searchable records in
`src/data/portfolioKnowledge.ts`. Update those records and
`portfolioDataUpdatedAt` when the public portfolio changes.

`src/retrieval/contextRetriever.ts` ranks the current question and recent turns,
then sends at most five relevant records to Gemini. The full portfolio is no
longer included in every prompt. Retrieval limits can be adjusted through
`RetrievalOptions`.

Edit `systemPrompt` in `src/controllers/chatController.ts` to change assistant
behaviour. You can also set `GEMINI_MODEL` to override the default
`gemini-2.5-flash` model without changing source code.

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
│   ├── data/
│   │   └── portfolioKnowledge.ts # Dated portfolio knowledge records
│   ├── retrieval/
│   │   └── contextRetriever.ts  # On-demand context selection
│   ├── routes/
│   │   └── chat.ts             # Chat routes
│   └── controllers/
│       └── chatController.ts   # Chat logic & Gemini integration
├── package.json
├── tsconfig.json
└── .env
```

## Notes

- Uses Gemini 2.5 Flash by default
- CORS is configured to allow all origins (restrict this in production)
- API key is read from `GEMINI_API_KEY`
- Chat history is capped at 12 prior messages and each message at 4,000 characters
