const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p.ipic.vip",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      }
    ],
    domains: ['p.ipic.vip'], // 允许从 ipic.vip 加载图片
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 响应式图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 图片尺寸配置
    formats: ['image/webp'], // 使用 WebP 格式
    minimumCacheTTL: 60, // 缓存时间（秒）
  },
};

module.exports = withBundleAnalyzer(nextConfig);
