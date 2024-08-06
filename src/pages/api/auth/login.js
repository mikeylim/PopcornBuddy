import connectDB from '@/utils/dbConnect';
import User from '@/utils/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import session from 'express-session';
require('dotenv').config(); // Ensure this line is present to load environment variables

// Initialize express-session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // Make sure to set this in your environment variables
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax' // or 'strict' or 'none'
  }
});

const handler = async (req, res) => {
  const { method } = req;
  await connectDB();

  // Apply session middleware
  await new Promise((resolve, reject) => {
    sessionMiddleware(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        // Find the user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          console.log('User not found:', email);
          return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log('Invalid password for user:', email);
          return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Create session
        req.session.userId = user._id;
        console.log('Session created for user:', email);

        // Generate JWT token (optional)
        console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT secret
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET, // Make sure to set this in your environment variables
          { expiresIn: '24h' }
        );

        res.status(200).json({ 
          success: true, 
          data: { 
            id: user._id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          token // Include the JWT token in the response
        });

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'An unexpected error occurred' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
