const axios = require('axios');

// Rate limiting configuration
const rateLimiter = {
  requests: [],
  maxRequestsPerMinute: 10, // Conservative limit to stay under API quota
  cleanupInterval: null,
  isQuotaExhausted: false,
  quotaResetTime: null
};

// Initialize cleanup interval
if (!rateLimiter.cleanupInterval) {
  rateLimiter.cleanupInterval = setInterval(() => {
    const oneMinuteAgo = Date.now() - 60000;
    rateLimiter.requests = rateLimiter.requests.filter(time => time > oneMinuteAgo);
  }, 10000); // Cleanup every 10 seconds
}

// Check if rate limit is exceeded
const checkRateLimit = () => {
  const oneMinuteAgo = Date.now() - 60000;
  rateLimiter.requests = rateLimiter.requests.filter(time => time > oneMinuteAgo);
  return rateLimiter.requests.length >= rateLimiter.maxRequestsPerMinute;
};

// Add request to rate limiter
const addRequest = () => {
  rateLimiter.requests.push(Date.now());
};

// Sleep function for retry delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Make Gemini API call (no retries for 429 - quota exhausted)
const callGeminiAPI = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      timeout: 30000 // 30 second timeout
    });
    // Reset quota exhausted flag on success
    rateLimiter.isQuotaExhausted = false;
    rateLimiter.quotaResetTime = null;
    return response;
  } catch (error) {
    if (error.response?.status === 429) {
      // Mark quota as exhausted for 60 seconds
      rateLimiter.isQuotaExhausted = true;
      rateLimiter.quotaResetTime = Date.now() + 60000;
      console.log('API quota exhausted. Blocking requests for 60 seconds.');
    }
    throw error;
  }
};

// @desc    Chat with Gemini AI
// @route   POST /api/chatbot/chat
// @access  Public
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(503).json({
        success: false,
        message: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env file'
      });
    }

    // Check if quota is exhausted
    if (rateLimiter.isQuotaExhausted) {
      const timeRemaining = Math.ceil((rateLimiter.quotaResetTime - Date.now()) / 1000);
      if (timeRemaining > 0) {
        return res.status(429).json({
          success: false,
          message: `API quota exhausted. Please wait ${timeRemaining} seconds or use Offline Mode.`,
          retryAfter: timeRemaining,
          useOfflineMode: true
        });
      } else {
        // Reset quota exhausted status
        rateLimiter.isQuotaExhausted = false;
        rateLimiter.quotaResetTime = null;
      }
    }

    // Check rate limit before making request
    if (checkRateLimit()) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again or use Offline Mode.',
        retryAfter: 60, // seconds
        useOfflineMode: true
      });
    }

    // Add request to rate limiter
    addRequest();

    // Call Google Gemini API using v1beta API with gemini-2.5-flash model
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiResponse = await callGeminiAPI(geminiUrl, {
      contents: [{
        parts: [{
          text: `You are a knowledgeable assistant specializing in Sikkim's monastery heritage, Buddhist culture, and historical preservation.

IMPORTANT FORMATTING INSTRUCTIONS:
- Use clear headers with emoji icons (🏛️, 📍, 📅, 📜, etc.)
- Structure responses with sections separated by divider lines (───────────────────)
- Use bullet points (•) for lists
- Add numbered sections for step-by-step information
- Include proper spacing between sections
- Highlight important terms with **bold** text
- Keep responses detailed but well-organized

User Question: ${message}

Please provide a comprehensive, well-structured response with:
1. A clear header indicating the topic
2. Key information organized in sections
3. Historical context with dates and significance
4. Relevant cultural or religious details
5. Practical information if applicable (visiting hours, location details, etc.)
6. Suggestions for related information or follow-up questions

If the question is not related to monasteries or Sikkim's heritage, politely redirect the conversation to these topics while still being helpful.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });
    
    const reply = geminiResponse.data.candidates[0].content.parts[0].text;
    
    res.status(200).json({
      success: true,
      reply: reply
    });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'API rate limit exceeded. Please wait a minute before trying again.',
        retryAfter: 60
      });
    }
    
    if (error.response?.status === 403) {
      return res.status(503).json({
        success: false,
        message: 'API access denied. Please check your API key configuration.'
      });
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({
        success: false,
        message: 'Request timeout. Please try again.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to get response from AI. Please try again later.',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

// @desc    Analyze monastery image
// @route   POST /api/chatbot/analyze-image
// @access  Public
exports.analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    // Placeholder for image analysis
    const analysis = {
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: `/uploads/${req.file.filename}`,
      analysis: 'This feature requires Google Gemini Vision API integration for monastery image analysis.'
    };
    
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
