// pages/api/user/toggleRating.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
	await dbConnect();

	const { userId, movieId, rating } = req.body;

	if (!userId || !movieId || rating === undefined) {
		return res.status(400).json({ error: "Invalid data" });
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const numericMovieId = Number(movieId);
		const existingRating = user.ratings.find((r) => r.movieId === numericMovieId);

		if (existingRating) {
			existingRating.rating = rating;
		} else {
			user.ratings.push({ movieId: numericMovieId, rating });
		}

		await user.save();
		res.status(200).json({ success: true, ratings: user.ratings });
	} catch (error) {
		console.error("Error updating rating:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
