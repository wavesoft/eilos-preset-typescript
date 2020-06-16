module.exports = (ctx) => ({
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: ctx.getConfigFilePath('tsconfig.json')
    }
  }
})
