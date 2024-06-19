/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // NEXT_PUBLIC_SALT: process.env.NEXT_PUBLIC_SALT,
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
