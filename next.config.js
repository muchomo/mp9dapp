/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Log the Webpack configuration for debugging
    console.log('Webpack Configuration:', JSON.stringify(config, null, 2));
    
    return config;
  },
};

module.exports = nextConfig;
