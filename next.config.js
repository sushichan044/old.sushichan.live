const path = require('path')
const webpack = require('webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/sushi-chan/**',
      },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  experimental: {
    serverActions: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['fetch-site-metadata'],
  },
  webpack: (config) => {
    config.plugins = [
      ...config.plugins,
      // https://github.com/jsdom/jsdom/issues/3042
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/,
      }),
    ]
    return config
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
