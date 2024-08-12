// pages/api/user/toggleFavorites.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
    await dbConnect();

    const { userId, movieId, title, posterPath, releaseDate, genres, action } = req.body;

    if (!userId || !movieId || !action) {
        return res.status(400).json({ error: "Invalid data" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const numericMovieId = Number(movieId);

        if (action === "addFavorite") {
            if (user.favorites.some((fav) => fav.movieId === numericMovieId)) {
                return res.status(400).json({ error: "Movie already in favorites" });
            }
            user.favorites.push({ movieId: numericMovieId, title, posterPath, releaseDate, genres });
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
