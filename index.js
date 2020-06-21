module.exports = {
  _actions: {
    build: require("./actions/build"),
    test: require("./actions/test"),
    dev: require("./actions/dev"),
  },

  options: {
    hot: false,
  },

  entry: "./src/index.ts",
  library: false,
  output: "[id].js",

  webpack: {},
  tsconfig: {},
  jest: {},
};
