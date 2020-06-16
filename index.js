
module.exports = {
  _actions: {
    build: require('./actions/build')
  },

  options: {
    hot: false
  },

  entry: './src/index.ts',
  webpack: {},
  tsconfig: {}
}
