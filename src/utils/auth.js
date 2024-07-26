// utils/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const authenticateUser = (req, res, next) => {
  // Middleware to protect routes
};
