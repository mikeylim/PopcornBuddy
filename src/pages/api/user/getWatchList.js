// pages/api/user/getWatchlist.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
	await dbConnect();

	const { userId } = req.query;

	if (!userId) {
		return res.status(400).json({ error: "Invalid data" });
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ watchlist: user.watchlist });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}
