// https://nextjs.org/docs/advanced-features/compiler#jest
const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

// Any custom config you want to pass to Jest
/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  verbose: true,
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
