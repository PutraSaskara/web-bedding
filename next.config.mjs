/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 1. Izinkan gambar dari Backend Localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      // 2. Izinkan gambar dummy dari Google (yang dipakai di layout Our Story/Home)
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // 3. Izinkan gambar dari URL production
      {
        protocol: 'https',
        hostname: 'ameskarabed.saskaraputra.my.id',
        pathname: '/uploads/**',
      },
      // 4. Izinkan gambar dari Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;