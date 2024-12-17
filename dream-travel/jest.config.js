module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.module\\.scss$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-module-to-transform).+\\.js$",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
