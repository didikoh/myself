# Portfolio Chatbot Backend

TypeScript backend using Gemini 2.5 Flash for portfolio website chatbot.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key
```

## Development

Run locally with Vercel CLI:
```bash
npm run dev
```

## Deployment to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `GEMINI_API_KEY` environment variable
   - Redeploy

## API Usage

**Endpoint:** `POST /api/portfolio-bot`

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

Edit the following in `api/portfolio-bot.ts`:
- `systemPrompt`: Modify the AI assistant's behavior
- `resumeContext`: Add your actual resume/portfolio information
- CORS settings: Update `Access-Control-Allow-Origin` for your specific domain

## Notes

- The function uses Gemini 2.5 Flash model (`gemini-2.0-flash-exp`)
- CORS is configured to allow requests from any origin (modify for production)
- API key is read from environment variables for security
