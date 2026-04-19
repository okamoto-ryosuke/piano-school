import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScriptの型エラーを無視してビルドする
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのエラー（<a>タグやanyの使用など）を無視してビルドする
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
