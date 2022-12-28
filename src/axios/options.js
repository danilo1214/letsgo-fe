export default {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3003'
      : 'https://letsgo-api.com',
};
