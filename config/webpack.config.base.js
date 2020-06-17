const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (ctx) => {
  const plugins = []

  // Load copy plug-in if we have a static directory
  const staticDir = ctx.getConfig('static', './static')
  if (fs.existsSync(staticDir)) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: staticDir }
        ]
      })
    )
  }

  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  )

  return {
    entry: ctx.getConfig('entry'),
    context: ctx.getDirectory('project'),
    mode: ctx.getMode(),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                context: ctx.getDirectory('project'),
                configFile: ctx.getConfigFilePath('tsconfig.json')
              }
            }
          ]
        }
      ]
    },
    plugins: plugins,
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    output: {
      path: ctx.getDirectory('dist'),
      publicPath: '/',
      filename: '[id].js'
    },
    devServer: {
      contentBase: ctx.getDirectory('static')
    }
  }
}
