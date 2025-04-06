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
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.recaptcha.net",
      },
      {
        protocol: "https",
        hostname: "recaptcha.net",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "google.com",
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  // 添加网络配置
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'fonts.googleapis.com', 'www.google.com', 'www.gstatic.com', 'www.recaptcha.net', 'recaptcha.net'],
    },
  },
  // 增加超时时间
  httpAgentOptions: {
    keepAlive: true,
    timeout: 30000,
  },
  // 添加重试配置
  async rewrites() {
    return [
      {
        source: '/recaptcha/api.js',
        destination: 'https://www.google.com/recaptcha/api.js',
      },
      {
        source: '/recaptcha/api2.js',
        destination: 'https://www.google.com/recaptcha/api2.js',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // 优化构建配置
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      minimize: true,
      minimizer: [...(config.optimization.minimizer || [])],
    };
    
    // 减少包大小
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  generateEtags: true,
  // 优化缓存策略
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  env: {
    PORT: 3000,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
