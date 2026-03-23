import type { NextConfig } from "next";


if (!process.env.AWS_S3_BUCKET) {
  throw new Error("Missing AWS_S3_BUCKET environment variable");
}


  const nextConfig: NextConfig = {
    /* config options here */
    images: {
      remotePatterns: [
        {
        protocol: "https",
        hostname: process.env.AWS_S3_BUCKET,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  }
};

export default nextConfig;
