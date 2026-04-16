// ./next.config.mjs
import dotenv from "dotenv";
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/t/p/**",
			},
		],
	},
};

export default nextConfig;
