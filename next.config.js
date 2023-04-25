/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    localeDetection: false,
    locales: ['en-US', 'ro-RO'],
    defaultLocale: 'ro-RO',
    domains: [
      {
        domain: 'www.workoutbuddy.ro:3000',
        defaultLocale: 'ro-RO',
        http: true,
      },
      {
        domain: 'www.workoutbuddy.com:3000',
        defaultLocale: 'en-US',
        http: true,
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
