import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	env: {
		API_TOKEN: process.env.API_TOKEN,
		STRAPI_URL: process.env.STRAPI_URL,
		NEON_URL: process.env.NEON_URL,
	},
	images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
};

export default nextConfig;
