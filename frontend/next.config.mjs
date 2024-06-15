/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // env: {
  //   NEXT_PUBLIC_SALT: process.env.NEXT_PUBLIC_SALT,
  //   BASE_URL: process.env.BASE_URL,
  //   API_1: process.env.API_1,
  //   API_2: process.env.API_2,
  //   API_HADITS: process.env.API_HADITS,
  //   API_DOA_DOA: process.env.API_DOA_DOA,
  //   API_DOA_TAHLIL: process.env.API_DOA_TAHLIL,
  //   API_DOA_HARIAN: process.env.API_DOA_HARIAN,
  //   API_GETLOCATION: process.env.API_GETLOCATION,
  // },
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
