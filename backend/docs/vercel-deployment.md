# Deploying Backend to Vercel

This guide will walk you through deploying the portfolio chatbot backend to Vercel.

## Prerequisites

Before deploying, ensure you have:
- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
- A Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Git repository with your backend code

## Project Structure

The backend is configured for Vercel serverless deployment with the following key files:

```
backend/
├── api/
│   └── index.ts          # Vercel serverless entry point
├── src/
│   ├── index.ts          # Original Express app (for local dev)
│   ├── controllers/
│   │   └── chatController.ts
│   └── routes/
│       └── chat.ts
├── vercel.json           # Vercel configuration
├── package.json
├── tsconfig.json
└── .env.example
```

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended for Beginners)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)
   ```bash
   git add .
   git commit -m "Configure backend for Vercel deployment"
   git push origin main
   ```

2. **Import your project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your Git provider and import your repository
   - Select the `backend` folder as the root directory

3. **Configure project settings**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty or use `npm run vercel-build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add environment variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variables:
     - `GEMINI_API_KEY`: Your Google Gemini API key
     - `NODE_ENV`: `production`

5. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your API will be available at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? Enter a name or press Enter
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Add environment variables**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Paste your Gemini API key when prompted.
   
   Select environments: `Production`, `Preview`, `Development` (use spacebar to select)

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSyD...` |
| `NODE_ENV` | Environment mode | `production` |

### Setting Environment Variables in Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Click on "Settings" → "Environment Variables"
3. Add each variable with appropriate values
4. Choose which environments to apply them to (Production, Preview, Development)
5. Click "Save"

### Setting Environment Variables via CLI

```bash
# Add environment variable
vercel env add GEMINI_API_KEY

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm GEMINI_API_KEY
```

## API Endpoints

Once deployed, your API will be available at:

- **Base URL**: `https://your-project-name.vercel.app`
- **Health Check**: `GET /`
  - Response: `{ "status": "ok", "message": "Portfolio chatbot API is running" }`
- **Chat Endpoint**: `POST /api/chat`
  - Request body:
    ```json
    {
      "messages": [
        { "role": "user", "content": "Hello, tell me about this portfolio" }
      ]
    }
    ```
  - Response:
    ```json
    {
      "reply": "AI generated response..."
    }
    ```

## Testing Your Deployment

### Test with curl

```bash
# Health check
curl https://your-project-name.vercel.app/

# Chat request
curl -X POST https://your-project-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Tell me about the skills" }
    ]
  }'
```

### Test with Postman or Thunder Client

1. Create a new POST request
2. URL: `https://your-project-name.vercel.app/api/chat`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "messages": [
       { "role": "user", "content": "What projects are in this portfolio?" }
     ]
   }
   ```

## Updating Your Deployment

### Automatic Deployments (with Git Integration)

If you connected your Git repository:
1. Make changes to your code
2. Commit and push to your repository
3. Vercel will automatically deploy the changes

### Manual Deployment via CLI

```bash
cd backend
vercel --prod
```

## CORS Configuration

The current CORS configuration allows all origins (`origin: '*'`). For production, you should restrict this to your frontend domain:

Update `api/index.ts`:
```typescript
app.use(cors({
  origin: 'https://yourusername.github.io', // Your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
```

Then redeploy:
```bash
vercel --prod
```

## Troubleshooting

### Common Issues

**Issue: API returns 500 error**
- **Solution**: Check that `GEMINI_API_KEY` is set correctly in Vercel environment variables
- View logs: `vercel logs` or check Vercel Dashboard → Project → Logs

**Issue: Module not found errors**
- **Solution**: Ensure all dependencies are in `package.json` dependencies (not devDependencies)
- Run `npm install` locally to verify

**Issue: CORS errors from frontend**
- **Solution**: Update the CORS configuration to include your frontend domain
- Redeploy after making changes

**Issue: Timeout errors**
- **Solution**: Vercel has a 10-second timeout for Hobby plan, 60s for Pro
- Optimize your API responses or upgrade your plan

### Viewing Logs

**Via Dashboard:**
1. Go to your project in Vercel
2. Click on a deployment
3. Click "View Function Logs"

**Via CLI:**
```bash
vercel logs
```

## Performance Optimization

1. **Cold Starts**: Vercel serverless functions may have cold starts. Keep functions lightweight.
2. **Response Time**: Gemini API calls should be optimized. Consider implementing caching for common queries.
3. **Rate Limiting**: Implement rate limiting to prevent API abuse:
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/chat', limiter);
   ```

## Monitoring

Vercel provides built-in monitoring:
- **Analytics**: View request counts, response times, and errors
- **Logs**: Real-time function logs
- **Deployments**: History of all deployments

Access these in your Vercel Dashboard under your project.

## Cost Considerations

- **Hobby Plan** (Free):
  - Unlimited deployments
  - 100 GB bandwidth per month
  - Serverless function execution: 100 hours per month
  - 10-second function timeout

- **Pro Plan** ($20/month):
  - Unlimited bandwidth
  - 1000 hours function execution
  - 60-second function timeout
  - Advanced analytics

Monitor your usage in the Vercel Dashboard to ensure you stay within limits.

## Security Best Practices

1. **Never commit `.env` files** - Always use `.env.example` as a template
2. **Use environment variables** for all sensitive data
3. **Restrict CORS** to your specific domain in production
4. **Implement rate limiting** to prevent abuse
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Validate input** - Always validate and sanitize user input

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Local Development

To run the backend locally:

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your API key to .env
# GEMINI_API_KEY=your_actual_key

# Run development server
npm run dev
```

The server will start at `http://localhost:3000`

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Express.js Documentation](https://expressjs.com/)

## Support

If you encounter issues:
1. Check the [Vercel Status Page](https://www.vercel-status.com/)
2. Review [Vercel Community Forums](https://github.com/vercel/vercel/discussions)
3. Check the [troubleshooting section](#troubleshooting) above

---

**Last Updated**: December 2025
