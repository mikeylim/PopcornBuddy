import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    NEXT_PUBLIC_OMBD_API_KEY: process.env.NEXT_PUBLIC_OMBD_API_KEY, // Add this line for API key
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
