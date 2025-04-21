/** @type {import('next').NextConfig} */
const nextConfig = {
  // ตั้งค่าเพิ่มเติมสำหรับ Next.js
  // Additional configuration for Next.js
  reactStrictMode: true,
  
  // เปิดใช้งาน App Router
  // Enable App Router
  experimental: {
    serverActions: true,
    missingSuspenseWithCSRBailout: false,
  },
  
  // กำหนดค่า images domains ที่อนุญาต
  // Configure allowed image domains
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  
  // กำหนดค่า headers สำหรับความปลอดภัย
  // Configure security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
