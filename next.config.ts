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
};

export default nextConfig;
