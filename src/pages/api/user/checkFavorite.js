// pages/api/user/checkFavorite.js
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

        // Ensure both are numbers for comparison
        const isFavorite = user.favorites.some((fav) => fav.movieId === Number(movieId));

        res.status(200).json({ isFavorite });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
