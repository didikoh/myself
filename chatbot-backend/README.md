# NestJS Chatbot Backend

A portfolio chatbot backend built with NestJS framework and Google's Gemini AI.

## Features

- 🤖 AI-powered chat using Google Gemini 2.0 Flash
- 🚀 Built with NestJS framework
- 🔒 Environment-based configuration
- 🌐 CORS enabled for frontend integration
- 📝 TypeScript support
- ✅ Input validation with DTOs

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

## Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/` - Root health check
- **GET** `/api/chat/health` - Chat service health check

### Chat
- **POST** `/api/chat` - Send a message to the chatbot

Request body:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, tell me about your skills"
    }
  ]
}
```

Response:
```json
{
  "reply": "I'd be happy to help you learn about the portfolio owner's skills..."
}
```

## Project Structure

```
src/
├── chat/
│   ├── dto/
│   │   ├── chat-request.dto.ts
│   │   ├── chat-response.dto.ts
│   │   └── index.ts
│   ├── chat.controller.ts
│   ├── chat.service.ts
│   └── chat.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Configuration

### Customizing Portfolio Information

Edit the `resumeContext` in `src/chat/chat.service.ts` to customize the portfolio information that the AI assistant will use:

```typescript
private readonly resumeContext = `
Portfolio Owner Information:
- Name: Your Name
- Role: Your Role
- Skills: Your Skills
- Experience: Your Experience
- Projects: Your Projects
- Education: Your Education
- Contact: Your Contact Info
`;
```

### CORS Configuration

For production, update the CORS configuration in `src/main.ts`:

```typescript
app.enableCors({
  origin: 'https://yourdomain.com', // Replace with your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
});
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

### Build for production
```bash
npm run build
```

The compiled files will be in the `dist/` directory.

## Technologies Used

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Google Gemini AI](https://ai.google.dev/) - AI model for chat functionality
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Express](https://expressjs.com/) - Web framework (via NestJS)

## License

This project is licensed under the UNLICENSED license.
