const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const genAI = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY; // Replace with your actual API key
const client = new genAI.GoogleGenerativeAI(apiKey);


// Conversation history storage (could be expanded to database)
const conversationHistories = {};

router.post('/chatbot', async (req, res) => {
  try {
    const { message, userId = 'default' } = req.body;

    // Initialize or retrieve conversation history
    if (!conversationHistories[userId]) {
      conversationHistories[userId] = [];
    }

    // Create chat session with context
    const chat = client.startChat({
      history: conversationHistories[userId],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
      }
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Update conversation history
    conversationHistories[userId].push(
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: response }] }
    );

    // Limit conversation history to last 10 exchanges
    if (conversationHistories[userId].length > 20) {
      conversationHistories[userId] = conversationHistories[userId].slice(-20);
    }

    res.json({ response });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request', 
      details: error.message 
    });
  }
});

module.exports = router;