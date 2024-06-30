const express = require('express');
const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
} = require('../service/user.service');
const authenticateToken = require('../middleware/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/', authenticateToken, createUser);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', authenticateToken, getUserById);
userRoutes.put('/:id', authenticateToken, updateUserById);
userRoutes.delete('/:id', authenticateToken, deleteUserById);

module.exports = userRoutes;
