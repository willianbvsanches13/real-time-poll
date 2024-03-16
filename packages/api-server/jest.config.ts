import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: pathsToModuleNameMapper({
    "@/tests/*": ["../tests/*"],
    "@/*": ["*"]
  }),
  injectGlobals: true,
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
  verbose: true,
}

export default jestConfig
