# Gemini API Rate Limiting Guide

## Problem
The Gemini API has rate limits that restrict the number of requests per minute. When exceeded, you'll get a 429 error with message: "Quota exceeded for quota metric 'Generate Content API requests per minute'".

## Solutions Implemented

### 1. Server-Side Rate Limiting
- **Location**: `mern-app/server/controllers/chatbotController.js`
- **Default Limit**: 15 requests per minute (adjustable)
- **Features**:
  - Tracks requests in a rolling 60-second window
  - Rejects requests before calling the API when limit is reached
  - Returns user-friendly error message with retry information

### 2. Automatic Retry with Exponential Backoff
- Automatically retries failed requests up to 3 times
- Uses exponential backoff (1s, 2s, 4s delays)
- Only retries on 429 (rate limit) errors

### 3. Enhanced Error Handling
- Client-side shows clear messages for different error types
- Suggests using Offline Mode when API is unavailable
- Provides specific guidance for rate limit errors

## Configuration

### Adjust Rate Limit
Edit `chatbotController.js`:
```javascript
const rateLimiter = {
  requests: [],
  maxRequestsPerMinute: 15, // Change this number
  cleanupInterval: null
};
```

### Adjust Retry Behavior
Edit the `callGeminiAPI` function parameters:
```javascript
const geminiResponse = await callGeminiAPI(geminiUrl, data, 3, 1000);
// Parameters: url, data, retries (default: 3), initial delay (default: 1000ms)
```

## Best Practices

### 1. Use Offline Mode
The app includes an offline mode with pre-programmed responses. Switch to it when:
- Testing the application
- Experiencing rate limit issues
- Demonstrating the app without API costs

### 2. Monitor API Usage
Check your Gemini API quota at:
https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

### 3. Upgrade API Tier
Consider upgrading your Gemini API tier for higher quotas:
- Free Tier: 15 requests per minute
- Paid Tier: Higher limits available

### 4. Implement User-Level Rate Limiting
For production, consider adding per-user rate limits:
```javascript
// Example: Track requests per user
const userRateLimits = new Map();
// Implement logic to limit requests per user ID
```

### 5. Cache Responses
Cache common questions to reduce API calls:
```javascript
const responseCache = new Map();
// Check cache before calling API
```

## Error Messages

| Status Code | Error Message | Action |
|-------------|---------------|--------|
| 429 | Rate limit exceeded | Wait 60 seconds or use Offline Mode |
| 503 | Service unavailable | Check API key or use Offline Mode |
| 504 | Request timeout | Retry the request |

## Testing

To test rate limiting:
1. Set `maxRequestsPerMinute` to a low value (e.g., 3)
2. Send multiple requests quickly
3. Verify you get a 429 response from the server
4. Wait 60 seconds and try again

## Monitoring

Add logging to track API usage:
```javascript
console.log(`Current requests in last minute: ${rateLimiter.requests.length}`);
console.log(`Requests remaining: ${rateLimiter.maxRequestsPerMinute - rateLimiter.requests.length}`);
```

## Alternative Solutions

### 1. Use a Different AI Model
- Switch to GPT-3.5/GPT-4 (requires OpenAI API key)
- Use local models (Ollama, LLaMA)
- Use Anthropic Claude API

### 2. Implement Request Queuing
- Queue requests when rate limit is approached
- Process them gradually over time
- Provides better UX than rejecting requests

### 3. Use Multiple API Keys
- Rotate between multiple API keys
- Distributes load across multiple quotas
- Requires careful key management
