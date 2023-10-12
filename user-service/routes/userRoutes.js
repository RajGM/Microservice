const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Fetch all users
router.get('/', userController.getAllUsers);

// Fetch a single user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update user details
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
