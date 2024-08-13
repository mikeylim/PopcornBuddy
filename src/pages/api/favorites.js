// pages/api/favorites.js
import { getSession } from "next-auth/react";
import connectDB from '../../utils/dbConnect';
import User from '../../utils/userModel';

export default async function handler(req, res) {
  await connectDB();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { movieId } = req.body;
    
    try {
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const index = user.favorites.indexOf(movieId);
      let isFavorite;
      if (index > -1) {
        // Remove from favorites
        user.favorites.splice(index, 1);
        isFavorite = false;
      } else {
        // Add to favorites
        user.favorites.push(movieId);
        isFavorite = true;
      }

      await user.save();
      res.status(200).json({ isFavorite });
    } catch (error) {
      res.status(500).json({ message: 'Error updating favorites' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}