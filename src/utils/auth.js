import cookie from "cookie";
import jwt from "jsonwebtoken";

export const ACCESS_TOKEN_MAX_AGE = 30 * 60;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const isProduction = process.env.NODE_ENV === "production";

const getCookieOptions = (maxAge) => ({
	httpOnly: true,
	secure: isProduction,
	maxAge,
	sameSite: "lax",
	path: "/",
});

export const getAuthCookies = (token, refreshToken) => {
	const cookies = [
		cookie.serialize("token", token, getCookieOptions(ACCESS_TOKEN_MAX_AGE)),
	];

	if (refreshToken) {
		cookies.push(
			cookie.serialize("refreshToken", refreshToken, getCookieOptions(REFRESH_TOKEN_MAX_AGE))
		);
	}

	return cookies;
};

export const getClearedAuthCookies = () => [
	cookie.serialize("token", "", getCookieOptions(0)),
	cookie.serialize("refreshToken", "", getCookieOptions(0)),
];

export const getRequestCookies = (req) =>
	req.cookies || cookie.parse(req.headers.cookie || "");

export const getAuthenticatedUserId = (req) => {
	const { token } = getRequestCookies(req);

	if (!token) {
		throw new Error("Unauthorized");
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded.userId;
};

export const requireAuth = (handler) => async (req, res) => {
	try {
		req.user = { userId: getAuthenticatedUserId(req) };
		return handler(req, res);
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized" });
	}
};
