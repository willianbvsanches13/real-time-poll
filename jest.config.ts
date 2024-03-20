module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.ts'],
  resolveJsonModule: true,
  testEnvironment: 'node',
  testMatch: ['*.test.ts', '*.test.tsx']
}
