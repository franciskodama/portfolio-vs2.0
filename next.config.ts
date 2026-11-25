import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/?section=projects',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/?project=:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/for/hs',
        destination: '/for/hs/index.html',
      },
      {
        source: '/for/remitian',
        destination: '/for/remitian/index.html',
      },
      {
        source: '/for/remitian/first-look',
        destination: '/for/remitian/first-look/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/for/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
