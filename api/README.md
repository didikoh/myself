# Chat History API

A dependency-free PHP micro-API designed for Apache-based shared hosting. It
stores one row per user/assistant turn and uses UUIDs to group turns without
collecting visitor names, email addresses, or IP addresses.

## Server requirements

- PHP 8.1 or newer
- PDO MySQL extension
- MySQL 5.7+ or MariaDB 10.3+
- Apache `mod_rewrite` (the fallback URL
  `/{frontend-path}/api/index.php/chat-history` can be used when rewriting is
  unavailable)

## Deploy

1. Import `schema.sql` into `u839013241_myself` using phpMyAdmin.
2. Copy `config.example.php` to `config.php`.
3. Put the database password in `config.php`. Update `allowed_origins` only
   when the frontend and API use different origins.
4. Upload this complete `api` directory beside the built frontend's
   `index.html`. For example, a frontend at `/portfolio/` should contain the
   API at `/portfolio/api/`.
5. Check `GET /{frontend-path}/api/health`, then send a chat message from the
   website.

Environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`,
`DB_PASSWORD`, and comma-separated `CORS_ALLOWED_ORIGINS` can be used instead
of `config.php` when the host supports them.

### GitHub Actions deployment

The repository workflow builds the frontend, adds this API under the same
frontend path, and generates `api/config.php` during deployment. Add the
database password as a GitHub Actions repository secret named `DB_PASSWORD`.
The password is never committed to Git. Existing SSH deployment secrets are
still required: `SSH_HOST` and `SSH_PRIVATE_KEY`. `SSH_PORT`, `SSH_USERNAME`,
and `SSH_KNOWN_HOSTS` remain optional overrides.

The workflow also checks `/portfolio/api/health` after uploading. The database
schema must be imported once before the first deployment.

## Endpoint

`POST /{frontend-path}/api/chat-history`

For the current Vite base path, the production endpoint is
`POST /portfolio/api/chat-history`.

```json
{
  "conversationId": "bd7033b1-8343-4e9c-b922-1b1ff5168215",
  "turnId": "e954ac2c-6d4b-4ef0-bfbf-993e4c050eb7",
  "userMessage": "What projects has he built?",
  "assistantMessage": "He has built...",
  "status": "completed",
  "metadata": {
    "tokenInfo": {
      "promptTokenCount": 123,
      "candidatesTokenCount": 45,
      "totalTokenCount": 168,
      "finishReason": "STOP"
    },
    "contextInfo": {
      "dataUpdatedAt": "2026-07-29",
      "retrievedSections": ["projects"]
    }
  }
}
```

The `(conversation_id, turn_id)` unique key makes retries idempotent.
