/** @type {import('next').NextConfig} */

const endpoint = process.env.API_ENDPOINT

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://${endpoint}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
