/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['www.google.com', 'shopper.kg', 'w7.pngwing.com'],
  },
};

module.exports = nextConfig;
