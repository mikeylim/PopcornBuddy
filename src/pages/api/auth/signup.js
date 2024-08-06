// pages/api/auth/signup.js
import connectDB from '@/utils/dbConnect';
import User from '@/utils/userModel';

const handler = async (req, res) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case 'POST':
      try {
        const { firstName, lastName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, error: 'Email already in use' });
        }

        // Create a new user
        const newUser = new User({ 
          firstName,
          lastName,
          email,
          password
        });

        await newUser.save();
        res.status(201).json({ success: true, data: { id: newUser._id, email: newUser.email } });
      } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 11000) {
          res.status(400).json({ success: false, error: 'Email already in use' });
        } else {
          res.status(500).json({ success: false, error: 'An unexpected error occurred' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;