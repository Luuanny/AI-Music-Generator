/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除静态导出以支持API路由
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig



