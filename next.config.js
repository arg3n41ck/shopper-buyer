/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['www.google.com', 'shopper.kg', 'www.gamewallpapers.com'],
  },
};

module.exports = nextConfig;
