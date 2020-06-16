const webpack = require('webpack')

module.exports = (context) => ({
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true
  }
})
