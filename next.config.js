module.exports = {
  trailingSlash: true,
  i18n: {
    locales: ['ro-RO', 'en-US'],
    defaultLocale: 'ro-RO',
    localeDetection: false,
    domains: [
      {
        domain: 'www.workoutbuddy.com:3000',
        defaultLocale: 'en-US',
        http: true,
      },
      {
        domain: 'www.workoutbuddy.ro:3000',
        defaultLocale: 'ro-RO',
        http: true,
      },
    ],
  },
};
