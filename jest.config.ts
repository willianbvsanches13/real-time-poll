module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.ts'],
  resolveJsonModule: true,
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx']
}
