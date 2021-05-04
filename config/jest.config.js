module.exports = (ctx) => ({
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ctx.getDirectory("project"),
  globals: {
    "ts-jest": {
      tsconfig: ctx.getConfigFilePath("tsconfig.json"),
    },
  },
});
