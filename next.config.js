/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Log the Webpack configuration for debugging, handling BigInt values
    console.log('Webpack Configuration:', JSON.stringify(config, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value, 
    2));
    
    return config;
  },
};

module.exports = nextConfig;
