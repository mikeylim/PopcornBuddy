// pages/api/auth/signup.js
import connectDB from "@/utils/dbConnect";
import User from "@/utils/userModel";
import jwt from "jsonwebtoken";
import { getAuthCookies } from "@/utils/auth";

connectDB();

const handler = async (req, res) => {
	const { method } = req;

	if (method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${method} Not Allowed`);
	}

	try {
		const { firstName, lastName, email, password } = req.body;
		console.log("Sign up request received:", { firstName, lastName, email });

		const userExists = await User.findOne({ email: email.toLowerCase() });
		if (userExists) {
			return res.status(400).json({ success: false, error: "User already exists" });
		}

		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password,
		});

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });
		const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "7d",
		});

		res.setHeader("Set-Cookie", getAuthCookies(token, refreshToken));

		res.status(201).json({
			success: true,
			data: {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		});
	} catch (error) {
		console.error("Sign up error:", error);
		res.status(500).json({ success: false, error: "An unexpected error occurred" });
	}
};

export default handler;
