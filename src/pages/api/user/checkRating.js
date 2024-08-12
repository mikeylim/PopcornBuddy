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

        // Ensure movieId is numeric for comparison
        const numericMovieId = Number(movieId);
        const ratingRecord = user.ratings.find(
            (rating) => rating.movieId === numericMovieId
        );

        // If the movie has been rated by the user, return the rating, otherwise return null
        const rating = ratingRecord ? ratingRecord.rating : null;

        res.status(200).json({ rating });
    } catch (error) {
        console.error("Error checking rating:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
