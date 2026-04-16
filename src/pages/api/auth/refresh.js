// pages/api/auth/refresh.js
import jwt from "jsonwebtoken";
import { getAuthCookies, getRequestCookies } from "@/utils/auth";

const handler = async (req, res) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	try {
		const cookies = getRequestCookies(req);
		const refreshToken = cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ success: false, error: "No refresh token provided" });
		}

		// Verify the refresh token
		jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
			if (err) {
				return res.status(403).json({ success: false, error: "Invalid refresh token" });
			}

			// Generate a new access token
			const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
				expiresIn: "30m",
			});

			// Send the new access token
			res.setHeader("Set-Cookie", getAuthCookies(newToken));

			res.status(200).json({ success: true });
		});
	} catch (error) {
		console.error("Refresh token error:", error);
		res.status(500).json({ success: false, error: "An unexpected error occurred" });
	}
};

export default handler;
