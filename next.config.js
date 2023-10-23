/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    API_KEY: process.env.API_KEY,
    BIN_ID: process.env.BIN_ID,
  },
};

module.exports = nextConfig;
