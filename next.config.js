module.exports = {
  trailingSlash: true,
  i18n: {
    locales: ['ro-RO', 'en-US'],
    defaultLocale: 'ro-RO',
    domains: [
      {
        domain: process.env.REACT_APP_EN_DOMAIN,
        defaultLocale: 'en-US',
        http: process.env.NODE_ENV === 'development',
      },
      {
        domain: process.env.REACT_APP_RO_DOMAIN,
        defaultLocale: 'ro-RO',
        http: process.env.NODE_ENV === 'development',
      },
    ],
  },
  env: {
    REACT_APP_PROTOCOL: process.env.REACT_APP_PROTOCOL,
    REACT_APP_EN_DOMAIN: process.env.REACT_APP_EN_DOMAIN,
    REACT_APP_RO_DOMAIN: process.env.REACT_APP_RO_DOMAIN,
  },
};
