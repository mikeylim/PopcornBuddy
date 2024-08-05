import connectDB from '@/utils/dbConnect';
import User from '@/utils/userModel';

const handler = async (req, res) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case 'POST':
      try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ 
          firstName,
          lastName,
          email,
          password
        });
        await newUser.save();
        res.status(201).json({ success: true, data: { id: newUser._id, email: newUser.email } });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;