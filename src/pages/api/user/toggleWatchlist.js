// pages/api/user/toggleWatchlist.js
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

        if (action === "addWatchlist") {
            if (user.watchlist.some((watch) => watch.movieId === numericMovieId)) {
                return res.status(400).json({ error: "Movie already in watchlist" });
            }
            user.watchlist.push({ movieId: numericMovieId, title, posterPath, releaseDate, genres });
        } else if (action === "removeWatchlist") {
            user.watchlist = user.watchlist.filter((watch) => watch.movieId !== numericMovieId);
        } else {
            return res.status(400).json({ error: "Invalid action" });
        }

        await user.save();
        res.status(200).json({ success: true, watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
