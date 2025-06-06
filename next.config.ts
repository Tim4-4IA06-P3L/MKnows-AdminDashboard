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
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
	outputFileTracingIncludes: {
		'/api/ga/view_and_user': ['./private/*'],
		'/api/ga/page_view': ['./private/*'],
	}
};

export default nextConfig;
