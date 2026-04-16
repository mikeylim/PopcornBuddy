import { getClearedAuthCookies } from "@/utils/auth";

export default function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}

	res.setHeader("Set-Cookie", getClearedAuthCookies());
	return res.status(200).json({ success: true });
}
