/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local /public logos need no remote config.
    // Add external domains here if remote images are introduced later.
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
