import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  injectGlobals: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  verbose: true,
}

export default jestConfig
