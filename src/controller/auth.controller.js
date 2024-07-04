const express = require('express');
const { register, login, tokenVerification } = require('../service/auth.service');
const authRoutes = express.Router();
const authenticateToken = require('./../middleware/authMiddleware')

authRoutes.post('/register',authenticateToken, register);
authRoutes.post('/login', login);
authRoutes.get('/verify',authenticateToken, tokenVerification)

module.exports = authRoutes;
