
module.exports = {
  _actions: {
    build: require('./actions/build'),
    test: require('./actions/test')
  },

  options: {
    hot: false
  },

  entry: './src/index.ts',
  webpack: {},
  tsconfig: {},
  jest: {}
}
