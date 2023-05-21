const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/i4QA6VLSP0gXyj6-3zNFXg/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
