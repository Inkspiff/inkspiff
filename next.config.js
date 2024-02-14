/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "github.com",
      "inkspiff.com",
      "inkspiff.netlify.app",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
