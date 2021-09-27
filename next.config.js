module.exports = {
  async rewrites() {
    return [{
      source: '/favicon.svg',
      destination: '/api/favicon.svg',
    }];
  },
  async redirects() {
    return [{
      source: '/favicon.ico',
      destination: '/favicon.svg',
      permanent: true,
    }];
  },
};
