export default {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3003'
      : 'https://letsgo-backend-v1.herokuapp.com',
};
