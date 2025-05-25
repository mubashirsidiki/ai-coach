/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  // Optimize for serverless
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: [
      '@clerk/nextjs',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      'lucide-react'
    ]
  },
  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },
  // Supabase image domains
  images: {
    domains: [
      'randomuser.me',
      'fzryvtogslqhsikzpplr.supabase.co'
    ]
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false
};

export default nextConfig;
