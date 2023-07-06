// ----------------------------------------------------------------------

const nextConfig = {
  trailingSlash: true,
  env: {
    DEV: {
      BASE_URL: 'http://localhost:7777',
      CONNECTION_LIMIT: 20,
      DB_PORT: 1433, 
      DB_LIB: 'mssql',
      DB_HOST: '192.168.30.214',
      DB_USER: 'sa',
      DB_PASS: 'abcd@1234',
      DB_NAME: 'edu_suite',
      ONLYOFFICE_API_URL: "https://edudsqa.apex.hk/api/2.0",
    },
    PROD: {
      BASE_URL: 'https://eduqa.apex.hk',
      CONNECTION_LIMIT: 20,
      DB_PORT: 1433, 
      DB_LIB: 'mssql',
      DB_HOST: '192.168.30.214',
      DB_USER: 'sa',
      DB_PASS: 'abcd@1234',
      DB_NAME: 'edu_suite',
      ONLYOFFICE_API_URL: "https://edudsqa.apex.hk/api/2.0",
    },
    // PROD: {
    //   BASE_URL: 'https://eduqa.apex.hk',
    //   CONNECTION_LIMIT: 20,
    //   DB_PORT: 3306,
    //   DB_LIB: 'mysql',
    //   DB_HOST: '192.168.30.210',
    //   DB_USER: 'root',
    //   DB_PASS: 'abcd@1234',
    //   DB_NAME: 'doLMS',
    //   ONLYOFFICE_API_URL: "https://edudsqa.apex.hk/api/2.0",
    // },
    SITE_TITLE: 'seeChange LMS',
    FAVICON: '/favicon/see_change_favicon.png',
    LOGO: '/assets/see_change_logo.png',
    LOGO_DARK: '/assets/see_change_logo.png',
    JWT_TOKEN_SECRET: '5d2cdc8c70af18915a97619c9d23d1bb3e8a08164000bf1a380f494421d85a0cb4ae68cfcea85064f002f3be8c78b89c01c582d5668c20b778dd5b2c6d9daa75',
    SECURE_LOCAL_STORAGE_HASH_KEY: '0de4074dbf7c984ce96775ebbd2b27cc3f38560ffc3740f5113a0e059ef9c411aa327470157dc6608747552c7747b16e59a80a1bc3ec532fea58315ad40fe9fb',
    SECURE_LOCAL_STORAGE_PREFIX: 'bf88fa194958b185'
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
