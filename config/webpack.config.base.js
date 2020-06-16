module.exports = (ctx) => {
  return {
    entry: ctx.getConfig('entry'),
    mode: ctx.getMode(),
    module: {
      rules: [
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
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    output: {
      path: ctx.getDirectory('dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: ctx.getDirectory('static')
    }
  }
}
