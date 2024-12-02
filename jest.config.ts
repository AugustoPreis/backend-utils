import { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default config;