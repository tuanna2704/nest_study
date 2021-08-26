export default () => {
  const { REDIS_HOST, REDIS_PORT, REDIS_TTL } = process.env;
  return {
    test: process.env.test || 'value in configuration.ts',
    REDIS_PORT: parseInt(REDIS_PORT) || 6379,
    REDIS_TTL: parseInt(REDIS_TTL) || 60,
  };
};
