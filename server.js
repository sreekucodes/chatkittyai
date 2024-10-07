const express = require('express');
const app = express();
const { router: chatRoutes, interactionLogs } = require('./routes/chat'); // Import chat routes and logs

app.use(express.json());

// Define the route to retrieve logs
app.get('/api/logs', (req, res) => {
  res.json(interactionLogs);  // Respond with the logs array
});

// Chatbot routes
app.use('/api/chat', chatRoutes);

// Other routes and configurations
const supportRoutes = require('./routes/support'); // Support routes
app.use('/api/support', supportRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
