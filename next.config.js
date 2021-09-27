module.exports = {
  async redirects() {
    return [{
      source: '/favicon.ico',
      destination: '/api/icon.svg',
      permanent: true,
    }];
  },
};
