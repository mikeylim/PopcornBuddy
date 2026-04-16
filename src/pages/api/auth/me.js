import connectDB from "@/utils/dbConnect";
import User from "@/utils/userModel";
import { requireAuth } from "@/utils/auth";

const handler = async (req, res) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}

	await connectDB();

	const user = await User.findById(req.user.userId).select("_id email firstName lastName");

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	return res.status(200).json({
		success: true,
		data: {
			id: user._id.toString(),
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
	});
};

export default requireAuth(handler);
