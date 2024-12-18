import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      exclude: /node_modules\/react-icons\/fa/,
      use: {
        loader: "babel-loader",
        options: {
          compact: false,
        },
      },
    });
    return config;
  },
};

export default nextConfig;
