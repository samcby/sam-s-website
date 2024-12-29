const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
    ],
  },
});
