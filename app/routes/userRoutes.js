const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// get all users
router.get('/', UserController.getAllUsers);

// get single user by ID
router.get('/:id', UserController.getUserById);

// create new user
router.post('/', UserController.createUser);

// update user by ID
router.patch('/:id', UserController.updateUser);

// delete user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
