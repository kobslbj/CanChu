/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['justin-canchu-api.octave.vip', 'i.imgur.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'token',
          },
        ],
        permanent: false,
        destination: '/',
      },
      // {
      //   source: '/',
      //   missing: [
      //     {
      //       type: 'cookie',
      //       key: 'token',
      //     },
      //   ],
      //   permanent: false,
      //   destination: '/login',
      // },
    ];
  },
};
