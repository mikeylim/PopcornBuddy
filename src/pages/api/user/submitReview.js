// pages/api/user/submitReview.js
import connectDB from "../../../utils/dbConnect";
import User from "../../../utils/userModel";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	await connectDB();

	const { userId, movieId, content } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Ensure the reviews array is initialized
		if (!Array.isArray(user.reviews)) {
			user.reviews = [];
		}

		// Add the new review to the user's reviews array
		user.reviews.push({ movieId, content });
		await user.save();

		res.status(200).json({ success: true, message: "Review submitted successfully" });
	} catch (error) {
		console.error("Error submitting review:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
