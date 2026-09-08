import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.VERCEL ? ".next" : process.env.CODEX_NEXT_DIST_DIR || ".next",
  pageExtensions: ["ts", "tsx", "md", "mdx"]
};

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withNextIntl(withMDX(nextConfig));
