/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAKAO_JAVASCRIPT_KEY: '8a12558ecf1afe8816c6ce674a84a9bb',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
