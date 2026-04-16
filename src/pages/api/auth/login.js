// pages/api/auth/login.js
import connectDB from "@/utils/dbConnect";
import User from "@/utils/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, getAuthCookies } from "@/utils/auth";

connectDB();

const handler = async (req, res) => {
	const { method } = req;

	if (method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${method} Not Allowed`);
	}

	try {
		const { email, password } = req.body;
		console.log("Login attempt for email:", email);

		// Find the user by email
		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			return res.status(400).json({ success: false, error: "Invalid username or password." });
		}

		// Check if the password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ success: false, error: "Invalid username or password." });
		}

		// Generate access token (10 minutes)
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

		// Generate refresh token (7 days)
		const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "7d",
		});

		// Set the tokens in cookies
		res.setHeader("Set-Cookie", getAuthCookies(token, refreshToken));

		res.status(200).json({
			success: true,
			data: {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			expiresIn: ACCESS_TOKEN_MAX_AGE,
			refreshExpiresIn: REFRESH_TOKEN_MAX_AGE,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ success: false, error: "An unexpected error occurred" });
	}
};

export default handler;
