const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return false;
  }
};

module.exports = { generateToken, verifyToken };
