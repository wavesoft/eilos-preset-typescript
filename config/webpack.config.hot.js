const webpack = require("webpack");

module.exports = (ctx) => ({
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
  },
});
