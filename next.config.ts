import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import i18nConfig from './next-i18next.config'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  ...i18nConfig,
}

export default withAnalyzer(nextConfig)