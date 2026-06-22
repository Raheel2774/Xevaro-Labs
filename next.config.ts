import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Self-contained server build — ideal for Hostinger VPS / Node app hosting
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
}

export default nextConfig
