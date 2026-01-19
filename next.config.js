/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['property.com.au', 'planning.vic.gov.au'],
  },
  env: {
    PROPERTY_API_BASE_URL: process.env.PROPERTY_API_BASE_URL,
    PLANNING_VIC_API_BASE_URL: process.env.PLANNING_VIC_API_BASE_URL,
  },
}

module.exports = nextConfig
