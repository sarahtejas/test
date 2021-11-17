module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.yml?$': 'jest-raw-loader',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'css'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '~(.*)$': '<rootDir>/src/$1',
  },
  reporters: ['default'],
  setupFiles: ['jest-date-mock', '<rootDir>/jest/globals.ts', 'dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jest/rtl.setup.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.story.tsx',
    '!<rootDir>/src/pages/_error.tsx',
    '!<rootDir>/src/pages/client-error.tsx',
    '!<rootDir>/src/pages/nextjs-server-error.tsx',
    '!<rootDir>/src/test-utils/stubRouter.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
