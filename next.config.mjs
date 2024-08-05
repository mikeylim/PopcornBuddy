import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  },
};

export default nextConfig;
