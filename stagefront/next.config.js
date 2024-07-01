const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "ws-storefront.s3.us-west-1.amazonaws.com",
      },
    ],
  },
})

console.log("next.config.js", JSON.stringify(nextConfig, null, 2))

module.exports = nextConfig
