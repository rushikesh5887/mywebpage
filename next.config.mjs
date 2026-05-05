import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const isStaticExport =
  process.env.NEXT_OUTPUT === "export" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const isDevelopment = process.env.NODE_ENV === "development";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStaticExport,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: [
      "@once-ui-system/core",
      "react-icons/fa6",
      "react-icons/hi2",
      "react-icons/pi",
      "react-icons/si",
    ],
  },
  images: {
    unoptimized: isStaticExport || isDevelopment,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
