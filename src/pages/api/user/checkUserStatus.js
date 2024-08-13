// pages/api/user/checkUserStatus.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
	await dbConnect();

	const { userId, movieId } = req.query;

	if (!userId || !movieId) {
		return res.status(400).json({ error: "Invalid data" });
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const numericMovieId = Number(movieId);

		const isFavorite = user.favorites.some((fav) => fav.movieId === numericMovieId);
		const isInWatchlist = user.watchlist.some((watch) => watch.movieId === numericMovieId);
		const rating =
			user.ratings.find((rating) => rating.movieId === numericMovieId)?.rating || 0;

		res.status(200).json({ isFavorite, isInWatchlist, rating });
	} catch (error) {
		console.error("Error in checkUserStatus:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
