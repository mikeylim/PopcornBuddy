//pages/api/user/deleteReview.js
import connectDB from '../../../utils/dbConnect';
import User from '../../../utils/userModel';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connectDB();

  const { userId, reviewId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the review exists and belongs to the user
    const reviewIndex = user.reviews.findIndex(review => review._id.toString() === reviewId);

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove the review from the user's reviews array
    user.reviews.splice(reviewIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
