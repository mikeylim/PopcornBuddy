import jwt from "jsonwebtoken";

export const ACCESS_TOKEN_MAX_AGE = 30 * 60;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const isProduction = process.env.NODE_ENV === "production";

const serializeCookie = (name, value, options = {}) => {
	const segments = [`${name}=${encodeURIComponent(value)}`];

	if (typeof options.maxAge === "number") {
		segments.push(`Max-Age=${options.maxAge}`);
	}
	if (options.path) {
		segments.push(`Path=${options.path}`);
	}
	if (options.httpOnly) {
		segments.push("HttpOnly");
	}
	if (options.secure) {
		segments.push("Secure");
	}
	if (options.sameSite) {
		segments.push(`SameSite=${options.sameSite}`);
	}

	return segments.join("; ");
};

const parseCookieHeader = (header = "") =>
	header.split(/;\s*/).reduce((cookies, part) => {
		if (!part) {
			return cookies;
		}

		const separatorIndex = part.indexOf("=");
		if (separatorIndex === -1) {
			return cookies;
		}

		const key = part.slice(0, separatorIndex).trim();
		const value = part.slice(separatorIndex + 1).trim();

		cookies[key] = decodeURIComponent(value);
		return cookies;
	}, {});

const getCookieOptions = (maxAge) => ({
	httpOnly: true,
	secure: isProduction,
	maxAge,
	sameSite: "lax",
	path: "/",
});

export const getAuthCookies = (token, refreshToken) => {
	const cookies = [serializeCookie("token", token, getCookieOptions(ACCESS_TOKEN_MAX_AGE))];

	if (refreshToken) {
		cookies.push(
			serializeCookie("refreshToken", refreshToken, getCookieOptions(REFRESH_TOKEN_MAX_AGE))
		);
	}

	return cookies;
};

export const getClearedAuthCookies = () => [
	serializeCookie("token", "", getCookieOptions(0)),
	serializeCookie("refreshToken", "", getCookieOptions(0)),
];

export const getRequestCookies = (req) =>
	req.cookies || parseCookieHeader(req.headers.cookie || "");

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
