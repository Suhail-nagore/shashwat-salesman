const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Static login credentials
const validUsername = 'admin';
const validPassword = 'admin123';

// GET - Render login page
router.get('/', (req, res) => {
  res.render('login');
});

// POST - Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check login credentials
  if (username === validUsername && password === validPassword) {
    try {
      // Fetch all users from the database (no more callbacks, using async/await)
      const users = await User.find();
      
      // Render the shops page with the fetched users
      res.render('shops', { users });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  } else {
    res.send('Invalid credentials');
  }
});

// GET - Handle shop card clicks and redirect with query params
router.get('/auth/login', (req, res) => {
  const { phoneNo, password } = req.query;
  res.redirect(`http://localhost:5173/auth/login?phoneNo=${phoneNo}&password=${password}`);
});

module.exports = router;
