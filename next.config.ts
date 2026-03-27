import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"]
};

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withNextIntl(withMDX(nextConfig));
