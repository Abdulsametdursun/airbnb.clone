/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-map-gl'],
  experimental: {
    turbo: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
