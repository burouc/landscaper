/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // fabric.js needs canvas in Node for SSR, skip it
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
