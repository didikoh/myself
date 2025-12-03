# Quick Start Guide - NestJS Chatbot Backend

## Prerequisites
- ✅ Node.js installed
- ✅ npm installed  
- ✅ Google Gemini API key

## 5-Minute Setup

### Step 1: Create Environment File
```bash
cd chatbot-backend
cp .env.example .env
```

Edit `.env` file:
```env
GEMINI_API_KEY=paste_your_api_key_here
PORT=3000
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run start:dev
```

You should see:
```
Server is running on port 3000
API endpoints available at http://localhost:3000/api
```

### Step 4: Test the API

**Test 1: Health Check**
```bash
curl http://localhost:3000/
```

Expected response:
```json
{"message":"Hello World!"}
```

**Test 2: Chat Health Check**
```bash
curl http://localhost:3000/api/chat/health
```

Expected response:
```json
{"status":"ok","message":"Chat service is running"}
```

**Test 3: Chat Endpoint**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"Hello!\"}]}"
```

Or using PowerShell:
```powershell
$body = @{
    messages = @(
        @{
            role = "user"
            content = "Hello! Tell me about your skills"
        }
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Post -Body $body -ContentType "application/json"
```

Expected response:
```json
{
  "reply": "Hi! I'd be happy to help you learn about the portfolio owner's skills..."
}
```

## 🎉 That's It!

Your NestJS chatbot backend is now running and ready to accept chat requests.

## Next Steps

1. **Customize Portfolio Info**: Edit `src/chat/chat.service.ts` and update the `resumeContext`
2. **Update CORS**: Edit `src/main.ts` to set your frontend domain
3. **Add Validation**: Install class-validator for request validation
4. **Deploy**: Build with `npm run build` and deploy to your hosting service

## Common Commands

```bash
# Development with hot reload
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

**Problem**: Port 3000 is already in use
**Solution**: Change PORT in .env to 3001 or stop other services

**Problem**: "API key not configured"
**Solution**: Make sure .env file exists and has valid GEMINI_API_KEY

**Problem**: Build fails
**Solution**: Run `npm install` to ensure all dependencies are installed

## Support Files

- 📖 **README_CHATBOT.md** - Full documentation
- 🔄 **MIGRATION_GUIDE.md** - Comparison with Express backend
- 📝 **IMPLEMENTATION_SUMMARY.md** - Complete implementation details

Enjoy your NestJS chatbot backend! 🚀
