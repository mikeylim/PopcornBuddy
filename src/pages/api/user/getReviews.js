// pages/api/user/getReviews.js
import connectDB from '../../../utils/dbConnect';
import User from '../../../utils/userModel';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connectDB();

  const { userId, movieId } = req.query;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const reviews = user.reviews.filter(review => review.movieId === parseInt(movieId));

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}