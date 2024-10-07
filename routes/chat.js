const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const router = express.Router();

// In-memory store for users (to be replaced with database lookup)
const users = [
  {
    apiKey: 'your-api-key',
    knowledgebase: [
      { question: 'What is your return policy?', answer: 'Our return policy is 30 days.' },
      { question: 'What are your working hours?', answer: 'We are open from 9 AM to 5 PM, Monday to Friday.' }
    ]
  }
];

// Shared in-memory array for logging interactions (to be shared with server.js)
const interactionLogs = [];

// Initialize OpenAI API
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

// Chat route to handle both knowledgebase and AI queries
router.post('/chat', async (req, res) => {
  const { message, apiKey } = req.body;

  // Lookup user by API key
  const user = users.find(u => u.apiKey === apiKey);

  if (!user) {
    return res.status(400).json({ message: 'Invalid API key' });
  }

  let response = '';
  let source = '';

  // Check knowledgebase first
  const knowledgebaseMatch = user.knowledgebase.find(q => q.question.toLowerCase() === message.toLowerCase());
  
  if (knowledgebaseMatch) {
    response = knowledgebaseMatch.answer;
    source = 'knowledgebase';
  } else {
    // If no match in knowledgebase, query OpenAI API
    try {
      const openAiResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 150
      });

      response = openAiResponse.data.choices[0].text.trim();
      source = 'AI';
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching AI response' });
    }
  }

  // Log the interaction
  interactionLogs.push({
    apiKey,
    message,
    response,
    source,
    timestamp: new Date()
  });

  res.json({ reply: response });
});

// Export both the router and interactionLogs array
module.exports = { router, interactionLogs };
