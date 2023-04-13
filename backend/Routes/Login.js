const express = require('express');
const router = express.Router();
const login = require('../middlewares/login');

router.post('/protected-resource', login, (req, res) => {
  // This route is protected by the login middleware function
  res.json({ message: 'You are authorized to access this resource' });
});
