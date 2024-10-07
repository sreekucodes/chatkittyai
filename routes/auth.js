const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; // Temporary array to store users (for demo)

// Sign-up Route

const { v4: uuidv4 } = require('uuid'); // To generate unique API keys

router.post('/signup', async (req, res) => {
  // Log the request body to see what data is being sent
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };

  // Save user
  users.push(user);

  res.status(201).json({ message: 'User created successfully!' });
});

module.exports = router;
