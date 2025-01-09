/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: false, // Keep console logs if added earlier
  },
  optimization: {
    minimize: false, // Disable minification
  },
};

module.exports = nextConfig;
