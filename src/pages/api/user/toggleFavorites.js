// pages/api/user/toggleFavorites.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";
import authMiddleware from "../../../utils/authMiddleware";

async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}

	await dbConnect();

	const { movieId, title, posterPath, releaseDate, genre_ids, action } = req.body;

	if (!movieId || !action) {
		return res.status(400).json({ error: "Invalid data" });
	}

	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const numericMovieId = Number(movieId);

		if (action === "addFavorite") {
			if (user.favorites.some((fav) => fav.movieId === numericMovieId)) {
				return res.status(400).json({ error: "Movie already in favorites" });
			}
			user.favorites.push({
				movieId: numericMovieId,
				title,
				posterPath,
				releaseDate,
				genre_ids,
			});
		} else if (action === "removeFavorite") {
			user.favorites = user.favorites.filter((fav) => fav.movieId !== numericMovieId);
		} else {
			return res.status(400).json({ error: "Invalid action" });
		}

		await user.save();
		res.status(200).json({ success: true, favorites: user.favorites });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export default authMiddleware(handler);
