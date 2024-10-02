/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    webpack(config) {
      return config;
    },
  };
  
  export default nextConfig;
