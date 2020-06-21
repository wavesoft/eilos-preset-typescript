module.exports = (ctx) => ({
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ctx.getDirectory("project"),
  globals: {
    "ts-jest": {
      tsConfig: ctx.getConfigFilePath("tsconfig.json"),
    },
  },
});
