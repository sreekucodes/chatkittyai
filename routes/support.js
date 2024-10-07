const express = require('express');
const router = express.Router();

// Temporary in-memory support queue
const supportQueue = [];
const interactionLogs = []; // Interaction logs shared with chat.js

// POST route to handle fallback when AI and knowledgebase can't answer
router.post('/support', (req, res) => {
  const { message, apiKey } = req.body;

  // Log support query in interaction logs
  interactionLogs.push({
    apiKey,
    message,
    response: 'Forwarded to support',
    source: 'support',
    timestamp: new Date()
  });

  // Add query to the support queue
  supportQueue.push({ message, apiKey, timestamp: new Date() });

  res.status(200).json({ message: 'Your query has been forwarded to our support team' });
});

// GET route to retrieve the support queue
router.get('/support', (req, res) => {
  res.json(supportQueue);
});

module.exports = router;
