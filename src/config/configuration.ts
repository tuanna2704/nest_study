export default () => ({
  test: process.env.test || 'value in configuration.ts',
  DATABASE_USER: process.env.DATABASE_USER || 'DATABASE_USER default value',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'DATABASE_PASSWORD default value',
  nest: {
    abc: 'default stuff in nest'
  }
});