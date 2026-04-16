// pages/api/user/getFavorites.js
import User from "../../../utils/userModel";
import dbConnect from "../../../utils/dbConnect";
import authMiddleware from "../../../utils/authMiddleware";

async function handler(req, res) {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}

	await dbConnect();

	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ favorites: user.favorites });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export default authMiddleware(handler);
