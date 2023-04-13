const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserCTRL');

// Create a new user
router.post('/register', UserController.createUser);

// Get all users
router.get('/', UserController.getUsers);

// Get a specific user by ID
router.get('/:id', UserController.getUserById);

// Update a specific user by ID
router.put('/:id', UserController.updateUser);

// Delete a specific user by ID
router.delete('/:id', UserController.deleteUser);

router.post('/login',UserController.login);

module.exports = router;
