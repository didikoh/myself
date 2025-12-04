# Migration from Express Backend to NestJS Backend

## Overview

All features from `backend/` have been successfully migrated to `chatbot-backend/` using the NestJS framework.

## Architecture Comparison

### Express Backend (backend/)
```
backend/
├── src/
│   ├── index.ts              # Express server setup
│   ├── controllers/
│   │   └── chatController.ts # Chat logic
│   └── routes/
│       └── chat.ts           # Route definitions
├── api/
│   └── index.ts              # Vercel serverless handler
└── package.json
```

### NestJS Backend (chatbot-backend/)
```
chatbot-backend/
├── src/
│   ├── main.ts               # NestJS bootstrap
│   ├── app.module.ts         # Root module
│   └── chat/
│       ├── chat.module.ts    # Chat module
│       ├── chat.controller.ts # Chat controller
│       ├── chat.service.ts    # Chat service (business logic)
│       └── dto/              # Data Transfer Objects
│           ├── chat-request.dto.ts
│           ├── chat-response.dto.ts
│           └── index.ts
└── package.json
```

## Key Differences

### 1. **Framework Structure**
- **Express**: Manual setup with routes, controllers, middleware
- **NestJS**: Modular architecture with decorators, dependency injection

### 2. **Dependency Injection**
- **Express**: Manual instantiation and passing of dependencies
- **NestJS**: Automatic DI through constructor injection

### 3. **Error Handling**
- **Express**: Manual try-catch with custom error responses
- **NestJS**: Built-in exception filters with `HttpException` classes

### 4. **Validation**
- **Express**: Manual validation in controller
- **NestJS**: DTOs with class-validator decorators (extensible)

### 5. **Testing**
- **Express**: Manual setup required
- **NestJS**: Built-in testing utilities with Jest

## Feature Mapping

| Feature | Express (backend/) | NestJS (chatbot-backend/) |
|---------|-------------------|---------------------------|
| Chat endpoint | `POST /api/chat` | `POST /api/chat` |
| Health check | `GET /` | `GET /` and `GET /api/chat/health` |
| CORS | Configured in index.ts | Configured in main.ts |
| Environment variables | dotenv in index.ts | dotenv in main.ts |
| Gemini AI integration | chatController.ts | chat.service.ts |
| Request/Response types | TypeScript interfaces | DTOs |

## API Compatibility

Both backends expose the same API:

**Endpoint**: `POST /api/chat`

**Request**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    }
  ]
}
```

**Response**:
```json
{
  "reply": "Hi! How can I help you today?"
}
```

## Configuration

### Express Backend
```typescript
// backend/src/index.ts
dotenv.config();
const PORT = process.env.PORT || 3000;
```

### NestJS Backend
```typescript
// chatbot-backend/src/main.ts
dotenv.config();
const port = process.env.PORT || 3000;
```

Both use the same environment variables:
- `GEMINI_API_KEY` - Google Gemini API key
- `PORT` - Server port (default: 3000)

## Running the Servers

### Express Backend
```bash
cd backend
npm run dev      # Development
npm run build    # Build
npm run start    # Production
```

### NestJS Backend
```bash
cd chatbot-backend
npm run start:dev    # Development with watch mode
npm run build        # Build
npm run start:prod   # Production
```

## Benefits of NestJS Implementation

1. **Scalability**: Modular architecture makes it easy to add new features
2. **Maintainability**: Clear separation of concerns (Controller → Service → Module)
3. **Testability**: Built-in testing utilities and dependency injection
4. **Type Safety**: Enhanced TypeScript support with decorators
5. **Documentation**: Auto-generated API documentation with Swagger (optional)
6. **Ecosystem**: Large ecosystem of official packages (@nestjs/*)

## Next Steps

1. **Add Validation**: Install `class-validator` and `class-transformer` for DTO validation
   ```bash
   npm install class-validator class-transformer
   ```

2. **Add Swagger Documentation**: 
   ```bash
   npm install @nestjs/swagger
   ```

3. **Add Configuration Module**: Use `@nestjs/config` for better env management
   ```bash
   npm install @nestjs/config
   ```

4. **Add Logging**: Implement custom logger or use built-in NestJS logger

5. **Add Tests**: Write unit tests for service and e2e tests for controller

## Troubleshooting

### Port Already in Use
If you get "Port already in use" error, either:
- Stop the Express backend
- Change the PORT in .env file
- Use different ports for each backend

### API Key Not Found
Make sure you have a `.env` file in the `chatbot-backend/` directory with:
```
GEMINI_API_KEY=your_api_key_here
```

## Support

For issues or questions:
1. Check the README_CHATBOT.md file
2. Review NestJS documentation: https://docs.nestjs.com
3. Check Google Gemini AI documentation: https://ai.google.dev
