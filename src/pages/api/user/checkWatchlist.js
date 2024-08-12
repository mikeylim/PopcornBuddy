// pages/api/user/checkWatchlist.js
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

        const isInWatchlist = user.watchlist.some((watch) => watch.movieId === Number(movieId));

        res.status(200).json({ isInWatchlist });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
