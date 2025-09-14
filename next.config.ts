import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    const longCache = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];
    const hourCache = [{ key: 'Cache-Control', value: 'public, max-age=3600' }];
    return [
      { source: '/:path*.png', headers: longCache },
      { source: '/:path*.jpg', headers: longCache },
      { source: '/:path*.jpeg', headers: longCache },
      { source: '/:path*.webp', headers: longCache },
      { source: '/:path*.avif', headers: longCache },
      { source: '/:path*.ico', headers: longCache },
      { source: '/_next/static/:path*', headers: longCache },
      { source: '/sitemap.xml', headers: hourCache },
      { source: '/robots.txt', headers: hourCache },
      { source: '/llms.txt', headers: hourCache },
    ];
  },
  async rewrites() {
    return [
      { source: '/project/:slug', destination: '/p/:slug' },
      { source: '/user/:handle', destination: '/u/:handle' },
    ];
  },
};

export default nextConfig;
