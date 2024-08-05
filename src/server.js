const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./pages/api/auth');
const connectDB = require('./utils/db');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
